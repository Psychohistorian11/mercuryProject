import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { DeleteSong } from '../../auth/interfaces/song.interface';
import { enviroment } from './../../enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class DeleteSongService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      enviroment.supabaseConfig.url,
      enviroment.supabaseConfig.apikey
    );
  }

  // Método para eliminar la canción
  async deleteSong(song: DeleteSong) {
    this.deleteSongLocalStorage(song.id);
    await this.deleteSongSupabase(song);
  }

  deleteSongLocalStorage(songId: string) {
    const songs = JSON.parse(localStorage.getItem(enviroment.localStorageConfig.songs.key) || '[]');
    const updatedSongs = songs.filter((song: any) => song.id !== songId);
    localStorage.setItem(enviroment.localStorageConfig.songs.key, JSON.stringify(updatedSongs));
  }



  async deleteSongSupabase(song: DeleteSong) {
    const { error: audioError } = await this.supabase.storage
    .from(enviroment.supabaseBucket.Songs.name).
    remove([`${enviroment.supabaseBucket.Songs.audios}/${song.id}/${song.audio}`]);

    if (audioError) {
      console.error('Error al eliminar el audio:', audioError);
    } 

    const { data: imageData, error: imageError } = await this.supabase.storage
    .from(enviroment.supabaseBucket.Songs.name)
    .remove([`${enviroment.supabaseBucket.Songs.images}/${song.id}/${song.image}`]);

    if (imageError) {
      console.error('Error al eliminar la imagen:', imageError);
    } else {
      console.log('Imagen eliminada:', imageData);
    }
  }
}

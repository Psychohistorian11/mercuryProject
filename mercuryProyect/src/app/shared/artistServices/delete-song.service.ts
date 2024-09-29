import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { DeleteSong } from '../../auth/interfaces/CreateSong.interface';
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
    await this.deleteSongLocalStorage(song.id);
    await this.deleteSongSupabase(song.id);
  }

  deleteSongLocalStorage(songId: string) {
    const songs = JSON.parse(localStorage.getItem('songs') || '[]');
    const updatedSongs = songs.filter((song: any) => song.id !== songId);
    localStorage.setItem(enviroment.songsConfig.key, JSON.stringify(updatedSongs));
  }



  async deleteSongSupabase(songId: string) {
    const { error: audioError } = await this.supabase.storage
    .from(enviroment.supabaseBucket.name).
    remove([`${enviroment.supabaseBucket.audios}/${songId}`]);

    if (audioError) {
      console.error('Error al eliminar el audio:', audioError);
    } 

    const { data: imageData, error: imageError } = await this.supabase.storage
    .from(enviroment.supabaseBucket.name)
    .remove([`${enviroment.supabaseBucket.images}/${songId}`]);

    if (imageError) {
      console.error('Error al eliminar la imagen:', imageError);
    } else {
      console.log('Imagen eliminada:', imageData);
    }
  }
}

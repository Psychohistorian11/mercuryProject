import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { Song, SongSupabase } from '../../auth/interfaces/song.interface';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GetSongsService {

  private readonly SONG_STORAGE_KEY = enviroment.localStorageConfig.songs.key;
  private readonly SONG_ARTIST_STORAGE_KEY = enviroment.localStorageConfig.songsArtist.key;
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      enviroment.supabaseConfig.url,
      enviroment.supabaseConfig.apikey
    );
  }

  getSongs(){
      
  }
  getSongsByArtist(idArtist: string): Song[] {
    const songsOfArtistData = localStorage.getItem(this.SONG_ARTIST_STORAGE_KEY);
    const songsData = localStorage.getItem(this.SONG_STORAGE_KEY);
  
    if (songsOfArtistData && songsData) {
      const allsongsOfArtist = JSON.parse(songsOfArtistData); 
      const allSongs = JSON.parse(songsData); 
  
      const artistEntries = allsongsOfArtist.filter((entry: any) => entry.idArtist === idArtist);
  
      if (artistEntries.length > 0) {
        const songIds = artistEntries.map((entry: any) => entry.idSong);

        const songs: Song[] = allSongs
          .filter((song: any) => songIds.includes(song.id)) 
          .map((song: any) => ({
            id: song.id,
            audio: song.audio, 
            image: song.image, 
            by: song.by,  
            name: song.name,
            time: song.time,
            datePublished: song.datePublished 
          }));
  
        return songs;
      }
    }
  
    return [];
  }
  


  async getSongById(id: string) {
    const bucket = enviroment.supabaseBucket.Songs;
    const songs = JSON.parse(localStorage.getItem('songs') || '[]');
    const song: Song = songs.find((song: any) => song.id === id);

    const { data: file } = this.supabase.storage.from(bucket.name).getPublicUrl(`${bucket.audios}/${id}/${song.audio}`);
    const { data: image } = this.supabase.storage.from(bucket.name).getPublicUrl(`${bucket.images}/${id}/${song.image}`);

    return  {name: song.name, audio: file.publicUrl, image: image.publicUrl, time: song.time}
    

  }

  getSongByIdLocalStorage(id: string): Song {
    const songsData = localStorage.getItem(enviroment.localStorageConfig.songs.key);
    if (songsData) {
      const songsArray = JSON.parse(songsData);
      const foundSong = songsArray.find((song: { id: string }) => song.id === id);
      
      if (foundSong) {
        return foundSong;
      }
    }
    
    throw new Error(`Song with id ${id} not found`); 
  }
  

}

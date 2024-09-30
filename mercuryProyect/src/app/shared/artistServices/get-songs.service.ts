import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { getSongLocalstorage } from '../../auth/interfaces/CreateSong.interface';
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

  getSongsByArtist(idArtist: string): getSongLocalstorage[] {
    const songsArtistData = localStorage.getItem(this.SONG_ARTIST_STORAGE_KEY);
    const songsData = localStorage.getItem(this.SONG_STORAGE_KEY);


    if (songsArtistData && songsData) {
      const songsArtist = JSON.parse(songsArtistData);
      const allSongs = JSON.parse(songsData);

      const artistEntries = songsArtist.filter((entry: any) => entry.idArtist === idArtist);

      if (artistEntries.length > 0) {
        const songIds = artistEntries.map((entry: any) => entry.idSong);

        const songs: getSongLocalstorage[] = allSongs.filter((song: any) => songIds.includes(song.id))
          .map((song: any) => ({
            id: song.id,
            name: song.name,
            time: song.time || '',
            role: song.role,
            type: song.type,
            nameFile: song.nameFile,
            nameImage: song.nameImage,
            datePublished: song.datePublished
          }));

        return songs;
      }
    }
    return [];
  }

  async getImageFileSupabase(songs: getSongLocalstorage[]) {
    const bucket = enviroment.supabaseBucket.Songs;
    const songList = [];

    try {
      for (const song of songs) {
        const { id, nameFile, nameImage } = song;

        // Obtener el archivo (audio)
        const { data: file } = this.supabase.storage.from(bucket.name).getPublicUrl(`audios/${id}/${nameFile}`);
        const { data: image } = this.supabase.storage.from(bucket.name).getPublicUrl(`images/${id}/${nameImage}`);


        songList.push({
          id: id,
          file: file.publicUrl,
          image: image.publicUrl
        })

      }
      return songList;

    } catch (error) {
      console.error('Error recuperando archivos desde Supabase:', error);
      return [];
    }
  }

  async getSongById(id: string) {
    const bucket = enviroment.supabaseBucket.Songs;
    const songs = JSON.parse(localStorage.getItem('songs') || '[]');
    const song = songs.find((song: any) => song.id === id);

    let nameSong: string
    let nameFile: string;
    let nameImage: string 
    let time: string

    nameSong =  song.name
    nameFile = song.nameFile;
    nameImage = song.nameImage;
    time = song.time
    

    const { data: file } = this.supabase.storage.from(bucket.name).getPublicUrl(`audios/${id}/${nameFile}`);
    const { data: image } = this.supabase.storage.from(bucket.name).getPublicUrl(`images/${id}/${nameImage}`);

    return  {name: nameSong, file: file.publicUrl, image: image.publicUrl, time: time}
    

  }




}

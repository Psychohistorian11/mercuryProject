import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { SongFirstContent  } from '../../auth/interfaces/CreateSong.interface';
import { CreateSongSupabaseService } from './create-song-supabase.service';
import { v4 as uuidv4 } from 'uuid';
import { AddSongArtistService } from './add-song-artist.service';

@Injectable({
  providedIn: 'root'
})
export class CreateSongService {
  private readonly SONG_STORAGE_KEY = enviroment.songsConfig.key;
  private idArtist = '24354rfgbhu65edfggj6768';

  constructor(private CreateSongServiceSupabase: CreateSongSupabaseService,private addSongArtist:AddSongArtistService) { }

  getSongs(): SongFirstContent[] {
    const storedSongs = localStorage.getItem(this.SONG_STORAGE_KEY);
    return storedSongs ? JSON.parse(storedSongs) : [];
  }

  configSong(songData: {name: string, file: File, image: File, time:string }) {
    const id = this.generateId(); // ID compartido para luego obtener la canción completa

    // Crear la canción para el localStorage
    const songFirstContent: Omit<SongFirstContent, 'id' | 'datePublished'> = {
      name: songData.name,
      time: songData.time
    };

    // Guardar en localStorage
    this.addSongLocalStorage(songFirstContent, id);

    // Guardar en Supabase
    this.CreateSongServiceSupabase.addSongSupabase({
      id,
      file: songData.file,
      image: songData.image
    });
  }

 
  private addSongLocalStorage(song: Omit<SongFirstContent, 'id' | 'datePublished'>, id: string) {
    const currentSongs = this.getSongs();
    
    const createSong: SongFirstContent = {
      ...song,
      id,
      datePublished: new Date().toISOString(), 
    };

    this.addSongArtist.addSongArtistLocalStorage(this.idArtist,id)
    currentSongs.push(createSong);
    localStorage.setItem(this.SONG_STORAGE_KEY, JSON.stringify(currentSongs));
  }
  
  // Generar ID autoincremental
  private generateId(): string {
    return uuidv4();
  }
}

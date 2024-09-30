import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { CreateNewSong } from '../../auth/interfaces/CreateSong.interface';
import { CreateSongSupabaseService } from './create-song-supabase.service';
import { v4 as uuidv4 } from 'uuid';
import { AddSongArtistService } from './add-song-artist.service';
import { GetUserService } from '../generalServices/get-user.service';
import { GetSongsService } from './get-songs.service';

@Injectable({
  providedIn: 'root'
})
export class CreateSongService {
  private readonly SONG_STORAGE_KEY = enviroment.localStorageConfig.songs.key;
  private idArtist

  constructor(private CreateSongServiceSupabase: CreateSongSupabaseService,
              private addSongArtist:AddSongArtistService,
              private user : GetUserService,
              private song: GetSongsService) { 
    this.idArtist = this.user.getUser().id
              }

  getSongs(): CreateNewSong[] {
    const storedSongs = localStorage.getItem(this.SONG_STORAGE_KEY);
    return storedSongs ? JSON.parse(storedSongs) : [];
  }

  getSongById(id: string){
    return this.song.getSongById(id)
  }

  configSong(songData: {name: string, time: string, role: string, type: string, file: File, image:File}) {
    const id = this.generateId(); 

    // Crear la canción para el localStorage
    const songFirstContent: Omit<CreateNewSong, 'id' | 'datePublished'> = {
      name: songData.name,
      time: songData.time,
      role: songData.role,
      type: songData.type,
      nameFile: songData.file.name,
      nameImage: songData.image.name
    };
    


    this.addSongLocalStorage(songFirstContent, id);


    this.CreateSongServiceSupabase.addSongSupabase({
      id,
      file: songData.file,
      image: songData.image
    });
  }

  updateSong(id: string,songData: {name: string, time: string, role: string, type: string, file: File, image:File}){
    
  const songs = this.getSongs();


  const updatedSongs = songs.map(song => {
    if (song.id === id) {
      return {
        ...song,
        name: songData.name,
        time: songData.time,
      };
    }
    return song; 
  });


  localStorage.setItem(this.SONG_STORAGE_KEY, JSON.stringify(updatedSongs));

    this.CreateSongServiceSupabase.addSongSupabase({
      id,
      file: songData.file,
      image: songData.image
    });
  }

 
  private addSongLocalStorage(song: Omit<CreateNewSong, 'id' | 'datePublished'>, id: string) {
    const currentSongs = this.getSongs();
    
    const createSong: CreateNewSong = {
      ...song,
      id,
      datePublished: new Date().toISOString(), 
    };

    this.addSongArtist.addSongArtistLocalStorage(this.idArtist,id)
    currentSongs.push(createSong);
    localStorage.setItem(this.SONG_STORAGE_KEY, JSON.stringify(currentSongs));
  }
  

  private generateId(): string {
    return uuidv4();
  }
}

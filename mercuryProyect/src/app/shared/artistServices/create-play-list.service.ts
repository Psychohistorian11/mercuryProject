import { Injectable } from '@angular/core';
import { Song } from '../../auth/interfaces/song.interface';
import { enviroment } from '../../enviroments/enviroment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PlayListAPIService } from '../../API/playList/play-list-api.service';
import { useAnimation } from '@angular/animations';
import { v4 as uuidv4 } from 'uuid';
import { SongAPIService } from '../../API/song/song-api.service';


@Injectable({
  providedIn: 'root'
})
export class CreatePlayListService {

  private bucket = enviroment.supabaseBucket.PlayList;
  private supabase: SupabaseClient;


  constructor(private playListAPIService: PlayListAPIService,
              private songAPIService: SongAPIService
  ) {
    this.supabase = createClient(enviroment.supabaseConfig.url, enviroment.supabaseConfig.apikey);

   }

  async createPlayList(playList : {
    userId: string,
     name: string,
    datePublished: string,
    coverImage: File | null,
    songs: Song[],
    isPublic: boolean
  }){

   const imageUrl = await this.uploadFileToSupabase(this.bucket.images, playList.coverImage!)
   console.log("supabase: ",imageUrl);

    const data = {
      userId: playList.userId,
      name: playList.name,
      datePublished: playList.datePublished,
      coverImage: imageUrl,
      songs: playList.songs,
      isPublic: playList.isPublic
    }

    this.playListAPIService.createPlayList(data).subscribe({
      next: (response) => {
        console.log("PlayList creada con exito: ", response)
        this.uploadPlayList(response.data[0], data.coverImage)
        this.addSongToPlaylist(data.songs, response.data[0].id )
      },  
      error: (error) => {
        console.log("Error: ",error)
      }
    })

  }

  private uploadPlayList(playList: any, coverImage: string){
    this.playListAPIService.updatePlayList(playList, coverImage).subscribe({
      next: (response) => {   
            console.log("playList actualizada con exito: ", response)
      },
      error: (error) => {
          console.log("error: ", error)
      }
    })

  }

  private addSongToPlaylist(songs: Song[], playListId: string){
      for(let song of songs){
        this.songAPIService.addSongToPlaylist(song.id, playListId).subscribe({
          next: (response) => {
              console.log("Canciones agregadas a playList con exito: ", response)
          }
        })
      }
  }

  private async uploadFileToSupabase(folder: string, file: File) {

    const id = this.generateId()
    const { error } = await this.supabase.storage
      .from(this.bucket.name)
      .upload(`${folder}/${id}/${file.name}`, file);

    if (error) {
      throw new Error(`Error subiendo archivo: ${error.message}`);
    }

    const { data: fileUrl } = this.supabase.storage.from(this.bucket.name).getPublicUrl(`${folder}/${id}/${file.name}`);
    return fileUrl.publicUrl
  }


  private generateId(): string {
    return uuidv4();
  }
}

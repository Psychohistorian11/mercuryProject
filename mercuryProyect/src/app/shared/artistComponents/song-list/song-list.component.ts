import { Component, signal } from '@angular/core';
import { SongItemComponent } from '../song-item/song-item.component';
import { NgFor } from '@angular/common';
import { GetSongsService } from '../../artistServices/get-songs.service';
import { GetSongs } from '../../../auth/interfaces/CreateSong.interface';
import { GetUserService } from '../../generalServices/get-user.service';
import {User} from './../../../auth/interfaces/user-register'


@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [ SongItemComponent, NgFor],
  template: `

    <div *ngFor="let song of songs()">
      <app-song-item
        [song]="song"
        [isSelected]="selectedSong === song"
        (songSelected)="onSongSelect()">
      </app-song-item>
    </div>
  `
})
export class SongListComponent {
  private idArtist: User

  constructor(private getSongsService: GetSongsService, private user: GetUserService){
    this.idArtist = this.user.getUser()
    console.log("este es: ",this.idArtist.id)
    this.onSongSelect()
    
  }
  
  songs = signal<GetSongs[]>([]);

  
  selectedSong: GetSongs = {datePublished:"",role:"",file:"",id:"",image:"",name:"",nameFile:"",nameImage:"",time:"",type:""};
  

  async onSongSelect() {
    const songsLocal = this.getSongsService.getSongsByArtist(this.idArtist.id);
    
    const songsSupabase = await this.getSongsService.getImageFileSupabase(songsLocal);

    const combinedSongs = songsLocal.map(localSong => {
      const supabaseSong = songsSupabase.find(s => s.id === localSong.id);
            
      return {
        ...localSong,
        file: supabaseSong?.file,
        image: supabaseSong?.image, 
      };
    });
  
      this.songs.set(combinedSongs)
  }
  
  
}

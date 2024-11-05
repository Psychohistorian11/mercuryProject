import { Component, signal } from '@angular/core';
import { SearchService } from '../../../features/services/search.service';
import { SongAPIService } from '../../../API/song/song-api.service';
import { NgFor, NgIf } from '@angular/common';
import { MusicPlayerService } from '../../generalServices/music-player.service';

@Component({
  selector: 'app-song-list-searching',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './song-list-searching.component.html'
})
export class SongListSearchingComponent {

  songs = signal<any[]>([])
  input = ''

  constructor(private searchService: SearchService,
              private songAPIService: SongAPIService,
              private musicPlayerService: MusicPlayerService
  ){

        this.searchService.loadFromStorage();
        this.searchService.getInputSearching().subscribe({
          next: (data) => {
            this.input = data
            this.getSongsByWord(data)
          }
        })

        this.searchService.getGenredFiltredSearching().subscribe({
          next: (data) => {
            console.log("dataaaa: ", data)
             this.getSongsByGenredId(data)
          }
        })
  }

  getSongsByWord(input: string) {
    this.songAPIService.getSongsByWord(input).subscribe({
      next: (response) => {
  
        const transformedSongs = response.map((song: any) => ({
          ...song,
          song_image: song.image,
          song_name: song.name,   
        }));
 
        this.songs.set(transformedSongs);
      },
    });
  }

  getSongsByGenredId(genreId: string){
    this.songAPIService.getSongsByGenreId(genreId).subscribe({
      next: (response) => {
        const transformedSongs = response.map((song: any) => ({
          ...song,
          song_image: song.image,
          song_name: song.name,   
        }));
 
        this.songs.set(transformedSongs);
      }
    })
  }
  

  handleDblClick(song: any){
    this.musicPlayerService.setCurrentSong(song)
  }
}

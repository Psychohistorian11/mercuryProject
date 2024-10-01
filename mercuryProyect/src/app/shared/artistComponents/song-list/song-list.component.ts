import { Component, signal } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { GetSongsService } from '../../artistServices/get-songs.service';
import { DeleteSong, EditSong, Song } from '../../../auth/interfaces/song.interface';
import { GetUserService } from '../../generalServices/get-user.service';
import { User } from '../../../auth/interfaces/user.interface';
import { SearchService } from '../../../features/services/search.service';
import { PlaySongService } from '../../generalServices/play-song.service';
import Swal from 'sweetalert2';
import { DeleteSongService } from '../../artistServices/delete-song.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [ NgFor, NgIf, NgClass],
  templateUrl: './song-list.component.html'
})
export class SongListComponent {
  private idArtist: User;
  private searchQuery: string = '';
  createAlbum = false;

  constructor(
    private getSongsService: GetSongsService,
    private user: GetUserService,
    private search: SearchService,
    private playSong: PlaySongService,
    private deleteSongService: DeleteSongService,
    private router: Router,
  ){
    this.idArtist = this.user.getUser();
    this.checkSearchQuery();
    
  }

  songs = signal<Song[]>([]);

  handleDblClick(song: Song) {
    this.playSong.setFile(song.audio!)
    this.playSong.setImage(song.image!)
  }

  checkSearchQuery() {
    if (this.searchQuery.trim() === '') {
      this.onSongSelect();
    } else {
      this.searchSongs(this.searchQuery);
    }
  }

  onDeleteSong(song: DeleteSong) {
    Swal.fire({
      html: `
            <div class="bg-slate-700 p-10 rounded-lg max-w-lg mx-auto">
                <div class="mb-8 text-3xl text-left text-white border-b border-white pb-2">
                    ¿Estás segura de borrar este sencillo?
                </div>
                <div class="flex justify-around space-x-6">
                    <button id="confirm-button" class="flex items-center px-8 py-4 text-xl bg-slate-100 hover:bg-red-400 text-black rounded-md transition-all shadow-md hover:shadow-lg">
                        Borrar
                    </button>
                    <button id="cancel-button" class="flex items-center px-8 py-4 text-xl bg-slate-100 hover:bg-blue-400 text-black rounded-md transition-all shadow-md hover:shadow-lg">
                        Conservar
                    </button>
                </div>
            </div>
        `,
      background: 'rgb(75 85 99 / var(--tw-border-opacity))',
      showConfirmButton: false,
      showCancelButton: false,
      didRender: () => {
        document.getElementById('confirm-button')?.addEventListener('click', () => this.confirmDelete(song));
        document.getElementById('cancel-button')?.addEventListener('click', () => Swal.close());
      }
    });
  }

  confirmDelete(song: DeleteSong) {
    this.deleteSongService.deleteSong(song)
    Swal.close()
  }

  onEditSong(song: EditSong) {
    this.router.navigate([`/home/artist/${this.user.getUser().id}/my-songs/edit-song/${song.id}`])
  }

  onAddSong(){
    this.router.navigate([`/home/artist/${this.user.getUser().id}/my-songs/create-song`])
  }

  onAddToAlbumSong(song: EditSong) {

  }

  
  async onSongSelect() {
    const songsLocal = this.getSongsService.getSongsByArtist(this.idArtist.id);
    this.songs.set(songsLocal);
  }
  async searchSongs(query: string) {

  }
}

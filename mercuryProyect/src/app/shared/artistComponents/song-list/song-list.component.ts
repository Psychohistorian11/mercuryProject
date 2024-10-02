import { Component, EventEmitter, Output, signal, ViewChild } from '@angular/core';
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
import { LoadingComponent } from '../../generalComponents/loading/loading.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [ NgFor, NgIf, NgClass, LoadingComponent],
  templateUrl: './song-list.component.html'
})
export class SongListComponent {
  private artist: User;
  private searchQuery: string = '';
  private createAlbumSubscription:  Subscription | null = null

  createAlbum = false;
  songs = signal<Song[]>([]);
  @Output() songSelectedToAdd = new EventEmitter<Song>();
  @Output() songSelectedToRemove = new EventEmitter<Song>();
  
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent; 

  addedSongs = new Set<string>(); 

  constructor(
    private getSongsService: GetSongsService,
    private userService: GetUserService,
    private searchService: SearchService,
    private playSongService: PlaySongService,
    private deleteSongService: DeleteSongService,
    private router: Router,
  ){
    this.artist = this.userService.getUser();
    this.checkSearchQuery();
    this.createAlbumSubscription = this.searchService.alarm$.subscribe((bool) => {
    this.createAlbum = bool;
    });
  }

  

  handleDblClick(song: Song) {
    this.playSongService.setAudio(song.audio)
    this.playSongService.setImageSupabase(song.image)
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

  async confirmDelete(song: DeleteSong) {
    Swal.close();
    this.loadingComponent.showLoading();
    try {
      await this.deleteSongService.deleteSong(song);
    } catch (error) {
      console.error('Error al borrar la canción:', error);
    } finally {
      this.loadingComponent.hideLoading();
      Swal.fire({
        html: `<div class="bg-slate-700 p-10 rounded-lg max-w-lg mx-auto">
                <div class="mb-8 text-3xl text-left text-white border-b border-white pb-2">
                  Sencillo borrado con éxito
                </div>
              </div>`,
        background: 'rgb(75 85 99 / var(--tw-border-opacity))',
        showConfirmButton: false,
        showCancelButton: false,
      });
    }
  }

  onEditSong(song: EditSong) {
    this.router.navigate([`/home/artist/${this.userService.getUser().id}/my-songs/edit-song/${song.id}`]);
  }

  onAddSong(){
    this.router.navigate([`/home/artist/${this.userService.getUser().id}/my-songs/create-song`]);
  }

  onAddToAlbumSong(song: Song) {
    this.songSelectedToAdd.emit(song);
    this.addedSongs.add(song.id); 
  }

  onRemoveToAlbumSong(song: Song){
    this.songSelectedToRemove.emit(song);
    this.addedSongs.delete(song.id)
  }

  isSongAdded(song: Song): boolean {
    return this.addedSongs.has(song.id); 
  }

  async onSongSelect() {
    const songsLocal = this.getSongsService.getSongsByArtist(this.artist.id);
    this.songs.set(songsLocal);
  }

  async searchSongs(query: string) {
    // Implementación de búsqueda de canciones
  }
}

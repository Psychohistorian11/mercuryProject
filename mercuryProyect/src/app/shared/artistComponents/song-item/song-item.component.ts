import { Component, Input } from '@angular/core';
import { DeleteSong, EditSong, GetSongs } from '../../../auth/interfaces/CreateSong.interface';
import { PlaySongService } from '../../generalServices/play-song.service';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { DeleteSongService } from '../../artistServices/delete-song.service';

@Component({
  selector: 'app-song-item',
  standalone: true,
  imports: [NgClass],
  template: `
    <div 
      class="m-2 border-b-2 border-gray-600 flex items-center hover:bg-gray-700 transition-colors duration-300"
      [ngClass]="{'bg-gray-700': isSelected}"
      (dblclick)="handleDblClick()"
    >
      <!-- Imagen de la canción -->
      <div class="h-[70px] w-[70px] p-2">
        <img 
          [src]="song.image" 
          alt="song image"
          class="w-full h-full object-cover"
        >
      </div>
      
      <!-- Nombre y detalles de la canción -->
      <a class="ml-4 flex flex-col justify-center text-xl text-white">
        {{song.name}}<br>
        <span class="text-[14px] text-[#bbb] mt-1">{{song.type}} * {{song.role}}</span>
      </a>
      
      <!-- Controles adicionales y duración -->
      <div class="flex items-center ml-auto mr-8 space-x-4 text-xl text-white">
        <a (click)="onDeleteSong(song)" class="hover:text-red-400 transition-colors duration-200">
          <!-- Icono de borrar -->
          <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </a>

        <a (click)="onEditSong(song)" class="hover:text-blue-400 transition-colors duration-200">
          <!-- Icono de editar -->
          <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </a>
        <span class="text-gray-400">{{ song.time }}</span>
      </div>
    </div>
  `
})
export class SongItemComponent {
  @Input() song!: GetSongs;
  @Input() isSelected = false;

  constructor(private playSongService: PlaySongService, private deleteSongService: DeleteSongService) {}

  handleDblClick() {
    this.playSongService.setFileAndImage(this.song.file!, this.song.image!);
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
            document.getElementById('confirm-button')?.addEventListener('click', () => this.confirmDelete());
            document.getElementById('cancel-button')?.addEventListener('click', () => Swal.close());
        }
    });
}

confirmDelete() {
    this.deleteSongService.deleteSong(this.song)
    Swal.close()
}

  onEditSong(song: EditSong){

  }
}

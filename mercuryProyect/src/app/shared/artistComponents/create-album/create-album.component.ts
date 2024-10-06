import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SongListComponent } from '../song-list/song-list.component';
import { GetGenresService } from '../../generalServices/get-genres.service';
import { Genres } from '../../../auth/interfaces/album.interface';
import { NgFor } from '@angular/common';
import { LoadingComponent } from '../../generalComponents/loading/loading.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../../../auth/interfaces/song.interface';
import { GetUserService } from '../../generalServices/get-user.service';
import { CreateAlbumService } from '../../artistServices/create-album.service';
import { PlaySongService } from '../../generalServices/play-song.service';

@Component({
  selector: 'app-create-album',
  standalone: true,
  imports: [ReactiveFormsModule, SongListComponent, NgFor, LoadingComponent],
  templateUrl: './create-album.component.html'
})
export class CreateAlbumComponent implements OnInit {
  registerForm: FormGroup;
  genres = signal<Genres[]>([]);
  idAlbum: string | null = null;

  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;

  constructor(
    private fb: FormBuilder,
    private getGenresService: GetGenresService,
    private router: Router,
    private route: ActivatedRoute,
    private user: GetUserService,
    private playSongService: PlaySongService,
    private createAlbumService: CreateAlbumService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
      genre: [null, Validators.required],
      songs: this.fb.array([], Validators.required)
    });
  }

  ngOnInit() {
    this.loadGenres();
    this.idAlbum = this.route.snapshot.paramMap.get('id');
    if (this.idAlbum) {
      this.loadAlbumData(this.idAlbum);
    }
  }

  loadAlbumData(idAlbum: string) {

  }

  loadGenres() {
    const genres = this.getGenresService.getGenres();
    this.genres.set(genres);
  }

  onSongSelectToAdd(song: Song) {
    const songsFormArray = this.registerForm.get('songs') as FormArray;
    songsFormArray.push(this.fb.control(song));
  }

  onSongSelectToRemove(song: Song) {
    const songsFormArray = this.registerForm.get('songs') as FormArray;
    const index = songsFormArray.value.findIndex((s: Song) => s.id === song.id);

    if (index !== -1) {
      songsFormArray.removeAt(index);
    }
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const image = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        if (typeof imageUrl === 'string') {
          this.registerForm.patchValue({ image });
          this.playSongService.setImage(imageUrl);
        }
      };
      reader.readAsDataURL(image);

    }
  }

  async onSubmit() {

    if (this.registerForm.valid) {
      this.loadingComponent.showLoading();

      const albumData = {
        name: this.registerForm.value.name,
        genre: this.registerForm.value.genre,
        image: this.registerForm.value.image,
        songs: this.registerForm.value.songs
      };

      try {
        if (this.idAlbum) {
          await this.createAlbumService.configUpdateAlbum(this.idAlbum, albumData);
          Swal.fire({
            html: `<div class="bg-slate-700 p-10 rounded-lg max-w-lg mx-auto">
                      <div class="mb-8 text-3xl text-left text-white border-b border-white pb-2">
                        Album actualizado con éxito
                      </div>
                    </div>`,
            background: 'rgb(75 85 99 / var(--tw-border-opacity))',
            showConfirmButton: false,
            showCancelButton: false,
          });
        } else {
          await this.createAlbumService.configAlbum(albumData);
          Swal.fire({
            html: `<div class="bg-slate-700 p-10 rounded-lg max-w-lg mx-auto">
                      <div class="mb-8 text-3xl text-left text-white border-b border-white pb-2">
                        Album publicado con éxito
                      </div>
                    </div>`,
            background: 'rgb(75 85 99 / var(--tw-border-opacity))',
            showConfirmButton: false,
            showCancelButton: false,
          });
        }


        this.loadingComponent.hideLoading();
        this.router.navigate([`/home/artist/${this.user.getUser().id}/my-songs/my-albums`]);
      } catch (error) {

        this.loadingComponent.hideLoading();
        Swal.fire('Error', ` Hubo un problema al publicar el sencillo error ${error}`);
      }
    }
  }
}

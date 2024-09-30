import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateSongService } from '../../artistServices/create-song.service';
import { PlaySongService } from '../../generalServices/play-song.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-song',
  templateUrl: './create-song.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CreateSongComponent implements OnInit {

  registerForm: FormGroup;
  audioUrl: string | ArrayBuffer | null | undefined = null;
  time: string = '';
  role: string = "Autoria";
  type: string = "Sencillo";
  songId: string | null = null;  

  constructor(
    private fb: FormBuilder,
    private createSongService: CreateSongService,
    private playSong: PlaySongService,
    private route: ActivatedRoute,  
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      file: [null, Validators.required],
      image: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.songId = this.route.snapshot.paramMap.get('id');
    if (this.songId) {
      this.loadSongData(this.songId);
    }
  }

  async loadSongData(id: string) {
    const song: { name: string; file: string; image: string; time: string } = await this.createSongService.getSongById(id);
  
    this.registerForm.patchValue({
      name: song.name,
      file: song.file,
      image: song.image
    });
  
    this.time = song.time;
    this.role = "Autoria";
    this.type = "Sencillo";
  }

  onFileSongSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.audioUrl = e.target?.result;
        if (typeof this.audioUrl === 'string') { 
          const audio = new Audio();
          audio.src = this.audioUrl;
          audio.onloadedmetadata = () => {
            const timeInSecons = audio.duration; 
            this.time = this.formatTime(timeInSecons);
          };
        }
      };
      reader.readAsDataURL(file);

      this.registerForm.patchValue({
        file: file
      });
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
          this.registerForm.patchValue({
            image: image
          });
        }
      };
      reader.readAsDataURL(image);
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const songData = {
        name: this.registerForm.value.name,
        file: this.registerForm.value.file,
        image: this.registerForm.value.image,
        time: this.time,
        role: this.role,
        type: this.type
      };

      if (this.songId) {
        // Editar la canción existente
        this.createSongService.updateSong(this.songId, songData)

          Swal.fire({
            html: `
              <div class="bg-slate-700 p-10 rounded-lg max-w-lg mx-auto">
                <div class="mb-8 text-3xl text-left text-white border-b border-white pb-2">
                  Sencillo actualizado con éxito
                </div>
              </div>
            `,
            background: 'rgb(75 85 99 / var(--tw-border-opacity))',
            showConfirmButton: false,
            showCancelButton: false,
          });

          this.router.navigate(['/home/artist']); 
        }else {
    
        this.createSongService.configSong(songData)
          Swal.fire({
            html: `
              <div class="bg-slate-700 p-10 rounded-lg max-w-lg mx-auto">
                <div class="mb-8 text-3xl text-left text-white border-b border-white pb-2">
                  Sencillo publicado con éxito
                </div>
              </div>
            `,
            background: 'rgb(75 85 99 / var(--tw-border-opacity))',
            showConfirmButton: false,
            showCancelButton: false,
          });
        
      }
    }
  }
}

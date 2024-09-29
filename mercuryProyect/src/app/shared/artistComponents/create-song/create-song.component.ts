import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateSongService } from '../../artistServices/create-song.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-song',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-song.component.html'
})
export class CreateSongComponent {
  
  registerForm: FormGroup;
  audioUrl: string | ArrayBuffer | null | undefined = null;
  time: string = '';
  role: string = "Autoria";
  type: string = "Sencillo";
  
  constructor(private fb: FormBuilder, private CreateSongService: CreateSongService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      file: [null, Validators.required],
      image: [null, Validators.required]
    });
  }

  onFileSongSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        this.audioUrl = e.target?.result;
        const audio = new Audio();
        audio.src = this.audioUrl as string;
        audio.onloadedmetadata = () => {
          const timeInSecons = audio.duration; 
          this.time = this.formatTime(timeInSecons)

        };
      };
      reader.readAsDataURL(file);
      
      this.registerForm.patchValue({
        file: file
      });
    }
  }

  onImageSelect(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const image = input.files[0];

      this.registerForm.patchValue({
        image: image
      });
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
      
      this.CreateSongService.configSong(songData);
      
      Swal.fire({
        html: `
          <div class="bg-slate-700 p-10 rounded-lg max-w-lg mx-auto">
            <div class="mb-8 text-3xl text-left text-white border-b border-white pb-2">
              Sencillo publicado con exito
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

import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateSongService } from '../../artistServices/create-song.service';

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
      
      // Leer el archivo y asignar la URL de previsualización
      reader.onload = (e) => {
        this.audioUrl = e.target?.result;

        // Crear un objeto Audio para calcular la duración
        const audio = new Audio();
        audio.src = this.audioUrl as string;

        // Calcular la duración del archivo de audio
        audio.onloadedmetadata = () => {
          const timeInSecons = audio.duration; // Duración en segundos
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
        time: this.time
      };
      
      this.CreateSongService.configSong(songData); //servicio para guardar la canción
      console.log('Sencillo guardado con éxito en localStorage!');
    }
  }
}

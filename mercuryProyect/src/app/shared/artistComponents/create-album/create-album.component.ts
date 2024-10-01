import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaySongService } from '../../generalServices/play-song.service';
import { SongListComponent } from "../song-list/song-list.component";
import { SearchService } from '../../../features/services/search.service';

@Component({
  selector: 'app-create-album',
  standalone: true,
  imports: [ReactiveFormsModule, SongListComponent],
  templateUrl: './create-album.component.html'
})
export class CreateAlbumComponent {
  registerForm: FormGroup;

    constructor(private fb: FormBuilder,
                private playSong: PlaySongService,
                private search: SearchService
    ){
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        file: [null, Validators.required],
        image: [null, Validators.required]
      });
    }


    onSongsSelect(event: Event){

    }

    onImageSelect(event: Event){
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const image = input.files[0];
  
            //this.playSong.setbigImage(imageUrl)
          
        
      }
    }

    onSubmit(){

    }
}

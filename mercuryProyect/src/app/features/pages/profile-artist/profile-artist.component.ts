import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetTokenService } from '../../../shared/generalServices/get-token.service';
import { ArtistAPIService } from '../../../API/artist/artist-api.service';
import { EditProfileService } from '../../services/edit-profile.service';
import { LoadingComponent } from '../../../shared/generalComponents/loading/loading.component';

@Component({
  selector: 'app-profile-artist',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './profile-artist.component.html',
  styleUrl: './profile-artist.component.css'
})
export class ProfileArtistComponent {

  token: any;
  profileForm!: FormGroup;
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;
  profilePicture: string | ArrayBuffer | null = null;
  currentArtist: any;


  constructor(
    private editProfileService: EditProfileService,
    private fb: FormBuilder,
    private getToken: GetTokenService,
    private artistAPIService: ArtistAPIService
  ) {
    this.token = this.getToken.getToken();
    this.getCurrentArtist();
    
         this.profileForm = this.fb.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          country: ['', Validators.required],
          profile_picture: [''] 

        });
  }

  getCurrentArtist() {
    this.artistAPIService.getArtistById(this.token.sub).subscribe({
      next: (response) => {
        console.log("Artista encontrado: ", response);
        this.currentArtist = response;
      }
    });
  }
  
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);

      this.loadingComponent.showLoading();
      try {
        const profile_picture = await this.editProfileService.editProfilePicture(file);
        this.profileForm.patchValue({ profile_picture });
      } catch (error) {
        console.error("Error actualizando la imagen de perfil:", error);
      } finally {
        this.loadingComponent.hideLoading();
      }
    }
  }


  async editProfileArtist() {
    if (this.profileForm.valid) {
      this.loadingComponent.showLoading();
      const updatedUser = this.profileForm.value;

      // Actualizar las propiedades del usuario actual
      this.currentArtist.username = updatedUser.username;
      this.currentArtist.email = updatedUser.email;
      this.currentArtist.country = updatedUser.country;
      this.currentArtist.profile_picture = updatedUser.profile_picture;
      

      try {
        await this.editProfileService.updateProfileArtist(updatedUser, this.currentArtist.id);
      } catch (error) {
        console.error("Error actualizando el perfil:", error);
      } finally {
        this.loadingComponent.hideLoading();
      }
    } else {
      console.warn("Por favor, complete todos los campos obligatorios.");
    }
  }
  
}

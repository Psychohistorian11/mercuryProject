import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { GetUserService } from '../../../shared/generalServices/get-user.service';
import { User, Artist } from './../../../auth/interfaces/user.interface';
import { EditProfileService } from '../../services/edit-profile.service';
import { NgIf } from '@angular/common';
import { LoadingComponent } from '../../../shared/generalComponents/loading/loading.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, LoadingComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profilePicture: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  currentUser: User | Artist;
  profileForm: FormGroup; 
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent; 


  constructor(
    private userService: GetUserService,
    private editProfileService: EditProfileService,
    private fb: FormBuilder 
  ) {
    this.currentUser = this.userService.getUser();
 
    this.profileForm = this.fb.group({
      userName: [this.currentUser.userName, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      dateOfBirth: [this.currentUser.dateOfBirth, Validators.required],
      location: [this.editProfileService.getLocationLocalStorage(this.currentUser.id)],
      biography: [this.editProfileService.getBiography(this.currentUser.id)]
    });
  }

  isArtist(user: User | Artist): user is Artist {
    return (user as Artist).role === 'artist';
  }

  async ngOnInit(): Promise<void> {
    if (this.currentUser.location) {
      this.profileForm.patchValue({ location: this.currentUser.location });
    }
    this.profilePicture = await this.editProfileService.getProfilePictureSupabase(this.currentUser.id);
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
        const user = this.editProfileService.getUserOfUsersLocalStorage(this.currentUser.id);
        await this.editProfileService.editProfilePicture(user, file, this.currentUser.id);
      } catch (error) {
        console.error("Error actualizando la imagen de perfil:", error);
      } finally {
        this.loadingComponent.hideLoading();
      }
    }
  }

  async editProfile() {
    if (this.profileForm.valid) {

      this.loadingComponent.showLoading();
      const updatedUser = this.profileForm.value;
      
      this.currentUser.userName = updatedUser.userName;
      this.currentUser.email = updatedUser.email;
      this.currentUser.dateOfBirth = updatedUser.dateOfBirth; 
      this.currentUser.location = updatedUser.location;

      

      try {
        if (this.isArtist(this.currentUser)) {
          (this.currentUser as Artist).biography = updatedUser.biography; 
          await this.editProfileService.updateBiography(updatedUser.biography, this.currentUser.id);
        }

        await this.editProfileService.updateLocalStorage(updatedUser, this.currentUser.id);
      } catch (error) {
        console.error("Error actualizando el perfil:", error);
      } finally {
        this.loadingComponent.hideLoading();
      }
    } else {
      // Manejar la validación de campos obligatorios
    }
  }
}

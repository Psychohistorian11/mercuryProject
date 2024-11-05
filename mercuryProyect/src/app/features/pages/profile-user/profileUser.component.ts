import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GetUserService } from '../../../shared/generalServices/get-user.service';
import { User } from '../../../auth/interfaces/user.interface';
import { EditProfileService } from '../../services/edit-profile.service';
import { NgIf } from '@angular/common';
import { LoadingComponent } from '../../../shared/generalComponents/loading/loading.component';
import { GetTokenService } from '../../../shared/generalServices/get-token.service';
import { UserAPIService } from '../../../API/user/user-api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, LoadingComponent],
  templateUrl: './profileUser.component.html'
})
export class ProfileUserComponent implements OnInit {
  profilePicture: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  token: any;
  currentUser: any;
  profileForm!: FormGroup; // Declarar el formulario sin inicializar
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;

  constructor(
    private userService: GetUserService,
    private editProfileService: EditProfileService,
    private fb: FormBuilder,
    private getToken: GetTokenService,
    private userAPIService: UserAPIService
  ) {
    this.token = this.getToken.getToken();
    this.getCurrentUser();
    
         this.profileForm = this.fb.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          birth: ['', Validators.required],
          country: ['', Validators.required],
          biography: ['', Validators.required],
          profile_picture: [''] 

        });
  }

  async ngOnInit(): Promise<void> {
   
  }

  // Método para obtener el usuario de la API
  getCurrentUser() {
    this.userAPIService.getUserById(this.token.sub).subscribe({
      next: (response) => {
        console.log("Usuario encontrado: ", response);
        this.currentUser = response;
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

  async editProfile() {
    if (this.profileForm.valid) {
      this.loadingComponent.showLoading();
      const updatedUser = this.profileForm.value;

      // Actualizar las propiedades del usuario actual
      this.currentUser.username = updatedUser.username;
      this.currentUser.email = updatedUser.email;
      this.currentUser.birth = updatedUser.birth;
      this.currentUser.country = updatedUser.country;
      this.currentUser.profile_picture = updatedUser.profile_picture;

      console.log("data:", updatedUser)
      console.log("token: ", this.token)


      try {
        await this.editProfileService.updateProfile(updatedUser, this.currentUser.id);
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

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../enviroments/enviroment';
import { User } from './../../auth/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserAPIService } from '../../API/user/user-api.service';
import { ArtistAPIService } from '../../API/artist/artist-api.service';


@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  private supabase: SupabaseClient;
  private USERS_STORAGE_KEY = enviroment.localStorageConfig.users.key
  private CURRENT_USER_STORAGE_KEY = enviroment.localStorageConfig.currentUser.key

  constructor(private userAPIService: UserAPIService,
              private artistAPIService: ArtistAPIService
  ) {
    this.supabase = createClient(
      enviroment.supabaseConfig.url,
      enviroment.supabaseConfig.apikey
    );
  }

  updateProfile(updatedUser: any, userId: string) {
      this.userAPIService.updateUser(updatedUser, userId).subscribe({
          next: (response) => {
            console.log("Perfil editado con exito: ", response)
          },
          error: (error) => {
            console.log("Error: ", error)
          }
      })
  }

  updateProfileArtist(updateArtist: any, artistId: string){
    this.artistAPIService.updateArtist(updateArtist, artistId).subscribe({
      next: (response) => {
        console.log("Perfil de Artista editado con exito: ", response)
      },
      error: (error) => {
        console.log("Error: ", error)
      }
  })
  }



  async editProfilePicture(newProfilePicture: File) {

    const bucket = enviroment.supabaseBucket.Users;
    const id = this.generateId()

    try {

      const { error: fileError } = await this.supabase.storage
        .from(bucket.name)
        .upload(`${bucket.profilePicture}/${id}/${newProfilePicture.name}`, newProfilePicture);

      if (fileError) throw fileError;


      console.log('Archivo y imagen subidos a Supabase correctamente.');
    } catch (error) {
      console.error('Error subiendo archivos a Supabase:', error);
    }

    const { data: profilePicture } = await this.supabase.storage
      .from(bucket.name)
      .getPublicUrl(`${bucket.profilePicture}/${id}/${newProfilePicture.name}`)

      return profilePicture.publicUrl

  }



  extractFileName(url: string): string | undefined {
    if (!url) {
      console.error('URL is undefined or null');
      return undefined;
    }

    const parts = url.split('/');
    const encodedFileName = parts.pop();

    if (!encodedFileName) {
      return undefined;
    }

    const decodedFileName = decodeURIComponent(encodedFileName);

    return decodedFileName;
  }

  private generateId(): string {
    return uuidv4();
  }


}

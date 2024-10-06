import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../enviroments/enviroment';
import { User } from './../../auth/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  private supabase: SupabaseClient;
  private USERS_STORAGE_KEY = enviroment.localStorageConfig.users.key
  private CURRENT_USER_STORAGE_KEY = enviroment.localStorageConfig.currentUser.key

  constructor() {
    this.supabase = createClient(
      enviroment.supabaseConfig.url,
      enviroment.supabaseConfig.apikey
    );
  }

  updateLocalStorage(updatedUser: any, userId: string) {
    const usersJson = localStorage.getItem(this.USERS_STORAGE_KEY);
    if (usersJson) {
      const users = JSON.parse(usersJson);

      const userIndex = users.findIndex((user: { id: string }) => user.id === userId);
      if (userIndex !== -1) {

        users[userIndex].userName = updatedUser.userName;
        users[userIndex].email = updatedUser.email;
        users[userIndex].dateOfBirth = updatedUser.dateOfBirth;
        users[userIndex].location = updatedUser.location;

        localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
      }
    }

    const userJson = localStorage.getItem(this.CURRENT_USER_STORAGE_KEY);
    if (userJson) {
      const currentUser = JSON.parse(userJson);
      if (currentUser.id === userId) {

        currentUser.userName = updatedUser.userName;
        currentUser.email = updatedUser.email;
        currentUser.dateOfBirth = updatedUser.dateOfBirth;
        currentUser.location = updatedUser.location;

        localStorage.setItem(this.CURRENT_USER_STORAGE_KEY, JSON.stringify(currentUser));
      }
    }
  }

  updateBiography(biography: string, id: string): void {
    const usersJson = localStorage.getItem(this.USERS_STORAGE_KEY);
    if (usersJson) {
      const users = JSON.parse(usersJson);
      const userIndex = users.findIndex((user: { id: string }) => user.id === id);
      if (userIndex !== -1) {

        users[userIndex].biography = biography;

        localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
      }
    }
  }

  getBiography(id: string) {
    const userJson = localStorage.getItem(this.USERS_STORAGE_KEY);
    let biography: string | null = null;

    if (userJson) {
      const users = JSON.parse(userJson);

      const currentUser = users.find((user: User) => user.id === id);

      if (currentUser) {
        return currentUser.biography;
      }
    }
  }


  async editProfilePicture(user: User, newProfilePicture: File, id: string) {

    const bucket = enviroment.supabaseBucket.Users;

    try {
      const nameImage = this.extractFileName(user.profilePicture!)
      const { error: audioError } = await this.supabase.storage
        .from(bucket.name).
        remove([`${bucket.profilePicture}/${id}/${nameImage}`]);

      if (audioError) {
        console.error('Error al eliminar el audio:', audioError);
      }


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

    const userJson = localStorage.getItem(this.CURRENT_USER_STORAGE_KEY);
    if (userJson) {
      const currentUser = JSON.parse(userJson);
      if (currentUser.id === id) {
        currentUser.profilePicture = profilePicture.publicUrl;
        localStorage.setItem(this.CURRENT_USER_STORAGE_KEY, JSON.stringify(currentUser));
      }
    }

    const usersJson = localStorage.getItem(this.USERS_STORAGE_KEY);
    if (usersJson) {
      const users = JSON.parse(usersJson);

      const userIndex = users.findIndex((user: { id: string }) => user.id === id);
      if (userIndex !== -1) {
        users[userIndex].profilePicture = profilePicture.publicUrl;
        localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
      }
    }


  }

  async getProfilePictureSupabase(id: string): Promise<string | null> {
    const bucket = enviroment.supabaseBucket.Users;
    const userJson = localStorage.getItem(this.USERS_STORAGE_KEY);
    let profilePicture: string | null = null;

    if (userJson) {
      const users = JSON.parse(userJson);

      const currentUser = users.find((user: User) => user.id === id);

      if (currentUser) {
        profilePicture = this.extractFileName(currentUser.profilePicture)!;
      }
    }

    if (profilePicture) {
      const { data } = this.supabase.storage.from(bucket.name).getPublicUrl(`profilePicture/${id}/${profilePicture}`);

      return data.publicUrl;
    }

    return null;
  }

  getLocationLocalStorage(id: string) {
    const userJson = localStorage.getItem(this.USERS_STORAGE_KEY);
    let location: string | null = null;

    if (userJson) {
      const users = JSON.parse(userJson);
      const currentUser = users.find((user: User) => user.id === id);

      if (currentUser) {
        location = currentUser.location;
      }
    }

    return location
  }

  getUserOfUsersLocalStorage(idUser: string) {
    const users = localStorage.getItem(this.USERS_STORAGE_KEY)
    if (users) {
      const allUsers = JSON.parse(users)
      const user = allUsers.find((user: User) => user.id === idUser)
      return user
    }
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



}

import { Injectable } from '@angular/core';
import { Artist, User } from '../../auth/interfaces/user.interface';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GetArtistsService {
  private readonly USER_STORAGE_KEY = enviroment.localStorageConfig.users.key

  constructor() { }

  getArtistsFilteredByInput(input: string): Artist[] {
    const usersData = localStorage.getItem(this.USER_STORAGE_KEY);
  
    if (usersData) {
      const allUsers: Artist[] = JSON.parse(usersData);
      const inputLowerCase = input.toLowerCase();
  
      const artists = allUsers.filter(user => user.role === 'artist');
  
      const getRelevance = (artist: Artist) => {
        const artistNameLowerCase = artist.userName.toLowerCase();
        
        if (artistNameLowerCase === inputLowerCase) {
          return 3; 
        } else if (artistNameLowerCase.startsWith(inputLowerCase)) {
          return 2; 
        } else if (artistNameLowerCase.includes(inputLowerCase)) {
          return 1;
        } else {
          return 0; 
        }
      };
      return artists
        .filter(artist => getRelevance(artist) > 0) 
        .sort((a, b) => getRelevance(b) - getRelevance(a));
    }
  
    return [];
  }

  getArtistById(idArtist: string): Artist | null {
    const userData = localStorage.getItem(this.USER_STORAGE_KEY);
  
    if (userData) {
      const users: Artist[] = JSON.parse(userData);
  
      const artists = users.filter(user => user.role === 'artist');
  
      const artist = artists.find(user => user.id === idArtist);
  
      return artist || null;
    }
  
    return null;
  }
  
    
  
  
  
  
}

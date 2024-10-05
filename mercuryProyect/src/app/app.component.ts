import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BurnedFilesService } from '../burnedFiles/burned-files.service';
import { Artist, User } from './auth/interfaces/user.interface';
import { Song } from './auth/interfaces/song.interface';
import { Album } from './auth/interfaces/album.interface';
import { songsOfArtist } from './auth/interfaces/idRelated.interface';
import { albumsOfArtist } from './auth/interfaces/idRelated.interface';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Mercury';
  constructor(private burnedFilesService: BurnedFilesService) {
    this.loadUsers(this.burnedFilesService.getBurnedUsers())
    this.loadArtists(this.burnedFilesService.getBurnedArtist())
    this.loadSongs(this.burnedFilesService.getBurnedSongs())
    this.loadAlbums(this.burnedFilesService.getBurnedAlbums())
    this.loadSongsOfArtist(this.burnedFilesService.getBurnedSongsArtist())
    this.loadAlbumsOfArtist(this.burnedFilesService.getBurnedAlbumsArtist())
  }


  loadUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  loadArtists(artists: Artist[]) {
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.concat(artists);
    localStorage.setItem('users', JSON.stringify(users));
  }

  loadSongs(songs: Song[]) {
    localStorage.setItem('songs', JSON.stringify(songs));
  }

  loadAlbums(albums: Album[]) {
    localStorage.setItem('albums', JSON.stringify(albums));
  }

  loadSongsOfArtist(songsArtist: songsOfArtist[]) {
    localStorage.setItem('songsArtist', JSON.stringify(songsArtist));
  }

  loadAlbumsOfArtist(albumsArtist: albumsOfArtist[]) {
    localStorage.setItem('albumsArtist', JSON.stringify(albumsArtist));
  }



}

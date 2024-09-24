import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { AlbumComponent } from './features/pages/album/album.component';
import { ArtistComponent } from './features/pages/artist/artist.component';
import { SongsArtistComponent } from './features/pages/songs-artist/songs-artist.component';
import { AlbumListComponent } from './shared/artistComponents/album-list/album-list.component';
import { CreateSongComponent } from './shared/artistComponents/create-song/create-song.component';
import { CreateAlbumComponent } from './shared/artistComponents/create-album/create-album.component';

export const routes: Routes = [
    { 
      path: 'login', component: LoginComponent 
    },
    { 
      path: 'sign-up', component: SignUpComponent
    },
    {
      path: 'home', component: HomeComponent, children: [   
        { path: 'profile', component: ProfileComponent },
        { path: 'album', component: AlbumComponent },
        { path: 'artist', component: ArtistComponent },
        { path: 'my-songs', component: SongsArtistComponent, children:[
          { path: 'my-albums', component: AlbumListComponent},
          { path: 'create-song', component: CreateSongComponent},
          { path: 'create-album', component: CreateAlbumComponent}
        ]},
        
      ]
    },
    { 
      path: '**', redirectTo: 'home', pathMatch: 'full'
    }
  ];
  
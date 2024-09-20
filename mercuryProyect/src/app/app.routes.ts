import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { MainComponent } from './features/pages/main/main.component';
import { AlbumComponent } from './features/pages/album/album.component';
import { ArtistComponent } from './features/pages/artist/artist.component';
import { SongsArtistComponent } from './features/pages/songs-artist/songs-artist.component';
import { AsideComponent } from './layout/components/aside/aside.component';
import { FooterComponent } from './layout/components/footer/footer.component';

export const routes: Routes = [
    { 
      path: 'login', component: LoginComponent 
    },
    { 
      path: 'sign-up', component: SignUpComponent
    },
    {
      path: '', component: HomeComponent, children: [   
        { path: 'profile', component: ProfileComponent },
        { path: 'album', component: AlbumComponent },
        { path: 'artist', component: ArtistComponent },
        { path: 'my-songs', component: SongsArtistComponent },
      ]
    },
    { 
      path: '', redirectTo: '', pathMatch: 'full' 
    },
    { 
      path: '**', redirectTo: '', pathMatch: 'full'
    }
  ];
  
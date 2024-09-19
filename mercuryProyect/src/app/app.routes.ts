import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { MainComponent } from './features/pages/main/main.component';
import { AlbumComponent } from './features/pages/album/album.component';
import { ArtistComponent } from './features/pages/artist/artist.component';

export const routes: Routes = [
    { 
        path: 'login', component: LoginComponent 
    },
    { 
        path: 'sign-up' ,component: SignUpComponent
    },
    {
        path: '', component: HomeComponent, children: [
            { path: '', component: MainComponent},
            { path: 'profile', component:ProfileComponent}, // Esto se enviará con el id del usuario profile/:id
            { path: 'album', component:AlbumComponent}, //Esto se enviará con el id del usuario album/:id
            { path: 'artist', component:ArtistComponent}
        ]
    },
    { 
        path: '', redirectTo: '', pathMatch: 'full' 
    },
    { 
        path: '**',redirectTo: '', pathMatch: 'full'
    }
    
];

import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { ProfileComponent } from './layout/components/profile/profile.component';
import { MainComponent } from './layout/components/main/main.component';

export const routes: Routes = [
    { 
        path: 'login', component: LoginComponent 
    },
    { 
        path: 'sign-up' ,component: SignUpComponent
    },
    {
        path: 'home', component: HomeComponent, children: [
            { path: '', component: MainComponent},
            { path: 'profile', component: ProfileComponent}
        ]
    },
    { 
        path: '', redirectTo: 'home', pathMatch: 'full' 
    },
    { 
        path: '**',redirectTo: 'home', pathMatch: 'full'
    }
    
];

import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { WelcomeComponent } from '../../../shared/generalComponents/welcome/welcome.component';
import { ActivateLaboratoryService } from '../../services/activate-laboratory.service';
import { AuthService } from '../../../API/auth/auth.service';
import * as jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLinkWithHref, RouterOutlet, WelcomeComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  protected userForm!: FormGroup;
  private userService = inject(UserService);
  constructor(
    private activateLaboratory: ActivateLaboratoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {

    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(42)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],

    })
  }

  login() {
    if (this.userForm.valid) {
      const email = this.userForm.get('email')?.value;
      const password = this.userForm.get('password')?.value;
  
      this.authService.login(email, password).subscribe({
        next: (response) => {
          const token = response.access_token;
          const decodedToken: any = jwtDecode.jwtDecode(token);
  
          this.cookieService.set('token', token);
  
          const role = decodedToken.role;
          const userId = decodedToken.sub;
  
          if (role === 'user') {
            this.router.navigate([`/home/${userId}`]);
            this.makeDecision(false);
          } else if (role === 'artist') {
            this.router.navigate([`/home/artist/${userId}`]);
            this.makeDecision(true);
          }
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'The form is not valid',
        icon: 'warning'
      });
    }
  }



  makeDecision(value: boolean) {
    this.activateLaboratory.setDecision(value);
  }



}

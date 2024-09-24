import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule , Validators,FormBuilder} from '@angular/forms';
import { Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';
import { WelcomeComponent } from '../../../static/welcome/welcome.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLinkWithHref,RouterOutlet, WelcomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected userForm!: FormGroup;
  private userService = inject(UserService);
  constructor(

    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.userForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email,Validators.maxLength(42)]],
      password: ['',[Validators.required,Validators.maxLength(20)]],

    })
  }
  login(){
    if(this.userForm.valid){
      const email = this.userForm.get('email')?.value;
      const password = this.userForm.get('password')?.value;
      if(this.userService.login(email,password) === 'hearer'){
        this.router.navigate(['/home']);
      }
      else if(this.userService.login(email,password) === 'artist'){
        Swal.fire({
          title: "You are an artist :) ",
          text: "Welcome to our platform",
          icon: "success",
        })
        return;
      }
      else{
        Swal.fire({
          title: "Error",
          text: "The user or password are not correct",
          icon: "warning"
        })
      }

    }
    else{
      Swal.fire({
        title: "Error",
        text: "The form is not valid",
        icon: "warning"
      })
    }
  }



}

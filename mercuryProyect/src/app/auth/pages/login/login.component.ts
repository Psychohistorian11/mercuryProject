import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule , Validators,FormBuilder} from '@angular/forms';
import { Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import {User} from './../../interfaces/user-register'
import Swal from 'sweetalert2';
import { WelcomeComponent } from '../../../static/welcome/welcome.component';
import { ActivateLaboratoryService } from '../../services/activate-laboratory.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLinkWithHref,RouterOutlet, WelcomeComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  protected userForm!: FormGroup;
  private userService = inject(UserService);
  constructor(
    private activateLaboratory : ActivateLaboratoryService,
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
      
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(user => user.email === email && user.password === password);
      
      if (user) {
        const userId: string = user.id;
        
        if (this.userService.login(email,password) === 'hearer') {
          this.router.navigate([`/home/${userId}`]);
          this.makeDecision(false);
        } else if (this.userService.login(email,password) === 'artist') {
          this.router.navigate([`/home/artist/${userId}`]);
          this.makeDecision(true);
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "The user or password are not correct",
          icon: "warning"
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "The form is not valid",
        icon: "warning"
      });
    }
  }
  

  makeDecision(value: boolean) {
    this.activateLaboratory.setDecision(value);
  }



}

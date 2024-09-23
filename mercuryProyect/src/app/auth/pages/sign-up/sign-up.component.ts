import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule , Validators,FormBuilder} from '@angular/forms';
import { Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user-register';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  protected userForm!: FormGroup;
  private userService = inject(UserService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      userName: ['',[Validators.required,Validators.maxLength(20)]],
      email: ['',[Validators.required,Validators.email,Validators.maxLength(42)]],
      password: ['',[Validators.required,Validators.maxLength(20)]],
      passwordValidation: ['',[Validators.required]]
    });
  }
  register() {
    if(this.userForm.invalid){
      Swal.fire({
        title: "Error",
        text: "The form is not valid",
        icon: "warning"
      })
    }
    if (this.userForm.get('password')?.value != this.userForm.get('passwordValidation')?.value) {
      Swal.fire({
        title: "Error",
        text: "The passwords are not equals",
        icon: "warning"
      });
      return;
    }
    else{
      const user: User = {
        userName: this.userForm.get('userName')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value
      }
      if (this.userService.register(user)) {
        this.router.navigate(['/login']);
      }
      else{
        Swal.fire({
          title: "Error",
          text: "The user name or email already exists",
          icon: "warning"
        })
      }
    }
  }

}

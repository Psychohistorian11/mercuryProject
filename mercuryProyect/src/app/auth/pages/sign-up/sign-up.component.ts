import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule , Validators,FormBuilder} from '@angular/forms';
import { Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLinkWithHref,RouterOutlet],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  protected userForm!: FormGroup;
  private userService = inject(UserService);
  maxDate: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.userForm = this.formBuilder.group({
      userName: ['',[Validators.required,Validators.maxLength(20)]],
      email: ['',[Validators.required,Validators.email,Validators.maxLength(42)]],
      password: ['',[Validators.required,Validators.maxLength(20)]],
      passwordValidation: ['',[Validators.required]],
      birthDate: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  register() {
    if(this.userForm.invalid){
      Swal.fire({
        title: "Error",
        text: "The form is not valid",
        icon: "warning"
      });
      return;
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
      const role = this.userForm.get('role')?.value;
      console.log(role);
      const user: User = {
        id: this.generateId(),
        userName: this.userForm.get('userName')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value,
        dateOfBirth: this.userForm.get('birthDate')?.value,
        role:   role === 'artista' ? 'artist' : 'hearer'
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

  private generateId(): string {
    return uuidv4();
  }

}

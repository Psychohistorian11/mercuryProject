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
  templateUrl: './sign-up.component.html'
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
    if(this.userForm.invalid) {
        if(this.userForm.get('userName')?.errors) {
            const userNameErrors = this.userForm.get('userName')?.errors;
            if(userNameErrors?.['required']) {
                Swal.fire({
                    title: "Error",
                    text: "Username is required.",
                    icon: "warning"
                });
            } else if(userNameErrors?.['minlength']) {
                Swal.fire({
                    title: "Error",
                    text: "Username must be at least 8 characters long.",
                    icon: "warning"
                });
            } else if(userNameErrors?.['maxlength']) {
                Swal.fire({
                    title: "Error",
                    text: "Username must not exceed 15 characters.",
                    icon: "warning"
                });
            } else if(userNameErrors?.['pattern']) {
                Swal.fire({
                    title: "Error",
                    text: "Username must start with a letter and cannot contain spaces or special characters.",
                    icon: "warning"
                });
            }
            return;
        }

        if(this.userForm.get('email')?.errors) {
            Swal.fire({
                title: "Error",
                text: "Please provide a valid email address.",
                icon: "warning"
            });
            return;
        }


        if(this.userForm.get('password')?.errors) {
            const passwordErrors = this.userForm.get('password')?.errors;
            if(passwordErrors?.['required']) {
                Swal.fire({
                    title: "Error",
                    text: "Password is required.",
                    icon: "warning"
                });
            } else if(passwordErrors?.['minlength']) {
                Swal.fire({
                    title: "Error",
                    text: "Password must be at least 12 characters long.",
                    icon: "warning"
                });
            } else if(passwordErrors?.['maxlength']) {
                Swal.fire({
                    title: "Error",
                    text: "Password must not exceed 20 characters.",
                    icon: "warning"
                });
            } else if(passwordErrors?.['pattern']) {
                Swal.fire({
                    title: "Error",
                    text: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                    icon: "warning"
                });
            }
            return; 
        }

        if (this.userForm.get('password')?.value !== this.userForm.get('passwordValidation')?.value) {
            Swal.fire({
                title: "Error",
                text: "The passwords are not equal.",
                icon: "warning"
            });
            return;
        }
    }

    const role = this.userForm.get('role')?.value;
    const user: User = {
        id: this.generateId(),
        userName: this.userForm.get('userName')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value,
        dateOfBirth: this.userForm.get('birthDate')?.value,
        role: role === 'artista' ? 'artist' : 'hearer'
    };

    if (this.userService.register(user)) {
        this.router.navigate(['/login']);
    } else {
        Swal.fire({
            title: "Error",
            text: "The username or email already exists.",
            icon: "warning"
        });
    }

    }

  private generateId(): string {
    return uuidv4();
  }

}

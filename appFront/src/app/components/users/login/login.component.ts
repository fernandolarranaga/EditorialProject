import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router,
    ) {

    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formulario.value)
      .then(data => {
        if (!data.error) {
          localStorage.setItem('token_songs', data.token);
          this.router.navigate(['/']);
        } else {
          console.error("Error durante el inicio de sesión:", data.error);
          // Puedes reiniciar el proceso de inicio de sesión aquí
          this.resetLoginForm();
        }
      })
      .catch(error => {
        console.error("Error inesperado durante el inicio de sesión:", error);
        // Puedes reiniciar el proceso de inicio de sesión aquí
        this.resetLoginForm();
      });
  }
  resetLoginForm() {
    // Aquí puedes reiniciar el formulario o tomar otras medidas según tus necesidades
    this.formulario.reset();
  }

}


  /* onSubmit() {
    this.userService.login(this.formulario.value)
      .then(data => {
        if(!data.error){
          localStorage.setItem('token_songs', data.token)
          this.router.navigate(['/projects'])
        }    
      })
  } */
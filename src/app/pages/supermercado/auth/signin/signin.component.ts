
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SigninUsuarioDto } from 'src/app/models/SigninUsuarioDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  nuevoUsuario: SigninUsuarioDto;
  nombre: string;
  username: string;
  password: string;
  email: string;
  errMsj: string;

  //validaciones
formGroup: FormGroup;



  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit() {

    this.checkInputs();
  }


  //===================== SEGURIDAD ======================
  //Desarrollado en el LoginGuard





//============= VALIDATORS FORM ==============

//Patrones
  /*PATTERN LETRAS MINUS/MAYUSC, NUMEROS, GUIONES MEDIO Y ESPACIOS [a-zA-Z0-9.-\s]+ */


  /* PATTERN  NUMEROS ENTEROS Y DECIMALES  /^[0-9]+\.?[0-9]*$/ VALIDAMOS CIFRAS Y DECIMAL CON step="0.01" */

 /* PATTERN  NUMEROS ENTEROS  [0-9]+ */

 /* PATTERN EMAIL ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$ */



checkInputs(){
  this.formGroup=new FormGroup({
    nombre:new FormControl(null,
      [Validators.required
     , Validators.minLength(3)
     , Validators.maxLength(50)
     , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
   ]),
   username:new FormControl(null,
    [Validators.required
   , Validators.minLength(3)
   , Validators.maxLength(50)
   , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
 ]),
 password:new FormControl(null,
  [Validators.required
 , Validators.minLength(3)
 , Validators.maxLength(50)
 , Validators.pattern(/[a-zA-Z0-9.-\s]+/)
]),
email:new FormControl(null,
  [Validators.required
 , Validators.minLength(3)
 , Validators.maxLength(50)
 , Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
]),

}
 );
}



get nombreForm(){
  return this.formGroup.get('nombre');
}
get usernameForm(){
  return this.formGroup.get('username');
}
get passwordForm(){
  return this.formGroup.get('password');
}
get emailForm(){
  return this.formGroup.get('email');
}

//======================== UTILIDADES ========================

refresh(){
  window.location.reload();
}




//======================== METODOS CRUD =========================


  onRegister(): void {

    this.nuevoUsuario = new SigninUsuarioDto(
      this.nombre,
      this.username,
      this.password,
      this.email,
    );


        this.authService.signin(this.nuevoUsuario).subscribe(
          data => {

          console.log('usuario registrado');

         this.toast.success({detail:"Operación Exitosa "
         ,summary:'Se ha registrado un nuevo Usuario!'
         , duration:2000});

         setTimeout(() => {
          this.router.navigate(['/login']);
         }, 2200);


      },
      err => {

        this.errMsj = err.error;

        console.log('MSJ:',this.errMsj);

        this.toast.error({detail:"Error",summary:this.errMsj, duration:2000});
      },
    );

  }

}

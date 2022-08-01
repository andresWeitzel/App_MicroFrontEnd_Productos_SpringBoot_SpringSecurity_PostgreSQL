import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginUsuarioDto } from 'src/app/models/LoginUsuarioDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  loginUsuarioDto : LoginUsuarioDto;
  username: string;
  password: string;
  errMsj: string;


  constructor(
    private tokenService: TokenService,
    private authService : AuthService,
    private router: Router,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService
  ) {

  }

  ngOnInit(){

  }


  //===================== SEGURIDAD ======================
  //Desarrollado en el LoginGuard



  redirectPage() : void{
         //SPIN LOADING
         this.ngxService.start();
         setTimeout(() => {
           this.ngxService.stop();
         }, 300);
         //FIN SPIN LOADING

  this.router.navigate(['/inicio']);
  }


  onLogin(): void {

        //SPIN LOADING
        this.ngxService.start();
        setTimeout(() => {
          this.ngxService.stop();
        }, 300);
        //FIN SPIN LOADING


        //LOGIN AND TOASTS
        setTimeout(() => {
          this.loginUsuarioDto = new LoginUsuarioDto(this.username, this.password);
          this.authService.login(this.loginUsuarioDto).subscribe(
            data => {



        this.router.navigate(['/inicio']);


        setTimeout(() => {

          this.toast.success({detail:"Credenciales Válidas",summary:'Bienvenido/a!', duration:1400});

          window.setTimeout(function(){location.reload()},1500)

          console.log('logueado');


         }, 600);
      },

      err => {

        this.errMsj = err.error.message;

          //SPIN LOADING
          this.ngxService.start();
          setTimeout(() => {
            this.ngxService.stop();
          }, 100);
          //FIN SPIN LOADING

          //TOAST ERROR
      setTimeout(() => {
        this.toast.error({detail:"ERROR",summary:this.errMsj , duration:2000});
      }, 600);
      //FIN TOAST ERROR

        console.log(this.errMsj);
      },
    );
  }, 600);
  //FIN LOGIN AND TOASTS
  }

}



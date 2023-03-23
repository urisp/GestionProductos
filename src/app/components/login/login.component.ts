import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SouterUsuarioService } from 'src/app/services/souter-usuario-service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/interfaces/usuario-model';
declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit{
  loginForm=new FormGroup({
    usuario:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  
  constructor(private userService:SouterUsuarioService) { }
  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "485155853739-t6rjbs9bemu9gd2aaauad3cbdn8p29vl.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
  }

  ngOnInit(): void {}
    
    handleCredentialResponse(response:any) {
    console.log(response);
    if(response.credential){
    sessionStorage.setItem("token",response.credential);
    document.location.href="/productos";
    }
  }

  onSubmit(){}
  }
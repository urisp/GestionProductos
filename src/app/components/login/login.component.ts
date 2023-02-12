import { Component, OnInit } from '@angular/core';
import { SouterUsuarioService } from 'src/app/services/souter-usuario-service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/interfaces/usuario-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm=new FormGroup({
    usuario:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  constructor(private userService:SouterUsuarioService) { }
  ngOnInit(): void { }
  onSubmit(){}
  }
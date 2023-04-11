import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { UsuarioModel } from '../interfaces/usuario-model';
import { ResponseModel } from '../interfaces/response-model';

@Injectable({
    providedIn: 'root',
})

export class SouterUsuarioService {
    apiURl = 'https://www.souter.somee.com/api';
    constructor(private http: HttpClient) { }
    // Obtiene todos los usuarios
    getUsuarios(): Observable<any> {
        return this.http.get(`${this.apiURl}/usuarios`);
    }
    // Obtiene un usuario por su id
    getUsuario(id:any): Observable<any> {
        return this.http.get(`${this.apiURl}/usuarios/${id}`);
    }
    // Crea un usuario
    createUsuario(data: any): Observable<any> {
        return this.http.post(`${this.apiURl}/usuarios`, data);
    }
    // Actualiza un usuario
    updateUsuario(data:any): Observable<any> {
        return this.http.put(`${this.apiURl}/usuarios`, data);
    }
    // Elimina un usuario
    deleteUsuario(id: number): Observable<any> {
        return this.http.delete(`${this.apiURl}/usuarios/${id}`);
    }
}
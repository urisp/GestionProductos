import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SouterPermisos {
    constructor() {}
    public getAutenticacionByToken(){
        return sessionStorage.getItem("token");
    }
    public limpiarToken(){
        return sessionStorage.setItem("token",'');
    }
}
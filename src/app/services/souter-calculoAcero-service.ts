import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SouterCalculoAceroService {
    apiURl = 'http://www.souter.somee.com/api';
    constructor(private http: HttpClient) { }
    // Obtiene todos los productos de calculos de acero
    getCalculoAceros(): Observable<any> {
        return this.http.get(`${this.apiURl}/calculoAcero`);
    }
    // Obtiene los productos de calculo de acero por su id
    getCalculoAcero(id: number): Observable<any> {
        return this.http.get(`${this.apiURl}/calculoAcero/${id}`);
    }
    // Crea un calculo de acero
    createCalculoAcero(data: any): Observable<any> {
        return this.http.post(`${this.apiURl}/calculoAcero`, data);
    }
    // Actualiza un calculo de acero
    updateCalculoAcero(data:any): Observable<any> {
        return this.http.put(`${this.apiURl}/calculoAcero`, data);
    }
    // Elimina un calculo de acero
    deleteCalculoAcero(id: number): Observable<any> {
        return this.http.delete(`${this.apiURl}/calculoAcero/${id}`);
    }
    public get (url:string)
    {
        return this.http.get(url);
    }
}
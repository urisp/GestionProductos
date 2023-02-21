import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SouterPermisos } from "./souter-autenticacion-service";

@Injectable({
    providedIn: 'root'
})

export class SouterPermisosService implements CanActivate{
    constructor(private router:Router,private autenticacionPrd:SouterPermisos) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(!Boolean(this.autenticacionPrd.getAutenticacionByToken())){
            return this.router.parseUrl("/login");
        }
        return Boolean(this.autenticacionPrd.getAutenticacionByToken());
    }
}
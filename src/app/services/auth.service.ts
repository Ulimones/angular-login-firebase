import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url='https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey='AIzaSyCGQKL88t3kzpWTOKwgoeNTxC_iBs2L1M8';
  userToken:string;

  constructor(private http:HttpClient) { 
    this.leerToken();
  }


  logout(){
    localStorage.removeItem('token');
  }


  
  login(usuario:UsuarioModel){
    const authData={
      // email: usuario.email,
      // password: usuario.password,
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`,
    authData).pipe(
      map(resp=>{
        console.log('Entró en el mapa del rxjs')
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }


  registro(usuario:UsuarioModel){
    const authData={
      // email: usuario.email,
      // password: usuario.password,
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`,
    authData).pipe(
      map(resp=>{
        console.log('Entró en el mapa del rxjs')
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }



  private guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token',idToken);

    let hoy = new Date();
    hoy.setSeconds(3000);

    localStorage.setItem('expira',hoy.getTime().toString());
  }



  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    }else{
      this.userToken= '';
    }
  }


  estaAutenticado():boolean {

    if(this.userToken.length <2){
      return false;
    }

    const expira= Number(localStorage.getItem('expira'));
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(expira);

    if(fechaExpiracion> new Date()){
      return true;
    }else{
      return false;
    }
  }


}

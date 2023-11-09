import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private httpClient: HttpClient) { }

  public get usuario(): Usuario{
    if (this._usuario != null) {
      return this._usuario;
    }else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if (this._token != null) {
      return this._token;
    }else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any>{
    //produccion
    const urlEndpoint = 'https://app-agrogram-86e5d7708bf3.herokuapp.com/oauth/token';

    //local
    //const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciales = window.btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales})

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.contrasena);
    return this.httpClient.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  guardarUsuario(accessToken: string): void{
    let payload = this.getDecodedAccessToken(accessToken);
    this._usuario = new Usuario;
    this._usuario.idUsuario = payload.id
    this._usuario.nombreUsuario = payload.nombre;
    this._usuario.email = payload.email;
    this._usuario.imagen = payload.imagen;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  getDecodedAccessToken(accessToken: string): any {
    try {
      return jwtDecode(accessToken);
    } catch(Error) {
      return null;
    }
  }

  guardarToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  isAuthenticated(): boolean{
    let payload = this.getDecodedAccessToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean{
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
}

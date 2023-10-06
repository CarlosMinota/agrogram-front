import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = environment.urlEndPoint+'usuario';

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<any> {
    return this.httpClient.get(`${this.url}`);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post(`${this.url}`, usuario).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(err => {
        if (err.status == 400) {
          return throwError(() => err);
        }

        if (err.status != 401 && err.error.mensaje) {
          return throwError(() => err);
        }

        return throwError(() => err);
      })
    );
  }

  getUsuario(idUsuario: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${idUsuario}`).pipe(
      catchError(err => {
        if (err.status != 401 && err.error.mensaje) {
          console.error(err.error.mensaje)
        }
        return throwError(() => err)
      })
    );
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${usuario.idUsuario}`, usuario).pipe(
      catchError(err => {
        if (err.status == 400) {
          return throwError(() => err)
        }

        if (err.status != 401 && err.error.mensaje) {
          console.error(err.error.mensaje)
        }

        return throwError(() => err);
      })
    )
  }

  deleteUsuario(idUsuario: number): Observable<Usuario> {
    return this.httpClient.delete<Usuario>(`${this.url}/${idUsuario}`).pipe(
      catchError(err => {
        if (err.status != 401 && err.error.mensaje) {
          console.error(err.error.mensaje)
        }
        
        return throwError(() => err);
      })
    )
  }

  subirFoto(archivo: File, idUsuario): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('idUsuario', idUsuario);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  getDepartamentos(): Observable<any> {
    return this.httpClient.get(`${this.url}/departamento`)
  }

  getCiudadesDepartamento(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/ciudades-departamento/${id}`)
  }
}

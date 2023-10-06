import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Productos } from '../models/productos';
import { ProductoDto } from '../models/productoDto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = environment.urlEndPoint+'producto'

  constructor(private httpClient: HttpClient) { }

  getProductos(): Observable<any> {
    return this.httpClient.get(`${this.url}`);
  }

  crearProducto(producto: ProductoDto): Observable<ProductoDto> {
    return this.httpClient.post(`${this.url}`, producto).pipe(
      map((response: any) => response as ProductoDto),
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

  getProducto(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`).pipe(
      catchError(err => {
        if (err.status != 401 && err.error.mensaje) {
          console.error(err.error.mensaje)
        }
        return throwError(() => err)
      })
    );
  }

  updateProducto(producto: Productos): Observable<Productos> {
    return this.httpClient.put<Productos>(`${this.url}/${producto.idProducto}`, producto).pipe(
      catchError(err => {
        if (err.status == 400) {
          return throwError(() => err)
        }

        if (err.status != 401 && err.error.mensaje) {
          console.error(err.error.mensaje)
        }

        return throwError(() => err);
      })
    );
  }

  deleteProducto(id: number): Observable<Productos> {
    return this.httpClient.delete<Productos>(`${this.url}/${id}`).pipe(
      catchError(err => {
        if (err.status != 401 && err.error.mensaje) {
          console.error(err.error.mensaje)
        }
        
        return throwError(() => err);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData);

    return this.httpClient.request(req);
  }

  getCategorias(): Observable<any> {
    return this.httpClient.get(`${this.url}/categoria`)
  }

  getPresentacionProductos(): Observable<any> {
    return this.httpClient.get(`${this.url}/presentacion-producto`)
  }
}

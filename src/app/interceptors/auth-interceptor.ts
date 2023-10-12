import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      return next.handle(req).pipe(
        catchError(e => {
          if (e.status == 401) {
            Swal.fire('Atención', 'Necesitas estar auntenticado!', 'warning');
            if (this.authService.isAuthenticated()) {
              this.authService.logout();
            }
      
            this.router.navigate(['/auth/login']);
          }
          if (e.status == 403) {
            Swal.fire('Acceso denegado',
            `Hola ${this.authService.usuario.username} no tienes acceso a este recsurso`,
            'warning');
            this.router.navigate(['/clientes']);
          }
          return throwError(() => e);
        })
      );
  }
}
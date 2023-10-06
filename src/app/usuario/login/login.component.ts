import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NotifierModule, RouterModule]
})
export class LoginComponent {

  public usuario: Usuario;
  private notifier: NotifierService;


  constructor(private authService: AuthService,
    private router: Router,
    notifier: NotifierService) {
    this.usuario = new Usuario();
    this.notifier = notifier;
  }

  public login(): void {
    if (this.usuario.username == null || this.usuario.contrasena == null) {
      this.showNotification('error', 'Usario o contraseña vacías');
      return;
    }
    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        if (err.status == 400) {
          this.showNotification('error', 'Usuario o contraseña incorrectos');
        }
      }
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}

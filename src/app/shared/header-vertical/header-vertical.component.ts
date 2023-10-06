import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-vertical',
  templateUrl: './header-vertical.component.html',
  standalone: true,
  imports: [
    NgScrollbarModule,
    NgbDropdownModule, 
    CommonModule,
    RouterModule
  ],
})
export class HeaderVerticalComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public url = environment.urlImagenUsuario;
  public noImagen = environment.urlNoImagenUsuario;

  constructor(public authService: AuthService,
    private router: Router){}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngAfterViewInit() {}
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-horizontal',
  templateUrl: './header-horizontal.component.html',
  standalone: true,
  imports: [
    NgScrollbarModule,
    FeatherModule,
    CommonModule,
    NgbDropdownModule,
    RouterModule
  ],
})
export class HeaderHorizontalComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public isCollapsed = false;
  public showMobileMenu = false;

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

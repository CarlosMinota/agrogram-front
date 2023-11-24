import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { environment } from 'src/app/environments/environment';
import { FormModule } from 'src/app/form/forms.module';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioDto } from 'src/app/models/usuarioDto';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-vertical',
  templateUrl: './header-vertical.component.html',
  standalone: true,
  imports: [
    NgScrollbarModule,
    NgbDropdownModule,
    CommonModule,
    RouterModule,
    NotifierModule,
    FormModule,
    ReactiveFormsModule
  ],
})
export class HeaderVerticalComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public url = environment.urlImagenUsuario;
  public noImagen = environment.urlNoImagenUsuario;
  public notifier: NotifierService;
  public usuario: Usuario;
  public usuarioForm: UsuarioDto;
  public submitted: boolean = false;
  public mensaje: string = 'El campo es requerido';
  public mensajeContrasenaMin: string = 'La contraseña debe ser mayor a 5 caracteres';
  public mensajeContrasenaMax: string = 'La contraseña no debe exceder los 16 caracteres';
  public mensajeUsernameMin: string = 'El nombre de usuario debe ser mayor a 3 caracteres';
  public mensajeUsernameMax: string = 'El nombre de usuario no debe exceder los 40 caracteres';

  constructor(public authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    notifier: NotifierService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private fb: UntypedFormBuilder,) {
    this.notifier = notifier;
  }

  form: FormGroup = new FormGroup({
    nombreUsuario: new FormControl(''),
    username: new FormControl(''),
    contrasena: new FormControl(''),
  });

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]
      ],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]
      ],
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  public editarUsuario(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.usuarioService.updateUsuario(this.usuarioForm).subscribe(response => {
      this.showNotification('success', response.mensaje);
    })
    window.location.reload();
  }

  public eliminarUsuario(usuario: Usuario): void {
    this.usuarioService.getUsuario(this.authService.usuario.idUsuario).subscribe(response => {
      usuario = response.usuario;
    })
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar su perfil?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(usuario.idUsuario).subscribe(
          response => {
            this.authService.logout();
            this.router.navigate(['/usuarios']);
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          `Su perfil no se ha eliminado`,
          'error'
        );
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  modalOpenRegiser(modalRegiser: any) {
    this.usuarioService.getUsuario(this.authService.usuario.idUsuario).subscribe(response => {
      this.usuarioForm = response.usuario;
    })
    this.modalService.open(modalRegiser);
  }

  ngAfterViewInit() { }
}

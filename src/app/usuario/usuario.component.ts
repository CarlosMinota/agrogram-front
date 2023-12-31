import { Component } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../environments/environment';
import { UsuarioService } from '../services/usuario.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioPipe } from '../pipes/usuario.pipe';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, UsuarioPipe]
})
export class UsuarioComponent {

  public usuarios: Usuario[];
  public usuariosFiltrados: string;
  public url = environment.urlImagenUsuario;
  public noImagen = environment.urlNoImagenUsuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(response => {
      this.usuarios = response as Usuario[];
    })
  }
}

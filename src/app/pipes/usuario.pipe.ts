import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Pipe({
  name: 'usuarioPipe',
  standalone: true,
})
export class UsuarioPipe implements PipeTransform {

  private usuariosFiltrados: Usuario[];
  private usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  transform(value: any, ...arg: any): any {
    if (arg != '' || arg == undefined) {
      this.usuarioService.filtrarUsuarios(arg).subscribe(response => {
        this.usuariosFiltrados = response as Usuario[];
      });
      return this.usuariosFiltrados;
    } else {
      this.usuarioService.getUsuarios().subscribe(response => {
        this.usuarios = response as Usuario[];
      })
      return this.usuarios;
    }
  }

}

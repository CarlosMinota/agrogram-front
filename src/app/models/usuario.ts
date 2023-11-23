import { Ciudad } from "./ciudad";
import { Producto } from "./producto";
import { TipoUsuario } from "./tipo-usuario";

export class Usuario {
    idUsuario: number;
    nombreUsuario: string;
    telefono: string;
    estadoUsuario: boolean;
    email: string;
    contrasena: string;
    username: string;
    imagen: string;
    ciudad: Ciudad;
    tipoUsuario: TipoUsuario;
    productos: Array<Producto> = [];
    roles: string[] = [];
}

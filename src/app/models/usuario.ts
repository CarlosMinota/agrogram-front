import { Ciudad } from "./ciudad";
import { Producto } from "./producto";

export class Usuario {
    idUsuario: number;
    nombreUsuario: string;
    telefono: string;
    estadoUsuario: boolean;
    email: string;
    cedula: string;
    contrasena: string;
    username: string;
    imagen: string;
    ciudad: Ciudad;
    productos: Array<Producto> = [];
    roles: string[] = [];
}

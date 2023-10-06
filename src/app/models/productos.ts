import { Categoria } from "./categoria";
import { ImagenProducto } from "./imagen-producto";
import { PresentacionProducto } from "./presentacion-producto";
import { Usuario } from "./usuario";

export class Productos {
    idProducto: number;
    nombreProducto: string;
    precio: number;
    estadoProducto: boolean;
    infoProduccion: string;
    descripcion: string;
    categoria: Categoria;
    usuario: Usuario;
    presentacionProducto: PresentacionProducto;
    imagenes: Array<ImagenProducto> = [];
}

import { Producto } from "./producto";

export class Categoria {
    idCategoria: number;
    nombreCategoria: string;
    productos: Array<Producto> = [];
}
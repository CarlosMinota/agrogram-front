import { Productos } from "./productos";

export class Categoria {
    idCategoria: number;
    nombreCategoria: string;
    productos: Array<Productos> = [];
}
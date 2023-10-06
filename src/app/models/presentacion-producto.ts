import { Productos } from "./productos";

export class PresentacionProducto {
    idPresentacion: number;
    tipoPresentacion: string;
    unidadOrden: string;
    prodcutos: Array<Productos> = [];
}

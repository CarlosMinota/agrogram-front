import { Producto } from "./producto";

export class PresentacionProducto {
    idPresentacion: number;
    tipoPresentacion: string;
    unidadOrden: string;
    prodcutos: Array<Producto> = [];
}

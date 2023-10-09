import { Routes } from "@angular/router";
import { ProductosComponent } from "./productos.component";
import { DetalleProductoComponent } from "./detalle-producto/detalle-producto.component";
import { FormProductoComponent } from "./form-producto/form-producto.component";

export const ProductosRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ProductosComponent,
                data: {
                    title: 'Productos',
                    urls: [
                        {title: 'Productos', url: '/productos'}
                    ]
                }
            },
            {
                path: 'detalle-producto/:id',
                component: DetalleProductoComponent,
                data: {
                    title: 'Detalle del producto',
                    urls: [
                        {title: 'Productos', url: '/productos'},
                        {title: 'Detalle del producto'}
                    ]
                }
            },
            {
                path: 'form-producto',
                component: FormProductoComponent,
                data: {
                    title: 'Registrar un nuevo producto',
                    urls: [
                        {title: 'Productos', url: '/productos'},
                        {title:'Registrar un nuevo producto'}
                    ]
                }
            }
        ]
    }
]
import { Routes } from "@angular/router";
import { UsuarioComponent } from "./usuario.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { PerfilComponent } from "./perfil/perfil.component";

export const UsuarioRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: UsuarioComponent,
                data: {
                    title: 'Campesinos',
                    urls: [
                        { title: 'Campesinos', url: '/usuarios' }
                    ]
                }
            },
            {
                path: 'detalle-perfil/:id',
                component: PerfilComponent,
                data: {
                    title: 'Detalle perfil de usuario',
                    urls: [
                        { title: 'Campesinos', url: '/usuarios' },
                        { title: 'Detalle perfil' }
                    ]
                }

            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            }
        ]
    }
]
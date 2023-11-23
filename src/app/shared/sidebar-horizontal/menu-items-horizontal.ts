import { RouteInfo } from "./sidebar-horizontal";


export const ROUTES: RouteInfo[] = [
    {
        path: "/home",
        title: "Inicio",
        icon: "home",
        class: "",
        ddclass: "",
        extralink: false,
        submenu: []
    },
    {
        path: "/usuarios",
        title: "Productores",
        icon: "Users",
        class: "",
        ddclass: "",
        extralink: false,
        submenu: [],
    },
    {
        path: "/productos",
        title: "Productos",
        icon: "fas fa-shopping-basket",
        class: "",
        ddclass: "",
        extralink: false,
        submenu: [],
    },
];

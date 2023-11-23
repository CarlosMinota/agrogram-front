import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "AGROGRAM",
    icon: "mdi mdi-dots-horizontal",
    class: "nav-small-cap",
    extralink: true,
    label: "",
    labelClass: "",
    submenu: [],
  },
  {
    path: "/home",
    title: "Inicio",
    icon: "Home",
    class: "",
    label: "",
    labelClass: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/usuarios",
    title: "Productores",
    icon: "Users",
    class: "",
    label: "",
    labelClass: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/productos",
    title: "Productos",
    icon: "fas fa-shopping-basket",
    class: "",
    label: "",
    labelClass: "",
    extralink: false,
    submenu: [],
  },
];

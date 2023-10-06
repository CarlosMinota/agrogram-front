import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';


@Injectable({
    providedIn: 'root'
})
export class VerticalSidebarService {

    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUITEMS: RouteInfo[] = ROUTES;

    items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);

    constructor() {
    }
}

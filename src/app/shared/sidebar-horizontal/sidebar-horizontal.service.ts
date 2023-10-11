import { Injectable } from '@angular/core';
import { RouteInfo } from './sidebar-horizontal';
import { ROUTES } from './menu-items-horizontal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarHorizontalService {

  public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUITEMS: RouteInfo[] = ROUTES;

    items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);

    constructor() {
    }
}

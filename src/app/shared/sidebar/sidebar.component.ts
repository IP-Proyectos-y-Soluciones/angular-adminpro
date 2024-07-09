import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  menuItems: any[];

  constructor( private sidebarServive: SidebarService ) {
    this.menuItems = this.sidebarServive.menu;
    // console.log( this.menuItems );
  };
}

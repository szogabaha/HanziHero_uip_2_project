/*
File: headerbar.component.ts
author: Darian Krummrich
Shows panel when clicking on menu to navigate to settings / logging out
*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent {

  // Shows panel when clicking on menu to navigate to settings / logging out
  UnfoldMenu?: Boolean = false;

  onClickMenu(): void {
    this.UnfoldMenu = !this.UnfoldMenu;
  }

}

/************
// END of headerbar.component.ts
//************/

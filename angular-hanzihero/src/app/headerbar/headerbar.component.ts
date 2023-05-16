import { Component } from '@angular/core';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent {

  UnfoldMenu?: Boolean = false;

  onClickMenu(): void {
    this.UnfoldMenu = !this.UnfoldMenu;
  }

}

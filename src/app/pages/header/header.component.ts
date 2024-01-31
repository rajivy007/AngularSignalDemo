import { Component, Input, effect, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
changeHeader() {
  this.api.changeData.set("Header2");
}
  constructor(public api: ApiService) {
    effect(()=> {
      console.log("Louda lashan1");
      
      console.log("hhhhhhh",this.api.changeData())
    }
    )
  }
}

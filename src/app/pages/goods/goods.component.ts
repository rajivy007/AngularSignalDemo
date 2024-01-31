import { Component, effect } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.scss',
})
export class GoodsComponent {
  showfilteredRecord(records?: number) {
    if (records == 5) {
      this.api.getFilteredAndMappedRecord(5);
    } else {
      this.api.getFilteredAndMappedRecord();
    }
  }
  constructor(public api: ApiService) {
    this.api.getUserList();
  }

  addToCart() {
    this.api.addNewUser();
  }
  removeFromCart(data: number) {
    this.api.removeUser(data);
  }
}

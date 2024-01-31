import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
} from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrl: './bucket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BucketComponent {
  constructor(public api: ApiService, private cdr: ChangeDetectorRef) {
    effect(() => {
      console.log("Louda lashan2");
      if (this.api.usersCount())
        console.log(`The current count is: ${this.api.usersCount()}`);
      else console.log(`The current count is: ${this.api.users().length}`);
    });
  }
  getCD(): void {
    this.cdr.reattach();
  }
}

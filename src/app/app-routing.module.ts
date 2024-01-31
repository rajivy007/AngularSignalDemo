import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsComponent } from './pages/goods/goods.component';
import { BucketComponent } from './pages/bucket/bucket.component';

const routes: Routes = [
  {path:"",component:GoodsComponent},
  {path:"color",component:BucketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

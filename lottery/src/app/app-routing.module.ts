import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RangesComponent } from './ranges/ranges.component';
import { WinnersComponent } from './winners/winners.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ranges',
    pathMatch: 'full'
  }, {
    path: 'ranges',
    component: RangesComponent
  }, {
    path: 'winners',
    component: WinnersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

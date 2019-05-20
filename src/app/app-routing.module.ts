import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './pages/list/list.component';
import {DetailsComponent} from './pages/details/details.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: ListComponent},
  {path: 'planet/:id', component: DetailsComponent},
  {path: 'not-found', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

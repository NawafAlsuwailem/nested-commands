import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCommandComponent} from './command/add-command/add-command.component';

const routes: Routes = [
  {path: '', component: AddCommandComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

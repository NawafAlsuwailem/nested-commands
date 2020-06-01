import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommandComponent} from './command/command.component';
import {AddCommandComponent} from './command/add-command/add-command.component';

const routes: Routes = [
  {path: '', component: AddCommandComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

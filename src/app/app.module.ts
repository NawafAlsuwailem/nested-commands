import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommandComponent } from './command/command.component';
import {CommandService} from './command/service/command-service.service';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddCommandComponent } from './command/add-command/add-command.component';
// import { SubcommandComponent } from './command/subcommand/subcommand.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandComponent,
    AddCommandComponent,
    // SubcommandComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [CommandService],
  bootstrap: [AppComponent]
})
export class AppModule { }

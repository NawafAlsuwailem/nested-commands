import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {CommandService} from '../service/command-service.service';
import {Command, CommandForm} from '../_models';

@Component({
  selector: 'app-add-command',
  templateUrl: './add-command.component.html',
  styleUrls: ['./add-command.component.css']
})
export class AddCommandComponent implements OnInit {
  command: Command;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.command = new Command();

  }
  deleteSubCommand(index: number) {
    // this.commandFormService.deleteSubCommand(index);
  }

  OnAddCommandEvent(event) {
    this.command = event.value;
  }
}

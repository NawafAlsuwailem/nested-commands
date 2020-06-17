import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Command, CommandForm, Response} from './_models';
import {CommandService} from '../service/command.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit, OnDestroy {
  @Input() index: number;
  @Input() enableDeleteButton: boolean;
  @Output() updateCommandEvent: EventEmitter<{}> = new EventEmitter();
  @Output() deleteCommandEvent: EventEmitter<{}> = new EventEmitter();

  // renaming is required!!
  commandArray: FormArray;
  commandGroup: FormGroup;
  commandSub: Subscription;
  private commandBs: BehaviorSubject<FormGroup | undefined>;
  commandBs$: Observable<FormGroup>;
  command: Command;
  newCommand: Command;

  constructor(private fb: FormBuilder, private commandService: CommandService,  private location: Location) { }

  ngOnInit(): void {
    // add command
    this.command = new Command();
    this.command.response = new Response();
    this.commandBs = new BehaviorSubject(this.fb.group(new CommandForm(this.command)));
    this.commandBs$ = this.commandBs.asObservable();
    this.commandSub = this.commandBs$.subscribe(commandGroup => {
      this.commandGroup = commandGroup;
      this.commandArray = this.commandGroup.get('subcommands') as FormArray;
    });
    this.command = this.commandGroup.value;
    this.onChange();
  }
  ngOnDestroy(): void {
    this.commandSub.unsubscribe();
  }

  responseTextChange(value: string) {
    if (this.command.response  == null) {
      this.command.response = new Response();
    }
    this.command.response.text = value;
    this.commandGroup.controls['response'].setValue(value);
  }

  // newly created to direct parent
  addCommand() {
    this.newCommand = new Command();
    this.command.response = null;
    this.commandArray.push(
      this.fb.group(
        new CommandForm(this.newCommand)
      )
    );
    this.command.subcommands.push(this.newCommand);
    // this.update();
  }

  // parent to parent (uses add-command component)
  onUpdateCommandEvent(event) {
    this.command.text = this.commandGroup.get('text').value;
    this.command.subcommands[event.index] = event.value;
    this.update();
  }

  // child act on click
  deleteCommand(event) {
    const emitObj = {
      index: this.index,
    };
    this.deleteCommandEvent.emit(emitObj);
  }

  // parent responsibility
  onDeleteCommandEvent(event) {
    // remove object
    this.command.subcommands.splice(event.index, 1);
    // remove form
    this.commandArray.removeAt(event.index);
    this.update();
  }

  onUpdateEvent(event) {

  }

  update() {
    const emitObj = {
      index: this.index,
      value: this.command
    };
    this.updateCommandEvent.emit(emitObj);
  }

  onChange() {
    this.commandGroup.valueChanges.subscribe((command: Command) => {
      this.command.text = command.text;
      this.update();
    });
  }

  save() {
    // console.log(this.command);
    this.commandService.addCommand(this.command).subscribe(() => this.goBack());

    // console.log('Subcommand saved!');
    // console.log(this.parentCommandForm.value);
  }
  goBack(): void {
    this.location.back();
  }
}

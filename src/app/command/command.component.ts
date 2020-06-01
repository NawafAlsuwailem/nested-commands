import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {CommandService} from './service/command-service.service';
import {Command, CommandForm} from './_models';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit, OnDestroy {
  @Input() index: number;
  @Output() addCommandEvent: EventEmitter<{}> = new EventEmitter();

  commandArray: FormArray;
  commandGroup: FormGroup;
  commandSub: Subscription;
  private commandBs: BehaviorSubject<FormGroup | undefined>;
  commandBs$: Observable<FormGroup>;
  command: Command;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.command = new Command();
    this.commandBs = new BehaviorSubject(this.fb.group(new CommandForm(this.command)));
    this.commandBs$ = this.commandBs.asObservable();
    this.commandSub = this.commandBs$.subscribe(commandGroup => {
      this.commandGroup = commandGroup;
      this.commandArray = this.commandGroup.get('subcommands') as FormArray;
    });

    // this.myOnChange();

    this.command = this.commandGroup.value;
    this.myOnChange();
  }
  ngOnDestroy(): void {
    // this.commandFormSub.unsubscribe();
  }

  addCommand() {
    const newCommand = new Command();
    this.commandArray.push(
      this.fb.group(
            new CommandForm(newCommand)
          )
    );

    this.command.subcommands.push(newCommand);

    const emitObj = {
      index: this.index,
      value: this.commandGroup.value
    };


    this.addCommandEvent.emit(emitObj);

  }

  // deleteSubCommand(index: number) {
  //   this.commandFormService.deleteSubCommand(index);
  // }

  saveCommand() {
    // console.log('Subcommand saved!');
    // console.log(this.parentCommandForm.value);
  }

  OnAddCommandEvent(event) {

    this.command.id = this.commandGroup.get('id').value;
    this.command.text = this.commandGroup.get('text').value;
    this.command.type = this.commandGroup.get('type').value;
    this.command.response = this.commandGroup.get('response').value;

    this.command.subcommands[event.index] = event.value;
    const emitObj = {
          index: this.index,
          value: this.command
        };
    this.addCommandEvent.emit(emitObj);
  }

  myOnChange() {
    // this.commandSub = this.commandBs$.subscribe(commandGroup => {
    //   this.commandGroup = commandGroup;
    //   this.commandArray = this.commandGroup.get('subcommands') as FormArray;
    // });
    // this.command = this.commandGroup.value;
    // this.command.id = this.commandGroup.get('id').value;
    // this.command.text = this.commandGroup.get('text').value;
    // this.command.type = this.commandGroup.get('type').value;
    // this.command.response = this.commandGroup.get('response').value;
    //
    // const emitObj = {
    //   index: this.index,
    //   value: this.command
    // };
    // this.addCommandEvent.emit(emitObj);

    this.commandGroup.valueChanges.subscribe((command: Command) => {
      this.command.id = command.id;
      this.command.text = command.text;
      this.command.type = command.type;
    });



  }
}

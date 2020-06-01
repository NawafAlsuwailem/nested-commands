import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Command, CommandForm} from '../_models';
import {combineAll} from 'rxjs/operators';
// import {SubCommandForm} from '../subcommand/_models/subcommandForm';
// import {Subcommand} from '../subcommand/_models/subcommand';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private bsList: BehaviorSubject<FormGroup | undefined>[] = [];
  private commandGroup: BehaviorSubject<FormGroup | undefined> =
    new BehaviorSubject(this.fb.group(new CommandForm(new Command())));
  commandGroup$: Observable<FormGroup> = this.commandGroup.asObservable();
  index = 0;
  constructor(private fb: FormBuilder) {
    this.bsList.push(this.commandGroup);
    this.index++;
    // this.commandGroup.getValue().addControl('subcommands', new FormArray([]));
    // this.commandGroup.asObservable().subscribe(command => {
    // })
  }

  addCommand() {
    // const currentMainCommand = this.commandGroup.getValue();
    // const currentSubcommandList = currentMainCommand.get('subcommands') as FormArray;
    // currentSubcommandList.push(
    //   this.fb.group(
    //     new CommandForm(new Command())
    //   )
    // );
    // this.commandGroup.next(currentMainCommand);
    // console.log(this.commandGroup.value);

    this.bsList.push(new BehaviorSubject(this.fb.group(new CommandForm(new Command()))));
    this.index ++;
    // const currentSubcommandList = currentMainCommand.get('subcommands');
    // console.log(currentMainCommand);
  }

  updateCommand(parentIndex: number, childIndex: number, command: Command) {
    // retrieve last index of list
    // const currentMainCommand = this.commandGroup.getValue();
    // const currentSubcommandList = currentMainCommand.get('subcommands') as FormArray;
    // // console.log(currentSubcommandList.at(i));
    // // retireve object
    // const currentSubCommand = currentSubcommandList.at(i).get('subcommands') as FormArray;
    // currentSubCommand.push(
    //   this.fb.group(
    //   new CommandForm(new Command())
    // ));
    // console.log(typeof currentSubCommand);
    // this.commandGroup.next(currentMainCommand);

    // this.commandForm.next(currentMainCommand);
    // console.log(this.commandForm.value);

    const currentSubCommand = this.bsList[parentIndex].getValue().get('subcommands') as FormArray;
    currentSubCommand.insert(
      childIndex,
      this.fb.group(
      new CommandForm(command)
    ));
  }

  deleteSubCommand(i: number) {
    const currentMainCommand = this.commandGroup.getValue();
    const currentSubcommandList = currentMainCommand.get('subcommands') as FormArray;
    currentSubcommandList.removeAt(i);
    this.commandGroup.next(currentMainCommand);
  }
}

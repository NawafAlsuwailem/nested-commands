import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Command} from './command';
import {BehaviorSubject} from 'rxjs';

export class CommandForm {
  id = new FormControl();
  text = new FormControl();
  type = new FormControl();
  response = new FormControl();
  // subcommands: BehaviorSubject<FormGroup | undefined> =
  //   new BehaviorSubject( new FormBuilder().group(null));

  // subcommands = new FormGroup([]);
  subcommands = new FormArray([]);
  constructor(command: Command) {
    if (command.id) {
      this.id.setValue(command.id);
      // this.id.setValidators([Validators.required]);
    }
    if (command.text) {
      this.text.setValue(command.text);
      // this.text.setValidators([Validators.required]);
    }
    if (command.type) {
      this.type.setValue(command.type);
      // this.type.setValidators([Validators.required]);
    }
    if (command.response) {
      this.response.setValue(command.response);
    }
    if (command.subcommands) {
      this.subcommands.setValue(command.subcommands);
    }


  }
}

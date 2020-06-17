import {FormArray, FormControl, Validators} from '@angular/forms';
import {Command} from './command';

export class CommandForm {
  text = new FormControl();
  response = new FormControl();
  subcommands = new FormArray([]);
  constructor(command: Command) {
    if (command.text) {
      this.text.setValue(command.text);
      this.text.setValidators([Validators.required]);
    }
    if (command.response) {
      this.response.setValue(command.response);
    }
    if (command.subcommands) {
      this.subcommands.setValue(command.subcommands);
    }
  }
}

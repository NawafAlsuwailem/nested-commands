import {Component, OnInit} from '@angular/core';
import {Command, Response} from '../_models';

@Component({
  selector: 'app-add-command',
  templateUrl: './add-command.component.html',
  styleUrls: ['./add-command.component.css']
})
export class AddCommandComponent implements OnInit {
  command: Command;
  constructor() { }

  ngOnInit(): void {
      this.command = new Command();
      this.command.response = new Response();
  }
  onUpdateCommandEvent(event) {
    this.command = event.value;
  }
}

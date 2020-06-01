import {Response} from './response';
// import {Subcommand} from '../subcommand/_models/subcommand';

export class Command {
  id: string;
  text: string;
  type: string;
  response: Response;
  subcommands: Command[];

  constructor(
    id?: string,
    text?: string,
    type?: string,
    response?: Response,
    subcommands?: Command[],
  ) {
    this.id = id;
    this.text = text;
    this.type = type;
    this.response = response;
    this.subcommands = subcommands;
  }
}

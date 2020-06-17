import {Response} from './response';

export class Command {
  text: string;
  type: string;
  response: Response;
  subcommands: Command[];

  constructor(
    text?: string,
    type?: string,
    response?: Response,
    subcommands?: Command[],
  ) {
    this.text = text;
    this.type = type;
    this.response = response;
    this.subcommands = subcommands;
  }
}

export class Response {
  id: string;
  text: string;
  constructor(
    id?: string,
    text?: string,
  ) {
    this.id = id;
    this.text = text;
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Command} from '../command/_models';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {log} from 'util';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private readonly BASE_URL = environment.serverURL;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }
  /** GET commands from the server */
  findAll(): Observable<Command[]> {
    return this.http.get<Command[]>(this.BASE_URL);
  }
  /** GET command by id. Will 404 if id not found */
  findCommand(id: string): Observable<Command> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<Command>(url);
  }
  /** POST: add a new command to the server */
  addCommand(command: Command): Observable<any> {
    console.log(command);
    return this.http.post(
      this.BASE_URL,
      command,
      { headers: this.headers });
  }
  // /** PUT: update the command on the server */
  // updateCommand(newCommand: Command): Observable<Command> {
  //   // @ts-ignore
  //   return this.http.put(`${this.BASE_URL}`,
  //     newCommand,
  //     {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'});
  // }

  // /** DELETE: delete the command from the server */
  // deleteCommand(command: Command) {
  //   if (confirm('Are you sure to delete?')) {
  //     const url = `${this.BASE_URL}/${command.id}`;
  //     // console.log(command);
  //     const options = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //       }),
  //       body: command,
  //       responseType: 'text' as 'json'
  //     };
  //     return this.http.delete(url, options);
  //   }
  //   return of({});
  // }
}

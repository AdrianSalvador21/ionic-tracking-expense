import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor( private http: HttpClient ) { }

  getMenuOpts() {
    return this.http.get<any[]>('/assets/data/menu-opts.json');
  }

}

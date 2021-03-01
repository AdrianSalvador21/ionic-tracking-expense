import { Action } from '@ngrx/store';

export const SET_USER = '[User] Set user';


export class SetUserAction implements Action {
  readonly type = SET_USER;
  constructor( public userData: any ) {}
}


export type actions = SetUserAction;

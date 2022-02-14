import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  list: Worker[] = [];
  constructor() { }

  getProgressCount(): number{
    return this.list.length;
  }
}

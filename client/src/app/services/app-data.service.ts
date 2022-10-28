import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AttackByTypeResponse } from '../components/interfaces/DTO.type';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  private messageSource = new BehaviorSubject<AttackByTypeResponse>({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: AttackByTypeResponse) {
    this.messageSource.next(message);
  }

}

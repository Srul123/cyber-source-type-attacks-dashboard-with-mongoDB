import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttackByTypeResponse, OptionsAttacks } from '../components/interfaces/DTO.type';


@Injectable({
  providedIn: 'root'
})


export class ApiService {
  private apiBaseUrl = 'http://localhost:5000';
  private apiURIAttackInfo = "attack-info";
  constructor(private http: HttpClient) { }

  getOptionsData(): Observable<OptionsAttacks[]>{
    return this.http.get<OptionsAttacks[]>(`${this.apiBaseUrl}/${this.apiURIAttackInfo}`);
  }

  getAttackDataByCategory(requestOption: string): Observable<AttackByTypeResponse>{
    return this.http.get<AttackByTypeResponse>(`${this.apiBaseUrl}/${this.apiURIAttackInfo}/${requestOption}`);
  }
}


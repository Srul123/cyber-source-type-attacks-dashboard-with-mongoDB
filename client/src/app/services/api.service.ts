import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  AttackByTypeResponse,
  OptionsAttacks,
} from "../interfaces/DTO.type";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiBaseUrl = "http://localhost:5000";
  private apiURIAttackInfo = "attack-info";
  constructor(private http: HttpClient) {}

  getOptionsData() {
    return this.http
      .get<OptionsAttacks[]>(`${this.apiBaseUrl}/${this.apiURIAttackInfo}`)
      .toPromise();
  }

  getAttackDataByCategory(requestOption: string) {
    return this.http
      .get<AttackByTypeResponse>(
        `${this.apiBaseUrl}/${this.apiURIAttackInfo}/${requestOption}`
      )
      .toPromise();
  }
}

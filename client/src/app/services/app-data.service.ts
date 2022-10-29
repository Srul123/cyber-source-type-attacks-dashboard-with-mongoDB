import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  AttackByTypeResponse,
  OptionsAttacks,
} from "../interfaces/DTO.type";

@Injectable({
  providedIn: "root",
})
export class AppDataService {
  private attackByType = new BehaviorSubject<AttackByTypeResponse>({});
  currentAttackByType = this.attackByType.asObservable();

  private optionsObservable = new BehaviorSubject<OptionsAttacks[]>([]);
  currentOptions = this.optionsObservable.asObservable();

  private appLoading = new BehaviorSubject<boolean>(true);
  currentLoading = this.appLoading.asObservable();

  private selectedOption = new BehaviorSubject<string>("");
  currentSelectedOption = this.selectedOption.asObservable();

  constructor() {}

  updateOptions(value: OptionsAttacks[]) {
    this.optionsObservable.next(value);
  }

  updateAttackByType(value: AttackByTypeResponse) {
    this.attackByType.next(value);
  }

  updateLoading(value: boolean) {
    this.appLoading.next(value);
  }

  updateSelectedOption(value: string) {
    this.selectedOption.next(value);
  }
}

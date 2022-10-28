import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { ApiService } from "src/app/services/api.service";

import { AppDataService } from "src/app/services/app-data.service";
import { AttackByTypeResponse, OptionsAttacks } from "../interfaces/DTO.type";

@Component({
  selector: "app-selected-type",
  templateUrl: "./selected-type.component.html",
  styleUrls: ["./selected-type.component.scss"],
})
export class SelectedTypeComponent implements OnInit {
  options: OptionsAttacks[];
  loaded = false;
  subscription: Subscription;
  @Output() isContentReady = new EventEmitter<boolean>(false);
  isSelected = false;
  constructor(
    private appDataService: AppDataService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getOptions();
  }

  getOptions() {
    this.apiService.getOptionsData().subscribe((response: OptionsAttacks[]) => {
      this.options = response;
      this.loaded = true;
    });
  }

  onOptionsSelected(value: string) {
    this.isContentReady.emit(true);
    this.isSelected = true;
    const option = this.options.find((item) => item.name === value);
    this.apiService.getAttackDataByCategory(option.value).subscribe((value) => {
      this.newMessage(value);
    });
  }

  newMessage(message: AttackByTypeResponse) {
    this.appDataService.changeMessage(message);
  }
}

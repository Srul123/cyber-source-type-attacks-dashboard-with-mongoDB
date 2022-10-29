import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ApiService } from "src/app/services/api.service";

import { AppDataService } from "src/app/services/app-data.service";
import { OptionsAttacks } from "../../interfaces/DTO.type";

@Component({
  selector: "app-selected-type",
  templateUrl: "./selected-type.component.html",
  styleUrls: ["./selected-type.component.scss"],
})
export class SelectedTypeComponent implements OnInit {
  options: OptionsAttacks[];
  selected: string;
  subscription: Subscription;
  constructor(
    private appDataService: AppDataService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.appDataService.currentOptions.subscribe((response) => this.options = response);
    this.appDataService.currentSelectedOption.subscribe((optionName) => this.selected = optionName);
  }

  async onOptionsSelected(value: string) {
    this.appDataService.updateLoading(true);
    const optionName = this.options.find((item) => item.value === value);
    const data = await this.apiService.getAttackDataByCategory(value);
    this.appDataService.updateAttackByType(data);
    this.appDataService.updateSelectedOption(optionName.name);
    this.appDataService.updateLoading(false);
  }
}

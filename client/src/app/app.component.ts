import { Component, OnInit } from "@angular/core";
import {
  AttackSpecs,
  AttackByTypeResponse,
  AttackSeverities,
} from "./interfaces/DTO.type";
import { ApiService } from "./services/api.service";

import { AppDataService } from "./services/app-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  clearSeverities: AttackSeverities;
  clearPercentages = [];
  clearTypes: AttackSpecs;
  darkSeverities: AttackSeverities;
  darkPercentages: number[];
  darkTypes: AttackSpecs;
  riskMeter: number;
  isAppLoading: boolean;
  constructor(
    private appDataService: AppDataService,
    private apiService: ApiService
  ) {}

  preparePercentagesForDataArray(severities: AttackSeverities): number[] {
    if (severities) {
      const sum =
        severities.highSpec + severities.mediumSpec + severities.lowSpec;
      const high = Math.round((severities.highSpec / sum) * 100);
      const medium = Math.round((severities.mediumSpec / sum) * 100);
      const low = Math.round((severities.lowSpec / sum) * 100);
      return [high, medium, low];
    }
  }

 async ngOnInit() {
    this.appDataService.currentLoading.subscribe((response) => {
      this.isAppLoading = response;
    });

    await this.getOptionsSync();

    this.appDataService.currentAttackByType.subscribe(
      (response: AttackByTypeResponse) => {
        this.clearSeverities = response.clearSeverities;
        this.clearTypes = response.clearTypes;
        this.darkSeverities = response.darkSeverities;
        this.darkTypes = response.darkTypes;
        this.riskMeter = response.riskMeter;
        this.clearPercentages = this.preparePercentagesForDataArray(
          response.clearSeverities
        );
        this.darkPercentages = this.preparePercentagesForDataArray(
          response.darkSeverities
        );
      }
    );
  }

  async getOptionsSync() {
    this.appDataService.updateLoading(true);
    const optionsData = await this.apiService.getOptionsData();
    this.appDataService.updateOptions(optionsData);
    const data = await this.apiService.getAttackDataByCategory(optionsData[0].value);
    this.appDataService.updateAttackByType(data);
    this.appDataService.updateLoading(false);
    this.appDataService.updateSelectedOption(optionsData[0].name)
  }
}

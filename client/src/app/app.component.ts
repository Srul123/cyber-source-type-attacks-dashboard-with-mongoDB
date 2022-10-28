import { Component, OnInit } from "@angular/core";
import {
  AttackSpecs,
  AttackByTypeResponse,
  AttackSeverities,
} from "./components/interfaces/DTO.type";

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
  showContent = false;

  constructor(private appDataService: AppDataService) {}

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

  ngOnInit(): void {
    this.appDataService.currentMessage.subscribe(
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

  updateShowContentToTrue() {
    this.showContent = true;
  }
}

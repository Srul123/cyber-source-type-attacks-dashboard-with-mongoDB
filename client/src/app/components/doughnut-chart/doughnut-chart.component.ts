import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ChartOptions, ChartType } from "chart.js";
import { AttackSeverities } from "../interfaces/DTO.type";
import { DoughnutLabel } from "./doughnut-chart.model";

@Component({
  selector: "doughnut-chart",
  templateUrl: "./doughnut-chart.component.html",
  styleUrls: ["./doughnut-chart.component.scss"],
})
export class DoughnutChartComponent implements OnChanges, OnInit {
  @Input() severities: AttackSeverities;
  @Input() data: number[] = [];
  highSpec: number;
  mediumSpec: number;
  lowSpec: number;
  dataSets = [
    {
      data: this.data,
      backgroundColor: ["#D24346", "#F0AC38", "#4BAFD2"],
      borderWidth: 0,
    },
  ];
  dataLabel: DoughnutLabel[] = Object.values(DoughnutLabel);
  doughnutChartType: ChartType = "doughnut";
  options: ChartOptions = {
    cutoutPercentage: 85,
    legend: {
      display: false,
    },
    tooltips: {
      bodyFontSize: 25,
      displayColors: false,
    },
  };

  ngOnChanges({ data }: SimpleChanges) {
    if (this.severities) {
        this.highSpec = this.severities.highSpec;
        this.mediumSpec =  this.severities.mediumSpec;
        this.lowSpec =  this.severities.lowSpec;
    }
    if (data && data.currentValue) {
        this.dataSets[0].data = data.currentValue;
    }
  }

  ngOnInit(): void {
   
  }
}

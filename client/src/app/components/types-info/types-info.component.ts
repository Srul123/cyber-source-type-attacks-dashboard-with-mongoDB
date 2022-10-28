import { Component, Input, OnChanges } from "@angular/core";
import { AttackSpecs } from "../interfaces/DTO.type";

@Component({
  selector: "app-types-info",
  templateUrl: "./types-info.component.html",
  styleUrls: ["./types-info.component.scss"],
})
export class TypesInfoComponent implements  OnChanges {

  @Input() dataTypes: AttackSpecs;
  dataTypeShared: AttackSpecs = {
    attackIndicationSpec: 0,
    dataLeakageSpec: 0,
    brandSecuritySpec: 0,
    exploitableDataSpec: 0,
    phishingSpec: 0,
    typeStrength: 0,
    vipSpec: 0
  };

  constructor() {}

  ngOnChanges(): void {
   if (this.dataTypes) {
    this.dataTypeShared = this.dataTypes;
   }
  }
}

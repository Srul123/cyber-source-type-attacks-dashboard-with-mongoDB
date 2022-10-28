import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-type',
  templateUrl: './item-type.component.html',
  styleUrls: ['./item-type.component.scss']
})
export class ItemTypeComponent implements OnInit {
  @Input() fieldName1: string;
  @Input() fieldValue1: string;
  @Input() fieldName2: string;
  @Input() fieldValue2: string;

  constructor() { }

  ngOnInit(): void {
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { RiskMeterComponent } from './components/risk-meter/risk-meter.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { TypesInfoComponent } from './components/types-info/types-info.component';
import { SelectedTypeComponent } from './components/selected-type/selected-type.component';
import { ItemTypeComponent } from './components/item-type/item-type.component';
import { SppinerComponent } from './components/sppiner/sppiner.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    RiskMeterComponent,
    DoughnutChartComponent,
    TypesInfoComponent,
    SelectedTypeComponent,
    ItemTypeComponent,
    SppinerComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

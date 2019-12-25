import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MapComponent } from './charts/map/map.component';
import { WordCloudComponent } from './charts/word-cloud/word-cloud.component';
import { PureComponent } from './charts/pure/pure.component';
import { PieComponent } from './charts/pie/pie.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    MapComponent,
    WordCloudComponent,
    PureComponent,
    PieComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

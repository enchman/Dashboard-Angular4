//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { DatePickerModule } from 'ng2-datepicker';

//Layout
import { AppComponent } from './app.component';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { FooterComponent } from './components/footer/footer.component';
import { WidgetareaComponent } from './components/widgetarea/widgetarea.component';
import { ControlsidebarComponent } from './components/controlsidebar/controlsidebar.component';

//Services
import { WidgetLibraryService } from './services/widgetLibrary-service/widget-library.service';
import { WidgetHostDirective } from './directives/widget-host.directive';
import { UserService } from './services/user-service/user.service';
import { DashboardcontrollerService } from "./services/dashboardcontroller-service/dashboardcontroller.service";
import { GmapService } from './widgets/stationskort/gmap.service';
import { GmapSAService } from './widgets/speed-average-heatmap/gmap.service';
import { GmapSAASService } from './widgets/average-speed-heatmap-all-stations/gmap.service';

@NgModule({
  declarations: [
    AppComponent,
    //Layout ----->
    TopmenuComponent,
    SidemenuComponent,
    FooterComponent,
    WidgetareaComponent,
    ControlsidebarComponent,
    WidgetHostDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DatePickerModule,
    HttpModule
  ],
  providers: [WidgetLibraryService, UserService, DashboardcontrollerService, GmapService, GmapSAService, GmapSAASService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Md2Module } from 'md2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

// Import custom route module....
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './app-modules/core/core.module';

// Custom components import....
import { LoginComponent } from './login/login.component';

// Custom services import....
import { AuthService } from './app-modules/core/services/auth.service';
import { AuthenticationService } from './login/authentication.service';
import { ServiceComponent } from './service/service.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SetSecurityQuestionsComponent } from './set-security-questions/set-security-questions.component';
import { FacilitySelectionComponent } from './facility-selection/facility-selection.component';
import { FaciltyService } from './facility-selection/facilty.service';
import { RedirInComponent } from './redir-in/redir-in.component';
import { LoadStoreDetailsComponent } from './load-store-details/load-store-details.component';
import {LanguageService} from './app-modules/core/services/language.service'
  import { from } from 'rxjs/observable/from';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ServiceComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    SetSecurityQuestionsComponent,
    FacilitySelectionComponent,
    RedirInComponent,
    LoadStoreDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Md2Module,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    Ng2GoogleChartsModule
  ],
  providers: [
    AuthenticationService,
    LanguageService,
    AuthService,
    FaciltyService,
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

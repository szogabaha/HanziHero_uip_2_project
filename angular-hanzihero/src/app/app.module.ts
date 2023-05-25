import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderbarComponent } from './headerbar/headerbar.component';
import { SessionComponent } from './session/session.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AudioplayerComponent } from './audioplayer/audioplayer.component';
import { CharacterAnimationComponent } from './character-animation/character-animation.component';
import { SettingsComponent } from './settings/settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoRootModule } from './transloco-root.module';
import { LanguagesetterComponent } from './languagesetter/languagesetter.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    HeaderbarComponent,
    SessionComponent,
    ProgressBarComponent,
    AudioplayerComponent,
    CharacterAnimationComponent,
    SettingsComponent,
    LanguagesetterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslocoRootModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

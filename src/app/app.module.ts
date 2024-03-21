import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonEffects } from './store/common/common.effects';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserEffects } from './store/user/user.effects';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { TicketsEffects } from './store/tickets/tickets.effects';
import { ticketsReducer } from './store/tickets/tickets.reducer';
import { userReducer } from './store/user/user.reducer';
import { TicketsComponent } from './components/tickets/tickets.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TicketsComponent,
    MenubarComponent,
    ProfileComponent,
    TicketComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ tickets: ticketsReducer, user: userReducer }),
    EffectsModule.forRoot([CommonEffects, UserEffects, TicketsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [BreadcrumbsComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

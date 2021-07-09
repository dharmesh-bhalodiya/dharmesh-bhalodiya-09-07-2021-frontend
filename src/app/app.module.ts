import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth-gaurd/auth-gaurd.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ComposeModalComponent } from './modal/compose-modal/compose-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ComposeModalComponent,
    MessageDetailComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

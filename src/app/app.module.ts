import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FeedEventosComponent } from './component/feed-eventos/feed-eventos.component';
import { CalendarioComponent } from './component/calendario/calendario.component';
import { MenuComponent } from './component/menu/menu.component';
import { FormularioComponent } from './component/formulario/formulario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import listPlugin from '@fullcalendar/list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { LoginComponent } from './component/login/login.component';
import { InscritosComponent } from './component/inscritos/inscritos.component';
import { CriadosComponent } from './component/criados/criados.component';
import { CardDetailsComponent } from './component/card-details/card-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './component/login/auth.service';
import { TokenInterceptor } from './service/interceptores/token.interceptor';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  resourceTimelinePlugin,
  listPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormularioComponent,
    FeedEventosComponent,
    CalendarioComponent,
    LoginComponent,
    InscritosComponent,
    CriadosComponent,
    CardDetailsComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    SharedModule,
    // MatSlideToggleModule,
    // MatIconModule
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

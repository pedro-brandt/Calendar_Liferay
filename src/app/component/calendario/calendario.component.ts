
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EventApi } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/pt-br';
import { UserService } from 'src/app/service/user.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { createEventId } from './event-utils';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  providers:[DatePipe]
})
export class CalendarioComponent implements OnInit {

  public options: any;
  @ViewChild("start") data: ElementRef;
  events: any[] = [];
  eventsCalendar: any[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private alertService: AlertModalService,
    private dataPipe: DatePipe,
    ) {
    this.service.list().subscribe((data) => {
      this.events = data;

      this.events.forEach(e => {
        let calendarevent = {
          title: e.title,
          start: e.start,
          end: e.end,
        }
        this.eventsCalendar.push(calendarevent);
        this.events = this.eventsCalendar

      })
      // console.log(this.events);
      // console.log(this.eventsCalendar);
    })
  }

  ngOnInit(): void {

    this.options = {
      // defaulDate: new Date(),
      locale: esLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      initialView: 'dayGridMonth',
      weekends: false,
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      dateClick: this.handleDateClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      // events: this.eventsCalendar,
      events:  [
        {
          "title": "Event 1",
          "start": "2022-06-03T09:00:00",
          "end": "2022-06-03T18:00:00"
        },
        {
          "title": "Event 2",
          "start": "2022-06-30T09:00:00",
          "end": "2022-06-30T10:00:00"
        },
        {
          "title": "Event 3",
          "start": "2022-06-15T09:00:00",
          "end": "2022-06-15T10:00:00"
        },
        {
          "title": "Event 4",
          "start": "2022-06-06T09:00:00",
          "end": "2022-06-06T10:00:00"
        }
      ]
      // addEventSource: this.eventsCalendar,
    }
  }

  currentEvents: EventApi[] = [];

  handleDateClick(info) {
    this.data = info.dateStr;
    var data = info.dateStr;
    console.log(this.data)
    console.log(data)
    var datas = this.dataPipe.transform(data, 'yyyy/MM/dd')
    console.log(datas)
    var timestampEvento = Date.parse(datas);
    console.log(timestampEvento)
    var timestampAtual = (new Date()).getTime()-1;

    if (isNaN(timestampEvento) || timestampEvento < timestampAtual) {
      // alert("A data deve estar no futuro!")
      this.alertService.showAlertDanger('A data deve está no futuro!');
    } else {
      const title = prompt('Insira um novo título para o seu evento');

      const calendarApi = info.view.calendar;
      // calendarApi.unselect();

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: info.startStr,
          end: info.endStr,
          allDay: info.allDay,
        });
        this.rota(title);
      }
    }
  }
  rota(title) {
    this.router.navigate(['formulario'], { queryParams: { data: this.data, title: title } });
    console.log(this.data, title)
  };

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}

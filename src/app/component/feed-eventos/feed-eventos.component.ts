
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Categoria } from 'src/modules/models/categoria.model';
import { User } from 'src/modules/models/user.model';

@Component({
  selector: 'app-feed-eventos',
  templateUrl: './feed-eventos.component.html',
  styleUrls: ['./feed-eventos.component.css'],
  providers: [UserService, DatePipe]
})
export class FeedEventosComponent implements OnInit {

  users: User[];
  categorias: Categoria[];
  nome: any;
  id: any;
  categorySelect: any;
  usersStatus: any[] = [];
  data: any;
  status: any;
  statusOk: any;
  statusOff: any;
  timestampAtual: any;
  user: any[] = [];
  result: any[] = [];
  datas: any[] = [];
  timesData: any[] = [];
  timesEvento: any[] = [];
  filterS : any[]=[];
  filterG: any[]=[];
  filterP: any[]=[];
  filterL:any[]=[];
  emails: any[]=[];

  constructor(private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private alertService: AlertModalService
  ) {
    this.categorias = this.service.getCategory();
  }

  ngOnInit(): void {
    // location.reload();
    this.service.list()
      .subscribe((response: any) => {
        this.users = response;
        console.log(this.users)

        this.users.forEach(e => {

          const result = this.datePipe.transform(e.date, 'dd/MM/yyyy');
          let calendarevent = {
            id:e.id,
            date: e.date,
            categoria: e.categoria,
            email: e.email,
            end: e.end,
            horarioFinal: e.horarioFinal,
            horarioInicio: e.horarioInicio,
            local: e.local,
            nome: e.nome,
            inscritos:e.inscritos,
            quantidade: e.quantidade,
            start: e.start,
            data: result,
            descricao: e.descricao,
          }
          this.user.push(calendarevent);
        });
        console.log('data', this.user);

        var timestampAtual = (new Date()).getTime();
        console.log('tempAtual', timestampAtual);

        this.user.forEach(e => {
          var datas = this.datePipe.transform(e.date, 'yyyy/MM/dd')
          var timestampEvento = Date.parse(datas);
          console.log(timestampEvento);

          if (isNaN(timestampEvento) || timestampEvento < timestampAtual) {
            this.statusOk = 'Evento Indisponível'
            console.log('1', this.statusOk);
          } else {
            this.statusOk = 'Evento Disponível'
            console.log('1', this.statusOk);
          }
          this.emails = e.inscritos;
          console.log('emails', this.emails.length);
          let calendarevent = {
            id:e.id,
            date: e.date,
            categoria: e.categoria,
            email: e.email,
            end: e.end,
            horarioFinal: e.horarioFinal,
            horarioInicio: e.horarioInicio,
            local: e.local,
            nome: e.nome,
            quantidade: e.quantidade,
            start: e.start,
            data: e.data,
            inscritos:e.inscritos,
            status: this.statusOk,
            descricao: e.descricao,
            vagas:this.emails.length
          }
          this.result.push(calendarevent);
          console.log('times data', this.result);
          this.datas = this.result;
        });
        console.log(this.users);
        console.log(this.datas);


      });
  }


  Search() {
    if (this.nome) {
      console.log(this.nome);
      this.datas = this.result.filter(res => {
        return res.nome.toLocaleLowerCase().match(this.nome.toLocaleLowerCase());
      });
      console.log(this.datas);
    } else {
      location.reload();
    }

  }

  Select(value: any) {
    this.filterS = this.result;
    this.filterG = this.result;
    this.filterP = this.result;
    this.filterL = this.result;
    this.categorySelect = value;
    if (this.categorySelect == 'Stay nerdy') {
      console.log(this.categorySelect);
      this.datas = this.filterS.filter(res => {
        return res.categoria.toLocaleLowerCase().match(this.categorySelect.toLocaleLowerCase());
      });
      if(this.datas.length < 1) {
        this.alertService.showAlertDanger('Não existe evento com essa categoria');
      }
      console.log(this.result);
      console.log(this.datas);
    } if (this.categorySelect == 'Grow and get better') {
      console.log(this.categorySelect);
      this.datas = this.filterG.filter(res => {
        return res.categoria.toLocaleLowerCase().match(this.categorySelect.toLocaleLowerCase());
      });
      if(this.datas.length < 1) {
        this.alertService.showAlertDanger('Não existe evento com essa categoria');
      }
      console.log(this.result);
      console.log(this.datas);
    }
    if (this.categorySelect == 'Lead by serving') {
      console.log(this.categorySelect);
      this.datas = this.filterP.filter(res => {
        return res.categoria.toLocaleLowerCase().match(this.categorySelect.toLocaleLowerCase());
      });
      if(this.datas.length < 1) {
        this.alertService.showAlertDanger('Não existe evento com essa categoria');
      }
      console.log(this.result);
      console.log(this.datas);
    }if (this.categorySelect == 'Produce excellence') {
      console.log(this.categorySelect);
      this.datas = this.filterL.filter(res => {
        return res.categoria.toLocaleLowerCase().match(this.categorySelect.toLocaleLowerCase());
      });
      if(this.datas.length < 1) {
        this.alertService.showAlertDanger('Não existe evento com essa categoria');
      }
      console.log(this.result);
      console.log(this.datas);
    } if(this.categorySelect == 'selecione a categoria') {
      location.reload();
    }

  }

  goToDetalhesByState(user: User) {
    this.router.navigateByUrl('/card-details',
      { state: user });
  }
}

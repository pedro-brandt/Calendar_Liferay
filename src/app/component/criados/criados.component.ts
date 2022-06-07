import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/models/user.model';
import { AuthService } from '../login/auth.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { take, switchMap } from 'rxjs/operators';
import { EMPTY, empty } from 'rxjs';

@Component({
  selector: 'app-criados',
  templateUrl: './criados.component.html',
  styleUrls: ['./criados.component.css'],
  providers: [DatePipe]
})
export class CriadosComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  userSelecionado : User;
  users: User[];
  email:any;
  eventosCriados: any[]=[];
  statusOk:any;
  user: any[] = [];
  result: any[] = [];
  datas: any[] = [];
  emails: any[]=[];

  constructor(private service: UserService,
    private router: Router,
    private route : ActivatedRoute,
    private modalService: BsModalService,
    private authService: AuthService,
    private alertService: AlertModalService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.service.list()
    .subscribe((response) => {
      this.users = response;
    });
    console.log(this.users)
    this.retornarUsuario();
  }

  retornarUsuario() {
    this.email = this.authService.obterUsuarioLogado.email;
    // this.email = 'exemplo@gmail.com'
    console.log(this.email)

      this.authService.retornarUsuario(this.email).subscribe(data => {
        this.eventosCriados = data;
        console.log(this.eventosCriados);

        this.eventosCriados.forEach(e => {
          const result = this.datePipe.transform(e.date, 'dd/MM/yyyy');
          let calendarevent = {
            id: e.id,
            date: e.date,
            categoria: e.categoria,
            email: e.email,
            end: e.end,
            horarioFinal: e.horarioFinal,
            horarioInicio: e.horarioInicio,
            inscritos: e.inscritos,
            local: e.local,
            nome: e.nome,
            quantidade: e.quantidade,
            start: e.start,
            data: result,
          }
          this.user.push(calendarevent);
        });
        console.log('data', this.eventosCriados);

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
          console.log('emails', this.emails.length)

          let calendarevent = {
            id: e.id,
            date: e.date,
            categoria: e.categoria,
            email: e.email,
            end: e.end,
            horarioFinal: e.horarioFinal,
            horarioInicio: e.horarioInicio,
            local: e.local,
            nome: e.nome,
            quantidade: e.quantidade,
            inscritos: e.inscritos,
            start: e.start,
            data: e.data,
            status: this.statusOk,
            vagas: this.emails.length
          }
          this.result.push(calendarevent);
          console.log('times data', this.result);
          this.datas = this.result;
          console.log('return',this.datas)
        });
        console.log(this.users);

      });
    }

    onEdit(id) {
      this.router.navigate(['editar', id])
    }

    onDelete(user) {
      this.userSelecionado = user;
      // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});

     const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse evento?', 'Não', 'Sim');
     result$.asObservable()
     .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(user.id) : EMPTY)
     )
     .subscribe(
      success => {
        location.reload();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao excluir evento, tente novamente!');
      }
     );
    }

    onConfirmDelete() {
      this.service.remove(this.userSelecionado.id).subscribe(
        success => {
          location.reload();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao excluir evento, tente novamente!');
          this.deleteModalRef.hide();
        }
      );
    }

    onDeclineDelete() {
      this.deleteModalRef.hide();
    }

}

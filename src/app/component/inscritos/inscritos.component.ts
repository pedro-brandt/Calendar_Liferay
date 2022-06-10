import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { User } from 'src/models/user.model';
import { AuthService } from '../login/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styleUrls: ['./inscritos.component.css'],
  providers: [DatePipe]
})
export class InscritosComponent implements OnInit {
  users: User[];
  userSelecionado: User;
  email: any;
  emails: any[] = [];
  eventosInscritos: any[] = [];
  statusOk: any;
  user: any[] = [];
  result: any[] = [];
  data: any[] = [];
  datas: any[] = [];
  dados: any;
  dado: any[] = [];
  vagas: any[] = [];
  remove: any[] = [];
  meuFormGroup: FormGroup;

  constructor(private service: UserService,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
    private alertService: AlertModalService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.retornarUsuario();
  }

  retornarUsuario() {
    this.email = this.authService.obterUsuarioLogado.email;
    console.log(this.email)
    this.dados = [{
      email: this.email,
    }];
    // console.log('e', this.dados);

    this.service.list()
      .subscribe((response: any) => {
        this.users = response;
        console.log(this.users)

        this.users.forEach(e => {
          this.emails = e.inscritos;
          console.log('emails', this.emails.length)

          // console.log('e', this.dados);

          const result = this.datePipe.transform(e.date, 'dd/MM/yyyy');
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
            inscritos: e.inscritos,
            quantidade: e.quantidade,
            start: e.start,
            data: result,
            descricao: e.descricao,
            vagas: this.emails.length,
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
            start: e.start,
            data: e.data,
            inscritos: e.inscritos,
            status: this.statusOk,
            descricao: e.descricao,
            vagas: this.emails.length,
          }
          this.result.push(calendarevent);
          // console.log('times data', this.result);
          this.data = this.result;

        });
        // console.log(this.users);
        // console.log(this.data);


        if (this.dados) {
          // console.log(this.dados);
          this.datas = this.data.filter(res => {
            return res.inscritos.length > 0;
          });
        }
        console.log(this.datas);

      });
  }

  cancelar(id) {
    console.log(id)
    this.service.loadById(id).subscribe(data => {
      let remove = data.inscritos;
     this.remove = remove.slice(1, 1);
      console.log(remove)
   this.router.navigate(['inscritos']);

   this.meuFormGroup = this.formBuilder.group({
    date: data.date,
    categoria: data.categoria,
    email: data.email,
    end: data.end,
    horarioFinal: data.horarioFinal,
    horarioInicio: data.horarioInicio,
    local: data.local,
    nome: data.nome,
    quantidade: data.quantidade,
    start: data.start,
    data: data.data,
    inscritos: data.inscritos,
    status: data.status,
    id: data.id,
    vagas: data.vagas
  });
console.log(this.meuFormGroup)
this.service.update(this.meuFormGroup.value).subscribe(
success  => {
  this.alertService.showAlertSuccess('Cancelado com sucesso!'),
  location.reload();
  this.router.navigate(['/inscritos']);

},
error => this.alertService.showAlertDanger('Erro ao cancelar, tente novamente!'),
() => console.log('update completo')
);

    });


  }
}

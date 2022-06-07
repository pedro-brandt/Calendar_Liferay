import { AuthService } from 'src/app/component/login/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  detalhes: any;
  datas: any[] = [];
  data: any;
  email: any;
  resul: any[]=[];
  meuFormGroup: FormGroup;
  inscritos: any[] = [];
  dados: any[]=[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertModalService,
    private service: UserService) {
    const nav = this.router.getCurrentNavigation();
    console.log(nav.extras.state);
    this.detalhes = nav.extras.state;
    console.log('detalhes', this.detalhes)
  }

  ngOnInit(): void {
    // this.inscrever();
    this.email = this.authService.obterUsuarioLogado.email;
    console.log(this.email)

  }
  inscrever() {
    this.data = this.detalhes;
    this.email = this.authService.obterUsuarioLogado.email;
    console.log(this.email)
    this.inscritos = this.data.inscritos;
    console.log(this.inscritos);
    this.dados = [{
      email:this.email,
    }],
    this.inscritos.push(this.dados);
    this.resul = this.inscritos;
    console.log(this.resul)
    this.salvar(this.resul, this.data);
  }

  salvar(user: any[]=[], data) {
    // let parse = JSON.parse(this.detalhes);
    // console.log(parse)

    let tamanho = this.detalhes.length;
    console.log(tamanho)

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
      inscritos: user,
      status: data.status,
      id: data.id,
      vagas: data.vagas
    });
console.log(this.meuFormGroup)
this.service.update(this.meuFormGroup.value).subscribe(
  success  => {
    this.alertService.showAlertSuccess('Inscrito com sucesso!'),
    this.router.navigate(['feed-eventos']);

  },
  error => this.alertService.showAlertDanger('Erro ao se inscrever, tente novamente!'),
  () => console.log('update completo')
);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/service/user.service';
import { Categoria, Local } from 'src/models/categoria.model';
import { User } from 'src/models/user.model';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [DatePipe, UserService]
})
export class FormularioComponent implements OnInit {

  // bsModalRef: BsModalRef;
  categorias: Categoria[];
  locals: Local[];
  meuFormGroup: FormGroup;
  users: User[];
  local: any;
  start: any;
  data: any;
  title: any;
  evento: any;
  eventoId: any;

  constructor(private formBuilder: FormBuilder,
    private router : Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private alertService: AlertModalService,
    private _service: UserService) {
    this.categorias = this._service.getCategorias();
    this.locals = this._service.getLocal();
    console.log(this.categorias);
    console.log(this.locals);

    this.meuFormGroup = this.formBuilder.group({
      id:[null],
      nome: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      local: ['', Validators.required],
      date: ['', Validators.required],
      horarioInicio: ['', Validators.required],
      horarioFinal: ['', Validators.required],
      quantidade: ['', Validators.required],
      categoria: ['', Validators.required],
      descricao: ['', Validators.required],
      inscritos:[[]]
    });

    // console.log(this.meuFormGroup)
  };

  ngOnInit(): void {

    this.route.params
    .pipe(
      map((params:any) => params['id']),
      switchMap(id => this._service.loadById(id))
    )
    .subscribe(data  => this.updateForm(data));

    this.route.queryParams.subscribe(params => {
      this.start = params['data'];
      this.title = params['title'];
      // console.log(this.start)
      // console.log(this.title)
    });

    this.data = this.datePipe.transform(this.start, 'dd/MM/yyyy')
    // console.log(this.data)
  }

  updateForm(data) {
    console.log(data)
      console.log("categoria", data.categoria);
      if(data.categoria == "Stay nerdy"){
        let category = "Stay nerdy (confras, festas, sessões de descompressão, jogos, etc)";
         data.categoria = category;
        console.log(data.categoria);
      }
      if(data.categoria == "Grow and get better"){
        let category = "Grow and get better (workshops, meetups, mini cursos, palestras, etc)";
        data.categoria = category;
        console.log(data.categoria);
      }
      if(data.categoria == "Lead by serving"){
        let category = "Lead by serving (comitês internos, EVP, etc)";
         data.categoria = category;
        console.log(data.categoria);
      }
      if(data.categoria == "Produce excellence"){
        let category = "Produce excellence (company meeting, reuniões de time, retrospectiva, etc)";
         data.categoria = category;
        console.log(data.categoria);
      }
    this.meuFormGroup.patchValue({
      id: data.id,
      nome: data.nome,
      email: data.email,
      local: data.local,
      date: data.date,
      data:data.data,
      horarioInicio: data.horarioInicio,
      horarioFinal: data.horarioFinal,
      quantidade: data.quantidade,
      categoria: data.categoria,
      descricao: data.descricao,
    });
    console.log('update',this.meuFormGroup)
  }

  onSubmit() {
    // if (!this.meuFormGroup.valid) {
    //   console.log("Formulário invalido");
    //   return;
    // }
    if(this.meuFormGroup.value.id){
      this.eventoId = this.meuFormGroup.value;
      this._service.list().subscribe((response: any) => {
        this.users = response;
        console.log(this.users);
        if (this.eventoId.local) {
          console.log(this.eventoId.local);
          this.users = this.users.filter(res => {
            return res.local.toLocaleLowerCase().match(this.eventoId.local.toLocaleLowerCase())
          });
        }
        console.log(this.users);

        let dataFilter = this.users;
        console.log(dataFilter)

        if (this.meuFormGroup.value.date) {
          console.log(this.meuFormGroup.value.date)
          dataFilter = dataFilter.filter(res => {
            console.log(dataFilter)
            return res.date.toLocaleLowerCase().match(this.meuFormGroup.value.date.toLocaleLowerCase())
          });
        }
        console.log(dataFilter);

        let horarioInicioFilter = dataFilter;
        console.log(horarioInicioFilter)

        if (this.eventoId.horarioInicio) {
          console.log(this.eventoId.horarioInicio)
          horarioInicioFilter = horarioInicioFilter.filter(res => {
            console.log(horarioInicioFilter)
            return res.horarioInicio.toLocaleLowerCase().match(this.eventoId.horarioInicio.toLocaleLowerCase())
          });
        }
        console.log(horarioInicioFilter);

        let horarioFinalFilter = horarioInicioFilter;
        console.log(horarioFinalFilter)

        if (this.eventoId.horarioFinal) {
          console.log(this.eventoId.horarioFinal)
          horarioFinalFilter = horarioFinalFilter.filter(res => {
            console.log(horarioFinalFilter)
            return res.horarioFinal.toLocaleLowerCase().match(this.eventoId.horarioFinal.toLocaleLowerCase())
          });
        }
        console.log(horarioFinalFilter);

        if(horarioFinalFilter.length > 0) {
          this.alertService.showAlertDanger('Já existe um evento criado!');

        } else {
          if(this.meuFormGroup.value.categoria == "Stay nerdy (confras, festas, sessões de descompressão, jogos, etc)"){
            let category = "Stay nerdy";
             this.meuFormGroup.value.categoria = category;
            console.log(this.meuFormGroup.value.categoria);
          }
          if(this.meuFormGroup.value.categoria == "Grow and get better (workshops, meetups, mini cursos, palestras, etc)"){
            let category = "Grow and get better";
             this.meuFormGroup.value.categoria = category;
            console.log(this.meuFormGroup.value.categoria);
          }
          if(this.meuFormGroup.value.categoria == "Lead by serving (comitês internos, EVP, etc)"){
            let category = "Lead by serving";
             this.meuFormGroup.value.categoria = category;
            console.log(this.meuFormGroup.value.categoria);
          }
          if(this.meuFormGroup.value.categoria == "Produce excellence (company meeting, reuniões de time, retrospectiva, etc)"){
            let category = "Produce excellence";
             this.meuFormGroup.value.categoria = category;
            console.log(this.meuFormGroup.value.categoria);
          }
          this._service.update(this.meuFormGroup.value).subscribe(
            success  => {
              this.alertService.showAlertSuccess('Evento atualizado com sucesso!'),
              this.router.navigate(['feed-eventos']);

            },
            error => this.alertService.showAlertDanger('Erro ao atualizar evento, tente novamente!'),
            () => console.log('update completo')
          );
          // console.log('evento+inscritos',this.evento);
          // this.alertService.showAlertSuccess('Sucesso!');

        }
    });
    }else {
      console.log("Formulário valido", this.meuFormGroup.value);
      this.evento = this.meuFormGroup.value;
      if(this.meuFormGroup.value.categoria == "Stay nerdy (confras, festas, sessões de descompressão, jogos, etc)"){
        let category = "Stay nerd";
         this.meuFormGroup.value.categoria = category;
        console.log(this.meuFormGroup.value.categoria);
      }
      if(this.meuFormGroup.value.categoria == "Grow and get better (workshops, meetups, mini cursos, palestras, etc)"){
        let category = "Grow and get better";
         this.meuFormGroup.value.categoria = category;
        console.log(this.meuFormGroup.value.categoria);
      }
      if(this.meuFormGroup.value.categoria == "Lead by serving (comitês internos, EVP, etc)"){
        let category = "Lead by serving";
         this.meuFormGroup.value.categoria = category;
        console.log(this.meuFormGroup.value.categoria);
      }
      if(this.meuFormGroup.value.categoria == "Produce excellence (company meeting, reuniões de time, retrospectiva, etc)"){
        let category = "Produce excellence";
         this.meuFormGroup.value.categoria = category;
        console.log(this.meuFormGroup.value.categoria);
      }
      // this.meuFormGroup.value.date = this.datePipe.transform(this.meuFormGroup.value.date, 'dd-MM-yyyy')
      // console.log(this.meuFormGroup.value.date)
      console.log(this.evento);
      this._service.list().subscribe((response: any) => {
        this.users = response;
        console.log(this.users);
        if (this.evento.local) {
          console.log(this.evento.local);
          this.users = this.users.filter(res => {
            return res.local.toLocaleLowerCase().match(this.evento.local.toLocaleLowerCase())
          });
        }
        console.log(this.users);

        let dataFilter = this.users;
        console.log(dataFilter)

        if (this.meuFormGroup.value.date) {
          console.log(this.meuFormGroup.value.date)
          dataFilter = dataFilter.filter(res => {
            console.log(dataFilter)
            return res.date.toLocaleLowerCase().match(this.meuFormGroup.value.date.toLocaleLowerCase())
          });
        }
        console.log(dataFilter);

        let horarioInicioFilter = dataFilter;
        console.log(horarioInicioFilter)

        if (this.evento.horarioInicio) {
          console.log(this.evento.horarioInicio)
          horarioInicioFilter = horarioInicioFilter.filter(res => {
            console.log(horarioInicioFilter)
            return res.horarioInicio.toLocaleLowerCase().match(this.evento.horarioInicio.toLocaleLowerCase())
          });
        }
        console.log(horarioInicioFilter);

        let horarioFinalFilter = horarioInicioFilter;
        console.log(horarioFinalFilter)

        if (this.evento.horarioFinal) {
          console.log(this.evento.horarioFinal)
          horarioFinalFilter = horarioFinalFilter.filter(res => {
            console.log(horarioFinalFilter)
            return res.horarioFinal.toLocaleLowerCase().match(this.evento.horarioFinal.toLocaleLowerCase())
          });


        }
        console.log(horarioFinalFilter);

        if(horarioFinalFilter.length > 0) {
          this.alertService.showAlertDanger('Já existe um evento criado!');

        } else {
          this._service.create(this.evento).subscribe(
            success  => {
              this.alertService.showAlertSuccess('Evento criado com sucesso!'),
              this.router.navigate(['feed-eventos']);

            },
            error => this.alertService.showAlertDanger('Erro ao criar evento, tente novamente!'),
            () => console.log('request completo')
          );
          // console.log('evento+inscritos',this.evento);
          // this.alertService.showAlertSuccess('Sucesso!');

        }
    });


  }
}

Select(value: any) {
  this.local = value;
  return this.local;
}

}

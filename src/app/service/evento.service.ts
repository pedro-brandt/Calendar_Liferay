import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../../modules/models/user.model"
import { environment } from 'src/environments/environment';
import { Categoria, Local} from 'src/modules/models/categoria.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  private readonly Api: string = `${environment.API}evento`;

  list() {
    return this.http.get<Event[]>(this.Api);
  }

  loadById(id){
    return this.http.get<User>(`${this.Api}/${id}`).pipe(take(1));
  }

  create(evento) {
    return this.http.post(this.Api, evento).pipe(take(1));
  }

  update(user) {
    return this.http.put(`${this.Api}/${user.id}`, user).pipe(take(1));
  }

  remove(id) {
    return this.http.delete(`${this.Api}/${id}`).pipe(take(1));
  }

  getCategorias() {
    return [
      new Categoria(0, 'selecione a categoria' ),
     new Categoria(1, 'Stay nerdy (confras, festas, sessões de descompressão, jogos, etc)' ),
     new Categoria(2, 'Grow and get better (workshops, meetups, mini cursos, palestras, etc)' ),
     new Categoria(3, 'Lead by serving (comitês internos, EVP, etc)' ),
     new Categoria(4, 'Produce excellence (company meeting, reuniões de time, retrospectiva, etc)')
    ];
  }

  getCategory() {
    return [
      new Categoria(0, 'selecione a categoria' ),
     new Categoria(1, 'Stay nerdy' ),
     new Categoria(2, 'Grow and get better' ),
     new Categoria(3, 'Lead by serving' ),
     new Categoria(4, 'Produce excellence')
    ];
  }

  getLocal() {
    return [
      new Local(0, 'selecione o local do evento' ),
     new Local(1, 'Auditório' ),
     new Local(2, 'Biblioteca' ),
     new Local(3, 'Recepção' ),
     new Local(4, 'Sala de jogos')
    ];
  }

}


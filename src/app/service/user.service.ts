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

  private readonly Api: string = `${environment.API}funcionario`;

  list() {
    return this.http.get<User[]>(this.Api);
  }

  loadById(id){
    return this.http.get<User>(`${this.Api}/${id}`).pipe(take(1));
  }

  create(funcionario) {
    return this.http.post(this.Api, funcionario).pipe(take(1));
  }

  update(funcionario) {
    return this.http.put(`${this.Api}/${funcionario.id}`, funcionario).pipe(take(1));
  }

  remove(id) {
    return this.http.delete(`${this.Api}/${id}`).pipe(take(1));
  }

}


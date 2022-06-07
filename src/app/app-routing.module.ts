import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarioComponent } from './component/calendario/calendario.component';
import { CardDetailsComponent } from './component/card-details/card-details.component';
import { CriadosComponent } from './component/criados/criados.component';
import { FeedEventosComponent } from './component/feed-eventos/feed-eventos.component';
import { FormularioComponent } from './component/formulario/formulario.component';
import { InscritosComponent } from './component/inscritos/inscritos.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserResolverGuard } from './guards/user-resolver.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard] },
  {
    path: 'formulario', component: FormularioComponent, canActivate: [AuthGuard],
    resolve: {
      user: UserResolverGuard
    }
  },
  { path: 'feed-eventos', component: FeedEventosComponent, canActivate: [AuthGuard] },
  { path: 'card-details', component: CardDetailsComponent, canActivate: [AuthGuard] },
  { path: 'inscritos', component: InscritosComponent, canActivate: [AuthGuard] },
  { path: 'criados', component: CriadosComponent, canActivate: [AuthGuard] },
  {
    path: 'editar/:id', component: FormularioComponent, canActivate: [AuthGuard],
    resolve: {
      user: UserResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

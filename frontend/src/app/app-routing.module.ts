import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeitorArquivosComponent } from './componentes/leitor-arquivos/leitor-arquivos.component';


const routes: Routes = [
  {
    path:'',component:LeitorArquivosComponent
},
{
  path:'**',component:LeitorArquivosComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

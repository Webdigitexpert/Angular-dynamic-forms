import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchDomainComponent } from './search-domain/search-domain.component';
import { AuthGuardsService } from "../../../services/guards/auth-guards.service"

const routes: Routes = [{ path: '', component: SearchDomainComponent ,canActivate:[AuthGuardsService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule { }

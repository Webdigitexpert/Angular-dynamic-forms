import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCitysComponent } from './citys/add-edit-citys/add-edit-citys.component';
import { SearchCitysComponent } from './citys/search-citys/search-citys.component';
import { SearchStatesComponent } from './states/search-states/search-states.component';
import { AuthGuardsService } from "../../../services/guards/auth-guards.service"

const routes: Routes = [{ path:'', children: [ 
  { path: 'states', component: SearchStatesComponent,canActivate:[AuthGuardsService] },
  {path: 'citys',component : SearchCitysComponent,canActivate:[AuthGuardsService]}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchAttributeSetsComponent } from './search-attribute-sets/search-attribute-sets.component';
import { DetailAttributeSetComponent } from './detail-attribute-set/detail-attribute-set.component';
import { AuthGuardsService } from "../../../services/guards/auth-guards.service"

const routes: Routes = [{ path:'', children: [ 
  { path: '', component: SearchAttributeSetsComponent,canActivate:[AuthGuardsService] },
  {path: 'detail',component : DetailAttributeSetComponent, data : {data : 'data'},canActivate:[AuthGuardsService]}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeSetsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchManufacturersComponent } from './search-manufacturers/search-manufacturers.component';
import { AuthGuardsService } from "../../../services/guards/auth-guards.service"

const routes: Routes = [{ path: '', component: SearchManufacturersComponent ,canActivate:[AuthGuardsService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturersRoutingModule { }

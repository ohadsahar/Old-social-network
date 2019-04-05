import { WallPageComponent } from './core/components/wall/wall.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/components/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'Wall/:id', component: WallPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

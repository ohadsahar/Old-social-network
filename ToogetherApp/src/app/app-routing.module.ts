import { WallPageComponent } from './core/components/wall/wall.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/components/homepage/homepage.component';
import { AuthGuard } from './shared/components/DialogLogin/auth.guards';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'wall/:id', component: WallPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { DetailProjectComponent } from './components/projects/detail-project/detail-project.component';
import { NewProjectComponent } from './components/projects/new-project/new-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import {LoginGuard} from './guards/login.guard'
import { ProjectSearchComponent } from './components/project-search/project-search.component';

const routes: Routes = [
  {path: '',
  component:ProjectSearchComponent,
  
 },
  {path: 'projects',
   component:ProjectsListComponent,
   canActivate:[LoginGuard]
  },
  {path: 'projects/new', component:NewProjectComponent,  canActivate:[LoginGuard]},
  {path: 'projects/edit/:projectId', component:EditProjectComponent,  canActivate:[LoginGuard]},
  {path: 'projects/:projectId', component:DetailProjectComponent,  canActivate:[LoginGuard]},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

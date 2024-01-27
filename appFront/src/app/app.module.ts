import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { DetailProjectComponent } from './components/projects/detail-project/detail-project.component';
import { NewProjectComponent } from './components/projects/new-project/new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { MenuComponent } from './components/ui/menu/menu.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProjectSearchComponent } from './components/project-search/project-search.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    DetailProjectComponent,
    NewProjectComponent,
    EditProjectComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    ProjectSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor ,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

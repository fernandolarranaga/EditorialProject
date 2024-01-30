import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {Project} from '../../../Project.interface'


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects:Project[]=[];
  arrProjects = new BehaviorSubject<Project[]>([]);
  resultBehivor$= this.arrProjects.asObservable();


  constructor(
    private projectsService:ProjectsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this.projectsService.getAll()
      .subscribe(data => {
        this.arrProjects.next(data.map((project: Project) => project));
      });
  }
  
}




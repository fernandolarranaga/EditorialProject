import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects:any[]=[];
  arrProjects = new BehaviorSubject<any[]>([]);


  constructor(
    private projectsService:ProjectsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(){
    this.projectsService.getAll()
      .subscribe(data => {
        console.log(data)
        this.projects = data;
        this.arrProjects.next(data);
      })
        }

}


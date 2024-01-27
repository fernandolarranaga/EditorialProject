import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css'],
})
export class ProjectSearchComponent implements OnInit {
  searchTerm: string = '';
  projects: any[] = [];
  showProjects: boolean = false; // Nueva variable

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.loadAllProjects();
  }

  loadAllProjects() {
    this.projectsService.getAll().subscribe((response) => {
      this.projects = response;
    });
  }

  searchProjects() {
    if (this.searchTerm.trim() !== '') {
      // Filtra los proyectos según la palabra clave
      this.projectsService.getAll().subscribe(response => {
        this.projects = response.filter(project =>
          project.title && project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.showProjects = this.projects.length > 0; // Muestra la lista si hay al menos un proyecto
      });
    } else {
      this.showProjects = false; // Oculta la lista si el término de búsqueda está vacío
    }
  }
}

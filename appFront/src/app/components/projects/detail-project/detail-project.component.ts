import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Project } from 'src/app/Project.interface';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit {
  
  project:any;

  constructor(
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.projectsService.getById(params['projectId'])
        .then(project => this.project = project)
        .catch(err => console.log(err));
    });
  }

  onClickBorrar(projectId: string) {
    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar esta canción?");
  
    if (confirmacion) {
      this.projectsService.deleteById(projectId)
        .then(data => {
          console.log(data);
          this.router.navigate(['/projects']); // Redirige a la ruta '/songs'
        })
        .catch(error => {
          console.error('No tienes acceso a este dato:', error);
          alert('No tienes acceso a este dato.');
          this.router.navigate(['/projects']);
        });
    } else {
      console.log('Borrado cancelado por el usuario.');
    }
  }

}

/*   onClickBorrar(songId:string){
    this.songService.deleteById(songId)
    .then(data => {
      console.log(data);
      this.router.navigate(['/songs']); // Redirige a la ruta '/songs'
    })
    .catch(error => {
      console.error('No tienes acceso a este dato:', error);
      alert('No tienes acceso a este dato.');
      this.router.navigate(['/songs'])
    });
    } */
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  formEdit: FormGroup;
  projectId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private router: Router
  ) {
    this.formEdit = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
      avatar: new FormControl(),
      
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.projectId = params['projectId'];
      this.projectsService
        .getById(this.projectId)
        .then((project) => {
          delete project._id;
          delete project.__v;
          this.formEdit.setValue(project);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del proyecto:', error);
        });
    });
  }

  onSubmit() {
    this.projectsService.update(this.projectId, this.formEdit.value);
    this.router.navigate(['/songs']); // Redirige a la ruta '/songs'
  }
   onClickEditar(){
    this.projectsService.update(this.projectId, this.formEdit.value)
    .then(data => {
      console.log(data);
      this.router.navigate(['/projects']); // Redirige a la ruta '/songs'
    })
    .catch(error => {
      console.error('No tienes acceso a este dato:', error);
      alert('No tienes acceso a este dato.');
      this.router.navigate(['/projects'])
    });
    } 
}

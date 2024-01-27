import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  formulario: FormGroup;

  constructor(private projectsService: ProjectsService, private router: Router) {
    this.formulario = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
      avatar:new FormControl(),
      authorId: new FormControl(),
      authorEmail: new FormControl(),
      fecha: new FormControl() 
    });
  }

  onSubmit() {
    console.log(this.formulario.value);

    // Assuming you have the author's id and email available in the component
    const authorId = 'author_id_here';
    const authorEmail = 'author_email_here';

    this.formulario.patchValue({
      authorId,
      authorEmail,
      fecha: new Date()
    });

    this.projectsService.create(this.formulario.value).subscribe(
      (response: any) => { 
        console.log('Canción creada exitosamente:', response);
        this.router.navigate(['/projects']);
      },
      (error) => {
        console.error('Error al crear la canción:', error);
      }
    );
  }

  ngOnInit(): void {
  }

}

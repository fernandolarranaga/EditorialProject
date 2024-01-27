import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseURL = "http://localhost:3000/api/projects"
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getById(projectId: string) {
    return firstValueFrom(
      this.http.get<any>(`${this.baseURL}/${projectId}`)
    );
  }
  create(formValues: any): Observable<any> {
    return this.http.post<any>(this.baseURL, formValues);
  }
  
  update(projectId:string, formValues: any) {
    return firstValueFrom(
      this.http.put(`${this.baseURL}/${projectId}`, formValues)
    )
  }

  deleteById(projectId:string){
    return firstValueFrom(
      this.http.delete<any>(`${this.baseURL}/${projectId}`))
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Entry } from '../shared/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategorias)
      );
  }

  getById(id: number){
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoria));
  }

  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath,entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoria)
    )
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put('url', entry).pipe(catchError(this.handleError), map(() => entry))
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError),map(() => null))
  }

  private handleError(error: any): Observable<any> {
    console.log("Erro na reuisição ->", error);
    return throwError(() => new Error(error));
  }

  private jsonDataToCategorias(jsonData: any[]): Entry[] {
    const entries: Entry [] =[];
    jsonData.forEach(element => entries.push(element as Entry));
    return entries;
  }

  private jsonDataToCategoria(jsonData: any): Entry {
    return jsonData as Entry;
  }
}
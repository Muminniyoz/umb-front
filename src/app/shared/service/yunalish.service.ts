import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YunalishService {

  api = environment.baseUrl + "/api/yunalish";
  constructor(private http: HttpClient) { }

  getAll(page: any): Observable<any> {
    return this.http.get<any>(this.api, { params: page });
  }

  create(teg: any): Observable<any> {
    return this.http.post<any>(this.api, teg);
  }
  update(teg: any): Observable<any> {
    return this.http.put<any>(this.api, teg);
  }
  deleteById(id: number): Observable<any> {
    return this.http.delete(this.api + "/" + id);
  }
}

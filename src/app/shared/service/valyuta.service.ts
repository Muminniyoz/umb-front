import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValyutaService {
  
  api = environment.baseUrl + "/api/valyuta";
  
  constructor(private http: HttpClient) { }

  getAll(page: any): Observable<any> {
    return this.http.get<any>(this.api, { params: page });
  }
  getQiymat(valyuta: { asos: any; birlik: any; }) {
    return this.http.post<any>(this.api + "/qiymat", valyuta);
  }
  getBirliklar(): Observable<any> {
    return this.http.get<any>(this.api + "/birlik");
  }
  create(teg: any): Observable<any> {
    return this.http.post<any>(this.api, teg);
  }
  update(teg: any): Observable<any> {
    return this.http.put<any>(this.api, teg);
  }
  deleteById(id: any): Observable<any> {
    return this.http.delete(this.api + "/"+id);
  }
  refreshCource(): Observable<any> {
    return this.http.get(this.api + "/refresh");
  }
}

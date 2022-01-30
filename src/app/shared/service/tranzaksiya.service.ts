import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranzaksiyaService {



  api = environment.baseUrl + "/api/tranzaksiya";
  constructor(private http: HttpClient) { }

  getAll(page: any): Observable<any> {
    return this.http.get<any>(this.api, { params: page });
  }
  getLast(): Observable<any> {
    return this.http.get<any>(this.api + "/last");
  }
  getStat(): Observable<any> {
    return this.http.get<any>(this.api + "/stat");
  }
  getAllByHisobId(hisobId: number, page: any): Observable<any> {
    return this.http.get<any>(this.api + "/hisob/" + hisobId, { params: page });
  }
  getById(id: any) {
    return this.http.get<any>(this.api + "/" + id);
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

  getByKey(key: string): Observable<any> {
    return this.http.get<any>(this.api + "/key/" + key);
  }

  getSavedTranzaksiya() {
    let t = localStorage.getItem('tranzaksiya') ?? "";
    if (t) {
      return JSON.parse(t) as Array<any>;
    }
    return [];
  }
  removeSavedTranzaksiya(t: any) {
    let k = this.getSavedTranzaksiya();
    for (let i = 0; i < k.length; i++) {
      const s = k[i];
      if (s.id == t.id) {
        k.splice(i, 1);
      }
    }
    localStorage.setItem('tranzaksiya', JSON.stringify(k));


  }
  addTranzaksiya(t: any) {
    let k = this.getSavedTranzaksiya();
    for (let i = 0; i < k.length; i++) {
      const s = k[i];
      if (s.id == t.id) {
        k.splice(i, 1);
      }
    }
    k.push(t);
    localStorage.setItem('tranzaksiya', JSON.stringify(k));
  }
}

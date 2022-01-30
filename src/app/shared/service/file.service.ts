import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  api = environment.baseUrl + "/api/file";
  constructor(private http: HttpClient) { }

  getAllFileList(): Observable<any[]>{
    return this.http.get<any[]>(this.api + "/list");
  }
  uploadFileResponseUrl(file: File): Promise<any> {

    return new Promise<any>((resolve, rejects) => {
      this.uploadFile(file).subscribe((event: any) => {
        if (event instanceof HttpResponse) {
          console.log(event);
          
          if (event.body.url) {
            resolve(this.api + "/download/" + event.body.url);
          } else {
             rejects(event.statusText)
          }
         
        }


      });
    });
  }
  uploadFile(file: File): Observable < HttpEvent < any >> {

      let formData = new FormData();

      formData.append('file', file);

      let params = new HttpParams();

      const options = {
        params: params,
        reportProgress: true,
      };

      const req = new HttpRequest('POST', this.api + "/upload/", formData, options);
      return this.http.request(req);
    }
  download(nom: number | undefined): Observable < Blob > {
      return this.http.get(this.api + "/download/" + nom, { responseType: 'blob' });
    }
  delete(fayl: string): Observable<any> {
      return this.http.delete(this.api + "/" + fayl);
    }
}

import { Injectable, Inject } from '@angular/core';
import { PeopleResponse, APIException, Person } from '../../master/people/person-create-update/person-model';
import { HttpClientExt, IObservable, IObservableError, IObservableHttpError, ResponseType, ErrorType } from 'angular-extended-http-client';
import { APP_CONFIG, AppConfig } from '../../app-config.module';
import { Observable, of } from 'rxjs';
import { tap, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PeopleService {
    constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {

    }
    private extractData(res: Response) {
        let body = res;
        return body || { };
    }

    getPeople(): Observable<any> {
        const url = `${this.config.apiEndpoint}customers`;
        return this.http.get(url).pipe(
          map(this.extractData));
    }

    createPerson(person): Observable<any> {
        const url = `${this.config.apiEndpoint}customers`;
        return this.http.post(url, person).pipe(map(this.extractData));
    }

    updatePerson(person): Observable<any> {
        const url = `${this.config.apiEndpoint}customers/${person.id}`;
        return this.http.put(url, person).pipe(map(this.extractData));
    }

    deletePerson(personId): Observable<any> {
        const url = `${this.config.apiEndpoint}customers/${personId}`;
        return this.http.delete(url).pipe(map(this.extractData));
    }

    getPeople2(success: IObservable<PeopleResponse>, failure?: IObservableHttpError) {
        let url = this.config.apiEndpoint;

        let options = this.addRequestHeaderOptions();

        //this.client.get(url, ResponseType.IObservable, success, ErrorType.IObservableHttpError, failure, options);
        /*     this.client.get(url)
              .map((res:Response) => res.json())
              .subscribe(
                data => { this.foods = data},
                err => console.error(err),
                () => console.log('done')
              ); */

        let cities = ["Varanasi", "Mathura", "Ayodhya"];
        of(cities).pipe(
          tap(c => console.log(c.length)),
          map(dataArray => dataArray.join(", "))
       ).subscribe(res => console.log(res));
    }

    private addRequestHeaderOptions() : any {
        var httpHeaders = new HttpHeaders();
        httpHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDc2OTg1MzgsIm5iZiI6MTU0NzY5NDIxOCwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InN0cmluZyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InN0cmluZyIsIkRPQiI6IjEvMTcvMjAxOSIsImlzcyI6InlvdXIgYXBwIiwiYXVkIjoidGhlIGNsaWVudCBvZiB5b3VyIGFwcCJ9.qxFdcdAVKG2Idcsk_tftnkkyB2vsaQx5py1KSMy3fT4");

        let options = {
            headers: httpHeaders,
            retry: 1
        };

        return options;
    }
}

import { Error } from './error.model';
import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

    static API_END_POINT = 'https://back-end-sara.herokuapp.com';
    // static API_END_POINT = 'http://localhost:3000';


    private params: URLSearchParams;

    private headers: Headers;

    private responseType: ResponseContentType;

    private successfulNotification = undefined;

    private body: Object;

    constructor(private http: Http, private snackBar: MatSnackBar) {
        this.resetOptions();
    }

    private resetOptions(): void {
        this.headers = new Headers();
        this.params = new URLSearchParams();
        this.responseType = ResponseContentType.Text;
    }

    param(key: string, value: string): HttpService {
        this.params.append(key, value);
        return this;
    }

    header(key: string, value: string): HttpService {
        this.headers.append(key, value);
        return this;
    }

    successful(notification = 'Realizado correctamente'): HttpService {
        this.successfulNotification = notification;
        return this;
    }

    get(endpoint: string): Observable<any> {
        return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    post(endpoint: string, body?: Object): Observable<any> {
      this.body = body;
        return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    delete(endpoint: string, body?: Object): Observable<any> {
      this.body = body;
        return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    put(endpoint: string, body?: Object): Observable<any> {
        this.body = body;
        return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    patch(endpoint: string, body?: Object): Observable<any> {
        this.body = body;
        return this.http.patch(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    private createOptions(): RequestOptions {
        const options: RequestOptions = new RequestOptions({
            headers: this.headers,
            params: this.params,
            responseType: this.responseType,
            body: this.body
        });
        this.resetOptions();
        return options;
    }

    private extractData(response: Response): any {
        if (this.successfulNotification) {
            this.snackBar.open(this.successfulNotification, '', {
                duration: 2000
            });
            this.successfulNotification = undefined;
        }
        const contentType = response.headers.get('content-type');
        if (contentType) {
            if (contentType.indexOf('application/json') !== -1) {
                return response.json();
            }
        } else if (response.text()) {
            return response.text();
        } else {
            return response;
        }
    }

    private handleError(response: Response): any {
        let error: Error;
        try {
            error = {
                httpError: response.status, exception: response.json().exception,
                message: response.json().message, path: response.json().path
            };
            this.snackBar.open(error.message, 'Error', {
                duration: 8000
            });
            return Observable.throw(error);
        } catch (e) {
            this.snackBar.open('Opss! Algo ha ocurrido mal.', 'Error', {
                duration: 8000
            });
            return Observable.throw(response);
        }
    }
}

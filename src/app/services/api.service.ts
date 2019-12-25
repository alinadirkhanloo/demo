import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { DataSharingService } from './data-sharing.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  start_date: string;
  end_date: string;
  constructor(private http: HttpClient, private data_sharing: DataSharingService) {
    const sd = this.data_sharing.start_date;
    const ed = this.data_sharing.end_date;
    sd.subscribe((date: string) => {
      this.start_date = date;
    });
    ed.subscribe((date: string) => {
      this.end_date = date;
    });
  }
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  });
  baseurl = 'http://192.168.204.170:8001/api/v1/';

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return true;
  }



  getLocations() {
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    return this.http.get<any>(this.baseurl + 'location-stats', { headers: this.httpHeaders, params: params });
  }

  getNumberOfNews() {
    return this.http.get<any>(this.baseurl + 'news-statistics', { headers: this.httpHeaders });
  }

  getNumberOfSites() {
    return this.http.get<any>(this.baseurl + 'rss-statistics', { headers: this.httpHeaders });
  }

  getTOpWords() {
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    return this.http.get<any>(this.baseurl + 'top-words', { headers: this.httpHeaders, params: params });
  }

  getSentiment() {
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    return this.http.get<any>(this.baseurl + 'sentiment-stats', { headers: this.httpHeaders, params: params });
  }

  getTopPlatforms() {
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    return this.http.get<any>(this.baseurl + 'top-platform', { headers: this.httpHeaders, params: params });
  }

  getTopCategory() {
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    return this.http.get<any>(this.baseurl + 'top-category', { headers: this.httpHeaders, params: params });
  }


  getCategoryNews(category) {
    return this.http.post<any>(this.baseurl + 'category-news', { category: category, start_date: this.start_date, end_date: this.end_date },
     { headers: this.httpHeaders });
  }

  getCountryNews(country) {
    return this.http.post<any>(this.baseurl + 'country-news',
    { country: country, start_date: this.start_date, end_date: this.end_date }, { headers: this.httpHeaders });
  }

  getPlatformNews(platform) {
    return this.http.post<any>(this.baseurl + 'platform-news',
     { platform: platform, start_date: this.start_date, end_date: this.end_date }, { headers: this.httpHeaders });
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

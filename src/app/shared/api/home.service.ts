import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    public catUrl = "http://127.0.0.1:8000/api/users/categories";
    public providerUrl = "http://127.0.0.1:8000/api/users/providers";

  constructor(private http:HttpClient) { }

    getProviders() {
        return this.http.get<any>(this.providerUrl)
    }

    getCategories() {
        return this.http.get<any>(this.catUrl)
    }

}

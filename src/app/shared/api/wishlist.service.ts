import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class WishlistService {



    public favUrl = "http://127.0.0.1:8000/api/users/favorites";
    public removeUrl = "http://127.0.0.1:8000/api/users/favorites/destroy";

  constructor(private http:HttpClient) { }

    getfavorites() {
        return this.http.get<any>(this.favUrl)
    }

   removefav(id:any){
    return this.http.post<any>(this.removeUrl,{provider_id:id});

   }


}

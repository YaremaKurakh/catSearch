import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IBreed} from '../interfaces/breed.interface';
import {ICatSearch} from '../interfaces/cat-search.interface';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private API_URL = 'https://api.thecatapi.com/v1';
  private API_KEY = 'live_7rPu05866vRKl1n7yNBaG7sDUfdPKHwvKxQbmJ7kt75jKu38NM5CjSQGGSsI7w5u';

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<IBreed[]> {
    return this.http.get<IBreed[]>(`${this.API_URL}/breeds`, {
      headers: {
        'x-api-key': this.API_KEY
      }
    });
  }

  getCatsByFilter(breedId: string, limit: number): Observable<ICatSearch[]> {
    let params: any = {
      limit: limit.toString(),
    };
    if (breedId) {
      params.breed_ids = breedId;
    }
    return this.http.get<ICatSearch[]>(`${this.API_URL}/images/search`, {
      params,
      headers: {
        'x-api-key': this.API_KEY
      }
    });
  }
}

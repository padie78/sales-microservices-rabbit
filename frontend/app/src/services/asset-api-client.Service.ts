import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset.model';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private apiUrl = 'http://localhost:3000/assets';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a single asset by its unique identifier.
   */
  getById(id: string): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`);
  }

  /**
   * Retrieves a list of assets, optionally filtered by date.
   * @param date (Optional) Date string in YYYY-MM-DD format.
   */
  getByDate(date?: string): Observable<Asset[]> {
    let params = new HttpParams();
    if (date) params = params.append('date', date);
    return this.http.get<Asset[]>(this.apiUrl, { params });
  }

  /**
   * Performs a geospatial search within a specific Bounding Box.
   * Requires four coordinate parameters to define the area.
   */
  getWithin(minLat: number, minLon: number, maxLat: number, maxLon: number): Observable<Asset[]> {
    const params = new HttpParams()
      .set('minLat', minLat.toString())
      .set('minLon', minLon.toString())
      .set('maxLat', maxLat.toString())
      .set('maxLon', maxLon.toString());

    return this.http.get<Asset[]>(`${this.apiUrl}/within`, { params });
  }
}
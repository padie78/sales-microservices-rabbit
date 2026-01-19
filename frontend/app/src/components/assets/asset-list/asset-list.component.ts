import { Component } from '@angular/core';
import { Asset } from "src/models/asset.model";
import { AssetService } from "src/services/asset-api-client.Service";

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html'
})
export class AssetListComponent {
  assets: Asset[] = [];
  modo: 'ID' | 'DATE' | 'ZONE' = 'ID'; 
  loading = false;
  searchId = '';
  searchDate = '';
  bbox = { 
    minLat: 0, 
    minLon: 0, 
    maxLat: 0, 
    maxLon: 0 
  };

  constructor(private assetService: AssetService) {}

  buscar() {
    this.loading = true;
    this.assets = []; 

    if (this.modo === 'ID') {
      this.assetService.getById(this.searchId).subscribe({
        next: (res) => {
          this.assets = [res];
          this.loading = false;
        },
        error: (err) => {
          alert('Asset NOT FOUND');
          this.loading = false;
        }
      });
    } 
    else if (this.modo === 'DATE') {
      this.assetService.getByDate(this.searchDate).subscribe({
        next: (res) => {
          this.assets = res;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
    else if (this.modo === 'ZONE') {
      this.assetService.getWithin(
        this.bbox.minLat, 
        this.bbox.minLon, 
        this.bbox.maxLat, 
        this.bbox.maxLon
      ).subscribe({
        next: (res) => {
          this.assets = res;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }
}
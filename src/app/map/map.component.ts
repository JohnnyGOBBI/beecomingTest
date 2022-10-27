import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Loader } from "@googlemaps/js-api-loader"
import { Capital } from '../list/capital';
import { ListService } from '../services/list.service';

const capitals = require('../../assets/db.json');
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  map: google.maps.Map | undefined;

  infoWindow: google.maps.InfoWindow | undefined;

  marker : google.maps.Marker | undefined;

  capitals!: Capital[]; 

  selectedCapital!: Capital;

  showInformations: boolean = false;

  googleAPIKey: string = environment.googleAPIKey;
  
  constructor(private listService: ListService) { 
  }

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: this.googleAPIKey,
      version: "weekly",
    });

    this.listService.getCapitals().subscribe((capitals: Capital[]) => {
      this.capitals =  capitals;
      loader.load().then(() => {
        this.setMap();
      });  
    });
  }


  setMap() {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: {lat: 0, lng: 0},
      zoom: 2,
    });
    
    for (let i = 0; i < this.capitals.length; i++) {
      const marker = new google.maps.Marker({
        position: this.capitals[i].center,
        map: this.map,
        label: this.capitals[i].name,
        title: this.capitals[i].name,
        clickable: true
    });
      marker.addListener('click', (event: MouseEvent) => {
        this.selectedCapital = this.capitals[i];
        this.map?.setCenter(this.capitals[i].center);
        this.map?.setZoom(<number> this.capitals[i].zoom);
      })
    }
  }

  unsetZoom() {
      this.map?.setCenter({lat:0, lng:0});
      this.map?.setZoom(2);
  }

}

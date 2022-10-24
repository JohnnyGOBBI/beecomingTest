import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Loader } from "@googlemaps/js-api-loader"
import { Capital } from '../list/list'

const capitals = require('../../assets/db.json');
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  map: google.maps.Map | undefined;

  capitals: Capital[] = capitals; 

  selectedCapital: Capital = capitals[0];

  googleAPIKey: string = environment.googleAPIKey;
  
  constructor() { 
  }

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: this.googleAPIKey,
      version: "weekly",
    });
    
    loader.load().then(() => {
      this.setSelectedCapital();
    });  
    
  }

  changeCapital() {
    this.selectedCapital = this.capitals[1];
    this.setSelectedCapital();
  }

  setSelectedCapital() {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.selectedCapital.center,
      zoom: this.selectedCapital.zoom,
    });

    const marker = new google.maps.Marker({
      position: this.selectedCapital.center,
      map: this.map,
    })
  }




}

import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  
  xmlData: any;

  constructor( public apiService: ApiService ){

  } 
  
  ngOnInit(): void {
    this.apiService.loadXML();
    this.apiService.xmlItems.subscribe(data => this.xmlData = data);
  }

}

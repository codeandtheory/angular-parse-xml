import { Component, OnInit } from '@angular/core';
import { ApiXMLService } from './services/api-xml.service';
import { ApiJSONService } from './services/api-json.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  xmlData: any;
  jsonData: any;

  constructor( public apiXMLService: ApiXMLService, public apiJSONService: ApiJSONService ){

  } 
  
  ngOnInit(): void {
    // Load XML
    this.apiXMLService.loadXML();
    this.apiXMLService.xmlItems.subscribe(data => this.xmlData = data);

    // Load JSON
    this.apiJSONService.loadJSON();
    this.apiJSONService.jsonItems.subscribe(data => this.jsonData = data);
    console.log(this.jsonData);
  }

}

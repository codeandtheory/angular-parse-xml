#Demo for fetching data from XML file
Include `services/api-xml.service.ts` in component to get XML data as Observable
Include `services/api-json.service.ts` in component to get JSON data as Observable

#app.component.ts
#XML
run the loadXML function from the API Service to populate the table
get the data by subscribing to the Observable subject `xmlItems` from the service
```
this.apiXMLService.loadXML();
this.apiXMLService.xmlItems.subscribe(data => this.xmlData = data);  
```
Loop through data to display in the component.html
```
<tr *ngFor="let item of xmlData">    
  <td>{{item.companyNumber}}</td>    
  <td>{{item.subjectNumber}}</td>    
  <td>{{item.telephoneAreacode}}</td>    
  <td>{{item.telephoneNumber}}</td>    
  <td>{{item.commAddressLine}}</td>    
  <td>{{item.commAddressCity}}</td>    
</tr>  
  ```
  
#JSON
run the loadJSON function from the API Service to populate the table
get the data by subscribing to the Observable subject `jsonItems` from the service
```
this.apiJSONService.loadXML();
this.apiJSONService.xmlItems.subscribe(data => this.jsonData = data);  
```
Loop through data to display in the component.html
```
<tr *ngFor="let item of jsonData">    
  <td>{{item.companyNumber}}</td>    
  <td>{{item.subjectNumber}}</td>    
  <td>{{item.telephoneAreacode}}</td>    
  <td>{{item.telephoneNumber}}</td>    
  <td>{{item.commAddressLine}}</td>    
  <td>{{item.commAddressCity}}</td>    
</tr>  
  ```
  

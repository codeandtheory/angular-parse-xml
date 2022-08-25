#Demo for fetching data from XML file
Include `services/api.service.ts` in component to get XML data as Observable

#app.component.ts
run the loadXML function from the API Service to populate the table
get the data by subscribing to the Observable subject `xmlItems` from the service
```
this.apiService.loadXML();
this.apiService.xmlItems.subscribe(data => this.xmlData = data);  
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
  

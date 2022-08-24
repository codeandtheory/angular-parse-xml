import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import xml2js from 'xml2js'; 
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(private http:HttpClient) { 
      this.loadXML(); 
    }
    xmlItems: any = new Subject();

    public loadXML(): Observable<any> {
      this.http.get('assets/EFX-BusinessSearch-By-CompanyName.xml',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      })  
      .subscribe((data) => {  
        this.parseXML(data)  
          .then((data) => {  
              this.xmlItems.next(data);
            });  
        });  
        console.log(this.xmlItems);
        return this.xmlItems.asObservable();
    }

    parseXML(data) {  
      return new Promise(resolve => {  
        var k: string | number,  
          arr = [],  
          parser = new xml2js.Parser(  
            {  
              trim: true,  
              explicitArray: true  
            });  

            parser.parseString(data, function (err, result) {  
            var obj = result.EfxTransmit.EfxReport[0].CNCommercialMultiples[0].CNCommercialMultiple;  
            for (k in obj) {  
                var item = obj[k];  
                const companyId = item.CompanyId[0];
                const commAddress = item.CommAddress[0];
                const telephoneExists = typeof companyId.Telephone !== 'undefined' ? true : false; 
                
                arr.push({  
                    companyNumber: companyId.CompanyNumber[0],  
                    subjectNumber: companyId.SubjectNumber[0],  
                    name: companyId.Name[0],  
                    telephoneAreacode: telephoneExists ? companyId.Telephone[0].ParsedTelephone[0].AreaCode[0] : null, 
                    telephoneNumber: telephoneExists ? companyId.Telephone[0].ParsedTelephone[0].Number[0] : null,  
                    commAddressLine: commAddress.Lines[0].Line[0],  
                    commAddressCity: commAddress.City[0],  
                });  
            }  
            resolve(arr);  
            });  
        });  
    }  
}
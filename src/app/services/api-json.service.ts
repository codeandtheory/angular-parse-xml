import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiJSONService {

    constructor(private http:HttpClient) { 
      this.loadJSON(); 
    }
    jsonItems: any = new Subject();

    public loadJSON(): Observable<any> {
        this.http.get('assets/EFX-BusinessSearch-By-CompanyName.json',  
        {  
            headers: new HttpHeaders()  
                .append('Access-Control-Allow-Methods', 'GET')  
                .append('Access-Control-Allow-Origin', '*')  
                .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
            responseType: 'json'  
        })  
        .subscribe((data) => {
            this.parseJSON(data)  
            .then((data) => {  
              this.jsonItems.next(data);
            });  
        });  
        
        return this.jsonItems.asObservable();
    }
    
    parseJSON(data) {  
        return new Promise(resolve => {  
            let d: string | number;
            let arr = [];
            const json = data;
            const obj = json.EfxTransmit[0].EfxReport[0].CNCommercialMultiples[0].CNCommercialMultiple;

            console.log(obj);

            for( d in obj){
                let item = obj[d];
                console.log(item);
                const companyId = item.CompanyId[0];
                const commAddress = item.CommAddress[0];
                const telephoneExists = typeof companyId.Telephone !== 'undefined' ? true : false; 

                arr.push({
                    companyNumber: companyId.CompanyNumber,  
                    subjectNumber: companyId.SubjectNumber,  
                    name: companyId.Name,  
                    telephoneAreacode: telephoneExists ? companyId.Telephone[0].ParsedTelephone[0].AreaCode : null, 
                    telephoneNumber: telephoneExists ? companyId.Telephone[0].ParsedTelephone[0].Number : null,  
                    commAddressLine: commAddress.Lines[0].Line,  
                    commAddressCity: commAddress.City,  
                })
            }
            
            arr.push(data);

            resolve(arr);
        });  
      }  
}
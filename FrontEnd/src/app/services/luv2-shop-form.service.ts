import { Observable, map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private contriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient:HttpClient) { }

  getCountries() : Observable<Country[]>{

  return this.httpClient.get<GetResponseCountries>(this.contriesUrl).pipe(
    map(response => response._embedded.countries)
  );
  }

  getStates(theCountryCode:string) : Observable<State[]>{
    //searchUrl
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
    }


  getCreditCardMonths(startMonth:number):Observable<number[]>{

    let data:number[]=[];

    //build an array for "month" dropdown list
    //-start at current month and loop untill

    for(let theMonth = startMonth; theMonth<=12; theMonth++){
      data.push(theMonth);
      console.log("month is coming"+data)
    }
    return of(data);


  }

  getCreditCardYears():Observable<number[]>{

    let data:number[]=[];

    //build an array for "year" downlist
    //-start at current year and loop for next 10 years

    const startYear:number=new Date().getFullYear();
    console.log(startYear)
    const endYear:number=startYear + 10;

    for(let theYear = startYear; theYear<=endYear; theYear++){
      data.push(theYear);
    }
    return of(data);
  }

  

}
interface GetResponseCountries{
  _embedded :{
  countries : Country[]; 
  }
}
interface GetResponseStates{
  _embedded:{
    states:State[];
  }
}
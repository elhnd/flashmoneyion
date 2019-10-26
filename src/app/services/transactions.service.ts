import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient ,HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private _urltransenv = "http://localhost:8000/api/envoi";
  private _ulrtransret = "http://localhost:8000/api/retrait";
  private _urlfindcode = "http://127.0.0.1:8000/api/findcode";
  private _detail = "http://127.0.0.1:8000/api/transperiode/";
  
  private _urllistrans = "http://127.0.0.1:8000/api/transperiode";
  private _urltransuser = "http://localhost:8000/api/transuser";
  private _urltranslistret = "http://localhost:8000/api/transuserret";
  private _urltranslistenv = "http://localhost:8000/api/transuserenv";


  constructor(private _http: HttpClient) { }

  private headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));

  envoie(transaction)
  {
    return this._http.post<any>(this._urltransenv,transaction,{headers:this.headers})
    .pipe(catchError(this.errorHandlerpost))
  }

  findcode(data)
  {
    return this._http.post<any>(this._urlfindcode,data,{headers:this.headers})
    .pipe(catchError(this.errorHandlerpost))

  }

  retrait(data)
  {
    return this._http.post<any>(this._ulrtransret,data,{headers:this.headers})
  }
  errorHandlerpost(error: HttpErrorResponse){
    return throwError(error);
  }

  transperiode(data){
    return this._http.post<any>(this._urllistrans,data,{headers:this.headers}).pipe(catchError(this.errorHandlerpost));
  }

  details(id):Observable<any>
    {
      return this._http.get<any>(this._detail+`${id}`,{headers:this.headers});
    }

  transenv()
  {
    return this._http.get<any>(this._urltranslistenv,{headers:this.headers})
  }
  transret()
  {
    return this._http.get<any>(this._urltranslistret,{headers:this.headers})
  }
  transuser()
  {
    return this._http.get<any>(this._urltransuser,{headers:this.headers})
  }
}
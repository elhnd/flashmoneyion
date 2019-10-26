import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ResourceLoader } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

 
  host2:string = "http://localhost:8000/api/login_check";
  public jwt:string;
  username:string;
  roles:string;


  constructor(private http: HttpClient,private _router: Router) { }


  login(data:any){
   return this.http.post(this.host2, data,{observe:'response'});
 
  }

  saveToken(jwt: string){
    localStorage.setItem('token',jwt); 
    this.jwt=jwt;
    this.parseJWT();
  }
 
  parseJWT(){
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);   
    this.username = objJWT.username;
    this.roles = objJWT.roles;
    localStorage.setItem('username', this.username);
    localStorage.setItem('roles', this.roles);
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn()
  {
    return !!localStorage.getItem('token')
  }

  isSupAdminPart(){
    if(localStorage.getItem('roles')=='ROLE_SUPER_ADMIN_PARTENAIRE,')
    return true ;

  }

  isAdmin(){
    if(localStorage.getItem('roles')=='ROLE_ADMIN_SYSTEM,')
    
    return true ;
  }

  isAdminPart(){
    if(localStorage.getItem('roles')=='ROLE_ADMIN_PARTENAIRE,')   
    return true;
  }

  isCaissier(){
    if(localStorage.getItem('roles')=='ROLE_CAISSIER,')

    return true
  }

  isUserPart(){
    if(localStorage.getItem('roles')=='ROLE_USER_PARTENAIRE,')
    return true
  }

  isAdminSyst(){
    if( localStorage.getItem('roles')=='ROLE_SUPER_ADMIN,')
    return true
  }

  isAuthenticated(){

    return ( this.isAdmin() || this.isUserPart() || this.isSupAdminPart() || this.isCaissier() );
  }

  logout() {
    localStorage.clear();
    window.location.reload()
    this._router.navigate(['/login']);
  }
}

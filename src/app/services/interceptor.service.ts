import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req,next){
    let authService=this.injector.get(AuthenticationService)
    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.jwt}`
      }
    })
    return next.handle(tokenizedReq)
  }
}

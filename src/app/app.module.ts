import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginPage } from 'src/app/pages/login/login.page'
import { LoginPageModule } from '../app/pages/login/login.module';
import { TransactionsPageModule } from '../app/pages/transactions/transactions.module';
import { TransactionsService } from './services/transactions.service';
import { InterceptorService } from './services/interceptor.service';
import { ListesPageModule } from './pages/listes/listes.module'
import { DetailtransPageModule } from './pages/detailtrans/detailtrans.module';
import { ListesService } from './services/listes.service';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [LoginPage],
  imports: [
     BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     HttpClientModule,
     ReactiveFormsModule,
     BrowserAnimationsModule,
     MaterialModule,
     LoginPageModule,
     OrderModule,
     TransactionsPageModule,
     ListesPageModule,
     DetailtransPageModule
    ],
  providers: [
    StatusBar,
    TransactionsService,
    ListesService,
    SplashScreen,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy
    },
    // {
    // provide: HTTP_INTERCEPTORS,
    // useClass: InterceptorService,
    // multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

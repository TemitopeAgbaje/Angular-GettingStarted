import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    //exposes and configures the routes added
    RouterModule.forRoot([

      {
        path:'welcome', component: WelcomeComponent
      },
      {
        //default route
        path: '', redirectTo: 'welcome', pathMatch:'full'

      },
      {
        //wildcard route.. incase no one matchs
        path: '**',redirectTo:'welcome', pathMatch: 'full'
      }
    ]),
    ProductModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { AppHttpInterceptor } from './http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }]
})

export class CoreModule { }
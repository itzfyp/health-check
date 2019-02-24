import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
export class AppHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone(
      {
        params: req.params
          .set('api_key', 'FJXBDE77ED3Z57FE')
          .set('days', '1'),
        headers: req.headers
          .append('Access-Control-Allow-Origin', '*')

      }
    );
    return next.handle(req);
  }

}
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {

    private headers = new HttpHeaders().set('Authorization', 'token');

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        const reqCloned = req.clone( {headers: this.headers});
        return next.handle(reqCloned);
    }
}
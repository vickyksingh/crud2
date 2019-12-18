import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('adding interceptor')

        let modifiedheader = req.clone({headers: req.headers.append('auth', 'xyx')
        })
        return next.handle(modifiedheader)
    }
}
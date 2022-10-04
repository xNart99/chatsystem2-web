import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageService.get('token') || {};
        
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
    
        return next.handle(request).pipe( tap(() => {},
          (err: any) => {
    
            if (err instanceof HttpErrorResponse) {
    
              if (err.status !== 401) {
                
                return;
              }
              
            this.storageService.clear();
            }
        }));
      }
}
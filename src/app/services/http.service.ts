import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpMethod, HttpOptions, HttpRequestOptions } from "../models/http.model";

@Injectable()
export class HttpService {
    private baseUrl = environment?.url;

    constructor(protected httpClient: HttpClient) {}

    get<T>(url: string, options?: Partial<HttpOptions>) {
        return this.httpClient.get<T>(this.buildUrl(url, options?.isRawUrl), this.buildOptions(options));
      }
    
      post<T>(url: string, body: any, options?: Partial<HttpOptions>) {
        return this.httpClient.post<T>(this.buildUrl(url, options?.isRawUrl), body, this.buildOptions(options));
      }
    
      put<T>(url: string, body: any, options?: Partial<HttpOptions>) {
        return this.httpClient.put<T>(this.buildUrl(url, options?.isRawUrl), body, this.buildOptions(options));
      }
    
      delete<T>(url: string, options?: Partial<HttpOptions>) {
        return this.httpClient.delete<T>(this.buildUrl(url, options?.isRawUrl), this.buildOptions(options));
      }
    
      request<T>(method: HttpMethod, url: string, options?: Partial<HttpRequestOptions>) {
        return this.httpClient.request<T>(method, this.buildUrl(url, options?.isRawUrl), options);
      }
    
      buildHeader(name: string, value: string): HttpHeaders {
        return new HttpHeaders().set(name, value);
      }
    
      private buildUrl(url: string, isRawUrl = false): string {
        return isRawUrl ? url : `${this.baseUrl}${url}`;
      }
    
      private buildOptions(options?: Partial<HttpOptions>): Partial<HttpOptions> {
        return options || {};
      }
}
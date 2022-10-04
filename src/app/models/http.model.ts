export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpOptions {
  headers: any;
  params: any;
  observe: any;
  responseType: any;
  reportProgress: boolean;
  withCredentials: boolean;
  isRawUrl?: boolean;
}

export interface HttpRequestOptions extends HttpOptions {
  body: any;
}
import axios, {HttpStatusCode, type AxiosInstance, type AxiosRequestConfig} from 'axios';

import {AnyJson} from '../types/any.type';

export interface Headers {
  [header: string]: string | number;
}

export class Http {
  private baseURL: string;
  private headers: Headers;
  private axiosInstance: AxiosInstance;
  private refreshToken: (() => Promise<string>) | null = null;

  private defaultRequestHeaders: Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };

  public constructor(baseURL: string = '', headers: Headers = {}) {
    this.baseURL = baseURL;
    this.headers = {...this.defaultRequestHeaders, ...headers};
    this.axiosInstance = axios.create({baseURL, headers});
  }

  public setBaseURL(baseURL: string) {
    this.baseURL = baseURL;
    this.createAxiosInstance();
  }

  public addBearerToken(token: string) {
    this.addHeader('Authorization', `Bearer ${token}`);
  }

  public addHeader(header: string, value: string | number) {
    this.headers[header] = value;
    this.createAxiosInstance();
  }

  public addRefreshToken = (refreshAccessToken: () => Promise<string>) => {
    this.refreshToken = refreshAccessToken;
  };

  public cleanHeaders() {
    this.headers = {};
    this.createAxiosInstance();
  }

  public async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: AnyJson, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: AnyJson | FormData, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: AnyJson, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  private createAxiosInstance() {
    this.axiosInstance = axios.create({baseURL: this.baseURL, headers: this.headers});

    if (this.refreshToken !== null) {
      this.axiosInstance.interceptors.response.use(
        response => response,
        async error => {
          const originalRequest = error.config;

          if (
            [HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(error.response?.status) &&
            this.refreshToken !== null &&
            !originalRequest._retry
          ) {
            const accessToken = await this.refreshToken();

            this.addBearerToken(accessToken);
            this.createAxiosInstance();

            const originalRequestWithUpdatedToken = {
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                ...this.headers,
              },
              _retry: true,
            };

            return this.axiosInstance.request(originalRequestWithUpdatedToken);
          }
          return Promise.reject(error);
        },
      );
    }
  }
}

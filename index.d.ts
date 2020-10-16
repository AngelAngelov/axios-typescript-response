import { AxiosRequestConfig, AxiosStatic } from "axios";

export class Http {
    public axiosInstance: AxiosStatic
    public get<T>(url: string, type: (new (arg: any) => T), useConstructor: Boolean, config?: AxiosRequestConfig | undefined): Promise<any> 
    public delete<T>(url: string, type: (new (arg: any) => T), useConstructor: Boolean, config?: AxiosRequestConfig | undefined): Promise<any> 
    public post<T>(url: string, payload: any, type: (new (arg: any) => T), useConstructor: Boolean, config?: AxiosRequestConfig | undefined): Promise<any> 
    public put<T>(url: string, payload: any, type: (new (arg: any) => T), useConstructor: Boolean, config?: AxiosRequestConfig | undefined): Promise<any> 
}
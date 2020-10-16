import axios, { AxiosRequestConfig } from 'axios';

export class Http {
    /**
     * HTTP GET request
     * Returns Promise
     * @param url String representation of url
     * @param type Typescript class type
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false)
     * @param config AxiosRequestConfig | undefined. Additional axios configuration
     */
    public get<T>(url: string, type: (new (arg: any) => T), useConstructor: Boolean = false, config?: AxiosRequestConfig | undefined): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(url, config);
                return resolve(this.parseData(type, data, useConstructor));
            } catch (error) {
                return reject(error);
            }
        })
    }

    /**
     * HTTP DELETE request
     * Returns Promise
     * @param url String representation of url
     * @param type Typescript class type
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false)
     * @param config AxiosRequestConfig | undefined. Additional axios configuration
     */
    public delete<T>(url: string, type: (new (arg: any) => T), useConstructor: Boolean = false, config?: AxiosRequestConfig | undefined): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.delete(url, config);
                return resolve(this.parseData(type, data, useConstructor));
            } catch (error) {
                return reject(error);
            }
        })
    }

    /**
     * HTTP POST request
     * Returns Promise
     * @param url String representation of url
     * @param type Typescript class type
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false)
     * @param config AxiosRequestConfig | undefined. Additional axios configuration
     */
    public post<T>(url: string, payload: any, type: (new (arg: any) => T), useConstructor: Boolean = false, config?: AxiosRequestConfig | undefined): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.post(url, payload, config);
                return resolve(this.parseData(type, data, useConstructor));
            } catch (error) {
                return reject(error);
            }
        })
    }

    /**
     * HTTP PUT request
     * Returns Promise
     * @param url String representation of url
     * @param type Typescript class type
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false)
     * @param config AxiosRequestConfig | undefined. Additional axios configuration
     */
    public put<T>(url: string, payload: any, type: (new (arg: any) => T), useConstructor: Boolean = false, config?: AxiosRequestConfig | undefined): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.put(url, payload, config);
                return resolve(this.parseData(type, data, useConstructor))
            } catch (error) {
                return reject(error);
            }
        })
    }

    /**
     * Creates response object
     * @param type Typescript class type to be returned
     * @param data Response data
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false)
     */
    private createObject(type: any, data: any, useConstructor: Boolean = false): any {
        let result: any;

        if (useConstructor) {
            result = new type(data);
        } else {
            result = new type();
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(result, key)) {
                    result[key] = data[key];
                }
            }
        }

        return result;
    }

    /**
     * Parse response data, before creating response object
     * @param type Typescript class type to be returned
     * @param data Response data
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false)
     */
    private parseData(type: any, data: any, useConstructor: Boolean = false) {
        if (!data) {
            return;
        }

        if (data instanceof Array) {
            const result = data.map(x => this.createObject(type, x, useConstructor));
            return result;
        } else {
            const result = this.createObject(type, data, useConstructor);
            return result;
        }

    }

}

const http = new Http();
export default http;
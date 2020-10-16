import axios, { AxiosRequestConfig } from 'axios';

export class Http {
    /**
     * Get axios instance if additional configuration is needed
     */
    get axiosInstance() { return axios};

    /**
     * HTTP GET request
     * Returns Promise
     * @param url String representation of url
     * @param type Typescript class type. Optional.
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false). Optional.
     * @param config AxiosRequestConfig. Additional axios configuration. Optional.
     */
    public get<T>(url: string, type?: (new (arg: any) => T), useConstructor?: Boolean, config?: AxiosRequestConfig): Promise<any> {
        if (type) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axios.get(url, config);
                    return resolve(this.parseData(type, data, useConstructor));
                } catch (error) {
                    return reject(error);
                }
            })
        } else {
            //if there is no type, return axios default behavior
            return axios.get(url, config);
        }
    }

    /**
     * HTTP DELETE request
     * Returns Promise
     * @param url String representation of url
     * @param type Typescript class type.Optional.
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false).Optional.
     * @param config AxiosRequestConfig | undefined. Additional axios configuration.Optional.
     */
    public delete<T>(url: string, type?: (new (arg: any) => T), useConstructor?: Boolean, config?: AxiosRequestConfig | undefined): Promise<any> {
        if (type) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axios.delete(url, config);
                    return resolve(this.parseData(type, data, useConstructor));
                } catch (error) {
                    return reject(error);
                }
            })
        } else {
            //if there is no type, return axios default behavior
            return axios.delete(url, config);
        }
    }

    /**
     * HTTP POST request
     * Returns Promise
     * @param url String representation of url
     * @param type Typescript class type.Optional.
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false).Optional.
     * @param config AxiosRequestConfig | undefined. Additional axios configuration.Optional.
     */
    public post<T>(url: string, payload: any, type?: (new (arg: any) => T), useConstructor?: Boolean, config?: AxiosRequestConfig | undefined): Promise<any> {
        if (type) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axios.post(url, payload, config);
                    return resolve(this.parseData(type, data, useConstructor));
                } catch (error) {
                    return reject(error);
                }
            });
        } else {
            //if there is no type, return axios default behavior
            return axios.post(url, payload, config);
        }
    }

    /**
     * HTTP PUT request
     * Returns Promise
     * @param url String representation of url
     * @param type Typescript class type.Optional.
     * @param useConstructor Boolean (default false). Indicates if we want to use class constructor (true) or use default constructor (false).Optional.
     * @param config AxiosRequestConfig | undefined. Additional axios configuration.Optional.
     */
    public put<T>(url: string, payload: any, type?: (new (arg: any) => T), useConstructor?: Boolean, config?: AxiosRequestConfig | undefined): Promise<any> {
        if (type) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axios.put(url, payload, config);
                    return resolve(this.parseData(type, data, useConstructor))
                } catch (error) {
                    return reject(error);
                }
            })
        } else {
            //if there is no type, return axios default behavior
            return axios.put(url, payload, config);
        }
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

export default new Http();;
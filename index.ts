import axios, { AxiosRequestConfig } from 'axios';

class Http {
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

    private createObject(type: any, data: any, useConstructor: Boolean = false) {
        let result: any;

        if (useConstructor) {
            result = new type(data);
        } else {
            result = new type(null);
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(result, key)) {
                    result[key] = data[key];
                }
            }
        }

        return result;
    }

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
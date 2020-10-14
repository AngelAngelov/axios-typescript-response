import axios, { AxiosRequestConfig } from 'axios';

function createObject(type: any, data: any, useConstructor: Boolean = false) {
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

function parseData(type: any, data: any, useConstructor: Boolean = false) {
    if (!data) {
        return;
    }

    if (data instanceof Array) {
        const result = data.map(x => createObject(type, x, useConstructor));
        return result;
    } else {
        const result = createObject(type, data, useConstructor);
        return result;
    }

}


export default {
    get<T>(url: string, type: (new (arg: any) => T), useConstructor: Boolean = false, config?: AxiosRequestConfig | undefined): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(url, config);
                return resolve(parseData(type, data, useConstructor));
            } catch (error) {
                return reject(error);
            }
        })
    },
    delete<T>(url: string, type: (new (arg: any) => T), useConstructor: Boolean = false, config?: AxiosRequestConfig | undefined): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.delete(url, config);
                return resolve(parseData(type, data, useConstructor));
            } catch (error) {
                return reject(error);
            }
        })
    },
    post<T>(url: string, payload: any, type: (new (arg: any) => T), useConstructor: Boolean = false,config?: AxiosRequestConfig | undefined) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.post(url, payload, config);
                return resolve(parseData(type, data, useConstructor));
            } catch (error) {
                return reject(error);
            }
        })
    },
    put<T>(url: string, payload: any, type: (new (arg: any) => T), useConstructor: Boolean = false,config?: AxiosRequestConfig | undefined) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.put(url, payload, config);
                return resolve(parseData(type, data, useConstructor))
            } catch (error) {
                return reject(error);
            }
        })
    },
}
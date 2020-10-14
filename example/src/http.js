"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function createObject(type, data, useConstructor = false) {
    let result;
    if (useConstructor) {
        result = new type(data);
    }
    else {
        result = new type(null);
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(result, key)) {
                result[key] = data[key];
            }
        }
    }
    return result;
}
function parseData(type, data, useConstructor = false) {
    if (!data) {
        return;
    }
    if (data instanceof Array) {
        const result = data.map(x => createObject(type, x, useConstructor));
        return result;
    }
    else {
        const result = createObject(type, data, useConstructor);
        return result;
    }
}
exports.default = {
    get(url, type, useConstructor = false, config) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(url, config);
                return resolve(parseData(type, data, useConstructor));
            }
            catch (error) {
                return reject(error);
            }
        }));
    },
    delete(url, type, useConstructor = false, config) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.delete(url, config);
                return resolve(parseData(type, data, useConstructor));
            }
            catch (error) {
                return reject(error);
            }
        }));
    },
    post(url, payload, type, useConstructor = false, config) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.post(url, payload, config);
                return resolve(parseData(type, data, useConstructor));
            }
            catch (error) {
                return reject(error);
            }
        }));
    },
    put(url, payload, type, useConstructor = false, config) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.put(url, payload, config);
                return resolve(parseData(type, data, useConstructor));
            }
            catch (error) {
                return reject(error);
            }
        }));
    },
};

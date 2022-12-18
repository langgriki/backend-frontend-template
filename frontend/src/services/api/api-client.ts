//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export * as ProductClient from './api-client/ProductClient';

export * as ProductQuery from './api-client/ProductQuery';



export * as SignUrlClient from './api-client/SignUrlClient';

export * as SignUrlQuery from './api-client/SignUrlQuery';



export * as TestDataClient from './api-client/TestDataClient';

export * as TestDataQuery from './api-client/TestDataQuery';



export * as VersionClient from './api-client/VersionClient';

export * as VersionQuery from './api-client/VersionQuery';



export class ProblemDetails implements IProblemDetails {
    type?: string | null;
    title?: string | null;
    status?: number | null;
    detail?: string | null;
    instance?: string | null;

    [key: string]: any;

    constructor(data?: IProblemDetails) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            this.type = _data["type"];
            this.title = _data["title"];
            this.status = _data["status"];
            this.detail = _data["detail"];
            this.instance = _data["instance"];
        }
    }

    static fromJS(data: any): ProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["type"] = this.type;
        data["title"] = this.title;
        data["status"] = this.status;
        data["detail"] = this.detail;
        data["instance"] = this.instance;
        return data;
    }
}

export interface IProblemDetails {
    type?: string | null;
    title?: string | null;
    status?: number | null;
    detail?: string | null;
    instance?: string | null;

    [key: string]: any;
}

export class HttpValidationProblemDetails extends ProblemDetails implements IHttpValidationProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;

    constructor(data?: IHttpValidationProblemDetails) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            if (_data["errors"]) {
                this.errors = {} as any;
                for (let key in _data["errors"]) {
                    if (_data["errors"].hasOwnProperty(key))
                        (<any>this.errors)![key] = _data["errors"][key] !== undefined ? _data["errors"][key] : [];
                }
            }
        }
    }

    static fromJS(data: any): HttpValidationProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new HttpValidationProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        if (this.errors) {
            data["errors"] = {};
            for (let key in this.errors) {
                if (this.errors.hasOwnProperty(key))
                    (<any>data["errors"])[key] = (<any>this.errors)[key];
            }
        }
        super.toJSON(data);
        return data;
    }
}

export interface IHttpValidationProblemDetails extends IProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;
}

export class ValidationProblemDetails extends HttpValidationProblemDetails implements IValidationProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;

    constructor(data?: IValidationProblemDetails) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            if (_data["errors"]) {
                this.errors = {} as any;
                for (let key in _data["errors"]) {
                    if (_data["errors"].hasOwnProperty(key))
                        (<any>this.errors)![key] = _data["errors"][key] !== undefined ? _data["errors"][key] : [];
                }
            }
        }
    }

    static fromJS(data: any): ValidationProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ValidationProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        if (this.errors) {
            data["errors"] = {};
            for (let key in this.errors) {
                if (this.errors.hasOwnProperty(key))
                    (<any>data["errors"])[key] = (<any>this.errors)[key];
            }
        }
        super.toJSON(data);
        return data;
    }
}

export interface IValidationProblemDetails extends IHttpValidationProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;
}

export class ProductDto implements IProductDto {
    id!: number;
    title!: string;
    productType!: ProductType;
    lastStockUpdatedAt!: Date;

    constructor(data?: IProductDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.productType = _data["productType"];
            this.lastStockUpdatedAt = _data["lastStockUpdatedAt"] ? parseDateOnly(_data["lastStockUpdatedAt"].toString()) : <any>null;
        }
    }

    static fromJS(data: any): ProductDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProductDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["productType"] = this.productType;
        data["lastStockUpdatedAt"] = this.lastStockUpdatedAt && formatDate(this.lastStockUpdatedAt);
        return data;
    }
}

export interface IProductDto {
    id: number;
    title: string;
    productType: ProductType;
    lastStockUpdatedAt: Date;
}

export enum ProductType {
    Undefined = "Undefined",
    Auto = "Auto",
    Electronic = "Electronic",
    Other = "Other",
}

export class CreateProductDto implements ICreateProductDto {
    title!: string;
    productType!: ProductType;
    lastStockUpdatedAt!: Date;

    constructor(data?: ICreateProductDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data["title"];
            this.productType = _data["productType"];
            this.lastStockUpdatedAt = _data["lastStockUpdatedAt"] ? parseDateOnly(_data["lastStockUpdatedAt"].toString()) : <any>null;
        }
    }

    static fromJS(data: any): CreateProductDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateProductDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["title"] = this.title;
        data["productType"] = this.productType;
        data["lastStockUpdatedAt"] = this.lastStockUpdatedAt && formatDate(this.lastStockUpdatedAt);
        return data;
    }
}

export interface ICreateProductDto {
    title: string;
    productType: ProductType;
    lastStockUpdatedAt: Date;
}

export class PatchProductDto implements IPatchProductDto {
    title?: string;
    productType?: ProductType;
    lastStockUpdatedAt?: Date;

    constructor(data?: IPatchProductDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data["title"];
            this.productType = _data["productType"];
            this.lastStockUpdatedAt = _data["lastStockUpdatedAt"] ? parseDateOnly(_data["lastStockUpdatedAt"].toString()) : <any>null;
        }
    }

    static fromJS(data: any): PatchProductDto {
        data = typeof data === 'object' ? data : {};
        let result = new PatchProductDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["title"] = this.title;
        data["productType"] = this.productType;
        data["lastStockUpdatedAt"] = this.lastStockUpdatedAt && formatDate(this.lastStockUpdatedAt);
        return data;
    }
}

export interface IPatchProductDto {
    title?: string;
    productType?: ProductType;
    lastStockUpdatedAt?: Date;
}

export class PagedResultOfProductListItemDto implements IPagedResultOfProductListItemDto {
    data!: ProductListItemDto[];
    totalCount!: number;

    constructor(data?: IPagedResultOfProductListItemDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.data = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["data"])) {
                this.data = [] as any;
                for (let item of _data["data"])
                    this.data!.push(ProductListItemDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): PagedResultOfProductListItemDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfProductListItemDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.data)) {
            data["data"] = [];
            for (let item of this.data)
                data["data"].push(item.toJSON());
        }
        data["totalCount"] = this.totalCount;
        return data;
    }
}

export interface IPagedResultOfProductListItemDto {
    data: ProductListItemDto[];
    totalCount: number;
}

export class ProductListItemDto implements IProductListItemDto {
    id!: number;
    title!: string;
    productType!: ProductType;
    lastStockUpdatedAt!: Date;

    constructor(data?: IProductListItemDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.productType = _data["productType"];
            this.lastStockUpdatedAt = _data["lastStockUpdatedAt"] ? parseDateOnly(_data["lastStockUpdatedAt"].toString()) : <any>null;
        }
    }

    static fromJS(data: any): ProductListItemDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProductListItemDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["productType"] = this.productType;
        data["lastStockUpdatedAt"] = this.lastStockUpdatedAt && formatDate(this.lastStockUpdatedAt);
        return data;
    }
}

export interface IProductListItemDto {
    id: number;
    title: string;
    productType: ProductType;
    lastStockUpdatedAt: Date;
}

export enum SortOrder {
    Asc = "Asc",
    Desc = "Desc",
}

export function formatDate(d: Date) {
    return d.getFullYear() + '-' + 
        (d.getMonth() < 9 ? ('0' + (d.getMonth()+1)) : (d.getMonth()+1)) + '-' +
        (d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate());
}

function parseDateOnly(s: string) {
    const date = new Date(s);
    return new Date(date.getTime() + 
        date.getTimezoneOffset() * 60000);
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

export function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}

import { addResultTypeFactory } from './api-client/helpers';
export { setBaseUrl } from './api-client/helpers';
export { setAxiosFactory, getAxios } from './api-client/helpers';


//-----PersistorHydrator.File-----
import type { PersistedClient } from '@tanstack/react-query-persist-client';
import type { DehydratedState, QueryKey } from '@tanstack/react-query'
import { getResultTypeFactory } from './api-client/helpers';

/*
 * If you have Dates in QueryKeys (i.e. in request parameters), you need to deserialize them to Dates correctly
 * (otherwise they are deserialized as strings by default, and your queries are broken).
 */
export function deserializeDate(str: unknown) {
  if (!str || typeof str !== 'string') return str;
  if (!/^\d\d\d\d\-\d\d\-\d\d/.test(str)) return str;
  
  const date = new Date(str);
  const isDate = date instanceof Date && !isNaN(date as any);
  
  return isDate ? date : str;
}

export function deserializeDatesInQueryKeys(queryKey: QueryKey) {
  return queryKey
    // We need to replace `null` with `undefined` in query key, because
    // `undefined` is serialized as `null`.
    // And most probably if we have `null` in QueryKey it actually means `undefined`.
    // We can't keep nulls, because they have a different meaning, and e.g. boolean parameters are not allowed to be null.
    .map(x => (x === null ? undefined : x))
    .map(x => deserializeDate(x));
}

export function deserializeClassesInQueryData(queryKey: QueryKey, data: any) {
  if (!data) {
    return data;
  } else if ('pages' in data && 'pageParams' in data && Array.isArray(data.pages) && Array.isArray(data.pageParams)) {
    // infinite query
    data.pages = data.pages.map((page:any) => deserializeClassesInQueryData(queryKey, page));
  } else if (Array.isArray(data)) {
    return data.map(elem => constructDtoClass(queryKey, elem));
  } else {
    return constructDtoClass(queryKey, data);
  }
}

/*
 * Pass this function as `deserialize` option to createSyncStoragePersister/createAsyncStoragePersister
 * to correctly deserialize your DTOs (including Dates)
 */
export function persisterDeserialize(cache: string): PersistedClient {
  const client: PersistedClient = JSON.parse(cache);
  client.clientState.queries.forEach((query) => {
    query.state.data = deserializeClassesInQueryData(query.queryKey, query.state.data);
    query.queryKey = deserializeDatesInQueryKeys(query.queryKey);
  });

  return client;
}

export function constructDtoClass(queryKey: QueryKey, data: any): unknown {
  const resultTypeKey = getResultTypeClassKey(queryKey);
  const constructorFunction = getResultTypeFactory(resultTypeKey);

  if (!data || !constructorFunction)
    return data;

  const dto = constructorFunction();
  dto.init(data);

  return dto;
}

export function getResultTypeClassKey(queryKey: QueryKey): string {
  if (!Array.isArray(queryKey)) {
    return queryKey as unknown as string;
  }
  if (queryKey.length >= 2) {
    // We concatenate first and second elements, because they uniquely identify the query.
    // All other QueryKey elements are query parameters
    return `${queryKey[0]}___${queryKey[1]}`;
  }

  // We actually should never reach this point :)
  return queryKey.join('___');
}

export function initPersister() {
  
  addResultTypeFactory('ProductClient___search', () => new PagedResultOfProductListItemDto());
  addResultTypeFactory('ProductClient___get', () => new ProductDto());








}
//-----/PersistorHydrator.File----
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequestObject {
    body: any;
    query: any;
    params: any;
}

export interface IApiResponse {
    message: string;
    data: any;
    code: number;
}

export type ControllerFunc = (
    reqObject: IRequestObject,
) => Promise<IApiResponse>;

export interface IRequestInput {
    title: string;
    body: string;
    tags: string[];
}

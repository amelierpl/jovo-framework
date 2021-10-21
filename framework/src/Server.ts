// TODO implement

import { AnyObject } from './index';

export interface Headers {
  [header: string]: string | string[] | undefined;
}

export interface QueryParams {
  [header: string]: string | string[] | undefined;
}

export type ServerResponseType = string | number | AnyObject;
export type ServerResponse = ServerResponseType | ServerResponseType[];

export abstract class Server {
  /**
     Returns whether the host can write files.
     **/
  abstract hasWriteFileAccess(): boolean; // e.g. false on Lambda

  /**
     Returns request object
     **/
  abstract getRequestObject(): AnyObject;

  /**
     Returns query params
     **/
  abstract getQueryParams(): QueryParams;

  /**
     Returns request headers
     **/
  abstract getRequestHeaders(): Headers;

  /**
     Sets additional response headers. Will be merged with existing
     **/
  abstract setResponseHeaders(header: Record<string, string>): void;

  /**
     Sets response object
     **/
  abstract setResponse(response: ServerResponse): Promise<void>;

  /**
     Calls fail method of server
     **/
  abstract fail(error: Error): void;

  /**
   * Converts header keys to lowercase
   *
   * Example:
   * headers = {
   *    Host: 'localhost:3000',
   *    Authorization: 'Bearer TOKEN',
   * }
   * Converts to:
   * headers = {
   *    host: 'localhost:3000',
   *    authorization: 'Bearer TOKEN',
   * }
   *
   *
   * @param headers
   */
  static convertToLowerCaseHeaderKeys(headers: Headers): Headers {
    return Object.keys(headers).reduce((destination: Headers, key: string) => {
      destination[key.toLowerCase()] = headers[key];
      return destination;
    }, {});
  }
}

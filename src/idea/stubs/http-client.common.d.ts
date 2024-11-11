/**
 * The object holds HTTP Client session meta data, e.g. list of global variables.
 */
declare const client: HttpClient;

/**
 * The object holds information about current request.
 */
declare const request: HttpClientRequest;

// @ts-ignore
declare const console: Console;

/**
 * HTTP Client session meta data, e.g. list of global variables.
 *
 * HTTP Client session is started on IDE start and ends on IDE close,
 * values are not preserved after IDE restart.
 */
interface HttpClient {
    /**
     * Global variables defined in response handler scripts,
     * can be used as variables in HTTP Requests,
     *
     * Example:
     * ### Authorization request, receives token as an attribute of json body
     * GET https://example.com/auth
     *
     * > {% client.global.set("auth_token", response.body.token) %}
     *
     * ### Request executed with received auth_token
     * GET http://example.com/get
     * Authorization: Bearer {{auth_token}}
     */
    global: Variables;

    /**
     * Prints an array of `args` to the response handler or test stdout with separator and then terminates the line.
     * If an element of `args` is not `string`, the function converts it to string.
     * Also, it prints JS objects and arrays as their `JSON.stringify` presentation.
     */
    log(...args: any[]): void;
}

/**
 * Variables storage, can be used to define, undefine or retrieve variables.
 */
interface Variables {
    /**
     * Saves variable with name 'varName' and sets its value to 'varValue'.
     */
    set(varName: string, varValue: string): void;

    /**
     * Returns value of variable 'varName'.
     */
    get(varName: string): string;

    /**
     * Checks no variables are defined.
     */
    isEmpty(): boolean;

    /**
     * Removes variable 'varName'.
     * @param varName {string}
     */
    clear(varName: string): void;

    /**
     * Removes all variables.
     */
    clearAll(): void;
}

/**
 * Information about request, including variables, URL and e.t.c.
 */
interface HttpClientRequest {
    /**
     * Environment used for sending this request
     */
    environment: RequestEnvironment

    /**
     * Current request variables, which can be updated in Pre-request handler script.
     * Those variables are not shared between requests.
     */
    variables: RequestVariables

    /**
     * Header of the current request.
     */
    headers: RequestHeaders
}

/**
 * Object for accessing headers of the current request.
 */
interface RequestHeaders {
    /**
     * Array of all headers
     */
    all(): [RequestHeader]

    /**
     * Searches header by its name, returns null is there is not such header.
     * @param name header name for searching
     */
    findByName(name: string): RequestHeader | null
}

/**
 * Environment used for sending request.
 * Contains environment variables from http-client.env.json and http-client.private.env.json files.
 */
interface RequestEnvironment {
    /**
     * Retrieves variable value by its name. Returns null if there is no such variable.
     * @param name variable name.
     */
    get(name: string): string | null
}

/**
 * Variables for constructing current request. Can be updated in Pre-request handler script.
 */
interface RequestVariables {
    /**
     * Retrieves request variable value by its name. Returns null if there is no such variable
     * @param name request variable name
     */
    get(name: string): string | null
}

/**
 * Information about request header
 */
interface RequestHeader {
    /**
     * Header name
     */
    name: string
}

/**
 * Retrieves a value from a JSON object using a JSONPath expression.
 *
 * @param {any} obj - The JSON object to search in.
 * @param {string} expression - The JSONPath expression to use for searching.
 * @return {any} - The value found in the JSON object using the JSONPath expression.
 */
declare function jsonPath(obj: any, expression: string): any;

/**
 * Utility for working with query parameters of the URL.
 */
// @ts-ignore
declare class URLSearchParams implements Iterable<[string, string]> {
    constructor(options?: string | object | [any])

    size: number

    append(name: string, value: string): void

    delete(name: string, value?: string): void

    get(name: string): string | null

    getAll(name: string): string[]

    has(name: string, value?: string): boolean

    set(name: string, value: string): void

    sort(): void

    toString(): string

    entries(): [[string, string]]

    forEach(callback: (key: string, value: string, searchParams?: string) => void): void

    keys(): [string]

    values(): [string]
}

interface Console {
    /**
     * Same as `log` from `HttpClient` interface
     */
    log(...args: any[]): void
}
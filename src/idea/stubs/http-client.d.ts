/**
 * The file provides stubs for JavaScript objects accessible from HTTP Client response handler scripts.
 * It doesn't perform any real operation and should be used for documentation purpose.
 */

/**
 * The object holds information about HTTP Response.
 */
declare const response: HttpResponse;

// declare const request: HttpClientFinalRequest;

interface HttpClient {
    /**
     * Creates test with name 'testName' and body 'func'.
     * All tests will be executed right after response handler script.
     */
    test(testName: string, func: Function): void;

    /**
     * Checks that condition is true and throw an exception otherwise.
     * @param condition
     * @param message if specified it will be used as an exception message.
     */
    assert(condition: boolean, message?: string): void;

    exit(): void;
}


/**
 * Represents response as text stream.
 */
interface TextStreamResponse {
    /**
     * Represents whole stream as one text and subscribes user on each line of this text.
     * @param subscriber function to be called on each line of the stream
     * @param onFinish function to be called after the end of the stream
     */
    onEachLine(subscriber: (line: string | object, unsubscribe: () => void) => void, onFinish?: () => void): void;

    /**
     * Subscribes user to each message sent by server. This method should be used with well-defined streaming protocols,
     * like WebSocket or GRPC.
     * @param subscriber function to be called on each message of the stream. There is possibility to send answers to server via `output`,
     *  if protocol supports both directions
     * @param onFinish function to be called after the end of the stream
     */
    onEachMessage(
            subscriber: (
                    message: string | object,
                    unsubscribe: () => void,
                    output?: (answer: string) => void
            ) => void,
            onFinish?: () => void
    ): void
}

/**
 * HTTP Response data object, contains information about response content, headers, status, etc.
 */
interface HttpResponse {
    /**
     * Response content, it is a string or JSON object if response content-type is json.
     */
    body: string | TextStreamResponse | object;

    /**
     * Response headers storage.
     */
    headers: ResponseHeaders;

    /**
     * Response status, e.g. 200, 404, etc.
     */
    status: number;

    /**
     * Value of 'Content-Type' response header.
     */
    contentType: ContentType;
}

/**
 * Headers storage, can be used to retrieve data about header value.
 */
interface ResponseHeaders {
    /**
     * Retrieves the first value of 'headerName' response header or null otherwise.
     */
    valueOf(headerName: string): string | null;

    /**
     * Retrieves all values of 'headerName' response header. Returns empty list if header with 'headerName' doesn't exist.
     */
    valuesOf(headerName: string): string[];
}

/**
 * Content type data object, contains information from 'Content-Type' response header.
 */
interface ContentType {
    /**
     * MIME type of the response,
     * e.g. 'text/plain', 'text/xml', 'application/json'.
     */
    mimeType: string;

    /**
     * String representation of the response charset,
     * e.g. utf-8.
     */
    charset: string;
}

interface HttpClientRequest {
    /**
     * Current request URL
     */
    url(): string;

    /**
     * Current request body as text
     */
    body(): string;
}

interface RequestHeader {
    /**
     * Value of a request header
     */
    value(): string
}
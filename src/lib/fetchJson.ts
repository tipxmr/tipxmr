export default async function fetchJson<JSON = unknown, DATA = unknown>(
  input: RequestInfo,
  init?: Omit<RequestInit, "body"> & { body?: DATA }
): Promise<JSON> {
  const headers = {
    "Content-Type": "application/json",
  };

  const config = {
    ...init,
    headers: {
      ...headers,
      ...init?.headers,
    },
  } as RequestInit;

  if (init?.body) {
    config.body = JSON.stringify(init.body);
  }

  const response = await fetch(input, config);

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message };
  }
}

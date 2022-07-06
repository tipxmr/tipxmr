import type { NextApiRequest, NextApiResponse } from "next";
import { Boom, boomify, isBoom } from "@hapi/boom";
import { Response } from "undici";

function boomifyAny(value: unknown) {
  if (value instanceof Error) {
    if (isBoom(value)) {
      return value;
    }

    return boomify(value);
  }

  // FIXME: https://github.com/hapijs/boom/issues/291
  return new Boom(value as string);
}

interface RequestHandler {
  (request: NextApiRequest): Promise<Response>;
  (request: NextApiRequest, response: NextApiResponse<any>): Promise<Response>;
}

// TODO: Works with JSON responses only
function wrapHandler(endpoint: RequestHandler) {
  return async function handler(
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    try {
      const result = await endpoint(request, response);

      if (response.headersSent) {
        return;
      }

      if (result instanceof Response) {
        const data = await result.json();

        response.status(result.status);

        for (let [name, value] of result.headers.entries()) {
          response.setHeader(name, value);
        }

        response.json(data);
      } else {
        response.json(result);
      }
    } catch (reason) {
      const { output } = boomifyAny(reason);
      const { payload } = output;
      const { statusCode, error, message } = payload;

      response.status(statusCode).json({
        error,
        message,
      });
    }
  };
}

export default wrapHandler;

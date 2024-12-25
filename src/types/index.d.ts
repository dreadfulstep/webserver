import { IncomingMessage, ServerResponse } from 'http';

type RouteHandler = {
  [method: string]: (req: IncomingMessage, res: ServerResponse) => void;
};

declare module 'http' {
  interface ServerResponse {
    json: (body: any) => void;
  }
}

export interface Request extends IncomingMessage {
}

export interface Response extends ServerResponse {
  locals: { [key: string]: any };
}
import { Request, Response } from "../types";

export async function GET(req : Request, res : Response) {
  res.json({ message: 'Hello world!' });
}
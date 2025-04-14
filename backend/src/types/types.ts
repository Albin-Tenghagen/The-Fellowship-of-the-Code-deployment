import { Request } from "express";

export interface userTipObject {
  id: number;
  timestamp: string;
  location: string;
  description: string;
}

export interface TipBody {
  timestamp: string;
  location: string;
  description: string;
  user: string;
}

export interface TipRequest extends Request<{}, any, TipBody> {}

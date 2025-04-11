import { Request } from "express";

export interface userTipObject {
  id: string;
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

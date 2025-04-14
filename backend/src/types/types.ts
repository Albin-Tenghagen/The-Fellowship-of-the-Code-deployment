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

// export type TipRequest = Request<{}, {}, TipBody>;

// export interface TipRequest extends Request {
//   body: {
//     timestamp: string;
//     location: string;
//     description: string;
//     user: string;
//   };
// }

// type.ts

export interface TipBody {
  timestamp: string;
  location: string;
  description: string;
  user: string;
}

export interface TipRequest extends Request<{}, any, TipBody> {}

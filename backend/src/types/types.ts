import { Request } from "express";

//* User tips
export interface userTipObject {
  id: number;
  timestamp: string;
  location: string;
  description: string;
}

export interface TipBody {
  id: number;
  timestamp: string;
  location: string;
  description: string;
  user: string;
}

export interface TipRequest extends Request<{}, any, TipBody> {}
//*_____________________________________________________________

//* User Safety

//*_____________________________________________________________

//* User Risks

//*_____________________________________________________________

//* User notification

//*_____________________________________________________________

//* admin auth

//*_____________________________________________________________

//* admin monitoring

//*_____________________________________________________________

//* admin historical monitoring

//*_____________________________________________________________

//* admin upkeep

//*_____________________________________________________________

//* admin infrastructure

//*_____________________________________________________________

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

export interface riskBody {}

export interface TipRequest extends Request<{}, any, TipBody> {}
//*_____________________________________________________________

//* User Safety
export interface usersSafetyInfo extends Request<{}, any, userSafetyBody> {}

export interface userSafetyBody {
  id: number;
  timestamp: string;
  location: string;
  description: string;
  proactiveActions: {
    basementProtection?: boolean;
    trenchDigging?: boolean;
    electricHazards?: string;
  };
}

//*_____________________________________________________________

//* User Risks
export interface userRisksInfo extends Request<{}, any, any> {}
//*_____________________________________________________________

//* User notification
export interface userNotifications extends Request<{}, any, any> {}
//*_____________________________________________________________

//* admin auth
export interface adminLogin extends Request<{}, any, loginData> {}
export interface loginData {
  id: number;
  name: string;
  email: string;
  password: string;
}

//*_____________________________________________________________

//* admin monitoring

export interface stationBody {
  id: number;
  timestamp: string;
  airPressure: number;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  pressureLevel: number;
  ultraSoundLevel: number;
}

export type StationRequest = Request<{}, {}, stationBody>;

//*_____________________________________________________________

//* admin historical monitoring

//*_____________________________________________________________

//* admin upkeep

//*_____________________________________________________________

//* admin infrastructure
export interface infrastructureBody {
  id: number;
  timestamp: string;
  problem: string;
}

export type infrastructureRequest = Request<{}, {}, infrastructureBody>;
//*____________________________________________________________

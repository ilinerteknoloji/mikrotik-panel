import { RequestUserType } from ".";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: RequestUserType;
    }
  }
}

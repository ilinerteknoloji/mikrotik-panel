import { PayloadType } from "./jwt.types";
import { Prettify } from "./prettify.type";

export type RequestUserType = Prettify<
  PayloadType & {
    accessTokenId?: number;
    refreshTokenId: number;
  }
>;

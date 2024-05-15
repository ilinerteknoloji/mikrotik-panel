import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { RequestUserType } from "src/types/request-user.types";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUserType => {
    return (ctx.switchToHttp().getRequest() as Request).user;
  },
);

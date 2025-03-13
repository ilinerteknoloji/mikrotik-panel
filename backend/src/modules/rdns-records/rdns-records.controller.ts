import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import {Response} from "express";
import {Cookies} from "src/lib/decorators/cookie.decorator";
import {UseRoles} from "src/lib/decorators/roles.decorator";
import {User} from "src/lib/decorators/user.decorator";
import {UserRole} from "src/lib/enums/user-role.enum";
import {LimitPipe, PagePipe} from "src/lib/pipes";
import {EnvService} from "src/shared/env/env.service";
import {RequestUserType} from "src/types";
import {AuthGuard} from "../auth/guards/auth.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {ClouDNSLoginDto} from "./dto/cloudns-login.dto";
import {RdnsRecordsService} from "./rdns-records.service";

@Controller("rdns-records")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN, UserRole.USER)
export class RdnsRecordsController {
  constructor(
    private readonly rdnsRecordsService: RdnsRecordsService,
    private readonly env: EnvService,
  ) {}

  // @Post()
  // create(@Body() createRdnsRecordDto: CreateRdnsRecordDto) {
  //   return this.rdnsRecordsService.create(createRdnsRecordDto);
  // }

  @Post("cloudns-login")
  async login(
    @Body() clouDNSLoginDto: ClouDNSLoginDto,
    @Res({passthrough: true}) res: Response,
  ) {
    const response = this.rdnsRecordsService.encryptCloudns(clouDNSLoginDto);
    res.cookie("cn", response, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      domain: this.env.get("FRONTEND_URL"),
      path: "/",
      maxAge: +this.env.get("CLOUDNS_MAX_AGES"),
    });
    return {message: response};
  }

  @Get()
  findAll(
    @Query("page", PagePipe) page: number,
    @Query("limit", LimitPipe) limit: number,
    @Query("search") search: string = "",
    @User() user: RequestUserType,
    @Cookies("cd") cd: string,
  ) {
    return this.rdnsRecordsService.findAll(page, limit, search, user, cd);
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
    @Query("domainName") domainName: string,
    @Cookies("cd") cd: string,
  ) {
    return this.rdnsRecordsService.findOne(id, domainName, cd);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Query("domainName") domainName: string,
    @Query("host") host: string,
    @Query("record") record: string,
    @User() user: RequestUserType,
    @Cookies("cd") cd: string,
  ) {
    return this.rdnsRecordsService.update(
      id,
      domainName,
      host,
      record,
      user,
      cd,
    );
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.rdnsRecordsService.remove(+id);
  // }
}

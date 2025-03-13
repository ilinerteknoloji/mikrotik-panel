import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {and, eq} from "drizzle-orm";
import {DRIZZLE_PROVIDER} from "src/lib/constants";
import {mikrotikUserIpsSchema} from "src/shared/drizzle/schemas";
import {EnvService} from "src/shared/env/env.service";
import {Drizzle, RequestUserType} from "src/types";

@Injectable()
export class RdnsRecordsRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle,
    private readonly env: EnvService,
  ) {}

  public async findAll(
    page: number,
    limit: number,
    search: string,
    id: string,
    password: string,
  ) {
    const allHosts = await this.drizzle.query.rdnsHostsSchema.findMany({
      columns: {hostname: true},
      where: (fields, {eq}) => eq(fields.status, true),
    });
    let url = "https://api.cloudns.net/dns/records.json?";
    url += `auth-id=${id}`;
    url += `&auth-password=${password}`;
    url += `&page=${page}`;
    url += `&rows-per-page=${limit}`;
    if (search) url += `&host-like=${search}`;
    url += `&domain-name=`;
    const records = allHosts.map(
      async ({hostname}) => await this.getRecords(url, hostname),
    );
    const response = await Promise.all(records);
    return response.filter((item) => (item !== null ? item : undefined)).flat();
  }

  private async getRecords(url: string, hostname: string, optional?: string) {
    const recordList = await fetch(
      `${url}${hostname}${optional ? optional : ""}`,
    );
    const json = await recordList.json();
    if (!recordList.ok || json.status === "Failed") return;
    const records = Object.values(json).map((record: any) => {
      return {
        id: record.id,
        type: record.type,
        host: record.host,
        record: record.record,
        failover: record.failover,
        ttl: record.ttl,
        status: record.status,
        domainName: hostname,
      };
    });
    const response = await Promise.all(records);
    return response.filter((item) => (item !== null ? item : undefined)).flat();
  }

  public async findUsersRecords(
    page: number,
    limit: number,
    userId: number,
    cid: string,
    password: string,
  ) {
    const allHosts = await this.drizzle.query.rdnsHostsSchema.findMany({
      columns: {hostname: true, hostnameMain: true},
      where: (fields, {eq}) => eq(fields.status, true),
    });
    const userIps = await this.drizzle.query.mikrotikUserIpsSchema.findMany({
      where: (fields, {eq}) => eq(fields.userId, userId),
    });
    if (!userIps.length) return [];
    let url = "https://api.cloudns.net/dns/records.json?";
    url += `auth-id=${cid}`;
    url += `&auth-password=${password}`;
    url += `&page=${page}`;
    url += `&rows-per-page=${limit}`;
    url += `&domain-name=`;
    const records = allHosts.map(async ({hostname, hostnameMain}) => {
      const isExist = userIps.filter(({ip}) => ip.includes(hostnameMain));
      if (isExist.length === 0) return;
      const records = isExist.map(
        async ({ip}) =>
          await this.getRecords(url, hostname, `&host=${ip.split(".").at(-1)}`),
      );
      const response = await Promise.all(records);
      return response
        .filter((item) => (item !== null ? item : undefined))
        .flat();
    });
    const response = await Promise.all(records);
    return response.filter((item) => (item !== null ? item : undefined)).flat();
  }

  public async findOne(
    id: string,
    domainName: string,
    cid: string,
    password: string,
  ) {
    let url = "https://api.cloudns.net/dns/get-record.json?";
    url += `auth-id=${cid}`;
    url += `&auth-password=${password}`;
    url += `&domain-name=${domainName}`;
    url += `&record-id=${id}`;
    const record = await fetch(url);
    const json = await record.json();
    return {...json, domainName};
  }

  public async update(
    id: string,
    domainName: string,
    host: string,
    record: string,
    cid: string,
    password: string,
  ) {
    let url = "https://api.cloudns.net/dns/mod-record.json?";
    url += `auth-id=${cid}`;
    url += `&auth-password=${password}`;
    url += `&domain-name=${domainName}&record-id=${id}&host=${host}&record=${record}&ttl=3600`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  public async updateForUser(
    id: string,
    domainName: string,
    host: string,
    record: string,
    user: RequestUserType,
    cid: string,
    password: string,
  ) {
    const data = await this.findOne(id, domainName, cid, password);
    const {host: hostName, domainName: domain} = data;
    const [v3, v2, v1] = domain.split(".");
    const isExist = await this.drizzle
      .select()
      .from(mikrotikUserIpsSchema)
      .where(
        and(
          eq(mikrotikUserIpsSchema.userId, user.id),
          eq(mikrotikUserIpsSchema.ip, `${v1}.${v2}.${v3}.${hostName}`),
        ),
      );
    if (!isExist.length)
      return new UnauthorizedException(
        "You are not allowed to update this record",
      );

    const response = await this.update(
      id,
      domainName,
      host,
      record,
      cid,
      password,
    );
    return response;
  }
}

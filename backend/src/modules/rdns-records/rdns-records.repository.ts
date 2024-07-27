import { Inject, Injectable } from "@nestjs/common";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { EnvService } from "src/shared/env/env.service";
import { Drizzle } from "src/types";

@Injectable()
export class RdnsRecordsRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle,
    private readonly env: EnvService,
  ) {}

  public async findAll(page: number, limit: number) {
    const allHosts = await this.drizzle.query.rdnsHostsSchema.findMany({
      columns: { hostname: true },
      where: (fields, { eq }) => eq(fields.status, true),
    });

    let url = "https://api.cloudns.net/dns/records.json?";
    url += `auth-id=${this.env.get("CLOUDNS_AUTH_ID")}`;
    url += `&auth-password=${this.env.get("CLOUDNS_AUTH_PASSWORD")}`;
    url += `&page=${page}`;
    url += `&rows-per-page=${limit}`;
    url += `&domain-name=`;
    const records = allHosts.map(async ({ hostname }) => {
      const recordList = await fetch(url + hostname, {
        method: "GET",
      });
      const json = await recordList.json();
      if (!recordList.ok || json.status === "Failed") return;
      return Object.values(json).map((record: any) => {
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
    });
    const response = await Promise.all(records);
    return response.filter((item) => (item !== null ? item : undefined)).flat();
  }
}

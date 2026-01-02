import {Injectable} from "@nestjs/common";
import {privateDecrypt, publicEncrypt} from "node:crypto";
import {GenerateKeysService} from "src/shared/keys/generate-keys.service";
import {RequestUserType} from "src/types";
import {ClouDNSLoginDto} from "./dto/cloudns-login.dto";
import {RdnsRecordsRepository} from "./rdns-records.repository";
import {z} from "zod";

@Injectable()
export class RdnsRecordsService {
  constructor(
    private readonly rdnsRecordsRepository: RdnsRecordsRepository,
    private readonly key: GenerateKeysService,
  ) {}

  encryptCloudns(clouDNSLoginDto: ClouDNSLoginDto) {
    const encryptedData = publicEncrypt(
      this.key.readKey("public_cloudns"),
      Buffer.from(JSON.stringify(clouDNSLoginDto)),
    );
    const encryptedDataString = encryptedData.toString("base64");

    return encryptedDataString;
  }

  decryptCloudns(encryptedData: string) {
    const privateKey = this.key.readKey("private_cloudns");
    const receivedData = Buffer.from(encryptedData, "base64");
    const decrypted = privateDecrypt(privateKey, receivedData);
    const parsed = JSON.parse(decrypted.toString());
    const schema = z.object({
      id: z.string(),
      password: z.string(),
    });
    const result = schema.parse(parsed);

    return result;
  }

  public async findAll(
    page: number,
    limit: number,
    search: string,
    user: RequestUserType,
    cd: string,
  ) {
    const {id, password} = this.decryptCloudns(cd);
    if (user.role === "user")
      return this.rdnsRecordsRepository.findUsersRecords(
        page,
        limit,
        user.id,
        id,
        password,
      );
    return this.rdnsRecordsRepository.findAll(
      page,
      limit,
      search,
      id,
      password,
    );
  }

  public async findOne(id: string, domainName: string, cd: string) {
    const {id: cid, password} = this.decryptCloudns(cd);
    return this.rdnsRecordsRepository.findOne(id, domainName, cid, password);
  }

  public async update(
    id: string,
    domainName: string,
    host: string,
    record: string,
    user: RequestUserType,
    cd: string,
  ) {
    const {id: cid, password} = this.decryptCloudns(cd);
    if (user.role === "admin")
      return this.rdnsRecordsRepository.update(
        id,
        domainName,
        host,
        record,
        cid,
        password,
      );
    return this.rdnsRecordsRepository.updateForUser(
      id,
      domainName,
      host,
      record,
      user,
      cid,
      password,
    );
  }

  public async remove(id: number) {
    return `This action removes a #${id} rdnsRecord`;
  }
}

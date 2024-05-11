import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class EncryptionUtil {
  public async encrypt(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  public async compare(data: string, encryptedData: string): Promise<boolean> {
    return await bcrypt.compare(data, encryptedData);
  }
}

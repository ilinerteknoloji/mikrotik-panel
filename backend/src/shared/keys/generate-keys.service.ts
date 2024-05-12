import { Injectable, Logger } from "@nestjs/common";
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { TokenKeyType } from "src/types";

@Injectable()
export class GenerateKeysService {
  private readonly keySize: number = 2048;
  private readonly mainPath: string = path.join(__dirname, "../../../keys/");
  private readonly publicAccessKeyPath: string = path.join(
    this.mainPath,
    "public_access.pem",
  );
  private readonly privateAccessKeyPath: string = path.join(
    this.mainPath,
    "private_access.pem",
  );
  private readonly publicRefreshKeyPath: string = path.join(
    this.mainPath,
    "public_refresh.pem",
  );
  private readonly privateRefreshKeyPath: string = path.join(
    this.mainPath,
    "private_refresh.pem",
  );
  private readonly logger = new Logger(GenerateKeysService.name);

  public readKey(keyType: TokenKeyType): string {
    return fs.readFileSync(path.join(this.mainPath, `${keyType}.pem`), "utf8");
  }

  public getPath(keyType: TokenKeyType): string {
    return path.join(this.mainPath, `${keyType}.pem`);
  }

  public async generateKeys(): Promise<void> {
    if (!fs.existsSync(this.mainPath)) {
      fs.mkdirSync(this.mainPath, { recursive: true });
    }
    if (
      !fs.existsSync(this.publicAccessKeyPath) ||
      !fs.existsSync(this.privateAccessKeyPath)
    ) {
      this.generateKeyPair(this.publicAccessKeyPath, this.privateAccessKeyPath);
      this.logger.log("Access Keys generated successfully.");
    } else {
      this.logger.warn("Access Keys already exist.");
    }
    if (
      !fs.existsSync(this.publicRefreshKeyPath) ||
      !fs.existsSync(this.privateRefreshKeyPath)
    ) {
      this.generateKeyPair(
        this.publicRefreshKeyPath,
        this.privateRefreshKeyPath,
      );
      this.logger.log("Refresh Keys generated successfully.");
    } else {
      this.logger.warn("Refresh Keys already exist.");
    }
  }

  public async deleteKeys(): Promise<void> {
    if (fs.existsSync(this.publicAccessKeyPath)) {
      fs.unlinkSync(this.publicAccessKeyPath);
      this.logger.warn("public access Keys deleted successfully.");
    }
    if (fs.existsSync(this.privateAccessKeyPath)) {
      fs.unlinkSync(this.privateAccessKeyPath);
      this.logger.warn("private access Keys deleted successfully.");
    }
    if (fs.existsSync(this.publicRefreshKeyPath)) {
      fs.unlinkSync(this.publicRefreshKeyPath);
      this.logger.warn("public refresh Keys deleted successfully.");
    }
    if (fs.existsSync(this.privateRefreshKeyPath)) {
      fs.unlinkSync(this.privateRefreshKeyPath);
      this.logger.warn("private refresh Keys deleted successfully.");
    }
  }

  private generateKeyPair(publicPath: string, privatePath: string): void {
    crypto.generateKeyPair(
      "rsa",
      {
        modulusLength: this.keySize,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          this.logger.error(err.message);
          throw new Error(err.message);
        }
        try {
          fs.writeFileSync(publicPath, publicKey);
          fs.writeFileSync(privatePath, privateKey);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    );
  }
}

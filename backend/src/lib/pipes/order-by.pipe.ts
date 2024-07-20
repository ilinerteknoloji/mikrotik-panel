import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { OrderByPipeType } from "src/types";

@Injectable()
export class OrderByPipe<T extends Record<string, unknown>>
  implements PipeTransform<string, OrderByPipeType<T>>
{
  constructor(
    private readonly defaultOrderBy: OrderByPipeType<T>,
    private readonly schema: object,
  ) {}

  transform(value: string, metadata: ArgumentMetadata): OrderByPipeType<T> {
    const paramTypeAccess: Record<string, boolean> = {
      query: true,
      param: true,
      body: false,
      custom: false,
    };
    if (!paramTypeAccess[metadata.type] || !value || !value.includes(":"))
      return this.defaultOrderBy;
    const [key, order] = value.split(":");
    const orderToLowerCase = order.toLowerCase();
    if (!this.schema[key]) return this.defaultOrderBy;
    if (orderToLowerCase !== "asc" && orderToLowerCase !== "desc")
      return this.defaultOrderBy;
    return { key, order: orderToLowerCase };
  }
}

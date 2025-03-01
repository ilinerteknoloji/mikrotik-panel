import {Injectable} from "@nestjs/common";
import {CreateAddressDto} from "./dto/create-address.dto";
import {UpdateAddressDto} from "./dto/update-address.dto";
import {AddressesRepository} from "./addresses.repository";

@Injectable()
export class AddressesService {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  async create(createAddressDto: CreateAddressDto) {
    const response = await this.addressesRepository.create(createAddressDto);
    const data = await this.addressesRepository.findOne(response.ret);
    return data;
  }

  findAll() {
    return this.addressesRepository.findAll();
  }

  findOne(id: string) {
    return this.addressesRepository.findOne(id);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    await this.addressesRepository.update(id, updateAddressDto);
    const data = await this.addressesRepository.findOne(id);
    return data;
  }

  remove(id: string) {
    return `This action removes a #${id} address`;
  }
}

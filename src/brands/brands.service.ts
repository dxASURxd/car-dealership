import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'toyota',
    //   createdAt: new Date().getTime()
    // }
  ];

  create(createBrandDto: CreateBrandDto) {

    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    }
    this.brands.push(brand);
    // return `${brand.name} created`;
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if (!brand)
      throw new NotFoundException(`${id} Not found!!`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);
    const oldBrandName = { ...brandDB };
    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto };
        return brandDB;
      }
      return brand;
    });
    // return `value '${oldBrandName.name}' updated at '${brandDB.name}'`
    return brandDB;
  }

  remove(id: string) {
    const brandDB = this.findOne(id);
    const brandName = { ...brandDB };
    this.brands = this.brands.filter(brand => brand.id !== id);
    // return `${brandName.name} deleted`;
  }

  fillCarsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}

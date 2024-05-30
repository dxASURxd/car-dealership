import { IsString, MinLength } from "class-validator";

export class CreateBrandDto {

    @MinLength(2)
    @IsString()
    name: string;

}

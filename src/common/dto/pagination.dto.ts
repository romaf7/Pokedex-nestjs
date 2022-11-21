import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{
  
  @IsOptional()
  @Min(1)
  @IsPositive()
  @IsNumber()
  limit?:number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  offset?:number;
}
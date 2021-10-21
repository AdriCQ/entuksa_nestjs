import { IsString, ValidateNested, IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OnlyIdDto } from '@modules/base.dto';
/**
 * Store create dto
 */
export class StoreCreateDto {
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of shop store
   */
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Vendor id of shop store
   */
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiProperty({ type: () => OnlyIdDto })
  vendor: OnlyIdDto;

  @ValidateNested()
  @Type(() => OnlyIdDto)
  @IsNotEmpty()
  @ApiProperty({ type: () => OnlyIdDto })
  position: OnlyIdDto;
  /**
   * Locality  of store create dto
   */
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @IsNotEmpty({ message: 'Localidad no puede estar vacío' })
  @ApiProperty({ type: () => OnlyIdDto })
  locality: OnlyIdDto;
  /**
   * Image  of store create dto
   */
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @IsNotEmpty({ message: 'Imagen no puede estar vacío' })
  @ApiProperty({ type: () => OnlyIdDto })
  image: OnlyIdDto;
}
/**
 * Store timing dto
 */
export class StoreTimingDto {
  @IsString()
  @ApiProperty({ example: '0900' })
  open: string;
  @IsString()
  @ApiProperty({ example: '0900' })
  close: string;
  @IsBoolean()
  @ApiProperty()
  auto: boolean;
}
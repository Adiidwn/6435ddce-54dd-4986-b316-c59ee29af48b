import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { SortOrder } from 'src/utils/constans/response.constants';
import { StatusDiskonSiswa } from 'src/utils/constans/test.constans';
import { ApiProperty } from '@nestjs/swagger';

export class QueryParams {
  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  keyword?: string = '';

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  voucher_code?: string = '';

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  tahun_ajaran?: string;

  @IsOptional()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  @ApiProperty({ required: false })
  is_terpakai?: boolean = undefined;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  tanggal_datang_awal?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  tanggal_expired?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  tanggal_datang_akhir?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  tanggal_awal?: Date = null;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  tanggal_akhir?: Date = null;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  bank_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  id_bundling?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  id_order?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  lembaga_id?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ required: false })
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(10)
  @IsOptional()
  @ApiProperty({ required: false })
  per_page?: number = 10;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  kota_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  kewilayahan_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  cakupan_id?: number;

  @IsEnum(SortOrder)
  @IsOptional()
  @ApiProperty({ required: false })
  sort?: SortOrder = SortOrder.DESC;

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  order_by?: string = 'created_at';

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @ApiProperty({ required: false })
  is_all_data?: boolean = false;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  no_register?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  tanggal_daftar_awal?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  tanggal_daftar_akhir?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  id_pembelian?: string;

  @IsOptional()
  @IsEnum(StatusDiskonSiswa)
  @ApiProperty({ required: false })
  status?: StatusDiskonSiswa;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  gedung_id?: number;

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  gedung_ids?: string = '';

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  tingkat_kelas_id?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  cabang_id?: number;

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  tingkat_kelas_ids?: string = '';

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  nama_lengkap?: string = '';

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  region_meta_key?: string = '';

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  region_meta_value?: string = '';

  @Type(() => Object)
  @IsOptional()
  @ApiProperty({ required: false })
  region_meta?: string = '';

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  menu?: string = '';

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  kode_paket: string = '';

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  kode_tob: string = '';

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  jenis_tob: string = '';

  constructor(
    keyword = '',
    page = 1,
    sort = SortOrder.DESC,
    order_by = 'created_at',
  ) {
    this.keyword = keyword;
    this.page = page;
    this.sort = sort;
    this.order_by = order_by;
  }

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  status_order?: string = '';
}

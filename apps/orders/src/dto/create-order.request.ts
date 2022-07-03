import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

// import { createZodDto } from '@anatine/zod-nestjs';
// import { z } from 'zod';

// const ZCreateOrderRequest = z
//   .object({
//     name: z.string(),
//     price: z.number(),
//     phoneNumber: z.number(),
//   })
//   .strict();

// export class CreateOrderRequest extends createZodDto(ZCreateOrderRequest) {}

export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsPhoneNumber()
  phoneNumber: string;
}

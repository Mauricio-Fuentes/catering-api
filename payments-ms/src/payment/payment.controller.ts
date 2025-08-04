import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('createPaymentService')
  create(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @MessagePattern('findAllPayments')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.paymentService.findAll(paginationDto);
  }

  @MessagePattern('findOnePayment')
  findOne(@Payload('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @MessagePattern('updatePayment')
  update(@Payload() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(updatePaymentDto);
  }

  @MessagePattern('removePayment')
  remove(@Payload('id') id: number) {
    return this.paymentService.remove(id);
  }
}

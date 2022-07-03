import { OrdersRepository } from './orders.repository';
import { CreateOrderRequest } from './dto/create-order.request';
import { Inject, Injectable } from '@nestjs/common';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest) {
    // return this.orderRepository.create(request);
    // const session = await this.orderRepository.startTransaction();
    try {
      // const order = await this.orderRepository.create(request, { session });
      const order = await this.orderRepository.create(request);
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
        }),
      );
      // await session.commitTransaction();
      return order;
    } catch (error) {
      // await session.abortTransaction();
      throw error;
    }
  }

  async getOrder() {
    return this.orderRepository.find({});
  }
}

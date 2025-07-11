import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrderRepository } from '../../domain/interfaces/repositories/order.repository.interface';
import { IOrder } from '../../domain/interfaces/entities/order.entity.interface';
import { Order, OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrderMongoRespository implements IOrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  async save(order: Partial<IOrder>): Promise<IOrder> {
    return new this.orderModel(order).save();
  }

  async findAll(): Promise<IOrder[]> {
    return this.orderModel.find().lean().exec(); 
  }

  async findById(id: string): Promise<IOrder | null> {
    return this.orderModel.findById(id).lean().exec();
  }

  async delById(id: string): Promise<boolean> {
    const result = await this.orderModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
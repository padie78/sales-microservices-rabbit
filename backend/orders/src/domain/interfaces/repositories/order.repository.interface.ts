import { Injectable } from '@nestjs/common';
import { IOrder } from '../entities/order.entity.interface';

export interface IOrderRepository  
{
    create(order: Partial<IOrder>): Promise<IOrder>;
    findAll(): Promise<IOrder[]>;
    findById(id: string): Promise<IOrder | null>;
    delById(id: string): Promise<boolean>;
}

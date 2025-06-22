import { Controller, Body, Post, Get, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { IOrderController } from '../../domain/interfaces/controllers/order-controller.interface';
import { ICreateOrderUseCase } from 'src/domain/interfaces/uses-cases/create-order.usecase.interface';
import { IGetAllOrdersUseCase } from 'src/domain/interfaces/uses-cases/get-all-orders.usecase.inteface';
import { IGetOrderByIdUseCase } from 'src/domain/interfaces/uses-cases/get-order-byId.usecase.interface';
import { IDelOrderByIdUseCase } from 'src/domain/interfaces/uses-cases/del-order-byId.usecase.interface';
import { OrderRequestDTO } from '../dto/request/order.request.dto';
import { OrderResponseDTO } from '../dto/response/order.response.dto';
import { OrderMapper } from '../../shared/mappers/order.mapper';

@Controller('orders')
export class OrderController implements IOrderController {
  constructor(private readonly createOrderUseCase: ICreateOrderUseCase,
              private readonly getAllOrdersUseCase: IGetAllOrdersUseCase,
              private readonly getOrderByIdUseCase: IGetOrderByIdUseCase,
              private readonly delOrderByIdUseCase: IDelOrderByIdUseCase) {}

  @Post()
  async create(@Body() dto: OrderRequestDTO): Promise<OrderResponseDTO> {
    const command = OrderMapper.toCommand(dto);
    const order = await this.createOrderUseCase.execute(command);
    return OrderMapper.toResponse(order);
  }

  @Get()
  async getAll(): Promise<OrderResponseDTO[]> {
    const orders = await this.getAllOrdersUseCase.execute();
    return orders.map(order => OrderMapper.toResponse(order));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<OrderResponseDTO> {
    const order = await this.getOrderByIdUseCase.execute(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return OrderMapper.toResponse(order);
  }

  @Delete(':id')
  @HttpCode(204)
  async delById(@Param('id') id: string): Promise<void> {
     await this.delOrderByIdUseCase.execute(id);
  }
}
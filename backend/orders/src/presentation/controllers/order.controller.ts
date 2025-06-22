import { Controller, Body, Post, Get, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { IOrderController } from '../../domain/interfaces/controllers/order-controller.interface';
import { ISaveOrderUseCase } from '../../domain/interfaces/uses-cases/save-order.usecase.interface';
import { IGetAllOrdersUseCase } from '../../domain/interfaces/uses-cases/get-all-orders.usecase.inteface';
import { IGetOrderByIdUseCase } from '../../domain/interfaces/uses-cases/get-order-byId.usecase.interface';
import { IDelOrderByIdUseCase } from '../../domain/interfaces/uses-cases/del-order-byId.usecase.interface';
import { IOrderRequestDTO } from '../../domain/interfaces/dto/request/order.request.dto.interface';
import { IOrderResponseDTO } from '../../domain/interfaces/dto/response/order.response.dto.interface';
import { OrderMapper } from '../../shared/mappers/order.mapper';

@Controller('orders')
export class OrderController implements IOrderController {
  constructor(private readonly saveOrderUseCase: ISaveOrderUseCase,
              private readonly getAllOrdersUseCase: IGetAllOrdersUseCase,
              private readonly getOrderByIdUseCase: IGetOrderByIdUseCase,
              private readonly delOrderByIdUseCase: IDelOrderByIdUseCase) {}

  @Post()
  async save(@Body() orderRequestDTO: IOrderRequestDTO): Promise<IOrderResponseDTO> {
    const order = await this.saveOrderUseCase.execute(orderRequestDTO);
    return OrderMapper.toResponse(order);
  }

  @Get()
  async getAll(): Promise<IOrderResponseDTO[]> {
    const orders = await this.getAllOrdersUseCase.execute();
    return orders.map(order => OrderMapper.toResponse(order));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IOrderResponseDTO> {
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
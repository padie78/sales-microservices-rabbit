import { OrderRequestDTO } from "../../../presentation/dto/request/order.request.dto";
import { OrderResponseDTO } from "../../../presentation/dto/response/order.response.dto";

export interface IOrderController {
  create(dto: OrderRequestDTO): Promise<OrderResponseDTO>;
  getAll(): Promise<OrderResponseDTO[]>;
  getById(id: string): Promise<OrderResponseDTO>;
  delById(id: string): Promise<void>;
}
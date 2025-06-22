import { IOrderRequestDTO } from "../";
import { IOrderResponseDTO } from "../../../presentation/dto/response/order.response.dto";

export interface IOrderController {
  save(dto: IOrderRequestDTO): Promise<IOrderResponseDTO>;
  getAll(): Promise<IOrderResponseDTO[]>;
  getById(id: string): Promise<OrderResponseDTO>;
  delById(id: string): Promise<void>;
}
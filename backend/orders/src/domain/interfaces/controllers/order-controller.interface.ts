import { IOrderRequestDTO } from "../../interfaces/dto/request/order.request.dto.interface";
import { IOrderResponseDTO } from "../../interfaces/dto/response/order.response.dto.interface";

export interface IOrderController {
  save(dto: IOrderRequestDTO): Promise<IOrderResponseDTO>;
  getAll(): Promise<IOrderResponseDTO[]>;
  getById(id: string): Promise<IOrderResponseDTO>;
  delById(id: string): Promise<void>;
}
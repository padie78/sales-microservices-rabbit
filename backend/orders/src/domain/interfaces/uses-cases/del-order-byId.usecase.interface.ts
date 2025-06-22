export interface IDelOrderByIdUseCase {
    execute(id: string): Promise<void>;
}

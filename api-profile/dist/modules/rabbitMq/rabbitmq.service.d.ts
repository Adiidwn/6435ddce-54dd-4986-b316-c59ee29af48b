export declare class RabbitMQService {
    private readonly connection;
    constructor();
    sendMessage(queue: string, message: any): Promise<void>;
}

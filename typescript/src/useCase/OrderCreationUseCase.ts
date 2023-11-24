import Order from "../domain/Order";
import OrderRepository from "../repository/OrderRepository";
import SellItemsRequest from "./SellItemsRequest";

class OrderCreationUseCase {
  private readonly orderRepository: OrderRepository;

  public constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public run(request: SellItemsRequest): void {
    const order: Order = new Order([]);

    for (const itemRequest of request.getRequests()) {
      order.addItems([itemRequest.getOrderItem()]);
    }

    this.orderRepository.save(order);
  }
}

export default OrderCreationUseCase;

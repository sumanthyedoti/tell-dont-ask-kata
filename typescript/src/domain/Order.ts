import { ProductCatalog } from "../repository/ProductCatalog";
import UnknownProductException from "../useCase/exceptions/UnknownProductException";
import SellItemRequest from "../useCase/SellItemRequest";
import SellItemsRequest from "../useCase/SellItemsRequest";
import OrderItem from "./OrderItem";
import { OrderStatus } from "./OrderStatus";

class Order {
  private total: number;
  private currency: string;
  private items: OrderItem[] = [];
  private tax: number;
  private status: OrderStatus;
  private id: number;

  constructor(items: OrderItem[] = []) {
    this.items = items;
    this.status = OrderStatus.CREATED;
    this.currency = "EUR";
    this.total = 0;
    this.tax = 0;
  }

  public getTotal(): number {
    return this.total;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  private addItem(order: OrderItem) {
    this.items.push(order);
    this.total += order.getTaxedAmount();
    this.tax += order.getTax();
  }

  public getTax(): number {
    return this.tax;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public shipOrder(): void {
    this.status = OrderStatus.SHIPPED;
  }

  public approveOrder(): void {
    this.status = OrderStatus.APPROVED;
  }

  public rejectOrder(): void {
    this.status = OrderStatus.REJECTED;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public createOrder(
    request: SellItemsRequest,
    productCatelog: ProductCatalog,
  ): void {
    for (const itemRequest of request.getRequests()) {
      this.addItem(this.createOrderItem(itemRequest, productCatelog));
    }
  }

  public getProductTaxedAmount(request: SellItemRequest): number {
    return (
      Math.round(
        request.getProduct().getTaxedAmount() * request.getQuantity() * 100,
      ) / 100
    );
  }

  public getProductTax(request: SellItemRequest): number {
    return request.getProduct().getTax() * request.getQuantity();
  }

  private createOrderItem(
    itemRequest: SellItemRequest,
    productCatalog: ProductCatalog,
  ): OrderItem {
    if (!productCatalog.getByName(itemRequest.getProduct().getName())) {
      throw new UnknownProductException();
    }
    return itemRequest.getProduct().createOrderItem(itemRequest);
  }
}

export default Order;

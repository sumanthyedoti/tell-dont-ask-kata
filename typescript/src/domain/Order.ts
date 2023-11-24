import OrderItem from "./OrderItem";
import { OrderStatus } from "./OrderStatus";

class Order {
  private total: number;
  private currency: string;
  private items: OrderItem[] = [];
  private tax: number;
  private status: OrderStatus;
  private id: number;

  constructor(items: OrderItem[]) {
    this.items = items;
    this.status = OrderStatus.CREATED;
    this.currency = "EUR";
    this.total = 0;
    this.tax = 0;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void {
    this.total = total;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public setCurrency(currency: string): void {
    this.currency = currency;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public addItems(orders: OrderItem[]) {
    this.items.push(...orders);
    this.total += orders.reduce(
      (acc, order) => acc + order.getTaxedAmount(),
      0,
    );
    this.tax += orders.reduce((acc, order) => acc + order.getTax(), 0);
  }

  public getTax(): number {
    return this.tax;
  }

  public setTax(tax: number): void {
    this.tax = tax;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public setStatus(status: OrderStatus): void {
    this.status = status;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }
}

export default Order;

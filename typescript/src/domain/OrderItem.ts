import Product from "./Product";

class OrderItem {
  constructor(
    private product: Product,
    private quantity: number = 1,
    private taxedAmount: number,
    private tax: number,
  ) {}

  public getProduct(): Product {
    return this.product;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getTaxedAmount(): number {
    return this.taxedAmount;
  }

  public getTax(): number {
    return this.tax;
  }
}

export default OrderItem;

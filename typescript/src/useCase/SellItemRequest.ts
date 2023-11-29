import Product from "../domain/Product";

class SellItemRequest {
  private quantity: number;
  constructor(private product: Product) {
    this.quantity = 1;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setProductName(product: Product): void {
    this.product = product;
  }

  public getProduct(): Product {
    return this.product;
  }
}

export default SellItemRequest;

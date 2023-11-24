import OrderItem from "../domain/OrderItem";
import Product from "../domain/Product";
import { ProductCatalog } from "../repository/ProductCatalog";
import UnknownProductException from "./exceptions/UnknownProductException";

class SellItemRequest {
  private quantity: number;
  constructor(
    private product: Product,
    private catalog: ProductCatalog,
  ) {
    this.quantity = 1;
  }

  public getTaxedAmount(): number {
    return (
      Math.round(this.product.getTaxedAmount() * this.quantity * 100) / 100
    );
  }

  public getTax(): number {
    return this.product.getTax() * this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public setProductName(product: Product): void {
    this.product = product;
  }

  private isProductValid(): boolean {
    return !!this.catalog.getByName(this.product.getName());
  }

  public getOrderItem(): OrderItem {
    if (!this.isProductValid()) {
      throw new UnknownProductException();
    }
    return new OrderItem(
      this.product,
      this.quantity,
      this.getTaxedAmount(),
      this.getTax(),
    );
  }
}

export default SellItemRequest;

import { ProductCatalog } from "../repository/ProductCatalog";
import UnknownProductException from "../useCase/exceptions/UnknownProductException";
import SellItemRequest from "../useCase/SellItemRequest";
import Category from "./Category";
import OrderItem from "./OrderItem";

class Product {
  constructor(
    private name: string,
    private price: number,
    private category: Category,
  ) {}

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getTax(): number {
    return (
      Math.round((this.price / 100) * this.category.getTaxPercentage() * 100) /
      100
    );
  }

  public getTaxedAmount(): number {
    const unitaryTaxedAmount: number =
      Math.round((this.price + this.getTax()) * 100) / 100;
    return unitaryTaxedAmount;
  }

  public getCategory(): Category {
    return this.category;
  }

  private getProductTaxedAmount(request: SellItemRequest): number {
    return (
      Math.round(this.getTaxedAmount() * request.getQuantity() * 100) / 100
    );
  }

  private getProductTax(request: SellItemRequest): number {
    return this.getTax() * request.getQuantity();
  }

  public createOrderItem(
    itemRequest: SellItemRequest,
    productCatalog: ProductCatalog,
  ): OrderItem {
    if (!productCatalog.getByName(itemRequest.getProduct().getName())) {
      throw new UnknownProductException();
    }
    return new OrderItem(
      itemRequest.getProduct(),
      itemRequest.getQuantity(),
      this.getProductTaxedAmount(itemRequest),
      this.getProductTax(itemRequest),
    );
  }
}

export default Product;

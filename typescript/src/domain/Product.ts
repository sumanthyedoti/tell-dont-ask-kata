import Category from "./Category";

class Product {
  private name: string;
  private price: number;
  private category: Category;

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
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

  public setCategory(category: Category): void {
    this.category = category;
  }
}

export default Product;

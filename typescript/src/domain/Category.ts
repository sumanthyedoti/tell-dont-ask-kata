class Category {
  constructor(
    private name: string,
    private taxPercentage: number,
  ) {}

  public getName(): string {
    return this.name;
  }

  public getTaxPercentage(): number {
    return this.taxPercentage;
  }
}

export default Category;

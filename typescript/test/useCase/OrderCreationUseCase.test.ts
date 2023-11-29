import Category from "../../src/domain/Category";
import Order from "../../src/domain/Order";
import { OrderStatus } from "../../src/domain/OrderStatus";
import Product from "../../src/domain/Product";
import { ProductCatalog } from "../../src/repository/ProductCatalog";
import OrderCreationUseCase from "../../src/useCase/OrderCreationUseCase";
import SellItemRequest from "../../src/useCase/SellItemRequest";
import SellItemsRequest from "../../src/useCase/SellItemsRequest";
import UnknownProductException from "../../src/useCase/exceptions/UnknownProductException";
import InMemoryProductCatalog from "../doubles/InMemoryProductCatalog";
import TestOrderRepository from "../doubles/TestOrderRepository";

describe("OrderApprovalUseCase", () => {
  const orderRepository: TestOrderRepository = new TestOrderRepository();
  let food: Category = new Category("food", 10);

  const saladProduct = new Product("salad", 3.56, food);
  const tomatoProduct = new Product("tomato", 4.65, food);
  const productCatalog: ProductCatalog = new InMemoryProductCatalog([
    saladProduct,
    tomatoProduct,
  ]);
  const useCase: OrderCreationUseCase = new OrderCreationUseCase(
    orderRepository,
    productCatalog,
  );

  it("sellMultipleItems", () => {
    let saladRequest: SellItemRequest = new SellItemRequest(saladProduct);
    saladRequest.setQuantity(2);

    let tomatoRequest: SellItemRequest = new SellItemRequest(tomatoProduct);
    tomatoRequest.setQuantity(3);

    let requests: SellItemsRequest = new SellItemsRequest([saladRequest]);
    requests.addRequests([tomatoRequest]);

    useCase.run(requests);

    const insertedOrder: Order = orderRepository.getSavedOrder();
    expect(insertedOrder.getStatus()).toBe(OrderStatus.CREATED);
    expect(insertedOrder.getTotal()).toBe(23.2);
    expect(insertedOrder.getTax()).toBe(2.13);
    expect(insertedOrder.getCurrency()).toBe("EUR");
    const orderItems = insertedOrder.getItems();
    expect(orderItems.length).toBe(2);
    expect(orderItems[0].getProduct().getName()).toBe("salad");
    expect(orderItems[0].getProduct().getPrice()).toBe(3.56);
    expect(orderItems[0].getQuantity()).toBe(2);
    expect(orderItems[0].getTaxedAmount()).toBe(7.84);
    expect(orderItems[0].getTax()).toBe(0.72);
    expect(orderItems[1].getProduct().getName()).toBe("tomato");
    expect(orderItems[1].getProduct().getPrice()).toBe(4.65);
    expect(orderItems[1].getQuantity()).toBe(3);
    expect(orderItems[1].getTaxedAmount()).toBe(15.36);
    expect(orderItems[1].getTax()).toBe(1.41);
  });

  it("unknownProduct", () => {
    const unknownProduct = new Product("unknown product", 3.4, food);
    let unknownProductRequest: SellItemRequest = new SellItemRequest(
      unknownProduct,
    );
    let request: SellItemsRequest = new SellItemsRequest([
      unknownProductRequest,
    ]);

    expect(() => useCase.run(request)).toThrow(UnknownProductException);
  });
});

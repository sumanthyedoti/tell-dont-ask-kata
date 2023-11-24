import SellItemRequest from "./SellItemRequest";

class SellItemsRequest {
  constructor(private requests: SellItemRequest[]) {}

  public addRequests(request: SellItemRequest[]): void {
    this.requests.push(...request);
  }

  public getRequests(): SellItemRequest[] {
    return this.requests;
  }
}

export default SellItemsRequest;

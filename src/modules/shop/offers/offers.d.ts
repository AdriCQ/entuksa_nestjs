import { Image } from "@modules/images/images.model";
import { ShopStore } from '@modules/shop/store/store.model';

/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace IShopOffer {
  /**
   * Attribute
   */
  interface Attribute {
    name: string;
    value: string | number;
  }
  /**
   * Configurable
   */
  interface Configurable {
    name: string;
    values: string[];
  }
  interface ConfigurableWithPrice {
    name: string;
    values: Attribute[];
  }
  /**
   * Offer
   */
  interface Offer {
    title: string;
    description: string;
    prices: Prices;
    stock: Stock;
    type: Type;
    image: Image;
    store: ShopStore;
    attributes: Attribute[];
    configurable: Configurable[];
    configurableWithPrice: ConfigurableWithPrice[];
    rating: number;
    onsale: boolean;
    validatedAt?: Date;
  }
  /**
   * Offer prices
   */
  interface Prices {
    sell: number;
    production: number;
    vendor: number;
  }
  /**
   * Stock
   */
  interface Stock {
    status: StockStatus;
    qty: number;
  }
  type StockStatus = 'INFINITY' | 'SOLD_OUT' | 'LIMITED';
  type Type = 'SERVICE' | 'PRODUCT';

}
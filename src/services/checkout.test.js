import { getQuantity, calculatePrice, formatPrice } from "./checkout";
import { audiences } from "../data/audiences";

describe("test getQuantity", () => {
  it("get 3 for 2 deal - buy 3 pay 2 quantity", () => {
    const quantity = 3;
    const min = 2;
    const free = 1;
    const expectedQuantity = 2;

    const actual = getQuantity(quantity, min, free);

    expect(actual).toBe(expectedQuantity);
  });

  it("get 3 for 2 deal - buy 4 pay 3 quantity", () => {
    const quantity = 4;
    const min = 2;
    const free = 1;
    const expectedQuantity = 3;

    const actual = getQuantity(quantity, min, free);

    expect(actual).toBe(expectedQuantity);
  });

  it("get 3 for 2 deal - buy 6 pay 4 quantity", () => {
    const quantity = 6;
    const min = 2;
    const free = 1;
    const expectedQuantity = 4;

    const actual = getQuantity(quantity, min, free);

    expect(actual).toBe(expectedQuantity);
  });
});

describe("test for Associate", () => {
  it("associate single pricing rule", () => {
    const audience = audiences[0];
    const price = 185.5;
    const quantity = 3;
    const pricingRule = audience.pricingRule[0];

    let actual = calculatePrice(
      price,
      quantity,
      pricingRule,
      audience.discountRate
    );

    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("371.00");
  });

  it("associate cart", () => {
    const audience = audiences[0];
    const pricingRule = audience.pricingRule;

    const cart = [
      { key: "santa_cruz", quantity: 3, price: 185.5 },
      { key: "fox_float", quantity: 1, price: 66 },
      { key: "ironhide", quantity: 1, price: 3299.99 }
    ];

    let actual = 0;

    cart.map(item => {
      const mapPricingRule = pricingRule.find(
        rule => rule.key === item.key
      );

      actual += calculatePrice(
        item.price,
        item.quantity,
        mapPricingRule,
        audience.discountRate
      );
    });

    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("3,568.69");
  });
});

describe("test for Platinum", () => {
  it("platinum single pricing rule for Kone with no meet T&C", () => {
    const audience = audiences[1];
    const price = 3488.99;
    const quantity = 3;
    const pricingRule = audience.pricingRule[0];

    let actual = calculatePrice(
      price,
      quantity,
      pricingRule,
      audience.discountRate
    );
    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("8,896.92");
  });

  it("platinum single pricing rule for Kone with meet T&C", () => {
    const audience = audiences[1];
    const price = 3488.99;
    const quantity = 5;
    const pricingRule = audience.pricingRule[0];

    let actual = calculatePrice(
      price,
      quantity,
      pricingRule,
      audience.discountRate
    );
    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("14,444.95");
  });

  it("platinum single pricing rule for multiple Ironhide", () => {
    const audience = audiences[1];
    const price = 3299.99;
    const quantity = 3;
    const pricingRule = audience.pricingRule[1];

    let actual = calculatePrice(
      price,
      quantity,
      pricingRule,
      audience.discountRate
    );
    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("9,000");
  });

  it("platinum single pricing rule for Ironhide Catridge", () => {
    const audience = audiences[1];
    const price = 529.99;
    const quantity = 5;
    const pricingRule = audience.pricingRule[2];

    let actual = calculatePrice(
      price,
      quantity,
      pricingRule,
      audience.discountRate
    );
    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("2,119.96");
  });

  it("platinum cart", () => {
    const audience = audiences[1];
    const pricingRule = audience.pricingRule;

    const cart = [
      { key: "kone", quantity: 1, price: 3488.99 },
      { key: "ironhide_cartridge", quantity: 5, price: 529.99 },
      { key: "fox_float", quantity: 1, price: 66 },
      { key: "shimano_derailuer", quantity: 1, price: 67.6 }
    ];

    let actual = 0;

    cart.map(item => {
      const mapPricingRule = pricingRule.find(
        rule => rule.key === item.key
      );

      actual += calculatePrice(
        item.price,
        item.quantity,
        mapPricingRule,
        audience.discountRate
      );
    });

    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("5,199.16");
  });
});

describe("test for Diamond", () => {
  it("diamond Kone pricing rule", () => {
    const audience = audiences[2];
    const price = 3488.99;
    const quantity = 3;
    const pricingRule = audience.pricingRule[0];

    let actual = calculatePrice(
      price,
      quantity,
      pricingRule,
      audience.discountRate
    );

    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("7,766.97");
  });

  it("diamond Ironhide pricing rule", () => {
    const audience = audiences[2];
    const price = 3299.99;
    const quantity = 3;
    const pricingRule = audience.pricingRule[1];

    let actual = calculatePrice(
      price,
      quantity,
      pricingRule,
      audience.discountRate
    );

    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("7,500");
  });

  it("diamond Ironhide Cartridge pricing rule", () => {
    const audience = audiences[2];
    const price = 529.99;
    const quantity = 3;
    const pricingRule = audience.pricingRule[2];

    let actual = calculatePrice(
      price,
      quantity,
      pricingRule,
      audience.discountRate
    );

    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("1,059.98");
  });

  it("diamond cart - scenario 1", () => {
    const audience = audiences[2];
    const pricingRule = audience.pricingRule;

    const cart = [
      { key: "kone", quantity: 3, price: 3488.99 },
      { key: "ironhide", quantity: 2, price: 3299.99 },
      { key: "ironhide_cartridge", quantity: 3, price: 529.99 }
    ];

    let actual = 0;

    cart.map(item => {
      const mapPricingRule = pricingRule.find(
        rule => rule.key === item.key
      );

      actual += calculatePrice(
        item.price,
        item.quantity,
        mapPricingRule,
        audience.discountRate
      );
    });

    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("13,826.95");
  });

  it("diamond cart - scenario 2", () => {
    const audience = audiences[2];
    const pricingRule = audience.pricingRule;

    const cart = [
      { key: "ironhide_cartridge", quantity: 3, price: 529.99 },
      { key: "santa_cruz", quantity: 2, price: 185.5 }
    ];
    let actual = 0;

    cart.map(item => {
      const mapPricingRule = pricingRule.find(
        rule => rule.key === item.key
      );

      actual += calculatePrice(
        item.price,
        item.quantity,
        mapPricingRule,
        audience.discountRate
      );
    });

    actual = formatPrice(actual);

    expect(actual).toContain("MYR");
    expect(actual).toContain("1,356.78");
  });
});

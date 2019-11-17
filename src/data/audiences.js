export const audiences = [
  {
    key: 1,
    level: "Associate",
    discountRate: 5,
    pricingRule: [
      {
        key: "santa_cruz",
        min: 2,
        free: 1,
        newPrice: 0
      }
    ]
  },
  {
    key: 2,
    level: "Platinum",
    discountRate: 15,
    pricingRule: [
      {
        key: "kone",
        min: 5,
        free: 0,
        newPrice: 2888.99
      },
      {
        key: "ironhide",
        min: 1,
        free: 0,
        newPrice: 3000
      },
      {
        key: "ironhide_cartridge",
        min: 4,
        free: 1,
        newPrice: 0
      }
    ]
  },
  {
    key: 3,
    level: "Diamond",
    discountRate: 20,
    pricingRule: [
      {
        key: "kone",
        min: 3,
        free: 0,
        newPrice: 2588.99
      },
      {
        key: "ironhide",
        min: 1,
        free: 0,
        newPrice: 2500
      },
      {
        key: "ironhide_cartridge",
        min: 2,
        free: 1,
        newPrice: 0
      }
    ]
  }
];

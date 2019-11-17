// get quantity that needs to be paid with
// if meet requirement
export function getQuantity(quantity, min, free) {
  let count = quantity;
  let term = min + free;

  // if has free term
  if (free && quantity >= term) {
    let freeQuantity = quantity / term;
    count = quantity - Math.floor(freeQuantity);
  }
  return count;
}

export function calculatePrice(
  price,
  quantity,
  pricingRule = {},
  discountRate = 0
) {
  // destructure rules and set default value
  const { min = 0, free = 0, newPrice = 0 } = pricingRule;
  const quantityToBuy = getQuantity(quantity, min, free);

  // use newPrice if meet minimum requirement
  price = newPrice && quantity >= min ? newPrice : price;

  // invalidate pricing rule if didn't meet pricing rule minimum requirement
  pricingRule = quantity < min ? {} : pricingRule;

  // additional discount if discount rate exist and no special pricing rule applied
  if (discountRate && Object.keys(pricingRule).length === 0) {
    price = price - price * (discountRate / 100);
  }

  return price * quantityToBuy;
}

// can extend usability to format currency, dollar sign, etc
export function formatPrice(price) {
  // nodejs doesn't come with full-icu for Intl localization
  // hence the unit test is behaving differently with browsers
  // additonal package is needed if needs to be run in node runetime (unit test)

  // \xa0 represents non-breaking space - nbsp (char code 160)
  // intl numberFormat is returning nbsp between the currency and amount instead of a space (char code 32)
  // therefore unit test is testing against toContain instead of toEqual
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    currencyDisplay: "symbol"
  }).format(price);
}

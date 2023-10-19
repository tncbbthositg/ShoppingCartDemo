// TODO: i18n

const PRICE_FORMAT = new Intl.NumberFormat(
  'en-US',
  {
    minimumFractionDigits: 2,
  }
);

export function formatCurrency(value: number) {
  const paddedValue = PRICE_FORMAT.format(value);
  return `$${paddedValue}`;
}

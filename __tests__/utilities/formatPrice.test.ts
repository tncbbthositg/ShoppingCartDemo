import { formatCurrency } from '../../src/utilities';

describe(formatCurrency, () => {
  it('returns dollars by default', () => {
    const result = formatCurrency(2.17);
    expect(result).toBe('$2.17');
  });

  it('pads to two digits', () => {
    const result = formatCurrency(111.8);
    expect(result).toBe('$111.80');
  });

  it('uses en-US separators by default', () => {
    const result = formatCurrency(1215);
    expect(result).toBe('$1,215.00');
  });
});

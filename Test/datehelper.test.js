const { getDate, getMinDate } = require('../util/helpers/date');

describe('getDate', () => {
  it('returns a string in the expected format', () => {
    const result = getDate();
    expect(typeof result).toBe('string');
    expect(result).toMatch(/\w{3}\s\d{2}\s\d{4}/);
  });
});

describe('getMinDate', () => {
  it('returns a string in the expected format', () => {
    const result = getMinDate();
    expect(typeof result).toBe('string');
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});

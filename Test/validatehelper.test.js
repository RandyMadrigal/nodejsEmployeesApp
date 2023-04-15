const { validate } = require('../util/helpers/validate');

describe('validate', () => {
  test('returns false if vacation is true', () => {
    expect(validate(true)).toBe(false);
  });

  test('returns true if vacation is false', () => {
    expect(validate(false)).toBe(true);
  });
});

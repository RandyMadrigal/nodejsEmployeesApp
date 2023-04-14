const { getLogin } = require('../controllers/login');

describe('getLogin function', () => {
  test('should render login page with layout false', () => {
    const renderSpy = jest.spyOn(res, 'render');
    const req = {};
    const res = {
      render: jest.fn(),
    };
    const next = jest.fn();

    getLogin(req, res, next);

    expect(renderSpy).toHaveBeenCalledWith('login', { layout: false });
  });
});

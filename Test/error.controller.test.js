const { error } = require('../controllers/error');

test('should return a 404 error page', () => {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
  };
  const next = jest.fn();

  error(req, res, next);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.render).toHaveBeenCalledWith('error', { titlePage: '404' });
});

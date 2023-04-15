const adminUser = require("../model/adminUser");
const bcryptjs = require("bcryptjs");
const loginController = require('../controllers/login');

jest.mock("../model/adminUser");
jest.mock("bcryptjs");

describe("loginController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render login page", () => {
    const req = {};
    const res = {
      render: jest.fn(),
    };
    loginController.getLogin(req, res);
    expect(res.render).toHaveBeenCalledWith("login", { layout: false });
  });

  it("should redirect to / if user not found", async () => {
    const req = {
      body: {
        UserName: "test",
        Password: "testpassword",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    adminUser.findAll.mockResolvedValueOnce([]);

    await loginController.postLogin(req, res);

    expect(adminUser.findAll).toHaveBeenCalledWith({
      where: { UserName: "test" },
    });
    expect(res.redirect).toHaveBeenCalledWith("/");
  });

  it("should redirect to /index if password is correct", async () => {
    const req = {
      body: {
        UserName: "test",
        Password: "testpassword",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const mockAdminUser = { Password: "encryptedpassword" };
    adminUser.findAll.mockResolvedValueOnce([{ dataValues: mockAdminUser }]);
    bcryptjs.compare.mockResolvedValueOnce(true);

    await loginController.postLogin(req, res);

    expect(adminUser.findAll).toHaveBeenCalledWith({
      where: { UserName: "test" },
    });
    expect(bcryptjs.compare).toHaveBeenCalledWith(
      "testpassword",
      "encryptedpassword"
    );
    expect(res.redirect).toHaveBeenCalledWith("/index");
  });

  it("should redirect to / if password is incorrect", async () => {
    const req = {
      body: {
        UserName: "test",
        Password: "testpassword",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const mockAdminUser = { Password: "encryptedpassword" };
    adminUser.findAll.mockResolvedValueOnce([{ dataValues: mockAdminUser }]);
    bcryptjs.compare.mockResolvedValueOnce(false);

    await loginController.postLogin(req, res);

    expect(adminUser.findAll).toHaveBeenCalledWith({
      where: { UserName: "test" },
    });
    expect(bcryptjs.compare).toHaveBeenCalledWith(
      "testpassword",
      "encryptedpassword"
    );
    expect(res.redirect).toHaveBeenCalledWith("/");
  });

  it("should handle database error", async () => {
    const req = {
      body: {
        UserName: "test",
        Password: "testpassword",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    adminUser.findAll.mockRejectedValueOnce(new Error("database error"));

    await loginController.postLogin(req, res);

    expect(adminUser.findAll).toHaveBeenCalledWith({
      where: { UserName: "test" },
    });
    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});

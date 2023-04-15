const departmentController = require('../controllers/department');
const Department = require('../model/department');

jest.mock('../model/department');

describe('departmentController', () => {
  describe('getAddDepartment', () => {
    it('should render add department view with department data', async () => {
      const mockDepartments = [
        { dataValues: { Id: 1, Nombre: 'Department 1' } },
        { dataValues: { Id: 2, Nombre: 'Department 2' } },
      ];

      Department.findAll.mockResolvedValue(mockDepartments);

      const mockReq = {};
      const mockRes = {
        render: jest.fn(),
      };
      const mockNext = jest.fn();

      await departmentController.getAddDepartment(mockReq, mockRes, mockNext);

      expect(Department.findAll).toHaveBeenCalled();
      expect(mockRes.render).toHaveBeenCalledWith('admin/add-department', {
        pageTitle: 'add department',
        item: mockDepartments.map((department) => department.dataValues),
        hasItems: true,
      });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error getting departments';

      Department.findAll.mockRejectedValue(new Error(errorMessage));

      const mockReq = {};
      const mockRes = {
        render: jest.fn(),
      };
      const mockNext = jest.fn();

      await departmentController.getAddDepartment(mockReq, mockRes, mockNext);

      expect(Department.findAll).toHaveBeenCalled();
      expect(mockRes.render).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
    });
  });
});

describe("Department Controller", () => {
    describe("getAddDepartment", () => {
      it("should render add-department view with department items", async () => {
        const mockDepartment = {
          dataValues: {
            Id: 1,
            Nombre: "Department 1",
          },
        };
  
        jest.spyOn(Department, "findAll").mockResolvedValue([mockDepartment]);
  
        const mockRender = jest.fn();
        const mockRes = {
          render: mockRender,
        };
  
        await departmentController.getAddDepartment(null, mockRes, null);
  
        expect(mockRender).toHaveBeenCalledWith("admin/add-department", {
          pageTitle: "add department",
          item: [mockDepartment.dataValues],
          hasItems: true,
        });
      });
  
      it("should render add-department view without department items", async () => {
        jest.spyOn(Department, "findAll").mockResolvedValue([]);
  
        const mockRender = jest.fn();
        const mockRes = {
          render: mockRender,
        };
  
        await departmentController.getAddDepartment(null, mockRes, null);
  
        expect(mockRender).toHaveBeenCalledWith("admin/add-department", {
          pageTitle: "add department",
          item: [],
          hasItems: false,
        });
      });
    });
  
    describe("postDepartment", () => {
      it("should create a new department", async () => {
        const mockReq = {
          body: {
            Nombre: "Department 1",
          },
        };
  
        const mockCreate = jest.spyOn(Department, "create").mockResolvedValue({
          dataValues: {
            Id: 1,
            Nombre: "Department 1",
          },
        });
  
        const mockRedirect = jest.fn();
        const mockRes = {
          redirect: mockRedirect,
        };
  
        await departmentController.postDepartment(mockReq, mockRes, null);
  
        expect(mockCreate).toHaveBeenCalledWith({
          Nombre: "Department 1",
        });
  
        expect(mockRedirect).toHaveBeenCalledWith("/add-department");
      });
  
      it("should delete an existing department", async () => {
        const mockReq = {
          body: {
            Id: 1,
          },
        };
  
        const mockDestroy = jest.spyOn(Department, "destroy").mockResolvedValue();
  
        const mockRedirect = jest.fn();
        const mockRes = {
          redirect: mockRedirect,
        };
  
        await departmentController.postDepartment(mockReq, mockRes, null);
  
        expect(mockDestroy).toHaveBeenCalledWith({
          where: {
            Id: 1,
          },
        });
  
        expect(mockRedirect).toHaveBeenCalledWith("/add-department");
      });
    });
  });
  

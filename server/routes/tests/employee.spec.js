const expect = require('chai').expect;
const Employee = require('../../models/employee');
const sinon = require('sinon');
const { getAllEmployees, postEmployee, deleteEmployee, patchEmployee } = require('../employee').routes;

const employee1 = {
    employeeId: "1234567",
    firstName: "Tester",
    lastName: "Tester",
    phoneNumber: "1111111111",
    address: "12 Test Road",
    title: "Tester"
};

const employeeModifier = {
    firstName: "Tester2",
    lastName: "Tester2"
};
 
describe('Employee routes', function() {
    it('Get all employees should call find and respond with success', (done) => {
        sinon.stub(Employee, 'find');
        let employees = [employee1];
        Employee.find.yields(null, employees);
        let request = {};
        let response = {
            json: sinon.stub()
        };
        getAllEmployees(request, response);
        sinon.assert.calledWith(response.json, {success: true, employees: employees});
        Employee.find.restore();
        done();
    });
    it('Creating a new employee should call create and respond with success', (done) => {
        sinon.stub(Employee, 'create');
        Employee.create.yields(null, employee1);
        let request = {
            body: employee1
        };
        let response = {
            json: sinon.stub()
        };
        postEmployee(request, response);
        sinon.assert.calledWith(response.json, {success: true, employee: employee1});
        Employee.create.restore();
        done();
    });
    it('Deleting an employee should call deleteOne and respond with success', (done) => {
        sinon.stub(Employee, 'deleteOne');
        Employee.deleteOne.yields(null);
        let request = {
            query: {
                employeeId: employee1.employeeId
            }
        };
        let response = {
            json: sinon.stub()
        };
        deleteEmployee(request, response);
        sinon.assert.calledWith(response.json, {success: true});
        Employee.deleteOne.restore();
        done();
    });
    it('Modifying an employee should call findByIdAndUpdate and respond with success', (done) => {
        sinon.stub(Employee, 'findOneAndUpdate');
        let modifiedEmployee = {
            ... employee1,
            firstName: employeeModifier.firstName,
            lastName: employeeModifier.lastName
        }
        Employee.findOneAndUpdate.yields(null, modifiedEmployee);
        let request = {
            query: {
                employeeId: employee1.employeeId
            },
            body: employeeModifier
        };
        let response = {
            json: sinon.stub()
        };
        patchEmployee(request, response);
        sinon.assert.calledWith(response.json, {success: true, employee: modifiedEmployee});
        Employee.findOneAndUpdate.restore();
        done();
    });
});

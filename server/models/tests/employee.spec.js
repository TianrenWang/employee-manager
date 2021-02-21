const expect = require('chai').expect;
const Employee = require('../employee');
 
describe('Employee model', function() {
    let employee;
    beforeEach(done => {
        employee = {
            employeeId: "1234567",
            firstName: "Tester",
            lastName: "Tester",
            phoneNumber: "1111111111",
            address: "12 Node Road",
            title: "Tester"
        };
        done();
    });

    it('Should be valid with correct object', (done) => {
        new Employee(employee).validate(function(err) {
            expect(err).to.not.exist;
            done();
        });
    });
    it('Should be invalid if title is not defined', (done) => {
        delete employee.title;
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if title is empty', (done) => {
        employee.title = "";
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if address is not defined', (done) => {
        delete employee.address;
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if address is empty', (done) => {
        employee.address = "";
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if phoneNumber is not defined', (done) => {
        delete employee.phoneNumber;
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if phoneNumber is empty', (done) => {
        employee.phoneNumber = "";
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if lastName is not defined', (done) => {
        delete employee.lastName;
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if lastName is empty', (done) => {
        employee.lastName = "";
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if firstName is not defined', (done) => {
        delete employee.firstName;
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if firstName is empty', (done) => {
        employee.firstName = "";
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if employeeId is not defined', (done) => {
        delete employee.employeeId;
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if employeeId is empty', (done) => {
        employee.employeeId = "";
        new Employee(employee).validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
});
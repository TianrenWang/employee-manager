const router = require('express').Router();
const passport = require('passport');
const Employee = require('../models/employee');

const employeeIdNotProvidedError = new Error("EmployeeId was not provided");
const bodyNotProvidedError = new Error("Request does not contain required body");

const routes = {
    getAllEmployees(req, res){
        Employee.find((error, employees) => {
            let response = {};
            if (error) {
                response.success = false;
                response.error = error;
            } else {
                response.success = true;
                response.employees = employees;
            }
            res.json(response);
        });
    },
    postEmployee(req, res){
        Employee.create(req.body, (error, employee) => {
            let response = {};
            if (error) {
                response.success = false;
                response.error = error;
                console.error(error.message);
            } else {
                response.success = true;
                response.employee = employee;
            }
            res.json(response);
        });
    },
    deleteEmployee(req, res){
        if (!req.query.employeeId){
            console.error(employeeIdNotProvidedError.message);
            res.json({success: false, error: employeeIdNotProvidedError});
            return;
        }
        Employee.deleteOne({employeeId: req.query.employeeId}, (error) => {
            let response = {};
            if (error) {
                response.success = false;
                response.error = error;
                console.error(error.message);
            } else {
                response.success = true;
            }
            res.json(response);
        });
    },
    patchEmployee(req, res){
        if (!req.query.employeeId){
            console.error(employeeIdNotProvidedError.message);
            res.json({success: false, error: employeeIdNotProvidedError});
            return;
        }
        if (!req.body){
            console.error(bodyNotProvidedError.message);
            res.json({success: false, error: bodyNotProvidedError});
            return;
        }
        Employee.findOneAndUpdate({employeeId: req.query.employeeId}, req.body, {new: true}, (error, employee) => {
            let response = {};
            if (error) {
                response.success = false;
                response.error = error;
                console.error(error.message);
            } else {
                response.success = true;
                response.employee = employee;
            }
            res.json(response);
        });
    },
}

const authentication = passport.authenticate('jwt',  { session: false });

router.get('', authentication, routes.getAllEmployees);
router.post('', authentication, routes.postEmployee);
router.delete('', authentication, routes.deleteEmployee);
router.patch('', authentication, routes.patchEmployee);

exports.router = router;
exports.routes = routes;

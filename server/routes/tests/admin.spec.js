const Admin = require('../../models/admin');
const sinon = require('sinon');
const authorize = require('../admin').authorize;
const jwt = require('jsonwebtoken');

const admin1 = {
    username: "Tester",
    password: "1234"
};

const auth_token = "jfosidjr234";
 
describe('Admin routes', function() {
    it('Login should return an authentication code', (done) => {
        sinon.stub(Admin, 'findOne');
        let jwtCall = sinon.stub(jwt, 'sign');
        Admin.findOne.yields(null, admin1);
        jwtCall.returns(auth_token);
        let request = {
            body: admin1
        };
        let response = {
            json: sinon.stub()
        };
        authorize(request, response);
        sinon.assert.calledWith(response.json, {success: true, auth_token: "JWT " + auth_token, admin: admin1});
        Admin.findOne.restore();
        jwt.sign.restore();
        done();
    });
});

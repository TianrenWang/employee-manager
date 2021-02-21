const expect = require('chai').expect;
const Admin = require('../admin');
 
describe('Admin model', function() {
    it('Should be valid with correct object', (done) => {
        let admin = new Admin({username: "test", password: "test"});
 
        admin.validate(function(err) {
            expect(err).to.not.exist;
            done();
        });
    });
    it('Should be invalid if password is empty', (done) => {
        let admin = new Admin({username: "test"});
 
        admin.validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
    it('Should be invalid if username is empty', (done) => {
        let admin = new Admin({password: "test"});
 
        admin.validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
});
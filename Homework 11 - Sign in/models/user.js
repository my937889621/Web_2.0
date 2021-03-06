var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.studentID = user.studentID;
    this.phone = user.phone;
    this.email = user.email;
}

User.prototype.save = function(callback) {
    var user = {
        name: this.name,
        password: this.password,
        studentID: this.studentID,
        phone: this.phone,
        email: this.email
    };
    
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        
        db.collection('users', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            } 
            
            collection.insert(user, {safe: true}, function(err, user) {
                mongodb.close();
                return err? callback(err) : callback(null, user.ops[0]);
            });
        });
    });
};

User.get = function(name, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            collection.findOne({name: name}, function (err, user) {
                mongodb.close();
                return err? callback(err) : callback(null, user);
            });
        });
    });
};

module.exports = User;

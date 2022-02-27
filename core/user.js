const pool = require('./pool');
const bcrypt = require('bcrypt');
const { send } = require('express/lib/response');
const res = require('express/lib/response');


function User() { };

User.prototype = {
    // Find the user data by id or username.
    find: function (user = null, callback) {
        // if the user variable is defind
        if (user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
            // var field = 'username';
        }
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;
        // let sql = `SELECT * FROM users WHERE 'username' = ?`;

        pool.query(sql, user, function (err, result) {
            if (err) throw err

            if (result.length) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object 
    create: function (body, callback) {

        var pwd = body.password;
        // Hash the password before insert it into the database.
        // body.password = bcrypt.hashSync(pwd,10);

        var md5 = require('md5');
        var staticsalt = 'oiua';
        var saltpersonal = body.saltpersonal;
        var pass = staticsalt.concat(pwd).concat(saltpersonal);
        console.log(pass);
        var hash = md5(pass);
        console.log(hash);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for (prop in body) {
            bind.push(body[prop]);
        }
        bind.push(hash);
        // prepare the sql query
        let sql = `INSERT INTO users(username, fullname, password, saltpersonal, hash) VALUES (?, ?, ?, ?, ?)`;
        // call the query give it the sql string and the values (bind array)

        // callback(sql, bind, callback);

        pool.query(sql, bind, function (err, result) {
            if (err) {
                console.log(err.sqlMessage);
            }
            // throw(err);
            callback(result.insertId);
            // return the last inserted id. if there is no error
            // callback(result.insertId, err);
        });
    },

    login: function (username, password, callback) {
        // find the user data by his username.
        this.find(username, function (user) {
            // if there is a user by this username.
            if (user) {
                // now we check his password.
                // if(bcrypt.compareSync(password, user.password)) {
                //     // return his data.
                //     callback(user);
                //     return;
                // }  
                if (password == user.password) {
                    // return his data.
                    callback(user);
                    return;
                }
            }
            // if the username/password is wrong then return null.
            callback(null);
        });

    }

}

module.exports = User;
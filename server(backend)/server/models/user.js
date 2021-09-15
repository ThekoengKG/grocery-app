var DB = require('../config/helpers');


module.exports =  class User {
    constructor(fullnames,username, email, password ){
        this.fullnames = fullnames;
        this.username= username;
        this.email= email;
        this.password= password;
    }

    static find(email){
        return DB.execute('SELECT * FROM users WHERE email = ?', [email]);
    }

    static save(user) {
        return DB.execute(
            'INSERT INTO users (fullnames, username, email, password) VALUES (?, ?, ?)',
             [user.fullnames, user.username, user.email, user.password]
        );
    }


}






# Login-Register-Nodejs
A simple Login/Register application developed in Nodejs using Express.
Web using framework express js and database mysql
### Installing dependencies:
Enter this command it will install all the dependencies at once:

```
npm install
```

### Start the application
```
node app.js
```
### Database
CREATE DATABASE IF NOT EXISTS www;
USE www;
CREATE TABLE users ( 
	id int AUTO_INCREMENT,
	username varchar(20),
	fullname varchar(20),
	password varchar(128),
	PRIMARY KEY (id)
);

- Remember change the password, user name, name of database in file pool.js
 ### Open web
 - Run web by using http://localhost:3000/




// Terminal commands- First time running code with blank database.
'
npm install        //installs all package.json dependencies.
sequelize db:migrate // creates all the tables -> linking them to models.
sequelize db:seed:all // Inserts the dummy data. 
'
===
// If sequelize does not exist 
'
npm install -g sequelize-cli
'
===
'
use Xammp for server -> MySQL + Apache
'
===
// running the application
node app.js

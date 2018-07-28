const moment = require('moment');
var date = moment();

date.add(4,'hours');
console.log(date.format('h:mm a'));

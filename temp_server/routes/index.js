var temp = require('./temperature');
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Temperature Monitoring',
  greeting:'Current temperature is ' + temp.get() + ' C' });
};
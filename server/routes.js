'use strict';

var errors = require('./components/errors')
var path = require('path');

module.exports = function(app) {
      app.use('/api/engineers', require('./api/engineer'));
      app.use('/api/users', require('./api/user'));

      app.use('/auth', require('./auth'));


      // All undefined asset or api routes should return a 404
      app.route('/:url(api|auth|components|app|bower_components|assets)/*')
       .get(errors[404]);

      // All other routes should redirect to the index.html
      app.route('/*')
        .get(function(req,res){
          res.sendfile(path.resolve(app.get('appPath') + '/index.html'));
        });

}

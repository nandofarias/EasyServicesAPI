/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, {}, function(err, html) {
    if (err) {
      return res.json(result, result.status);
    }

    res.send(html);
  });
};

module.exports[503] = function serviceUnavailable(req, res) {
  var viewFilePath = '503';
  var statusCode = 503;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, {}, function(err, html) {
    if (err) {
      return res.json(result, result.status);
    }

    res.send(html);
  });
};

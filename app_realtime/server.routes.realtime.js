var redis = require("redis"),
    client = redis.createClient({
      retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
      }
    });
// var sub = client.createClient();
// var pub = client.createClient();
// client.subscribe('chat');

// client.on("error", function (err) {
//     console.log("Error " + err);
//     // redis.close()
// });

module.exports = function (app, io) {
  var sessionSockets = io.of('/tomando_leccion')
  sessionSockets.on('connection', function(socket) {
    console.log('conectod')
  })
}
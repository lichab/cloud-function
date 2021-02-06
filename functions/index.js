const functions = require('firebase-functions');

// http request 1
exports.randomNumber = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);

  res.send(number.toString());
});

// http request 2
exports.toTheDojo = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);

  res.send(number.toString());
});

// http callable function

exports.sayHello = functions.https.onCall((data, context) => {
  return 'hello, lisandro';
});

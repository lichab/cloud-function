const functions = require('firebase-functions');

// http request 1
exports.randomNumber = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);

  res.send(number.toString());
});

// http request 2
exports.toTheDojo = functions.https.onRequest((req, res) => {
  res.redirect('https://github.com');
});

// http callable function

exports.sayHello = functions.https.onCall((data, context) => {
  const { age, name } = data;
  return `Hello ${name}, I see you are ${age} years of age.`;
});

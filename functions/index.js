const functions = require('firebase-functions');

// auth trigger for new user
exports.onNewUser = functions.auth.user().onCreate(user => {
  console.log('user created', user.email, user.uid);
});

// auth trigger for deleted user
exports.onUserDeleted = functions.auth.user().onDelete(user => {
  console.log('user deleted', user.email, user.uid);
});

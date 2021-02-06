const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// auth trigger for new user
exports.onNewUser = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    upVotedOn: [],
  });
});

// auth trigger for deleted user
exports.onUserDeleted = functions.auth.user().onDelete(user => {
  const document = admin.firestore().collection('users').doc(user.uid);

  return document.delete();
});

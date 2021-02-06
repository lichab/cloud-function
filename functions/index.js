/* eslint-disable indent */
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

// http callable function (adding request)
exports.addRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You need to be signed in to perform this action'
    );
  }

  if (data.text.length > 30) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'request hast be less than 30 characters'
    );
  }

  return admin.firestore().collection('requests').add({
    text: data.text,
    upVotes: 0,
  });
});

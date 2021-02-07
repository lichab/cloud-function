/* eslint-disable indent */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// auth trigger for new user
exports.onNewUser = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    upVotedOn: []
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
    upVotes: 0
  });
});

// upVote callable function
exports.upVote = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You need to be signed in to perform this action'
    );
  }

  // get user and request doc
  const userDoc = admin.firestore().collection('users').doc(context.auth.uid);

  const requestDoc = admin.firestore().collection('requests').doc(data.id);

  const user = await userDoc.get();

  if (user.data().upVotedOn.includes(data.id)) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'you can not upvote twice'
    );
  }

  await userDoc.update({
    upVotedOn: [...user.data().upVotedOn, data.id]
  });

  await requestDoc.update({
    upVotes: admin.firestore.FieldValue.increment(1)
  });
});

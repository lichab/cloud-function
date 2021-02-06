const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');

// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('active'));
  });
});

// register form
registerForm.addEventListener('submit', async e => {
  e.preventDefault();

  const email = registerForm.email.value;
  const password = registerForm.password.value;

  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    registerForm.reset();
  } catch (error) {
    console.log(error);
    registerForm.querySelector('.error').textContent = error.message;
  }
});

// login form
loginForm.addEventListener('submit', async e => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    loginForm.reset();
  } catch (error) {
    console.log(error);
    loginForm.querySelector('.error').textContent = error.message;
  }
});

// sign out
signOut.addEventListener('click', async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.log(error.message);
  }
});

// authentication listener
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    authWrapper.classList.remove('open');
    authModals.forEach(modal => modal.classList.remove('active'));

    return;
  }

  authWrapper.classList.add('open');
  authModals[0].classList.add('active');
});

const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const requestForm = document.querySelector('.new-request form');

// open request modal
requestLink.addEventListener('click', () => {
  requestModal.classList.add('open');
});

// close request modal
requestModal.addEventListener('click', e => {
  if (e.target.classList.contains('new-request')) {
    requestModal.classList.remove('open');
  }
});

// add new request
requestForm.addEventListener('submit', async e => {
  e.preventDefault();

  const addRequest = firebase.functions().httpsCallable('addRequest');
  const { value: text } = requestForm.request;

  try {
    await addRequest({ text });

    requestForm.reset();
    requestForm.querySelector('.error').textContent = '';
    requestModal.classList.remove('open');
  } catch (error) {
    requestForm.querySelector('.error').textContent = error.message;
  }
});

const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const buttonSayHello = document.querySelector('.call');

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

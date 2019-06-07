// MODAL closure
///.................................................................................
function modal(shouldShowModal,
  shouldShowDialog,
  title,
  text,
  secondaryText,
  imageUrl, extraUrl) {
  var $modalContainer = document.querySelector('#modal-container');

  console.log("start loading the page");
  // testing modal container

  function showModal(title, text, secondaryText, imageUrl, extraUrl) {
    // Clear all existing modal content
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('rubberBand');
    modal.classList.add('animated');

    // Add the new modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var titleElement = document.createElement('h1');
    titleElement.innerText = title;

    var contentElement = document.createElement('p');
    contentElement.innerText = text;

    var content2Element = document.createElement('p');
    content2Element.innerText = secondaryText;

    var image = document.createElement('img');
    image.classList.add('pokemon-image');
    image.src = imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(content2Element);
    modal.appendChild(image)
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  // a subtype of showModal.
  function showDialog(title, text, secondaryText, imageUrl, extraUrl) {
    showModal(title, text, secondaryText, imageUrl, extraUrl);
    // We want to add a confirm and cancel button to the modal
    var modal = $modalContainer.querySelector('.modal');

    var confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Show more details';

    modal.appendChild(confirmButton);

    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus();
    // Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null;
        console.log('extra url: ' + extraUrl);
        window.open(extraUrl, 'www.google.com');
        resolve();
      });
      // This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
  }
  var dialogPromiseReject; // This can be set later, by showDialog

  function hideModal() {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.classList.remove('is-visible');
    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }


  document.querySelector('.button--pokemon').addEventListener('click', (e) => {
    e.preventDefault();
    showDialog('Confirm action', 'Are you sure you want to do this?').then(
      function() {
        alert('confirmed');
      }, () => {

      });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains(
        'is-visible')) {
      hideModal();
    }
  });

  $modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  if (shouldShowModal) showModal(title, text, secondaryText, imageUrl, extraUrl);
  if (shouldShowDialog) showDialog(title, text, secondaryText, imageUrl,
    extraUrl);

}

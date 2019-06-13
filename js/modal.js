// MODAL closure
///.................................................................................
function modal(shouldShowModal,
  shouldShowDialog,
  title,
  text,
  secondaryText,
  imageUrl, extraUrl) {

  var $modalContainer = $('#modal-container');
  var $baseModal = $(
    '<div class="modal created rubberBand animated">Content is here!</div>'
  );

  console.log("start loading the page");
  // testing modal container

  function showModal() {
    // Clear all existing modal content
    $('#modal-container').innerHTML = '';

    console.log("show modal is called: " + title + ", text:  " + text +
      ", secondary text: " + secondaryText + ", imageUrl: " + imageUrl);
    // Add the new modal content
    var closeButtonElement = $(
      '<button class="modal-close">Close</button>');
    closeButtonElement.on('click', hideModal);

    var titleElement = $('<h1></h1>');
    titleElement.innerText = title;

    var contentElement = $('<p></p>');
    contentElement.innerText = text;

    var content2Element = $('<p></p>');
    content2Element.innerText = secondaryText;

    var image = $("<img class='pokemon-image'></img>");
    image.src = imageUrl;

    $baseModal.append(closeButtonElement);
    $baseModal.append(titleElement);
    $baseModal.append(contentElement);
    $baseModal.append(content2Element);
    $baseModal.append(image)
    if (!($baseModal.parentElement == $('#modal-container'))) {
      $('#modal-container').append($baseModal);
    }
    $('#modal-container').addClass('is-visible');
  }

  // a subtype of showModal.
  function showDialog() {
    showModal();
    // We want to add a confirm and cancel button to the modal

    var confirmButton = $(
      "<button class='modal-confirm'>Show more details</button>");

    $baseModal.append(confirmButton);

    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus();
    // Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      confirmButton.on('click', () => {
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
    var $modalContainer = $('#modal-container');
    $('#modal-container').removeClass('is-visible');
    $('#modal-container').empty();
    $baseModal.empty();
    $modalContainer.remove($baseModal);
    console.log($('#modal-container').children().length);
  }


  $('.button--pokemon').on('click', (e) => {
    e.preventDefault();
    showDialog('Confirm action', 'Are you sure you want to do this?').then(
      function() {
        alert('confirmed');
      }, () => {

      });
  });

  $(window).on('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.hasClass(
        'is-visible')) {
      hideModal();
    }
  });

  $('#modal-container').on('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $('#modal-container')) {
      hideModal();
    }
  });

  if (shouldShowModal) {
    showModal();
  }
  if (shouldShowDialog) {
    showDialog();
  }
}

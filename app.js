// HTML Elements
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// Global Variables
let bookmarks = [];

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create a bookmarks array in localStorage
    bookmarks = [
      {
        name: 'Russ Perry Dev',
        url: 'https://russperry.dev',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}

// Handle Data from form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  mookmarkForm.reset();
  websiteNameEl.focus();
}

// Validate form
function validate(nameVal, urlVal) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameVal || !urlVal) {
    alert('Please submit values for both fields.');
    return false;
  }
  if (!urlVal.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }

  // Bookmark is Valid
  return true;
}

// Modal Event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});
window.addEventListener('click', (e) => {
  e.target === modal ? modal.classList.remove('show-modal') : false;
});

// General Event Listners
bookmarkForm.addEventListener('submit', storeBookmark);

// Onload
fetchBookmarks();

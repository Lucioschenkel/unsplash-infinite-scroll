const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & Photos, add to DOM
function displayPhotos() {
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Put the img inside the anchor element, then put both inside the image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from the unsplash API
async function getPhotos() {
  try {
    const response = await fetch('/api/photos');
    photosArray = await response.json();

    console.log(photosArray);

    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll', () => {
  console.log('scrolled');
});

// On load
getPhotos();

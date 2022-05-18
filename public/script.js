const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let imageCount = 5;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded += 1;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imageCount = 30;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & Photos, add to DOM
function displayPhotos() {
  totalImages = 0;
  totalImages = photosArray.length;
  console.log('totalImages = ', totalImages);
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

    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put the img inside the anchor element, then put both inside the image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from the unsplash API
async function getPhotos() {
  try {
    const response = await fetch(`/api/photos?count=${imageCount}`);
    photosArray = await response.json();

    console.log(photosArray);

    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log('Loading photos...');
  }
});

// On load
getPhotos();

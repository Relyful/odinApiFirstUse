const img = document.querySelector("img");
const newImageButt = document.querySelector("#newImage");
const searchImageButt = document.querySelector('#searchButt');
const searchBox = document.querySelector('#searchQuery');

function getNewImage() {
  fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=y3p2cNuXBcPMCQCG5R8DTJNhPRetslCU&s=cat",
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
    });
}

function searchImage(value) {
    fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=y3p2cNuXBcPMCQCG5R8DTJNhPRetslCU&s=${value}`,
      { mode: "cors" }
    )
      .then(function (response) {
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response not ok');
        } else {
            return response.json();
        }
      })
      .catch(function(error) {
        console.log(error);
        alert(error);
        return 0;
      })
      .then(function (response) {
          console.log(response);
          if (response === 0) {
            return;
          }
          if (Object.keys(response.data).length === 0) {
            getNewImage();
            console.log('Failsafe');
          } else {
              img.src = response.data.images.original.url;
          }
      });      
  }

newImageButt.addEventListener("click", getNewImage);

searchImageButt.addEventListener('click', (e) => {
    e.preventDefault();
    searchImage(searchBox.value);
    document.querySelector('form').reset();
})

getNewImage();

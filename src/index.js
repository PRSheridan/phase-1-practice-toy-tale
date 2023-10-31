let addToy = false;

const url = `http://localhost:3000/toys`;
const GETconfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyList = document.getElementById('toy-collection');
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    };
  });

  function populateCard(obj){
    let div = document.createElement('div');
    div.classList.add("card");
    const h2 = document.createElement('h2');
    h2.textContent = obj.name;
    const img = document.createElement('img');
    img.src = obj.image;
    img.className = 'toy-avatar';
    const p = document.createElement('p');
    p.textContent = `${obj.likes} likes`;
    const button = document.createElement('button');
    button.className = 'like-btn'
    button.id = obj.id;
    button.textContent = 'Like';

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    return div;
  };

  fetch(url, GETconfig)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    data.forEach(element => {
      toyList.appendChild(populateCard(element));
    });
  });


  //listen for a submit event and populate a new card with the name, url and default 0 likes
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

  const POSTconfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify({
    "name": event.target.name.value,
    "image": event.target.image.value,
    "likes": 0
    })
  };

    fetch(url, POSTconfig)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      toyList.appendChild(populateCard(data));
    });
  });

  const likeBtnArray = document.getElementsByClassName('.like-btn');
  console.log(likeBtnArray)

  likeBtnArray.forEach(function (likeBtn) {
    likeBtn.addEventListener('click', (event) => {
    });
  });
});

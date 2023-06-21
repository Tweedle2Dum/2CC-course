//api used ---- https://rapidapi.com/deezerdevs/api/deezer-1/

function removeAllCards(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

function createCard(track) {
    const card = document.createElement("div");
    card.classList.add("card");
  
    const image = document.createElement("img");
    image.style.width="100%";
    image.style.objectFit="contain"
    image.src = track.album.cover;
    image.alt = track.album.title;
    card.appendChild(image);
  
    const title = document.createElement("h3");
    title.textContent = track.title;
    card.appendChild(title);
  
    const artist = document.createElement("p");
    artist.textContent = track.artist.name;
    card.appendChild(artist);
  
    const audio = document.createElement("audio");
    audio.controls = true;
    const source = document.createElement("source");
    source.src = track.preview;
    source.type = "audio/mpeg";
    audio.appendChild(source);
    card.appendChild(audio);
  
    return card;
  }


async function handleClick(e) {
    e.preventDefault()
    console.log("yolo")
    console.log(queryfield.value)

    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${queryfield.value}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b3df9c78b5mshab7e66c6efab3cdp13832djsnec7ce0c3b8ce',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json()
        console.log(result);
        removeAllCards(cardContainer);
        result.data.forEach(track => {
            const card = createCard(track);
            cardContainer.appendChild(card);
          });
    } catch (error) {
        console.error(error);
    }
}


const searchButton = document.querySelector(".searchButton");
const queryfield = document.querySelector("input[type=text]");
const cardContainer = document.querySelector(".cardContainer");
console.log(searchButton)
console.log(queryfield)


searchButton.addEventListener("click", handleClick)

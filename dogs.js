fetch('https://dog.ceo/api/breeds/image/random/10')
  .then(res => res.json())
  .then(data => {
    const carousel = document.getElementById('carousel');
    data.message.forEach(img => {
      const image = document.createElement('img');
      image.src = img;
      image.style.width = '100px';
      image.style.margin = '10px';
      carousel.appendChild(image);
    });
  });

fetch('https://dogapi.dog/api/v2/breeds')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('breedButtons');
    data.data.forEach(breed => {
      const btn = document.createElement('button');
      btn.textContent = breed.attributes.name;
      btn.onclick = () => {
        const info = document.getElementById('breedInfo');
        info.innerHTML = `
          <h3>${breed.attributes.name}</h3>
          <p>${breed.attributes.description}</p>
          <p>Lifespan: ${breed.attributes.life.min} - ${breed.attributes.life.max} years</p>
        `;
      };
      container.appendChild(btn);
    });
  });

if (annyang) {
  const commands = {
    'load dog breed *name': name => {
      document.querySelectorAll('#breedButtons button').forEach(btn => {
        if (btn.textContent.toLowerCase() === name.toLowerCase()) {
          btn.click();
        }
      });
    }
  };
  annyang.addCommands(commands);
}

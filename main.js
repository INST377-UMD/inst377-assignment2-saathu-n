fetch('https://zenquotes.io/api/random')
  .then(res => res.json())
  .then(data => {
    document.getElementById('quote').innerText = data[0].q + " — " + data[0].a;
  });

if (annyang) {
  const commands = {
    'hello': () => alert('Hello World'),
    'change the color to *color': color => document.body.style.backgroundColor = color,
    'navigate to *page': page => {
      const p = page.toLowerCase();
      if (['home', 'stocks', 'dogs'].includes(p)) {
        window.location.href = `${p}.html`;
      }
    }
  };
  annyang.addCommands(commands);
}

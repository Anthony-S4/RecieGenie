
//function to use navigator api to find device location
//async function so that promise/reply system can be used
async function locations(){
      const button = document.getElementById("submit");
      button.addEventListener("click", async event => {
        let link = document.getElementById("link").value;
        const data = {link};
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
        //window.open('all.html');
        window.location.href = ('all.html');
      });
}
async function retrieve(){
  const response = await fetch('/api')
  const data = await response.json();
  for(item of data)
  {
      const root = document.createElement('div');
      const name = document.createElement('div');
      name.textContent = `name: ${item.link}`;
      const geo = document.createElement('div');
      geo.textContent = `itemlist: ${item.itemlist}`;
      root.append(name,geo);
      document.body.append(root);
  }
}
locations();
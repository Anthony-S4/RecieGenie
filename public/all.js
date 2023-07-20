async function retrieve(){
    const response = await fetch('/api');
    const data = await response.json();
    for(item of data)
    {
        // const name = document.getElementById('iLink');
        // name.innerHTML = `${item.link}`;
        const list = document.getElementById('myList');
        let data = item.itemlist;
        for (i = 0; i < data.length; ++i) {
            let li = document.createElement('li');
            console.log(data[i]);
            li.innerText = data[i];
            list.appendChild(li);
        }
    }
}
async function locations(){
    const button = document.getElementById("submit");
    button.addEventListener("click", async event => {
      window.location.href = ('index.html');
    });
}
retrieve();
locations();
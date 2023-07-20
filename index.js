const express = require('express');
const Datastore = require('nedb');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port,() => console.log(`Starting server at ${port}`));
app.use(express.static('./public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore({filename:'database.db',timestampData: true});
database.persistence.setAutocompactionInterval(300);
database.loadDatabase();



async function getItems(a) { 
  let ingredients;
  try {
    //await is used so that server data can load before calling methods
    //fetch takes a path and returns a promise that resolves with a response object
    const response = await fetch (a); 
    //the response object is a represenation of the http response, as such to transform it into html text use .text()
    const body = await response.text();
    //cheerio.load is used to load the HTML string and transform it into a cheerio object, this object can be used to traverse the DOM
    const $ = cheerio.load(body);
    //$name is convention, here we use the cheerio object to select al elemnts that are descendants specified as [data-test-id="ingredient-item-shipped"] of the attribute [data-test-id= "ingredients-list"] 
    const $shipped = $('[data-test-id= "ingredients-list"] [data-test-id="ingredient-item-shipped"]');
    const $not_shipped = $('[data-test-id= "ingredients-list"] [data-test-id="ingredient-item-not-shipped"]');
    //We need to create an array to hold each element of the wrapper 
    let shipped  = [];
    let not_shipped  = [];
    //iterate through the cherio object wrapper and push each element into our array
    $shipped.each((i, div) => {
      shipped.push($(div).text());
  });
  $not_shipped.each((i, div) => {
    not_shipped.push($(div).text());
});
  //Since the sytax of the website does not place a space between the unit and ingredient, insert a space manually below
  shipped = itemsFormat(shipped);
  not_shipped = itemsFormat(not_shipped);
  //combine shipped and non shipped ingredients arrays
 ingredients = shipped.concat(not_shipped);
  
  //print result
  } catch (error) {
    return error;
  }
  return ingredients;
}

//function will take in an array of items and format them so there is a space between each unit of measurement and the ingredient
function itemsFormat(items){
//holder array to be returned b/c replace does not modify original array
let final = items;
let filter = ["ounce","unit","tablespoon","teaspoon","cup","milliliters","slice","thumb","clove"];
for(let i=0; i<items.length; i++)
{
    for(let j=0; j<filter.length; j++)
    {
        if(items[i].includes(filter[j]))
        {
            if(filter[j] == "unit")
            {
              final[i]= items[i].replace(filter[j], "");
            }
            else
            final[i]= items[i].replace(filter[j], filter[j] + " ");
        }
    }
}
return final;
}



//path for request to /api, here request is the fetch call, request body is what we specified in options, 
app.post('/api', (request, response) => {
    let items;
    const data = request.body;
    var link = data.link;

    const items_response = async () => {
      const r = await getItems(link);
      items = Object.values(r);


      data.itemlist= items;
      const timestamp = Date.now();
      data.timestamp = timestamp;
      database.insert(data);

      console.log(data.link);
      console.log(data.itemlist);

      response.json({
        status: 'sucess',
        name: data.link,
        itemlist: data.itemlist,
        timestamp: timestamp,
      });
      
    }
    items_response();
  });

//get most recent
app.get('/api',(request, response) => {
  database.find({}).sort({timestamp:-1}).limit(1).exec((err, docs) => {
    response.json(docs);
  })
});
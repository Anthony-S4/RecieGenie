# <b>ReciGenie</b> 

## <b>Created by: </b>

Anthony Safo(anthony.s4f@gmail.com)
## <b>Software Access</b>:

The live app site can be accessed here: https://glitch.com/~reciegenie.

Simply scroll down and click visit in the bottom right. 

Alternatively the project can be ran locally with the call “ node index.js “ in the terminal. 

Then connect to http://localhost:3000/ in the browser.


## <b>Overview</b>: 
ReciGenie is a nodeJS web service where users can input a hellofresh recipe link, and a list of ingredients is returned. The result of the query is stored in a NEDB database that is retrieved on a results page. 

ReciGenie is a continuation of the https://github.com/Anthony-S4/RecipeScraper project. This project builds upon the scraper by introducing a database, web server, and routing. These additions allow for the utilization of the node webframe and creation of a front end user experience. 

## The following is the project file structure for the ReciGenie:
- <b>index.js</b>: code that utilizes express Node.js web framework. Index.js utilizes the Cheerio js library to scrape data, which through the express routing system can be stored and retrieved. 
- <b>all.js</b>: js file that utilizes the fetch API to retrieve the ingredients list from the database using the node js code.
- <b>home.js</b>: js file that utilizes a POST request to send the recipe link to the express server for processing and storage of the recipe link and ingredients.
- <b>database.db</b>: a file that contains all user input from the search query and the ingredients list from that query.
- <b>all.html</b>: html file that is responsible for displaying the relevant recipe ingredients.
- <b>index.html</b>: html file that receives and sends user input to express server.






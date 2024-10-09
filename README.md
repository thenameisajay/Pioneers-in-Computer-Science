# Pioneers-in-Computer-Science (1.0)

<em>"A society grows great when old men plant trees, the shade of which they know they will never sit in." </em>

## Dedicated to:

To my grandfather <strong> Krishnasamy V.M </strong>, I owe everything to him, may he rest in peace.

## Deployment:

This site is no longer deployed on Heroku. A replacement site is being built and will be deployed soon.

## GRADE: DISTINCTION

## Description:

This repository is the source code for the Pioneers in Computer Science website. The website is a collection of biographies of the most influential people in the field of Computer Science. This project was created for the CS5099 Dissertation module at the University of St Andrews as part of the MSc Software Engineering degree.
It was created by Ajay Pradeep Mahadeven as part of his dissertation project.

## Installation:

<ul>
<li> Clone the repository to your local machine or download the zip file. </li>
<li> Open it in your suitable IDE or terminal. </li>
<li> Run <code> npm i </code> to install node modules and dependencies </li>
<li> Run <code>  node app.js </code> or  <code> nodemon  app.js</code> or <code> bun app.js </code> to start the server </li>
<li> Open localhost:3000  in your desired browser to see the website.</li>
</ul>

## Deployment Instructions:

<ul>
<li> Whichever platform you are using to deploy, remember to add the .env API keys (MongoDB & OpenAI) for the relevant places </li>
<li> I have placed the pioneers' data (pioneers.csv) in local storage, add it if you plan to deploy and change <code>process.env.MONGO_URL</code> in the config folder , file named <code> db.js </code> </li>
<li> I have used MongoDB Atlas to store the data. You can use the same or any other database to store the data </li>
<li> Install the project dependencies by running <code> npm i</code> </li>
<li> Start command : <code> node app.js </code></li>
</ul>

## Technologies Used:

<ul>
<li> Node.js </li>
<li> Express.js </li>
<li> MongoDB </li>
<li> HTML </li>
<li> CSS </li>
<li> Bootstrap </li>
<li> Javascript </li>
<li> EJS </li>
<li> Heroku </li>
</ul>

## Features:

<ul>
<li> User can view the list of all the pioneers in the database. </li>
<li> Users can view the birthplace of each pioneer. </li>
<li> Users can chat with a chatbot (EVA), powered by ChatGPT </li>
<li> Users can browse  pioneers by name, country and field </li>
<li> Users have a feedback mechanism to provide feedback on the website (Contact Page) </li>
<li> Users can also see the contributions of pioneers via vertical roadmap </li>
<li> Users have the ability to further learn about the pioneers by navigating to the references </li>
</ul>

## License:

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgements:

This project would have not been possible without the help and support of the following people:

<ul>
<li> Prof. Dharini Balasubramaniam  </li>
<li> Prof Ronald Morrison </li>
<li> Prof. Edmund Robertson  </li>
<li> Prof. John O'Connor </li>
<li> Manish Mishra </li>
<li> Niharika Kumari </li>
<li> Felix Brown </li>
<li> Kiran Baby</li>
<li> Shivang Sinha </li>
<li> Furkan Tekinay </li>
<li> Christobal </li>
<li> Gopichand Narra </li>
<li> Yusuf Farag </li>
<li> M K Mahadeven </li>
<li> Nagheshwari Mahadeven</li>
<li> K M Samyuktha</li>
<li> Krishnasamy V.M </li>
</ul>

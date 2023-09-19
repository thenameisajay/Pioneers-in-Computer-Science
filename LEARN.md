# Pioneers-in-Computer-Science

## Description:

This repository is the source code for the Pioneers in Computer Science website. The website is a collection of biographies of the most influential people in the field of Computer Science. This project was created for the CS5099 Dissertation module at the University of St Andrews as part of the MSc Software Engineering degree. It was created by Ajay Pradeep Mahadeven as part of his dissertation project.

## Installation:

To set up the Pioneers in Computer Science project on your local machine, follow these steps:

1. Clone the repository to your local machine or download the zip file.

```bash
git clone https://github.com/yourusername/Pioneers-in-Computer-Science.git
```

2. Open it in your suitable IDE or terminal.

3. Run the following command to install node modules and dependencies:

```bash
npm i
```

4. Start the server by running either of the following commands:

```bash
node app.js
```

OR

```bash
nodemon app.js
```

5. Open your desired browser and navigate to `localhost:3000` to access the website.

## Deployment:

The website is deployed on Heroku and can be accessed at [https://pics-usa-d37de900c431.herokuapp.com](https://pics-usa-d37de900c431.herokuapp.com).

## Deployment Instructions:

To deploy this project on your preferred platform, follow these instructions:

1. Whichever platform you are using to deploy, remember to add the necessary API keys (MongoDB & OpenAI) to the respective environment variables.

2. Place the pioneers data (`pioneers.csv`) in local storage and make sure to update `process.env.MONGO_URL` in the config folder, specifically in the `db.js` file.

3. You can choose to use MongoDB Atlas to store the data or any other database of your choice.

4. Install the project dependencies on your deployment environment by running:

```bash
npm i
```

5. Start the server using the following command:

```bash
node app.js
```

## Technologies Used:

The project is built using the following technologies:

- Node.js
- Express.js
- MongoDB
- HTML
- CSS
- Bootstrap
- JavaScript
- EJS
- Heroku

## Features:

The Pioneers in Computer Science website offers the following features:

- Users can view the list of all the pioneers in the database.
- Users can view the birthplace of each pioneer.
- Users can chat with a chatbot (EVA), powered by chatgpt.
- Users can browse pioneers by name, country, and field.
- Users have a feedback mechanism to provide feedback on the website (Contact Page).
- Users can also see the contributions of pioneers via a vertical roadmap.
- Users have the ability to further learn about the pioneers by navigating to the references.

## License:

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments:

This project would not have been possible without the help and support of the following people:

- Prof. Dharini Balasubramaniam (Supervisor)
- Prof. Ronald Morrison
- Prof. Edmund Robertson (MacTutor Co-Creator)
- Prof. John O'Connor (MacTutor Co-Creator)
- Manish Mishra (Friend)
- Niharika Kumari (Friend)
- Felix Brown (Friend)
- Kiran Baby (Friend)
- Shivang Sinha (Friend)
- Furkan Tekinay (Friend)
- Christobal (Friend)
- Gopichand Narra (Friend)
- Yusuf Farag (Friend)
- M K Mahadeven (Father)
- Nagheshwari Mahadeven (Mother)
- K M Samyuktha (Sister)
- Krishnasamy V.M (Grandfather) **Rest In Peace**

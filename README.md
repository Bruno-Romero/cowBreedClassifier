# About the project

The idea of the project is to recognize if a cow is pure breed which is dramatically important to know its meat's price.
The model was trained for two breeds, hereford and angus, that's because they are the most frequent breeds in Uruguay.

# Achievements and limitations
The current model is able to recognize with high accuracy (around 98% in the test set) whether it is pure or not the breed of cows (Hereford or Angus) for images of cows that are horizontally centered in the image frame. 
The model was trained as described above which implies that due to the nature of the impurities in a cow it is possible that the skin imperfection is somewhere not visible in the image so the reliability in some very specific cases may not be as stated.
To solve the previous problem more data is required, specifically a proposal to have a much more reliable model is to deliver more than one image of the same cow in such a way that most of its surface angles are covered and modifying a little the architecture of the model (especially the preprocessing). 


(is still under development)

# Getting Started 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

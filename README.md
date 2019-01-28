This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
this is graduation project for udacity nanodegree program

this app created using create-react app
it helps you to find all location of category food near your current location

you will need to allow location service to get your current location 

using Foursquare API to search for your near food location 
and when click marker info window apear with rating info about this place 

venue details may be sometimes will not work as it is a premium link from fousquare so may be sometimes qota exceed an alert will apear

[DEMO_LINK] (https://mghoneimy85.github.io/neighborhood-map-react/)

this project is deployed on gh-pages 


project sctructure

i made 2 components 



Master component 

and this one is more like actiong like master page 
header menu and main compoenent in this one  i get current location then i get akk food option near this location


MapWrapper  component 

then i pass this to the mapWrapper componnent to render all markers and position of the map



index.css has all styles 


i made loading dimmed screen just to be shown untill response is ready  

## Screenshot for UI of the app

![Image Screenshot](https://github.com/MGhoneimy85/neighborhood-map-react/blob/master/screenshot.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

this will run build command to build production version then publish it on gh-pages 

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

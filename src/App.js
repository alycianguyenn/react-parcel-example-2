import React from "react";
import { csv } from "d3-fetch";

const viewHeight = 500;
const viewWidth = 500;


const App = () => {
    csv('https://raw.githubusercontent.com/alycianguyenn/react-parcel-example-2/main/weather.csv')
        .then(data => console.log(data));
    return (
        <div>
            <h1>Exploratory Data Analysis, A2 example</h1>
            <p>Data!</p>
        </div>
    ); // outer brace = js / inner brace = object
};

export default App;

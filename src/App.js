import React from "react";
import { csv } from "d3-fetch";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear } from 'd3-scale';
import { extent, min, max } from 'd3-array';
// import * as d3 from 'd3';

const viewHeight = 500;
const viewWidth = 500;


const App = () => {
    /* THIS GOES IN APP.JS */  
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/alycianguyenn/react-parcel-example-2/main/weather.csv"
    );

    const dataSmallSample = data.slice(0, 300);
    const TMAXextent = extent(dataSmallSample, (d) => {
        return +d.TMAX;
    });

    console.log(TMAXextent);

    const chartSize = 500;
    const margin = 20;
    const axisTextAlignmentFactor = 3; 

    // creating scale 
    const yScale = scaleLinear()
        .domain(TMAXextent) // units: km
        .range([chartSize - margin, chartSize - 350]); // units: pixels

    console.log("from hook", loading, data)
    //////////// og reading data method
    // csv('https://raw.githubusercontent.com/alycianguyenn/react-parcel-example-2/main/weather.csv')
    //     .then(data => console.log(data));
    return (
        <div>
            <h1>Exploratory Data Analysis, A2 example</h1>
            <p>Data!</p>
            <p>{loading && "Loading data!!!!!"}</p>

            <h3>
                BARCODE PLOT (TRANSFORMED) - scales
            </h3>
            <svg width={chartSize} height={chartSize} style={{ border: "1px solid black" }}>
                <text 
                    x={chartSize / 2 -12 } 
                    y={yScale(0) + axisTextAlignmentFactor} 
                    textAnchor="end" 
                    style={{fontSize: 10, fontFamily:"Gill Sans, sans serif"}}>
                    0
                </text>
                <text 
                    x={chartSize / 2 -12 } 
                    y={yScale(100) + axisTextAlignmentFactor} 
                    textAnchor="end" 
                    style={{fontSize: 10, fontFamily:"Gill Sans, sans serif"}}>
                    100
                </text>
                <line
                    x1={chartSize / 2 - 10}
                    y1={yScale(100)}
                    x2={chartSize / 2 - 5 }
                    y2={yScale(100)}
                    stroke={"black"}
                />
                <line
                    x1={chartSize / 2 - 10}
                    y1={yScale(0)}
                    x2={chartSize / 2 - 5 }
                    y2={yScale(0)}
                    stroke={"black"}
                />
                
                {dataSmallSample.map((measurement, index) => {
                const highlight = measurement.station === "KALISPELL GLACIER AP";
                return (
                    <line
                    key={index}
                    x1={chartSize / 2}
                    y1={yScale(measurement.TMAX)}
                    x2={chartSize / 2 + 20}
                    y2={yScale(measurement.TMAX)}
                    stroke={highlight ? "red" : "steelblue"}
                    strokeOpacity={highlight ? 1 : 0.1}
                    />
                );
                })}
            </svg>

            <h3>
                SCATTER PLOT TMAX at Kalispell Glacier (sounds cold, expect it to be
                lower than average)
            </h3>
            <svg width={chartSize} height={chartSize} style={{ border: "1px solid black" }}>
                {data.slice(0, 300).map((measurement, index) => {
                const highlight = measurement.station === "KALISPELL GLACIER AP";
                return (
                    <circle
                    key={index}
                    cx={100 - measurement.TMIN}
                    cy={100 - margin - measurement.TMAX}
                    r="3"
                    fill="none"
                    stroke={highlight ? "red" : "steelblue"}
                    strokeOpacity="0.2"
                    />
                );
                })}
            </svg>

            <h3>
                BARCODE PLOT TMAX at Kalispell Glacier (sounds cold, expect it to be
                lower than average)
            </h3>
            <svg width={chartSize} height={chartSize} style={{ border: "1px solid black" }}>
                <text x={chartSize / 2 -12 } y={chartSize - margin + axisTextAlignmentFactor} textAnchor="end" style={{fontSize: 10, fontFamily:"Gill Sans, sans serif"}}>
                    0
                </text>
                <text x={chartSize / 2 -12 } y={chartSize - margin - 100 + axisTextAlignmentFactor} textAnchor="end" style={{fontSize: 10, fontFamily:"Gill Sans, sans serif"}}>
                    100
                </text>
                <line
                    x1={chartSize / 2 - 10}
                    y1={chartSize - margin - 100}
                    x2={chartSize / 2 - 5 }
                    y2={chartSize - margin - 100}
                    stroke={"black"}
                />
                <line
                    x1={chartSize / 2 - 10}
                    y1={chartSize - margin}
                    x2={chartSize / 2 - 5 }
                    y2={chartSize - margin}
                    stroke={"black"}
                />
                
                {data.slice(0, 1000).map((measurement, index) => {
                const highlight = measurement.station === "KALISPELL GLACIER AP";
                return (
                    <line
                    key={index}
                    x1={chartSize / 2}
                    y1={chartSize - margin - measurement.TMAX}
                    x2={chartSize / 2 + 20}
                    y2={chartSize - margin - measurement.TMAX}
                    stroke={highlight ? "red" : "steelblue"}
                    strokeOpacity={highlight ? 1 : 0.1}
                    />
                );
                })}
            </svg>

            <h3>RENDERING CIRCLES! This shows a distribution of TMAX</h3>
            <svg width={chartSize} height={chartSize} style={{ border: "1px solid black" }}>
                {data.slice(0, 300).map((measurement, index) => {
                const highlight = measurement.station === "KALISPELL GLACIER AP";
                return (
                    <circle
                    key={index}
                    cx={highlight ? chartSize / 2 : chartSize / 2 - 20}
                    cy={chartSize - margin - measurement.TMAX}
                    r="3"
                    fill="none"
                    stroke={highlight ? "red" : "steelblue"}
                    strokeOpacity="0.2"
                    />
                );
                })}
            </svg>
        </div>
    ); // outer brace = js / inner brace = object
};

export default App;

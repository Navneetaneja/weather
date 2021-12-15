import {useState } from "react";
import './Weather.css';

function Weather()
{
    const [city,setCity]=useState();
    const [data,setData]=useState();

    const getData=()=>{

        if(city!=="")
        {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0898cd8f67b9a99ab0b05dcc63df7fbf`)
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
            setData(result);
        })
    }
        
    }
    const element=data!==undefined?<div>
    <h1>{data.name}</h1>
    <h3>Weather : {data.weather[0].main}</h3>
    <h3>Max Temp : {parseInt(data.main.temp_max-273)} degree celcius</h3>
    <h3>Min Temp : {parseInt(data.main.temp_min-273)} degree celcius</h3>
    <h3>Humidity : {data.main.humidity}</h3>
    <h3>Pressure : {data.main.pressure}</h3>
    <h3>Feels Like : {parseInt(data.main.feels_like-273)} degree celcius</h3>
    <br/>
    <div className="all">
        <h2>All Data</h2>
    {JSON.stringify(data)}
    </div>
</div>:<div></div>;

    return(
        <div align="center" className="container">
            <input placeholder="Enter city name" onChange={(e)=>{setCity(e.target.value)}} type="text"/>&nbsp;
            <input type="button" onClick={()=>getData()} value="Get Weather Data"/>
            <div>
                {element}
            </div>
        </div>
    );
}
export default Weather;
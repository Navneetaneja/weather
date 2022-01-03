import { useEffect, useState } from "react";
import "./Weather.css";

function Weather(props) {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [show,setShow]=useState("");
  const [load,setLoad]=useState(false);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
      if(props.mess==="hi")
      {
          setTimeout(()=>{
              setLoading(false);
          },1000);
      }
  },[props])

  const getData = () => {
      if(city!=="")
      {
          setLoad(true);
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0898cd8f67b9a99ab0b05dcc63df7fbf`
        )
          .then((res) => res.json())
          .then((result) => {
            // console.log(result);
            if(result.cod==='404')
            {
                setShow("NOT FOUND");
            }
            else
            {
            setData(result);
            }
            setLoad(false);
          })
    }
    else
    {
        setShow("Enter City Name");
    }
    
  };
  const element =
    data !== undefined && data!==null && data.weather!==undefined ? (
      <div>
        <h1>{data.name}</h1>
        <h3>Weather : {data.weather[0].main}</h3>
        {/* <h3>Max Temp : {parseInt(data.main.temp_max-273)} degree celcius</h3>
    <h3>Min Temp : {parseInt(data.main.temp_min-273)} degree celcius</h3>
    <h3>Humidity : {data.main.humidity}</h3>
    <h3>Pressure : {data.main.pressure}</h3> */}
        <h3>Feels Like : {parseInt(data.main.feels_like - 273)} &#8451;</h3>
        <br />
        {/* <div className="all">
        <h2>All Data</h2>
    {JSON.stringify(data)}
    </div> */}
      </div>
    ) : (
      <div>
          {show}
      </div>
    );

  return loading?<div className="loader"></div>:(
    <div align="center" className="container">
      <input
        placeholder="Enter city name"
        onChange={(e) => {
          setCity(e.target.value);
        }}
        type="text"
        style={{color:"yellow",background:"black"}}
      />
      &nbsp;
      <input type="button" onClick={() => getData()} value="Get Weather Data" />
      { 
      load &&
      <div className="loader" style={{marginTop:"2vh"}}></div>
      }
      { 
      load===false &&
      <div style={{marginTop:"2vh"}}>{element}</div>
      }
    </div>
  );
}
export default Weather;

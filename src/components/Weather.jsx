import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchicon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import hum1 from '../assets/hum1.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import win from '../assets/win.png'

const Weather = () => {
    const inputRef = useRef()
      
    const [WeatherData,setWeatherData] = useState(false);

    const allicons = {
        "01d" : clear,
        "01n" : clear,
        "02d" : cloud,
        "02n" : cloud,
        "03d" : cloud,
        "03n" : cloud,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "10d" : rain,
        "10n" : rain,
        "13d" : snow,
        "13n" : snow,
    }



    const  search = async (city)=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if(!response.ok){
                alert(data.messages)
            }



            const icon = allicons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location : data.name ,
                icon: icon,
            })



        } catch (error) {
            
        }
    }


    useEffect(()=>{
        search("mumbai")
    },[])



  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='search'/>
            <img src={searchicon} alt="search" onClick={()=> {
                const city = inputRef.current.value.trim();
                if (city) {
                    search(city);
                }else{
                    alert('please enter a name')
                }
            } }/>
        </div>

        <img src={WeatherData.icon} alt=""  className='weather-icon'/>
        <p className='temperature'>{WeatherData.temperature}℃</p>
        <p className='location'>{WeatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={hum1} alt="" />
                <div>
                    <p>{WeatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
             <div className='col'>
                <img src={win} alt="" />
                <div>
                    <p>{WeatherData.windspeed}km/h</p>
                    <span>Wind speed</span>
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default Weather

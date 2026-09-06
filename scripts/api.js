
import { weatherCardData, detailsCardData,hourlyCardData,chartHourlyData,sevenDaysData,otherLocationData } from "./data.js";


const API_KEY = '75d42b5e0c9e35c3abf396ce24512398';

export async function fetchCurrentWeather(city){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
     return await res.json();

}

export async function fetchHourlyData(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
    return await res.json();
}

export async function fetchOtherLocationData(cities){
  const responses = await Promise.all(cities.map((city)=>{
   return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
  }));

  return await Promise.all(responses.map((res)=>{return res.json();}));

}

export async function loadWeather(city) {
    const current = await fetchCurrentWeather(city);
    
    const hour = new Date((current.dt + current.timezone)* 1000).getUTCHours();  //to give milisecond to date
    const uvIndex = estimateUV(current.clouds.all , hour);
    weatherCardData.location = `${current.name}, ${current.sys.country}` ;
    weatherCardData.temperature = Math.round(current.main.temp);
    weatherCardData.description = current.weather[0].main;
    weatherCardData.highestTemperature = Math.round(current.main.temp_max);
    weatherCardData.lowestTemperature = Math.round(current.main.temp_min);
    weatherCardData.feelsLike = Math.round(current.main.feels_like);
    weatherCardData.img = getWeatherEmoji(current.weather[0].icon);
; 

    detailsCardData.wind.value = `${current.wind.speed} km/h`;
    detailsCardData.wind.description = getWindDirection(current.wind.deg);
    detailsCardData.humidity.value = `${current.main.humidity}%`;
    detailsCardData.humidity.description = getHumidityDescription(current.main.humidity);
    detailsCardData.visibility.value = `${current.visibility / 1000} km`;
    detailsCardData.visibility.description = getVisibilityDescription(current.visibility / 1000);
    detailsCardData.pressure.value = `${current.main.pressure} mb`;
    detailsCardData.pressure.description = getPressureDescription(current.main.pressure);
    detailsCardData.uvIndex.value = uvIndex;
    detailsCardData.uvIndex.description = getUVDescription(uvIndex);
}

      
export async function loadHourlyData(city){
  const hourlyForecast = await fetchHourlyData(city);

  const offset = hourlyForecast.city.timezone ;

  const next24HoursData = hourlyForecast.list.slice(0,24);

  const chartData = hourlyForecast.list.slice(0,8);
  //emptying before pushing
  hourlyCardData.length = 0;
  chartHourlyData.length = 0;

  next24HoursData.forEach((element)=>{
    hourlyCardData.push({
        time: formatHour(element.dt,offset),
        img: getWeatherEmoji(element.weather?.[0]?.icon) ,
        temperature:Math.round(element.main.temp)
    });
  });
  
   //loading chart data 
  chartData.forEach((element)=>{
    chartHourlyData.push(
       { time: formatHour(element.dt,offset) ,
         temp: Math.round(element.main.temp) });
  });

  //loading seven days data
  const daysMap = {};
  const today = hourlyForecast.list?.[0]?.dt;
  const todayDay = getDay(today,offset);

  hourlyForecast.list.forEach((element)=>{

      const day = getDay(element.dt,offset);

      if(!daysMap[day]){
        daysMap[day] = {day,temp:[],details:[],icon:[]}
      }
      
      daysMap[day].temp.push(element.main.temp);
      daysMap[day].details.push(element.weather?.[0]?.description);
      daysMap[day].icon.push(element.weather?.[0]?.icon);

  });

   const rotatedOrder = getRotatedOrder(todayDay);

   const dayArray = Object.values(daysMap);

   // need to sort this array in order starting from today
    const orderedDayArray = dayArray.sort((a,b)=> rotatedOrder.indexOf(a.day) - rotatedOrder.indexOf(b.day));

   sevenDaysData.length = 0;

   orderedDayArray.forEach((element)=>{

    sevenDaysData.push({
        day: element.day,
        img: getWeatherEmoji(getMostFrequent(element.icon)),
        detail: getMostFrequent(element.details),
        maxTemp: Math.round(Math.max(...element.temp)) ,
        minTemp: Math.round(Math.min(...element.temp))
    });
    });
   

   
}

export async function loadOtherLocationData(cities) {

  const responses = await fetchOtherLocationData(cities);
  
  otherLocationData.length = 0;

  responses.forEach((res)=>{

    otherLocationData.push({
        countryCode: res.sys.country ,
        city: res.name,
        detail: res.weather?.[0]?.main,
        temperature : Math.round(res.main.temp)
    });
  })
  
}

function getHumidityDescription(value) {
  if (value < 30) return "Very Dry";
  if (value < 50) return "Comfortable";
  if (value < 65) return "Moderate";
  if (value < 80) return "Sticky";
  return "Oppressive";
}

function getWindDirection(deg) {
  const directions = ["N","NE","E","SE","S","SW","W","NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}



function getVisibilityDescription(valueKm) {
  if (valueKm > 10) return "Clear";
  if (valueKm >= 6) return "Good";
  if (valueKm >= 3) return "Moderate";
  if (valueKm >= 1) return "Poor";
  return "Very Poor";
}

function getPressureDescription(value) {
  if (value < 1000) return "Low Pressure";
  if (value <= 1015) return "Normal";
  if (value <= 1030) return "High Pressure";
  return "Very High";
}





function estimateUV(clouds, hour) {
  let base = (hour >= 10 && hour <= 15) ? 8 : 4; 
  if (clouds > 75) base -= 3;
  else if (clouds > 50) base -= 2;
  else if (clouds > 25) base -= 1;
  return Math.max(base, 0);
}

function getUVDescription(value) {
  if (value <= 2) return "Low";
  if (value <= 5) return "Moderate";
  if (value <= 7) return "High";
  if (value <= 10) return "Very High";
  return "Extreme";
}


function getWeatherEmoji(iconCode) {
  const map = {
    "01d": "☀️",   // clear sky (day)
    "01n": "🌙",   // clear sky (night)
    "02d": "⛅",   // few clouds (day)
    "02n": "🌤️",  // few clouds (night)
    "03d": "☁️",   // scattered clouds
    "03n": "☁️",
    "04d": "🌥️",  // broken clouds
    "04n": "🌥️",
    "09d": "🌧️",  // shower rain
    "09n": "🌧️",
    "10d": "🌦️",  // rain (day)
    "10n": "🌧️",  // rain (night)
    "11d": "⛈️",  // thunderstorm
    "11n": "⛈️",
    "13d": "❄️",  // snow
    "13n": "❄️",
    "50d": "🌫️",  // mist
    "50n": "🌫️"
  };
  return map[iconCode] || "❓"; // fallback
}


function formatHour(dt, offset) {
  // Convert to city-local timestamp
  const ms = (dt + offset) * 1000;
  const date = new Date(ms);

  // Use UTC getters because we already applied offset
  let hours = date.getUTCHours();

  // AM/PM conversion
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // 0 → 12, 13 → 1, etc.

  // Pad minutes
 

  return `${hours} ${ampm}`;
}

function getDay(dt,offset){
  const ms = (dt + offset) * 1000;
  const date = new Date(ms);

  const weekdayIndex = date.getUTCDay(); 
  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const day = weekdays[weekdayIndex];

  return day;
}

function getRotatedOrder(todayDay){
  //to get order so can sort the object into array but with today as first element in array 
  //will need to rotate weekdays to match 

   const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
   const todayIndex = weekdays.indexOf(todayDay);
   const rotatedOrder = weekdays.slice(todayIndex).concat(weekdays.slice(0,todayIndex));

   return rotatedOrder;
}

function getMostFrequent(arr){
  const frequency = {};
  arr.forEach((element)=>{
      frequency[element] = frequency[element] || 0;
      frequency[element]++;
  });
  let maxCount = 0;
  let mostFrequent = null;

  for(const item in frequency){
    if(frequency[item] > maxCount){
       maxCount =  frequency[item];
       mostFrequent = item;
     }
  }

  return mostFrequent;
}
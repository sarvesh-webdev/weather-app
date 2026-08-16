
export const weatherCardData ={
location: 'New York, US',
temperature: 18 ,
description :'Cloudy',
highestTemperature: 24,
lowestTemperature : 14 ,
feelsLike: 16 ,
img:'⛅'
};

export const detailsCardData = {
wind:{
    value:'14 km/h',
    description: 'SW'
},
humidity:{
    value:'62%',
    description: 'Moderate'},
visibility:{
    value:'10 km',
    description: 'Clear'
},
uvIndex:{
    value: 5,
    description: 'Moderate'
},
pressure:{
    value:'1013 mb',
    description: 'Normal'
}
};

export const hourlyCardData = [
    {
        time:'Now',
        img: '⛅',
        temperature:18
    },
    {
        time:'1PM',
        img:'🌤',
        temperature:20
    },
    {
        time:'2PM',
        img:'☀️',
        temperature:22
    },
    {
        time:'3PM',
        img:'☀️',
        temperature:23
    },
    {
        time:'4PM',
        img:'🌤',
        temperature:21
    },
    {
        time:'5PM',
        img:'⛅',
        temperature:19
    },
    {
        time:'6PM',
        img:'🌥',
        temperature:17
    },
    {
        time:'7PM',
        img:'🌑',
        temperature:15
    },
    {
        time:'8PM',
        img:'🌑',
        temperature:14
    },
    {
        time:'9PM',
        img:'🌑',
        temperature:14
    },
    {
        time:'10PM',
        img:'🌑',
        temperature:14
    }
];

export const sevenDaysData = [
    {
        day: 'Mon',
        img: '☀️',
        detail: 'Sunny',
        maxTemp: 25,
        minTemp: 14
    },
    {
        day: 'Tue',
        img: '🌤',
        detail: 'Partly Cloudy',
        maxTemp: 28,
        minTemp: 13
    },
    {
        day: 'Wed',
        img: '🌧',
        detail: 'Rain',
        maxTemp: 21,
        minTemp: 14
    },
    {
        day: 'Thu',
        img: '⛈',
        detail: 'Thunderstorm',
        maxTemp: 30,
        minTemp: 21
    },
    {
        day: 'Fri',
        img: '🌦',
        detail: 'Showers',
        maxTemp: 22,
        minTemp: 11
    },
    {
        day: 'Sat',
        img: '⛅',
        detail: 'Cloudy',
        maxTemp: 35,
        minTemp: 14
    },
    {
        day: 'Sun',
        img: '☀️',
        detail: 'Sunny',
        maxTemp: 25,
        minTemp: 14
    },
   
]

export const chartHourlyData = [
  { time: "6AM", temp: 12 },
  { time: "9AM", temp: 15 },
  { time: "12PM", temp: 18 },
  { time: "3PM", temp: 20 },
  { time: "6PM", temp: 17 },
  { time: "9PM", temp: 14 },
  { time: "12AM", temp: 12 }
];

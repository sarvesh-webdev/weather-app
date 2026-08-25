import { weatherCardData,detailsCardData,hourlyCardData,sevenDaysData,chartHourlyData,otherLocationData } from "./data.js";
import { fetchCurrentWeather,loadWeather,fetchHourlyData,loadHourlyData } from "./api.js";

init();

async function init(){
    const city = 'New York' ;
    await loadWeather(city);
    await loadHourlyData(city);

    renderWeatherCard(weatherCardData);

    renderDetailsCard(detailsCardData); 

    renderHourlyCard(hourlyCardData);

    renderChart(chartHourlyData);
}

console.log(await fetchCurrentWeather('New York'));
console.log(await fetchHourlyData('New York'));
/*handling hourly-tan-btn  */
const hourlyTabBtn = document.querySelectorAll('.js-hourly-tab-btn');

const sections = document.querySelectorAll('.js-tab-sections');    //for switching tab when clicked on btn

hourlyTabBtn.forEach((button)=>{
button.addEventListener('click',()=>{
     /*to remove from all btn the active class so that then can add active class to btn clicked*/

    hourlyTabBtn.forEach((btn)=>{
        btn.classList.remove('active-btn');   
    });
   //to remove from all section block so can then add block to the section of which btn was clicked
    sections.forEach((s)=>{
        s.classList.remove('active');
    });
     
    // to display the tab whose btn is clicked
    const targetId = button.dataset.target;
    document.getElementById(targetId).classList.add('active');


    //to show the btn glow which is clicked
    button.classList.add('active-btn');
})
});

//to handle searche section display when clicked on search btn

const searchBtn = document.querySelector('.js-search-btn');
const searchSectionDisplay = document.querySelector('.js-search-section');

searchBtn.addEventListener('click',()=>{

searchSectionDisplay.classList.toggle('active');

});

//running other render functions


renderSevenDaysCard(sevenDaysData);
renderOtherLocationCard(otherLocationData);

//handling glow effect of other location card

const otherLocationBtn = document.querySelectorAll('.other-locations-card-main-elements');

otherLocationBtn.forEach((button)=>{

    button.addEventListener('click',()=>{
      otherLocationBtn.forEach((element)=>{
        element.classList.remove('active');
      });
      
      button.classList.add('active');
    });

});

//handling chart

function renderChart(chartHourlyData){
    const ctx = document.getElementById("tempChart").getContext("2d");
    new Chart(ctx, {
    type: "line",
    data: {
        labels: chartHourlyData.map(d => d.time),
        datasets: [{
        label: "Temperature",
        data: chartHourlyData.map(d => d.temp),
        borderColor: "#7eb8f7",
        backgroundColor: "rgba(126,184,247,0.3)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#7eb8f7",
        pointRadius: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
        y: { ticks: { color: "#8eafd4" } },
        x: { ticks: { color: "#8eafd4" } }
        },
        plugins: {
        legend: {
        display: false
        }
    }
    }
    });
}



//functions

function renderWeatherCard(data){

 document.querySelector('.weather-card').innerHTML = `
    <div class="weather-card-location">
           <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
            <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>${data.location}</span>

        </div>
        <div class="weather-card-middle-section">
            <div>
              <div class="weather-card-temperature">${data.temperature}°</div>
              <div class="weather-card-weather-info">${data.description} </div>
            </div>
         <div class="weather-card-icon">${data.img}
           </div>
        
        </div>
        
        <div class="weather-card-last-section">
            <div>
                <svg width="13" height="13" viewBox="0 0 24 24"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
                 <span>${data.highestTemperature}°</span>
                 High
            </div>
            <div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
                <span>${data.lowestTemperature}°</span>
                Low
            </div>
            <div>Feels like <span>${data.feelsLike}°</span></div>
        </div> `;
}

function renderDetailsCard(data){

document.querySelector('.details-card').innerHTML = `  <p>DETAILS</p>
        <div class="details-card-section">
            <div class="details-card-icon-section">
             <div class="details-card-icon-container">
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"></path><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"></path><path d="M9.8 4.4A2 2 0 1 1 11 8H2"></path></svg>
             </div>
             <span>Wind</span>
            </div>

            <div class="details-card-info-section">
                <div class="details-card-info-sub-section-1">
                    ${data.wind.value}
                </div>
                <div class="details-card-info-sub-section-2">
                    ${data.wind.description}
                </div>
            </div>
        </div>
        <div class="details-card-section">
            <div class="details-card-icon-section">
             <div class="details-card-icon-container">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></svg>
             </div>
             <span>Humidity</span>
            </div>

            <div class="details-card-info-section">
                <div class="details-card-info-sub-section-1">${data.humidity.value}</div>
                <div class="details-card-info-sub-section-2">${data.humidity.description}</div>
            </div>
        </div>
        <div class="details-card-section">
            <div class="details-card-icon-section">
             <div class="details-card-icon-container">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
             </div>
             <span>Visibility</span>
            </div>

            <div class="details-card-info-section">
                <div class="details-card-info-sub-section-1">${data.visibility.value}</div>
                <div class="details-card-info-sub-section-2">${data.visibility.description}</div>
            </div>
        </div>
        <div class="details-card-section">
            <div class="details-card-icon-section">
             <div class="details-card-icon-container">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
             </div>
             <span>UV Index</span>
            </div>

            <div class="details-card-info-section">
                <div class="details-card-info-sub-section-1">${data.uvIndex.value}</div>
                <div class="details-card-info-sub-section-2">${data.uvIndex.description}</div>
            </div>
        </div>
        <div class="details-card-section">
            <div class="details-card-icon-section">
             <div class="details-card-icon-container">
                <svg  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></svg>
             </div>
             <span>Pressure</span>
            </div>

            <div class="details-card-info-section">
                <div class="details-card-info-sub-section-1">${data.pressure.value}</div>
                <div class="details-card-info-sub-section-2">${data.pressure.description}</div>
            </div>
        </div> `;
}

function renderHourlyCard(data){

    let generatedHtml = '';

    data.forEach((element)=>{
      generatedHtml += `
      <div class="hourly-card-main-element">
                <span class="hourly-card-element-time">${element.time}</span>
                <span class="hourly-card-element-icon">${element.img}</span>
                <span class="hourly-card-element-temperature">${element.temperature}°</span>
            </div>`;
    });

    document.querySelector('.js-hourly-card-main').innerHTML = generatedHtml ;

}

function renderSevenDaysCard(data){

    const globalMaxTemp = Math.max(...data.map( element=> element.maxTemp)) ; 
    // map make new array of whatever return here returning maxTemp thus making new array of max temp , ... is spread operator which spread the array
    const globalMinTemp = Math.min(...data.map(element => element.minTemp));

    const range = globalMaxTemp - globalMinTemp ;
    
    const html = data.map((day)=>{
     
    const left = ((day.minTemp - globalMinTemp)/range)*100 ;
    const width = ((day.maxTemp - day.minTemp)/range)*100 ;

    return `
    <div class="seven-days-element js-seven-days-element" data-today = "${day.day}">
                    <div class="seven-days-sub-element-1">${day.day}</div>
                    <div class="seven-days-sub-element-2">
                        <span class="icon">${day.img}</span>
                        <span class="weather-txt">${day.detail}</span>
                    </div>
                    <div class="temperature-bar-section">
                        <span class="min-temp">${day.minTemp}°</span>
                        <div class="temperature-bar">
                            <div class="temperature-bar-element" style = "left:${left}%;width:${width}%"></div>
                        </div>
                        <span class="max-temp">${day.maxTemp}°</span>
                </div>
                </div>
    `;
    }).join("");

    document.querySelector('.js-seven-days-main').innerHTML = html ;

    //to handle glow of element so that todays day glow 

    const today = 'Tue';
    document.querySelectorAll('.js-seven-days-element').forEach((element)=>{
     if(element.dataset.today === today){
        element.classList.add('active');
     }else{
        element.classList.remove('active');
     }
    });
}

function renderOtherLocationCard(data){
const html = data.map((el)=>{
return `  <button class="other-locations-card-main-elements js-other-locations-card-main-elements" data-current-city = "${el.city}">
                <div class="other-locations-card-header">
                    <span class="country-code">${el.countryCode}</span>
                    <span>🌍</span>
                </div>
                <div class="other-locations-card-country">
                    ${el.city}
                </div>
                <div class="other-locations-card-temperature">
                    <span class="weather-description">${el.detail}</span>
                    <span class="weather-temperature">${el.temperature}°</span>
                </div>
            </button>`;
}).join("");

document.querySelector('.js-other-locations-card-main').innerHTML = html ;

//handling glow
const currentCity = 'New York';

document.querySelectorAll('.js-other-locations-card-main-elements').forEach((btn)=>{
if(btn.dataset.currentCity === currentCity){
    btn.classList.add('active');
}else{
    btn.classList.remove('active');
}
});

}
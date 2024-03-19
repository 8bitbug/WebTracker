let publicIP;
let country;
let state;
let city;

fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    publicIP = data.ip;


    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        country = data.country_name;
        state = data.region;
        city = data.city;
    });
});


let batteryLevel = "N/A";
let batteryCharging = "N/A";
let batteryDischargingTime = "N/A";

if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
        batteryLevel = (battery.level * 100) + "%";
        batteryCharging = battery.charging ? "Yes" : "No";
        batteryDischargingTime = battery.dischargingTime == Infinity ? "Unknown" : battery.dischargingTime + " seconds";
    });
}

const now = new Date();
const currentDateTime = now.toLocaleString();

const os = navigator.platform;

const screenwidth = screen.width;
const screenheight = screen.height;

const cookies = navigator.cookieEnabled;

const browserInfo = navigator.userAgent;

const language = navigator.languages;

const commands = {
    "help": "Here are some commands clear, ip, location, time, date, os, screen, cookie, browser, battery, languages",
    get "ip"() {
        return "Public Ip Address: " + publicIP;
    },
    get "location"() {
        return "Country: " + country + "\nState: " + state + "\nCity: " + city;
    },
    "time": currentDateTime,
    "date": currentDateTime,
    "os": os,
    "screen": screenwidth + " x " + screenheight,
    "cookie": "Cookies Enabled: " + cookies,
    "browser": "Browser Information: " + browserInfo,
    get "battery"() {
        return "Battery level: " + batteryLevel + "\n" +
               "Battery charging: " + batteryCharging + "\n" +
               "Battery discharging time: " + batteryDischargingTime;
    },

    "languages": "Device languages: " + language,
};

let input = document.getElementById('input');
let results = document.getElementById('result');

function createElement() {
    const newElement = document.createElement('div');
    newElement.id = 'response';
    newElement.textContent = commands[input.value];
    results.appendChild(newElement);
    input.value = "";
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const userInput = input.value;
        if (userInput === 'clear') {
            while (results.childNodes[0]) {
                results.childNodes[0].remove();
            }
            input.value = "";
        }
        if (commands[userInput]) {
            createElement();
        }
    }
});

document.addEventListener('click', () => {
    input.focus()
});

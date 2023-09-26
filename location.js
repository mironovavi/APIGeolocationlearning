"use strict"

window.onload = getMyLocation;

let wickedlyCoordinates = {
    latitude: 47.624851,
    longtidude: -122.520099
};

//функция возвращает расстояние между двумя координатами
function computeDistance(startCoodes, destCoodes){
    let startlatRads = degreesToRadiants(startCoodes.latitude);
    let startLongRads = degreesToRadiants(startCoodes.longtidude);
    let destlatRads = degreesToRadiants(destCoodes.latitude);
    let destLongRads = degreesToRadiants(destCoodes.longtidude);

    let radius = 6371;//радиус земли в км
    let distance = Math.acos(Math.sin(startlatRads) * Math.sin(destlatRads) +
    Math.cos(startlatRads) * Math.cos(destlatRads) * Math.cos(startLongRads - destLongRads)) * radius;

    return distance;
}

function degreesToRadiants(degreees){
    let radians = (degreees + Math.PI)/180;
    return radians;
}


//проверяем поддерживает ли браузер API-интерфейс geolocation 
function getMyLocation(){
    if(navigator.geolocation){
        //есть браузер поддерживает вызывается функция обработчик
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    }else{
        alert("Ops, no geolocation support");
    }
}


//получает данные о позиции(широту/долготу)
function displayLocation(position, errorHandler, options){
    let latitude = position.coords.latitude;
    let longtidude = position.coords.longtidude;

    let div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", longtidude: " + longtidude;

    let km = computeDistance(position.coords, wickedlyCoordinates);
    let distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + "km from Wickedly Office";
}

function displayError(error){
    let errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };

    let errorMessage = errorTypes[error.code];

    if(error.code){
        errorMessage = `${errorMessage} ${error.message}`
    }

    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}


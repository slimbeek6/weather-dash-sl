$(document).ready(function () {

    $(document).on("click", "#search", function (event) {
        event.preventDefault();
        var cityname = $("#cityInput").val();
        var getLatLongURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=a45e37d740e9d3f5adbe9fe5c4a14ffc&units=imperial";
        
                

        $.ajax({
            url: getLatLongURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var cityDisplay = response.name;
            console.log(lat);
            console.log(lon);
            
            var searchURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=a45e37d740e9d3f5adbe9fe5c4a14ffc";
            
            $.ajax({
                url: searchURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var date = response.current.dt;
                var weatherIcon = response.current.weather[0].icon;
                var curTempDisplay = response.current.temp;
                var curHumidityDisplay = response.current.humidity;
                var windSpeed = response.current.wind_speed;
                var uvIndex = response.current.uvi;
                
                console.log(cityDisplay);
                console.log(curTempDisplay);
                var dateDisplay = timeConverter(date);
                console.log(weatherIcon);

                $("#cityDateIcon").text(cityDisplay + "  " + dateDisplay);
                // $("#cityDateIcon").append(<img src=""></img>);
                $("#topPane").append("<p>Current Temperature: "+curTempDisplay +" F</p>");
                $("#topPane").append("<p>Current Humidity: "+curHumidityDisplay +"%");
                $("#topPane").append("<p>Current Wind Speed: "+windSpeed +" mph</p>");
                $("#topPane").append("<p id='uvi'>Current UV Index: "+uvIndex +"</p>");
            });
        
        
        
        
        
        });

        
        
        
        
    })



    function timeConverter(apiDt){
        var a = new Date(apiDt * 1000);
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var day = a.getDate();
        var finalDate = month + " " + day + ", "+year;
        return finalDate;
    }

    

})
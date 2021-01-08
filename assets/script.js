$(document).ready(function () {

    $(document).on("click", "#search", runPage);
     
    $(document).on("click", "#prevSearches", reRunPage);

    function runPage(event) {
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
            $("#prevSearches").append("<button id='"+cityDisplay+"'>" + cityDisplay + "</button><br><br>");
                        
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
                
                var dateDisplay = timeConverter(date);
                

                $("#cityDateIcon").text(cityDisplay + " - " + dateDisplay);
                $("#cityDateIcon").append("<img src='https://openweathermap.org/img/wn/"+weatherIcon+".png'></img>");
                $("#curTemp").text(curTempDisplay);
                $("#curHum").text(curHumidityDisplay);
                $("#curSpeed").text(windSpeed);
                $("#curUVI").text(uvIndex);

                for (i=1; i<6; i++) {
                    var laterDate = response.daily[i].dt;
                    var laterDateDisplay = "";
                    laterDateDisplay = timeConverter(laterDate);
                    var laterTemp = response.daily[i].temp.day;
                    var laterHumidity = response.daily[i].humidity;
                    var laterIcon = response.daily[i].weather[0].icon;
                    var imgSource = "https://openweathermap.org/img/wn/"+laterIcon+"@2x.png";

                    $("#date"+i).text(laterDateDisplay);
                    $("#icon"+i).attr("src", imgSource);
                    $("#temp"+i).text(laterTemp + " F");
                    $("#humidity"+i).text(laterHumidity + "%");
                }
                
            });
        
        
        
        
        
        });

        
        
        
        
    }



    function reRunPage(event) {
        event.preventDefault();
        var recityname = event.target.id;
        console.log(event.target.id);
        var getLatLongURL = "https://api.openweathermap.org/data/2.5/weather?q=" + recityname + "&appid=a45e37d740e9d3f5adbe9fe5c4a14ffc&units=imperial";
        
                

        $.ajax({
            url: getLatLongURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var cityDisplay = response.name;
            
                        
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
                
                var dateDisplay = timeConverter(date);
                

                $("#cityDateIcon").text(cityDisplay + " - " + dateDisplay);
                $("#cityDateIcon").append("<img src='https://openweathermap.org/img/wn/"+weatherIcon+".png'></img>");
                $("#curTemp").text(curTempDisplay);
                $("#curHum").text(curHumidityDisplay);
                $("#curSpeed").text(windSpeed);
                $("#curUVI").text(uvIndex);

                for (i=1; i<6; i++) {
                    var laterDate = response.daily[i].dt;
                    var laterDateDisplay = "";
                    laterDateDisplay = timeConverter(laterDate);
                    var laterTemp = response.daily[i].temp.day;
                    var laterHumidity = response.daily[i].humidity;
                    var laterIcon = response.daily[i].weather[0].icon;
                    var imgSource = "https://openweathermap.org/img/wn/"+laterIcon+"@2x.png";

                    $("#date"+i).text(laterDateDisplay);
                    $("#icon"+i).attr("src", imgSource);
                    $("#temp"+i).text(laterTemp + " F");
                    $("#humidity"+i).text(laterHumidity + "%");
                }
                
            });
        
        
        
        
        
        });

        
        
        
        
    }



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
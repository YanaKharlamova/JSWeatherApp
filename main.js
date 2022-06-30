let weather = {
    apiKey: "8a27783e1a0cdebe88f81104beb87a8a",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          this.apiKey +
          "&units=metric"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response.status;
        })
        .then((data) => {
          this.displayWeather(data);
        })
        .catch((error) => console.error("HTTP error", error));
    },
    displayWeather: function (data) {
      const { name, weather, main, wind } = data;
      const { description, icon } = weather[0];
      const { temp, humidity } = main;
      const { speed } = wind;
      document.querySelector(".weather").classList.remove("loading");
      document.querySelector(".city-text").innerText = name;
      document.querySelector(".temp-text").innerText = temp + "°";
      document.querySelector(".description-text").innerText = description;
      document.querySelector(".icon").src =
        "http://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".humidity-text").innerText = humidity + "%";
      document.querySelector(".wind-text").innerText = speed + "km/h";
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    startGettingWeatherFunction: function () {
      let inputValue = document.querySelector(".search-bar").value;
      this.fetchWeather(inputValue);
    },
  };
  
  document.querySelector(".search-btn").addEventListener("click", function () {
    weather.startGettingWeatherFunction();
  });
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        weather.startGettingWeatherFunction();
      }
    });
  weather.fetchWeather("Kyiv");
  
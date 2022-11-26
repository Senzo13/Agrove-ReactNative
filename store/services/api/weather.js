import axios from "axios"

// get weather by zip code and country code with openweathermap.org API axios call
export const getWeather = async (zip, country) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=a231c70247581b21d3fd566f1fd91818`
    )
    return response.data
}
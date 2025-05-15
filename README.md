# Weather App built with VS Code agent mode

This application was entirely developed using VS Code's Agent mode powered by the GPT-4.1 LLM model.

You can review the prompt file used for developing the app in the `.github/prompts` directory.

## Main features

- Search for current weather data by entering a city name
- View detailed weather information including temperature, humidity, and conditions
- Responsive and user-friendly interface

Fore additional documentation on the prompt feature, checkout VS Code's official documentation: https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental

## OpenWeatherMap API Key

You'll need an API Key for being able to fetch weather data. See instructions here: [Instructions](https://openweathermap.org/appid).

After generating your API key, add it to a `.env` file in the project root. Refer to the `.env.sample` file for the required format and variable names.

## Running the app

Simply execute `yarn dev` and you are good to go!

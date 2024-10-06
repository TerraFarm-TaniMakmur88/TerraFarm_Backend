<br>
<div align="center">
    <div >
        <img height="150px" src="./assets/logo.svg" alt=""/>
    </div>
    <div>
            <h3><b>TerraFarm</b></h3>
            <p><i>Cultivating Smarter, Growing Stronger.</i></p>
    </div>      
</div>
<br>
<h1 align="center">TerraFarm Backend Website</h1>
<div align="center">

<img src="./assets/cover.png" alt=""/>

</div>
<br>
<i>The engine behind tailored insights</i>: TTerraFarm's backend ensures smooth, reliable performance by processing vast amounts of Earth observation and predictive data. It manages user profiles, real-time alerts, and resource management tools while supporting offline-first capabilities, ensuring farmers can access vital information and take action no matter where they are.

## 👨🏻‍💻 &nbsp;Technology Stack

<div align="center">
<a href="https://react.dev/">
<kbd>
<img src="./assets/logo/express.png" height="60" />
</kbd>
</a>

<a href="https://www.typescriptlang.org/">
<kbd>
<img src="./assets/logo/nodejs.png" height="60" />
</kbd>
</a>

<a href="https://tailwindcss.com/">
<kbd>
<img src="./assets/logo/supabase.png" height="60" />
</kbd>
</a>

<a href="https://ui.shadcn.com/">
<kbd>
<img src="./assets/logo/meteometic.png" height="60" />
</kbd>
</a>

<a href="https://ui.shadcn.com/">
<kbd>
<img src="./assets/logo/gcp.png" height="60" />
</kbd>
</a>

<a href="https://ui.shadcn.com/">
<kbd>
<img src="./assets/logo/docker.png" height="60" />
</kbd>
</a>
</div>
<div align="center">
<h4>Express | NodeJS | Supabase | Meteometic | Google Cloud Platform | Docker</h4>
</div>
<br>

## ⚙️ &nbsp;How to Run
1. **Clone the repository** from the terminal using the following command:
    ```bash
    $ git clone https://github.com/TerraFarm-TaniMakmur88/TerraFarm_Backend.git
    ```

2. **Create a `.env` file** inside the repository directory using the `env.example` file as the template. You should add information about your own Google project to the `.env` file.

3. **Run the server** using the following command. Make sure you have Docker Desktop installed on your device:
    ```bash
    npm run start
    ```

4. The TerraFarm backend server should now be running. You can check the server by opening [http://localhost:8080](http://localhost:8080) in your web browser.


## 🔑 &nbsp;List of Endpoints
| Endpoint                            |  Method  |   Usage                                                                                  |
| ----------------------------------- | :------: | ---------------------------------------------------------------------------------------- |
| /api/field                          | GET      | Users can retrieve field information based on their user profile                      |
| /api/field/status                   | GET      | Users can retrieve field information along with their status                          |
| /api/field/:id                     | GET      | Users can retrieve specific information about a field using its ID                    |
| /api/field                          | POST     | Users can create new fields                                                           |
| /api/field                          | PUT      | Users can update existing field data                                                  |
| /api/field/status                   | PUT      | Users can update the status of a field                                               |
| /api/field/plant_date              | PUT      | Users can update the planting date of a field                                        |
| /api/field                          | DELETE   | Users can delete a field based on its ID                                             |
| /api/user                           | GET      | Users can retrieve their own user information                                         |
| /api/user                           | POST     | Users can create a new user account                                                  |
| /api/user/login                     | POST     | Users can log in to their accounts                                                    |
| /api/forecast/temperature           | GET      | Users can retrieve temperature forecasts                                              |
| /api/forecast/windspeed             | GET      | Users can retrieve wind speed forecasts                                              |
| /api/forecast/humidity              | GET      | Users can retrieve humidity forecasts                                                 |
| /api/forecast/rainfall              | GET      | Users can retrieve rainfall forecasts                                                |
| /api/weather                        | GET      | Users can get the current weather information                                         |
| /api/weather/date                   | GET      | Users can get weather information for a specific date                                |
| /api/weather/date_range             | GET      | Users can get weather information for a date range                                   |
| /api/weather/dashboard               | GET      | Users can retrieve weather data for the dashboard                                    |
| /api/calculator/calculate           | POST     | Users can calculate profit based on provided data                                     |

## 👥 &nbsp;Contributors
| <div align="center"><a href="https://github.com/mikeleo03"><img width="180px" height="180px" src="https://firebasestorage.googleapis.com/v0/b/upheld-acumen-420202.appspot.com/o/readme-assets%2Fpicprof%2FLeon.png?alt=media&token=0ea1884a-32ca-471b-a3af-bf3995bbc605" alt=""/></a></div> | <div align="center"><a href="https://github.com/arleenchr"><img width="180px" height="180px" src="./assets/pic/arleen.jpg" alt=""/></a></div> | <div align="center"><a href="https://github.com/AustinPardosi"><img width="180px" height="180px" src="https://firebasestorage.googleapis.com/v0/b/upheld-acumen-420202.appspot.com/o/readme-assets%2Fpicprof%2FAustin.png?alt=media&token=f520a334-4aeb-4efe-9437-669451b6dca6" alt=""/></a></div> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <div align="center"><h3><b><a href="https://github.com/mikeleo03">Michael Leon Putra Widhi</a></b></h3><i><p>Bandung Institute of Technology</i></p></div>                                                                                        | <div align="center"><h3><b><a href="https://github.com/arleenchr">Arleen Chrysantha Gunardi</a></b></h3></a><p><i>Bandung Institute of Technology</i></p></div>                                                               | <div align="center"><h3><b><a href="https://github.com/AustinPardosi">Austin Gabriel Pardosi</a></b></h3></a><p><i>Bandung Institute of Technology</i></p></div>                                                                            
| <div align="center"><a href="https://github.com/Nat10k"><img width="180px" height="180px" src="./assets/pic/nathan.jpg" alt=""/></a></div> | <div align="center"><a href="https://github.com/manuellaiv"><img width="180px" height="180px" src="./assets/pic/manuella.jpg" alt=""/></a></div> | <div align="center"><a href="https://github.com/Mehmed13"><img width="180px" height="180px" src="./assets/pic/fadhil.jpg" alt=""/></a></div> |
| <div align="center"><h3><b><a href="https://github.com/Nat10k">Nathan Tenka</a></b></h3><i><p>Bandung Institute of Technology</i></p></div>                                                                                        | <div align="center"><h3><b><a href="https://github.com/manuellaiv">Manuella Ivana Uli Sianipar</a></b></h3></a><p><i>Bandung Institute of Technology</i></p></div>                                                               | <div align="center"><h3><b><a href="https://github.com/Mehmed13">Muhammad Fadhil Amri</a></b></h3></a><p><i>Bandung Institute of Technology</i></p></div>                                                                            |
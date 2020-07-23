# Project Under Development

<p align="center">
	<img src="http://www.efsa.europa.eu/profiles/efsa/themes/responsive_efsa/logo.png" alt="European Food Safety Authority"/>
</p>

## FoodEx2 Smart Coding Application - Frontend
The FoodEx2 Smart Coding Application is designed and developed internally in the European Food Safety Authority (DATA and AMU units). The frontend of the FoodEx2 Smart Coding Application is fully open source and aims to simplify coding in FoodEx2 by making use of free text food and feed description. More specifically, the application is composed of several web components which allow interfacing with the APIs available on the backend. Please note that the components can also be extracted and hence used outside the scope of the application itself (e.g. in another web platform).

<p align="center">
    <img src="src/icons/FE2_POSI.jpg" alt="FoodEx2_SCA"/>
</p>

## For Developers
### Prerequisites
* [Git](https://git-scm.com/download/)
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

### Install Polymer CLI
After installing the prerequisities listed aboce, run the following command in order to install the Polymer CLI globally:
```
npm install -g polymer-cli
```

### Clone and install
Clone the project locally in your workspace using the following command:
```
git clone https://github.com/openefsa/foodex2-sca-frontend.git
```

Now, move inside the project's folder just cloned and install all the required dependencies (listed in the package.json file). Run the following command in order to automatically install all the dependencies using npm:
```
npm install
```

### Serve FoodEx2 SCA locally
In order to view the app on the browser, it is needed to serve the project using Polymer. Run the following command from the project's folder:
```
polymer serve
```

Click on the link which will appear on the terminal; this will automatically open a new page in the browser and hence render all user interface components.
*Please note that FoodEx2 Smart Coding Application fully support the latest version of Chrome and Firefox.*

## Web components

## Deployment

### Docker build

### Kubernetes deployment
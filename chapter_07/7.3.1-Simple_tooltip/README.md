# Building a simple tooltip
This folder contains the exercise files for chapter 7 section 7.3.1 of [D3.js in Action, 3rd edition](https://www.manning.com/books/d3js-in-action-third-edition).
</br>
In this folder, you’ll find a *start* and an *end* folder. To follow along with the book’s instructions, write your code in the *start* folder. If you ever get stuck, you’ll find the solution in the *end* folder.

## How to run the project
To run this project, you'll need a local webserver. We recommend using [VS Code](https://code.visualstudio.com/)'s Live Server extension. You can find instructions on installing this extension in Appendix A of the book.
1. Open the project folder (a *start* OR an *end* folder from the subsections mentioned above) in VS Code.
2. To run the project with the Live Server extension, click the *Go live* button in the status bar of VS Code.
3. The project should open automatically in your browser.

## Structure of the project
* The `/data` folder contains the CSV file `weekly_temperature.csv` with the average weekly temperature in New York City in 2021. The columns are organized as follows:
    * `date`: The date (YEAR-MONTH-DAY).
    * `max_temp_F`: The average daily maximum temperature for that week, in Fahrenheit.
    * `avg_temp_F`: The average daily temperature for that week, in Fahrenheit.
    * `min_temp_F`: The average daily minimum temperature for that week, in Fahrenheit.
* The `/css` folder contains two CSS files:
    * `base.css` consists of the generic styles applied to the project page, like the font, spacings, and colors. Although you won’t need to edit this file, feel free to personalize it!
    * `visualization.css` is where we add styles for our visualizations. It already contains the style properties applied to responsive SVG containers, following the strategy described in chapter 1.
* The `/js` folder contains multiple JavaScript files.
    * `shared-constants.js` contains a list of constants that are reused in the project's different files.
    * `line-chart.js` is where the line chart is already generated.
    * `interactions.js` is where you'll create the tooltip and handle the mouse events.
    * `load-data.js` is where the data is loaded and passed to the different functions that generate the visualizations.
* `index.html` contains the markup and text that composes the project. The D3 library, the CSS files, and the JavaScript files are already loaded in `index.html`.

Happy D3 coding! 🤓
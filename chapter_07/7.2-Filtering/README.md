# Filtering a visualization
This folder contains the exercise files for chapter 7 section 7.2 of [D3.js in Action, 3rd edition](https://www.manning.com/books/d3js-in-action-third-edition).
</br>
In this folder, you’ll find a *start* and an *end* folder. To follow along with the book’s instructions, write your code in the *start* folder. If you ever get stuck, you’ll find the solution in the *end* folder.

## How to run the project
To run this project, you'll need a local webserver. We recommend using [VS Code](https://code.visualstudio.com/)'s Live Server extension. You can find instructions on installing this extension in Appendix A of the book.
1. Open the project folder (a *start* OR an *end* folder from the subsections mentioned above) in VS Code.
2. To run the project with the Live Server extension, click the *Go live* button in the status bar of VS Code.
3. The project should open automatically in your browser.

## Structure of the project
* The `/data` folder contains the CSV file `data.csv`, listing the salaries of data visualization practitioners located in the United States. The data was extracted from the responses to the [2021 State of the Industry Survey](https://docs.google.com/spreadsheets/d/1lDkxioTmT5--JufJuYryiV5fKsdQQopvlSJO4Gh0ors/edit#gid=1462100456) organized by the [Data Visualization Society](www.datavisualizationsociety.org). The columns of the dataset are structured as follows:
    * `uid`: Unique identifier.
    * `roles`: The main role of the respondent (Designers, Scientist, Developer, Engineer, Journalist, Analyst, Cartographer, Leadership, Teacher, or Other).
    * `gender`: The gender of the respondent (Female, Male, Self-described, or Prefer not to say).  d
    * `pay_annual_USD`: Pre-tax yearly salary of the respondent, in US dollars. The respondent could choose a bracket of $20,000 ("$20,000 - $39,999", "$40,000 - $59,999", and so on). For comparison purposes, the respondents who chose the option "$240,000 or more" won't be included in the visualizations.
* The `/css` folder contains two CSS files:
    * `base.css` consists of the generic styles applied to the project page, like the font, spacings, and colors. Although you won’t need to edit this file, feel free to personalize it!
    * `visualization.css` is where we add styles for our visualizations. It already contains the style properties applied to responsive SVG containers, following the strategy described in chapter 1.
* The `/js` folder contains multiple JavaScript files.
    * `shared-constants.js` contains a list of constants that are reused in the project's different files, like the dimensions, colors, scales and the bin generator. It also includes an array of the filters we will add to the interface.
    * `histogram.js` is where the histogram is already generated.
    * `interactions.js` is where you'll create the filters and handle the interactions.
    * `load-data.js` is where the data is loaded and passed to the different functions that generate the visualizations. It also contains the function `getRandomSalary` that randomly returns a salary within the bracket selected by the respondent.
* `index.html` contains the markup and text that composes the project. The D3 library, the CSS files, and the JavaScript files are already loaded in `index.html`.

Happy D3 coding! 🤓
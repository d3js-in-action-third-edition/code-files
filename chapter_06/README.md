# Visualizing distributions
This folder contains the exercise files for chapter 6 of [D3.js in Action, 3rd edition](https://www.manning.com/books/d3js-in-action-third-edition).
</br>
The folder is separated into subfolders corresponding to each section of the chapter. In these subfolders, you'll find a *start* and an *end* folder. To follow along with the book's instructions, write your code in the *start* folder. You'll find the solution in the *end* folder if ever you get stuck.
When changing to the next section, you can choose to keep coding in the same files or use the *start* folder for that section.

## Sections in this chapter
* [6.1-Binning_data](https://github.com/d3js-in-action-third-edition/code-files/tree/main/chapter_06/6.1-Binning_data)
* [6.2-Histogram](https://github.com/d3js-in-action-third-edition/code-files/tree/main/chapter_06/6.2-Histogram)
* [6.3-Pyramid](https://github.com/d3js-in-action-third-edition/code-files/tree/main/chapter_06/6.4-Pyramid)
* [6.4-Box_plots](https://github.com/d3js-in-action-third-edition/code-files/tree/main/chapter_06/6.3-Box_plots)
* [6.5-Violins](https://github.com/d3js-in-action-third-edition/code-files/tree/main/chapter_06/6.5-Violins)

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
    * `visualization.css` is where we will add styles for our visualizations. It already contains the style properties applied to responsive SVG containers, following the strategy described in chapter 1.
* The `/js` folder contains multiple JavaScript files. Since we will work on three different charts, separating our code into different files will make it easier to understand, write and maintain. We also have files that handle the constants shared by multiple charts, like colors.
    * `shared-constants.js` contains a list of color constants that we will reuse throughout the project.
    * `histogram.js` is where you'll generate the histogram.
    * `box-plot.js` is where you'll generate the box plots.
    * `pyramid.js` is where you'll generate the pyramid chart.
    * `violins.js` is where you'll create the violin plots layout.
    * `load-data.js` is where the data is loaded and passed to the different functions that generate the visualizations. Is also contains the function `getRandomSalary` that randomly returns a salary within the bracket selected by the respondent.
* `index.html` contains the markup and text that composes the project. The D3 library, the CSS files, and the JavaScript files are already loaded in `index.html`.

Happy D3 coding! 🤓
# Drawing lines, curves, and arcs
This folder contains the exercise files for chapter 3 of [D3.js in Action, 3rd edition](https://www.manning.com/books/d3js-in-action-third-edition).
</br>
The folder is separated into subfolders corresponding to each section of the chapter. In these subfolders, you'll find a *start* and an *end* folder. To follow along with the book's instructions, write your code in the *start* folder. You'll find the solution in the *end* folder if ever you get stuck.
When changing to the next section, you can choose to keep coding in the same files or use the *start* folder for that section.

## Sections in this chapter
* [3.2-Preparing_data](https://github.com/d3js-in-action-third-edition/code-files/tree/main/chapter_03/3.2-Preparing_data)
* [3.3-Binding_data](https://github.com/d3js-in-action-third-edition/code-files/tree/main/chapter_03/3.3-Binding_data)
* [3.4-Scales](https://github.com/d3js-in-action-third-edition/code-files/tree/main/chapter_03/3.4-Scales)

## How to run the project
To run this project, you'll need a local webserver. We recommend using [VS Code](https://code.visualstudio.com/)'s Live Server extension. You can find instructions on installing this extension in Appendix A of the book.
1. Open the project folder (a *start* OR an *end* folder from the subsections mentioned above) in VS Code.
2. To run the project with the Live Server extension, click the *Go live* button in the status bar of VS Code.
3. The project should open automatically in your browser.

## Structure of the project
* The `/data` folder contains a CSV file names `data.csv`, extracted from the results of the [2021 State of the Industry Survey](https://www.datavisualizationsociety.org/survey) by the [Data Visualization Society](https://www.datavisualizationsociety.org). The columns are organized as follows:
    * `technology`: A list of technologies used for data visualization.
    * `count`: The number of respondents who mentioned using this tool.
* The `/css` folder contains the CSS file `main.css`, where styles have been added for the responsive SVG container.
* The `/js` folder contains the JavaScript file `main.js`. This is where we will build our bar chart.
* `index.html` contains the markup and text that composes the project. The D3 library, `main.css`, and `main.js` are already loaded in this file.

Happy D3 coding! 🤓
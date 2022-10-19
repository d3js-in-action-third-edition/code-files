# Refining data updates
This folder contains the exercise files for chapter 7 section 7.4 of [D3.js in Action, 3rd edition](https://www.manning.com/books/d3js-in-action-third-edition).
</br>
In this folder, you’ll find a *start* and an *end* folder. To follow along with the book’s instructions, write your code in the *start* folder. If you ever get stuck, you’ll find the solution in the *end* folder.

## How to run the project
To run this project, you'll need a local webserver. We recommend using [VS Code](https://code.visualstudio.com/)'s Live Server extension. You can find instructions on installing this extension in Appendix A of the book.
1. Open the project folder (a *start* OR an *end* folder from the subsections mentioned above) in VS Code.
2. To run the project with the Live Server extension, click the *Go live* button in the status bar of VS Code.
3. The project should open automatically in your browser.

## Structure of the project
* The `/data` folder contains the CSV file `data.csv`, containing a list of cetaceans species. The columns are organized as follows:
    * `uid`: A unique identifier.
    * `common_name`: The common name of the specie.
    * `scientific_name`: The scientific name of the specie.
    * `suborder`: A biological classification.
    * `family`: A biological classification. A suborder contains one or more families.
    * `dorsal_fin`: If the specie has a dorsal fin ("Yes") or not ("No").
    * `min_size_m`: Minimum size or length in meters.
    * `max_size_m`: Maximum size or length in meters.
    * `max_weight_t`: Maximum weight in tons.
    * `hemisphere`: Wether the specie lives in the northern hemisphere, the southern hemisphere, or travels between both.
    * `global_population_estimate`: Estimated global population. The population estimate of some cetaceans was provided as a range. In these cases, the average value is used.
    * `status`: Conservation status according to the International Union for Conservation of Nature:
        * `LC`: Least Concern
        * `NT`: Near Threatened
        * `VU`: Vulnerable
        * `EN`: Endangered
        * `CR`: Critically Endangered
* The `/css` folder contains two CSS files:
    * `base.css` consists of the generic styles applied to the project page, like the font, spacing, and colors. Although you won’t need to edit this file, feel free to personalize it!
    * `visualization.css` is where we add styles for our visualizations. It already contains the style properties applied to responsive SVG containers, following the strategy described in chapter 1 and the styles for the legend and filters.
* The `/js` folder contains multiple JavaScript files.
     * `shared-constants.js` contains the chart's margins, width, and height, as per the strategy discussed in chapter 4. It also includes an array named `cetaceanFilters` that lists the id, label, and active status associated with each specie. The array names `conservationStatuses` lists each conservation status's id, label, and color. The scales are also declared in this file to allow using them globally.
    * `scatterplot.js` is where you'll build the scatterplot.
    * `legend.js` is where the legend is already generated.
    * `interactions.js` is where you'll create the tooltip and handle the mouse events.
    * `load-data.js` is where the data is loaded and passed to the different functions that generate the visualization.
* `index.html` contains the markup and text that composes the project. The D3 library, the CSS files, and the JavaScript files are already loaded in `index.html`.

Happy D3 coding! 🤓
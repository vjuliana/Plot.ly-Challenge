// STEP 1: INITIALISE 

// Initializes the page with a default plot
function init() {
//   data = [{
//     x: [1, 2, 3, 4, 5],
//     y: [1, 2, 4, 8, 16] }];

//   var CHART = d3.selectAll("#selDataset").node();

//   Plotly.newPlot(CHART, data);
// }

// // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");

//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.node().value;

//   var CHART = d3.selectAll("#plot").node();

//     // Initialize x and y arrays
//     var x = [];
//     var y = [];

};

init();

// STEP 2: Use D3 fetch to read the JSON file and display h-bar and bubble chart

function buildPlots(sampleID) {
  d3.json("samples.json").then((data => {
    console.log(data);
    // console.log(data.samples);
   
    // Filter sample values by ID
    // var filteredSample = data.samples.filter(d => d.id == sampleID)[0]
    var samplesData = data.samples;
    var filteredSample = samplesData.filter(d => d.id == sampleID)[0];

    console.log(filteredSample);

    // Slice the top 10 objects for plotting and reverse array due to Plotly's defaults
    var top10SampleValues = filteredSample.sample_values.slice(0,10).reverse();
    var top10OtuIDs = filteredSample.otu_ids.slice(0,10).reverse();
    var top10OtuLabels = filteredSample.otu_lables.slice(0,10).reverse();

    console.log(`Top 10 Sample: ${top10SampleValues}`);
    console.log(`Top 10 Otu ID: ${top10OtuIDs}`);
    console.log(`Top 10 Otu Labels: ${top10OtuLabels}`);

    // Get the otu_id's into string
    var yticks = top10OtuIDs.map(d => "OTU " + d);

    console.log(`Otu ID String: ${OtuIDstring}`);



    // Create trace
    var traceBarChart = {
      x: top10SampleValues,
      y: yticks.reverse(),
      text: topOtuLabels,
      type: "bar",
      orientation: "h"
    };

    // Data
    var dataBarChart = [traceBarChart];

    // Layout
    var barLayout = {
      title: 'Top 10 Microbial Species Found in an Individual',
      xaxis: {title: 'No. of samples found'},
      yaxis: {title: 'Microbial Species ID'},
      // margin: {}
    };

    // Render plot
    Plotly.newPlot("bar", dataBarChart, barLayout);
  }));
};

buildPlots();

function displayDemoInfo() {
  d3.json("samples.json").then((data => {
    console.log(data);

    // Map metadata for demographic info
    var metadataInfo = data.metadata.map(d => d.wfreq)
    console.log(`Washing Freq: ${metadataInfo}`)
  }));
};

displayDemoInfo();

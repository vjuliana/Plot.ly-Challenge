// STEP 1: INITIALISE 

// Initializes the page with a default plot
//function init() {
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

//};

//init();

// Building horizontal bar chart and bubble chart

function BuildCharts(sampleID) {
  d3.json("../data/samples.json").then((data) => {
    console.log(data);
    // console.log(data.samples);
   
    // Filter sample values by ID
    // var filteredSample = data.samples.filter(d => d.id == sampleID)[0]
    
    var samples = data.samples;
    // console.log(samplesData);

    var filteredArray = samples.filter(d => d.id == sampleID);
    // console.log(filteredArray);

    var filteredSample = filteredArray[0];
    console.log(filteredSample);

    // Grab data for 'sample_values', 'otu_ids' and 'otu_labels'
    var SampleValues = filteredSample.sample_values;
    var OtuIDs = filteredSample.otu_ids;
    var OtuLabels = filteredSample.otu_lables;

    console.log(`Sample Values: ${SampleValues}`);
    console.log(`Otu IDs: ${OtuIDs}`);
    console.log(`Otu Labels: ${OtuLabels}`);

    // Create trace for bar chart, slice object to get top 10 values and reverse
    var traceBarChart = {
      x: SampleValues.slice(0,10).reverse(),
      y: OtuIDs.slice(0,10).map(d => "OTU " + d).reverse(),
      text: OtuLabels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h'
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

    // Create trace for bubble chart 
    var traceBubbleChart = {
      x: OtuIDs,
      y: SampleValues,
      mode: 'markers',
      marker: {
        color: SampleValues,
        size: OtuIDs,
        },
      type: 'scatter'
      };

    // Data
    var dataBubbleChart = [traceBubbleChart];

    // Layout
    var bubbleLayout = {
      title: 'Belly Button Microbial Species',
      xaxis: {title: 'Microbial Species ID'},
      yaxis: {title: 'No. of samples found'},
      // margin: {}
      };
  
    // Render plot
    Plotly.newPlot("bubble", dataBubbleChart, bubbleLayout);

  });
};

// Initialises BuildChart function
BuildCharts();

// Building Demographic Info Box

function displayDemoInfo(sampleID) {
  d3.json("../data/samples.json").then((data) => {
    console.log(data);

    // Filter metadata for demographic info by ID
    var metadata = data.metadata
    console.log(metadata)
    
    var metadataArray = metadata.filter(d => d.id == sampleID);
    console.log(metadataArray);

    var metadataInfo = metadataArray[0];
    console.log(metadataInfo);

    // Select where to put demographic info 
    var demoinfoBox = d3.select("#sample-metadata");

    // Reset if new ID is chosen
    demoinfoBox.html("");

    // Grab key value pairs and append to the box
    Object.entries(metadataInfo).forEach(([key, value]) => {
      console.log(`Key: ${key} and Value ${value}`);
      demoinfoBox.append("h3").text(`${key}: ${value}`);
      console.log(demoinfoBox);
    };

  });
};

displayDemoInfo();

// STEP 1: PLOTLY

// Initializes the page with a default plot
function init() {
  data = [{
    x: [],
    y: []
  }];
  
  var barChart = d3.selectAll("#bar").node();

  Plotly.newPlot(barChart)
  }

  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("body").on("change", updatePlotly);

// Create a horizontal bar chart with a drop down menu to display the top 10 OTUs found in that individual 

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function buildBarChart(sampleID) {
// Use D3 fetch to read the JSON file
  d3.json("data/samples.json").then(function(data) {
    console.log(data);

    // Step 1: Filter sample values by ID
    var samples = data.samples.filter(samples => parseInt(samples.id) === sampleID);

    console.log(samples);

    // Step 2: Slice the top 10 objects for plotting and reverse array due to Plotly's defaults
    var topSampleValues = samples.sample_values.slice(0, 10).reverse();
    var topOtuIDs = sample.otu_ids.slice(0, 10).reverse();
    var topOtuLabels = sample.otu_lables.slice(0, 10).reverse();

    console.log(`Top 10 Sample: ${topSampleValues}`)
    console.log(`Top 10 Otu ID: ${topOtuIDs}`)
    console.log(`Top 10 Otu Labels: ${topOtuLabels}`)

    // Step 4: Create trace
    var traceBarChart = {
      x: sample_values,
      y: otu_ids,
      text: topOtuLabels,
      type: "bar",
      orientation: "h"
    };

    // Data
    var dataBarChart = [traceBarChart];

    // Layout
    // var layout = { }

    // Render plot
    Plotly.newPlot("bar", dataBarChart);

  });
};
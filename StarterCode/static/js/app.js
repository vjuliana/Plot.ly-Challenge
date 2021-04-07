// Use D3 fetch to read the JSON file

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function buildBarChart() {
  d3.json("./data/samples.json").then(function(data) {
    console.log(data);

    // Step 1: Grab values from the json objects sample_values, otu_ids, otu_labels
    var sample_values = data.samples.sample_values;
    var otu_ids = data.samples.otu_ids; 
    var otu_lables = data.samples.otu_labels;

    // Step 2: Sort sample values by descending order
    // Upon checking data, the sample values and corresponding otu_ids and otu_labels are already in descending order

    // Step 3: Slice the top 10 objects for plotting and reverse array due to Plotly's defaults
    sample_values = sample_values.slice(0, 9).reverse();
    otu_ids = otu_ids.slice(0, 9).reverse();
    otu_lables = otu_lables.slice(0, 9).reverse();

    // Step 4: Create trace
    var trace = {
      x: sample_values,
      y: otu_ids,
      type: "bar",
      orientation: "h"
    };

    // data
    var data = [trace];

    // Layout
    var layout = {

    }

    // Render plot
    Plotly.newPlot("bar", data);

  });
};

buildBarChart();
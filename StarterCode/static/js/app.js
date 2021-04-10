// STEP 1: PLOTLY

// Use D3 fetch to read the JSON file

function buildBarChart(id) {
  d3.json("samples.json").then((data => {
    console.log(data);
    // console.log(data.samples);

    // Step 1: Filter sample values by ID
    var samples = data.samples;
    var filteredSample = samples.filter(f => f.id == id)[0];
    console.log(filteredSample);

    // Step 2: Slice the top 10 objects for plotting and reverse array due to Plotly's defaults
    var top10SampleValues = samplesObject.sample_values.slice(0, 10).reverse();
    var top10OtuIDs = samplesObject.otu_ids.slice(0, 10).reverse();
    var top10OtuLabels = samplesObject.otu_lables.slice(0, 10).reverse();

    console.log(`Top 10 Sample: ${top10SampleValues}`)
    console.log(`Top 10 Otu ID: ${top10OtuIDs}`)
    console.log(`Top 10 Otu Labels: ${top10OtuLabels}`)

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
    // // var layout = { }

    // Render plot
    Plotly.newPlot("bar", dataBarChart);

  }));
};

buildBarChart(1)
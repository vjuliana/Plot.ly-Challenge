// BELLY BUTTON CHALLENGE //

// Build horizontal bar chart and bubble chart //

function BuildCharts(sampleID) {
  d3.json("../data/samples.json").then((data) => {
    console.log(data);
    // console.log(data.samples);

    // Filter sample values by ID
    // var filteredSample = data.samples.filter(d => d.id == sampleID)[0]

    var samples = data.samples;
    // console.log(samplesData);
    console.log(sampleID);

    var filteredArray = samples.filter(d => d.id == sampleID);
    // console.log(filteredArray);

    var filteredSample = filteredArray[0];
    console.log(filteredSample);

    // Grab data for 'sample_values', 'otu_ids' and 'otu_labels'
    var SampleValues = filteredSample.sample_values;
    var OtuIDs = filteredSample.otu_ids;
    var OtuLabels = filteredSample.otu_labels;

    console.log(`Sample Values: ${SampleValues}`);
    console.log(`Otu IDs: ${OtuIDs}`);
    console.log(`Otu Labels: ${OtuLabels}`);

    // BAR CHART //
    // Create trace for bar chart, slice object to get top 10 values and reverse
    var traceBarChart = {
      x: SampleValues.slice(0, 10).reverse(),
      y: OtuIDs.slice(0, 10).map(d => "OTU " + d).reverse(),
      text: OtuLabels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    };

    // Data for bar chart
    var dataBarChart = [traceBarChart];

    // Layout for bar chart
    var barLayout = {
      title: 'Top 10 Microbial Species Found in an Individual',
      xaxis: {
        title: 'No. of samples found'
      },
      yaxis: {
        title: 'Microbial Species ID'
      },
      // margin: {}
    };

    // Render bar chart
    Plotly.newPlot("bar", dataBarChart, barLayout);

    // BUBBLE CHART //
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

    // Data for bubble chart
    var dataBubbleChart = [traceBubbleChart];

    // Layout for bubble chart
    var bubbleLayout = {
      title: 'Belly Button Microbial Species',
      xaxis: {
        title: 'Microbial Species ID'
      },
      yaxis: {
        title: 'No. of samples found'
      },
      // margin: {}
    };

    // Render bubble chart
    Plotly.newPlot("bubble", dataBubbleChart, bubbleLayout);

  });
};

// Initialise BuildChart function
// BuildCharts("940");

// Building Demographic Info Box //

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
    });
  });
};

// displayDemoInfo("940");

// Initialise first the page with a default plot //

function init() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu to a variable
  d3.json("../data/samples.json").then((data) => {
    var names = data.names;
    // console.log(names);

    data.names.forEach((sampleID) => {
      dropdownMenu.append("option").text(sampleID).property("value");
    });

    // Initial array
    var startingsampleID = names[0];
    console.log(`Starting sample ID: ${startingsampleID}`);

    // Display default demographic info and charts
    displayDemoInfo(startingsampleID);
    BuildCharts(startingsampleID);

  });
};

init();

// Event listener

// Call selectNewTestSubject() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", selectNewTestSubject);

function selectNewTestSubject(sampleID) {
  //  Call function to update chart
  BuildCharts(sampleID);

  // Call function to update Demographic Info box
  displayDemoInfo(sampleID);

};

// selectNewTestSubject();
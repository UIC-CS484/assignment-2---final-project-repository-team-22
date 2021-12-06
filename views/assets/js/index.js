var pieLabels;
var pieData;
const colours = ['rgb(230, 5, 32)', 'rgb(161, 91, 10)', 'rgb(212, 223, 11)',
               'rgb(143, 11, 224)', 'rgb(92, 11, 224)', 'rgb(11, 205, 224)',
               'rgb(11, 224, 183)', 'rgb(11, 224, 36)', 'rgb(80, 83, 80)'];

var conservationPieChart;

window.onload = function(){
  const username = document.getElementById("username_text").innerHTML;
  const login_label = document.getElementById("welcome_text");
  if(!username){ //User isn't logged in:
    login_label.innerHTML = "Login"
  }

  let lineChartConfig = {};
  let pieChartConfig = {};

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const rawData = JSON.parse(this.responseText);
      lineChartConfig = {
        type: 'line',
        data: populateLineData(rawData),
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Extinction Rate'
            }
          }
        },
      };
      const extinctionRateChart = new Chart(
        document.getElementById('extinctionRateChart'), lineChartConfig
      );
    }
  };
  xmlhttp.open("GET", "assets/chartData/ExtinctionRate.json", true);
  xmlhttp.send();

  var xmlhttp2 = new XMLHttpRequest();
  xmlhttp2.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      const rawData = JSON.parse(this.responseText);

      pieLabels = populatePieData(rawData).labels;
      pieData = populatePieData(rawData).datasets[0].data;

      pieChartConfig = {
        type: 'pie',
        data: populatePieData(rawData),
        options: {
          responsive: false,
          plugins:{
            legend:{
              position: 'top',
            },
            title: {
              display: true,
              text: 'Conservation Status'
            }
          }
        },
      };

      conservationPieChart = new Chart(
        document.getElementById('conservationPieChart'), pieChartConfig
      );

    }
  }
  xmlhttp2.open("GET", "assets/chartData/SpeciesCount.json", true);
  xmlhttp2.send();

}

function populateLineData(rawData){
  let labels = [];
  let extinctAnimals = [];
  for(let year in rawData){
    if(year>=1700 && year<=2021){
      labels.push(year);
      extinctAnimals.push(rawData[year]);
    }
  }

  const data = {
    labels: labels,
    datasets : [{
      label: "Species Extinction Rate",
      data: extinctAnimals,
      backgroundColor : 'rgb(255,255,255)',
      borderColor: 'rgb(255,255,255)',
    }]
  };

  return data;
}

function populatePieData(rawData){
  let labels = [];
  let numbers = [];

  for(let status in rawData){
    labels.push(status);
    numbers.push(rawData[status]);
  }

  const data = {
    labels: labels,
    datasets: [{
      label: "Conservation Status",
      data:numbers,
      backgroundColor: colours,
    }]
  };

  return data;
}

function updateChart(label){
  const elementID = label.toLowerCase()+"_check";

  const checked = document.getElementById(elementID).checked;
  if(checked)
    addElementToPie(label);
  else
    removeElementFromPie(label);
}

function addElementToPie(label){

  console.log(pieData);
  console.log(pieLabels);
  console.log(label);


  const index = pieLabels.indexOf(label);

  console.log(index);

  if(index == -1)
    return;

  conservationPieChart.data.labels.push(label);
  conservationPieChart.data.datasets[0].data.push(pieData.at(index)); //Not confusing at all.
  conservationPieChart.data.datasets[0].backgroundColor.push(colours.at(index));

  conservationPieChart.update();
}

function removeElementFromPie(label){
  const indexInPie = conservationPieChart.data.labels.indexOf(label);

  if(indexInPie==-1)
    return;

  conservationPieChart.data.labels.splice(indexInPie, 1);
  conservationPieChart.data.datasets[0].data.splice(indexInPie, 1);
  conservationPieChart.data.datasets[0].backgroundColor.splice(indexInPie, 1);

  conservationPieChart.update();
}

window.onload = function(){
  const username = document.getElementById("usernameText").innerHTML;
  const actionButton = document.getElementById("actionButton");
  if(!username){ //User isn't logged in:
    document.getElementById("welcomeText").style.visibility = "hidden";
    actionButton.href = "/register";
    actionButton.innerHTML = "Register"
  }
  else {
    document.getElementById("welcomeText").style.visibility = "visible";
    actionButton.href = "/logout";
    actionButton.innerHTML = "Logout"
  }

  let chartConfig = {};

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const rawData = JSON.parse(this.responseText);
          chartConfig = {
            type: 'line',
            data: populateData(rawData),
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Extinction Rate Line Chart'
                }
              }
            },
          };
          const extinctionRateChart = new Chart(
            document.getElementById('extinctionRateChart'), chartConfig
          );
      }
  };
  xmlhttp.open("GET", "assets/js/ExtinctionRate.json", true);
  xmlhttp.send();

}

function populateData(rawData){
  let labels = [];
  let extinctAnimals = [];
  for(let year in rawData){
    if(year>=1700 && year<=2021){
      labels.push(year);
      extinctAnimals.push(rawData[year]);
    }
  }

  for(year of labels)
    console.log(year);

  const data = {
    labels: labels,
    datasets : [{
      label: "Species Extinction Rate",
      data: extinctAnimals,
      backgroundColor : 'rgb(0,0,0)',
      borderColor: 'rgb(0,0,0)',
    }]
  };

  return data;
}

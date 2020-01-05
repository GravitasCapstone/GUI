//12.25.2019 update: changing d3.csv to jquery csv. Also optimizing code 
function makeChart(zoneNum, zoneData) {
  var ZONECHART = document.getElementById("zoneGraph").getContext('2d');
  var timeSelection = document.getElementById('zonePeriod').value;
  var timeDiv;
  //place zone data in correct arrays
  var zTime = [];
  var zTemp = [];
  var zRH = [];
  for (var i = 0; i < 1440; i++) {
    zTime.push(zoneData[i].time);
    zTemp.push(zoneData[i].temp);
    zRH.push(zoneData[i].rh);
  }
  var newTime = [];
  var newZTemp = [];
  var newZRH = [];
  var j = 0;
  switch (timeSelection) {
    case "oneHour":
      timeDiv = 5;
      //grab 23:00 - 24:00
      for (j = 1439 - 59; j < zTime.length; j++) {
        newTime.push(zTime[j]);
        newZTemp.push(zTemp[j]);
        newZRH.push(zRH[j]);
      }
      break;
    case "sixHours":
      timeDiv = 15;
      //grab 18:00 - 24:00
      for (j = 1439 - 359; j < zTime.length; j++) {
        newTime.push(zTime[j]);
        newZTemp.push(zTemp[j]);
        newZRH.push(zRH[j]);
      }
      break;
    case "twelveHours":
      timeDiv = 30;
      //grab 12:00 - 24:00
      for (j = 1439 - 719; j < zTime.length; j++) {
        newTime.push(zTime[j]);
        newZTemp.push(zTemp[j]);
        newZRH.push(zRH[j])
      }
      break;
    case "oneDay":
      timeDiv = 60;
      newTime = zTime;
      newZTemp = zTemp;
      newZRH = zRH;
      break;
    default:
      timeDiv = 1;
  }
  var spacedTime = [];
  var spacedT = [];
  var spacedRH = [];
  var i;
  for (i = 0; i < newTime.length; i++) {
    if (newTime.indexOf(newTime[i]) % timeDiv == 0) {
      spacedTime.push(newTime[i]);
      spacedT.push(newZTemp[i]);
      spacedRH.push(newZRH[i]);
    }
  }
  var options = {
    scales: {
      yAxes: [{
        id: 'A',
        type: 'linear',
        position: 'left',
        display: true,
        ticks: {
          suggestedMin: 50,
          steps: 10,
          stepValue: 1,
          max: 100
        }
      }, {
        id: 'B',
        type: 'linear',
        position: 'right',
        ticks: {
          suggestedMin: 0,
          steps: 10,
          stepValue: 1,
          max: 100

        }
      }]
    }
  };
  //redundant, but readable
  var dataSelectT = spacedT;
  var dataSelectRH = spacedRH;
  var labelSelectT;
  var labelSelectRH;
  switch (zoneNum) {
    case 1:
      labelSelectT = "ZSU 1 Temperature";
      labelSelectRH = "ZSU 1 RH%";
      break;
    case 2:
      labelSelectT = "ZSU 2 Temperature";
      labelSelectRH = "ZSU 2 RH%";
      break;
    case 3:
      labelSelectT = "ZSU 3 Temperature";
      labelSelectRH = "ZSU 3 RH%";
      break;
    case 4:
      labelSelectT = "ZSU 4 Temperature";
      labelSelectRH = "ZSU 4 RH%";
      break;
    default:
      dataSelectT = 0;
      dataSelectRH = 5;
      labelSelectT = "Check your case structure";
  }
  var chart = new Chart(ZONECHART, {
    type: 'line',
    options: options,
    data: {
      labels: spacedTime,
      datasets: [{
          label: labelSelectT,
          yAxisID: 'A',
          fill: false,
          borderColor: "#000",
          backgroundColor: "#FFF",
          data: dataSelectT
        },
        {
          label: labelSelectRH,
          yAxisID: 'B',
          fill: false,
          borderColor: "#d030b6",
          backgroundColor: "#000",
          data: dataSelectRH
        }
      ]

    }
  });
  chart.reset();
  chart.update();
}

function updateChart() {
  //remove canvas
  var element = document.getElementById("zoneGraph");
  element.parentNode.removeChild(element);
  //create canvas
  var newChart = document.createElement("CANVAS");
  var parentE = document.getElementById("list")
  newChart.setAttribute("id", "zoneGraph");
  newChart.width = 900;
  newChart.height = 450;
  parentE.style.width = '900px';
  parentE.style.height = '450px';
  parentE.style.display = 'block';
  parentE.style.textAlign = "center";
  newChart.style.display = 'block';
  newChart.style.textAlign = "center";
  parentE.appendChild(newChart);
  
  loadData();
}

function loadData() {
  let url = 'Demo Datalog.csv';
  var zoneSelection = document.getElementById('zoneSelect').value;
  //getting rid of ajax requests for native XMLHTTPRequest
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var flotData = $.csv.toObjects(xhr.responseText, {
        onParseValue: $.csv.hooks.castToScalar
      });
      var z1Data = flotData.map(function (d) {
        return {
          time: d.Time,
          temp: d.zone1T,
          rh: d.zone1RH
        };
      });
      var z2Data = flotData.map(function (d) {
        return {
          time: d.Time,
          temp: d.zone2T,
          rh: d.zone2RH
        };
      });
      var z3Data = flotData.map(function (d) {
        return {
          time: d.Time,
          temp: d.zone3T,
          rh: d.zone3RH
        };
      });
      var z4Data = flotData.map(function (d) {
        return {
          time: d.Time,
          temp: d.zone4T,
          rh: d.zone4RH
        };
      });
      switch (zoneSelection) {
        case "zsu1":
          makeChart(1, z1Data);
          break;
        case "zsu2":
          makeChart(2, z2Data);
          break;
        case "zsu3":
          makeChart(3, z3Data);
          break;
        case "zsu4":
          makeChart(4, z4Data);
          break;
        default:
          makeChart(0, null);
          break;
      }
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}
document.getElementById("zoneSelect").addEventListener("change", updateChart);
document.getElementById("zonePeriod").addEventListener("change", updateChart);
loadData();
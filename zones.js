function makeChart(zones) {
  var ZONECHART = document.getElementById("zoneGraph").getContext('2d');
  var zone1t = zones.map(function(d) {
    return d.zone1T;
  });
  var zone1rh = zones.map(function(d) {
    return d.zone1RH;
  });
  var zone2t = zones.map(function(d) {
    return d.zone2T;
  });
  var zone2rh = zones.map(function(d) {
    return d.zone2RH;
  });
  var zone3t = zones.map(function(d) {
    return d.zone3T;
  });
  var zone3rh = zones.map(function(d) {
    return d.zone3RH;
  });
  var zone4t = zones.map(function(d) {
    return d.zone4T;
  });
  var zone4rh = zones.map(function(d) {
    return d.zone4RH;
  });
  var timeLabel = zones.map(function(d) {
    return d.Time;
  });

  var timeSelection = document.getElementById('zonePeriod').value;
  var zoneSelection = document.getElementById('zoneSelect').value;
  var timeDiv;

  var newZ1T = [];
  var newZ2T = [];
  var newZ3T = [];
  var newZ4T = [];
  var newZ1RH = [];
  var newZ2RH = [];
  var newZ3RH = [];
  var newZ4RH = [];
  var newTime = [];
  var j = 0;

  var zones = {
    z1: {
      temp: zone1t,
      rh: zone1rh
    },
    z2: {
      temp: zone2t,
      rh: zone2rh
    },
    z3: {
      temp: zone3t,
      rh: zone3rh
    },
    z4: {
      temp: zone4t,
      rh: zone4rh
    }
  };
  switch (timeSelection) {
    case "oneHour":
      timeDiv = 5;
      //grab 23:00 - 24:00
      for (j = 1439 - 59; j < timeLabel.length; j++) {
        newTime.push(timeLabel[j]);
        newZ1T.push(zone1t[j]);
        newZ2T.push(zone2t[j]);
        newZ3T.push(zone3t[j]);
        newZ4T.push(zone4t[j]);
        newZ1RH.push(zone1rh[j]);
        newZ2RH.push(zone2rh[j]);
        newZ3RH.push(zone3rh[j]);
        newZ4RH.push(zone4rh[j]);
      }
      break;
    case "sixHours":
      timeDiv = 15;
      //grab 18:00 - 24:00
      for (j = 1439 - 359; j < timeLabel.length; j++) {
        newTime.push(timeLabel[j]);
        newZ1T.push(zone1t[j]);
        newZ2T.push(zone2t[j]);
        newZ3T.push(zone3t[j]);
        newZ4T.push(zone4t[j]);
        newZ1RH.push(zone1rh[j]);
        newZ2RH.push(zone2rh[j]);
        newZ3RH.push(zone3rh[j]);
        newZ4RH.push(zone4rh[j]);
      }
      break;
    case "twelveHours":
      timeDiv = 30;
      //grab 12:00 - 24:00
      for (j = 1439 - 719; j < timeLabel.length; j++) {
        newTime.push(timeLabel[j]);
        newZ1T.push(zone1t[j]);
        newZ2T.push(zone2t[j]);
        newZ3T.push(zone3t[j]);
        newZ4T.push(zone4t[j]);
        newZ1RH.push(zone1rh[j]);
        newZ2RH.push(zone2rh[j]);
        newZ3RH.push(zone3rh[j]);
        newZ4RH.push(zone4rh[j]);
      }
      break;
    case "oneDay":
      timeDiv = 60;
      newTime = timeLabel;
      newZ1T = zone1t;
      newZ2T = zone2t;
      newZ3T = zone3t;
      newZ4T = zone4t;
      newZ1RH = zone1rh;
      newZ2RH = zone2rh;
      newZ3RH = zone3rh;
      newZ4RH = zone4rh;
      break;
    default:
      timeDiv = 1;
      //console.log("check your time division"); // DEBUG
  }
  //console.log("TIME SELECTED = " + newTime.length + " MINUTES"); // debug
  //grab the data every 60 minutes
  var i;
  var spacedTime = [];
  var spacedZ1T = [];
  var spacedZ2T = [];
  var spacedZ3T = [];
  var spacedZ4T = [];
  var spacedZ1RH = [];
  var spacedZ2RH = [];
  var spacedZ3RH = [];
  var spacedZ4RH = [];
  for (i = 0; i < newTime.length; i++) {
    //if index of timeLabel % 60 == 0, store that index of TimeLabel into new TimeLabel
    if (newTime.indexOf(newTime[i]) % timeDiv == 0) {
      spacedTime.push(newTime[i]);
      spacedZ1T.push(newZ1T[i]);
      spacedZ2T.push(newZ2T[i]);
      spacedZ3T.push(newZ3T[i]);
      spacedZ4T.push(newZ4T[i]);
      spacedZ1RH.push(newZ1RH[i]);
      spacedZ2RH.push(newZ2RH[i]);
      spacedZ3RH.push(newZ3RH[i]);
      spacedZ4RH.push(newZ4RH[i]);
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
          suggestedMin: 68,
          steps: 10,
          stepValue: 1,
          max: 78
        }
      }, {
        id: 'B',
        type: 'linear',
        position: 'right'
      }]
    }
  };

  var dataSelectT = null;
  var dataSelectRH = null;
  var labelSelectT;
  var labelSelectRH;
  //pass zoneSelect
  var zone = zoneSelection;
  console.log("ZONE SELECTION = " + zoneSelection);
  switch (zone) {
    case "zsu1":
      dataSelectT = spacedZ1T;
      dataSelectRH = spacedZ1RH;
      labelSelectT = "ZSU 1 Temperature";
      labelSelectRH = "ZSU 1 RH%";
      break;
    case "zsu2":
      dataSelectT = spacedZ2T;
      dataSelectRH = spacedZ2RH;
      labelSelectT = "ZSU 2 Temperature";
      labelSelectRH = "ZSU 2 RH%";
      break;
    case "zsu3":
      dataSelectT = spacedZ3T;
      dataSelectRH = spacedZ3RH;
      labelSelectT = "ZSU 3 Temperature";
      labelSelectRH = "ZSU 3 RH%";
      break;
    case "zsu4":
      dataSelectT = spacedZ4T;
      dataSelectRH = spacedZ4RH;
      labelSelectT = "ZSU 4 Temperature";
      labelSelectRH = "ZSU 4 RH%";
      break;
    default:
      dataSelectT = 0;
      dataSelectRH = 5;
      labelSelectT = "Check your case structure";
  }
  //pass zonePeriod
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

//let csv_data = 'https://gist.githubusercontent.com/breteldorado/6991ad3cc8f1e1014c386d4166158c70/raw/4b86e23ff7e394e42d6d2b5ddaba75a91f24c636/ZoneData.csv'
let csv_data = 'zoneData.csv';
d3.csv(csv_data)
  .then(makeChart);

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

  d3.csv(csv_data)
    .then(makeChart);
}

document.getElementById("zoneSelect").addEventListener("change", updateChart);
document.getElementById("zonePeriod").addEventListener("change", updateChart);

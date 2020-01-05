//check if setup.csv exists
window.onload = function() {
  $.ajax({
      url:'config.csv',
      type:'GET',
      error: function()
      {
          //file not exists
          firstTime();
      },
      success: function()
      {
          //file exists
          configureMsg();
      }
  });
};
function firstTime(){
    setupDiv = document.getElementById("setupDiv");
}

function onSubmit() {
  var txt = document.getElementsByTagName("p");
  for (var i = 0; i < txt.length; i++) {
    txt[i].style.fontWeight="400";
    txt[i].style.color="black";
  }
  //pull values
  var z1Select = document.getElementById('z1Select').value;
  var z2Select = document.getElementById('z2Select').value;
  var z3Select = document.getElementById('z3Select').value;
  var z4Select = document.getElementById('z4Select').value;

  var d1Op = document.getElementById('d1Operation').value;
  var d2Op = document.getElementById('d2Operation').value;
  var d3Op = document.getElementById('d3Operation').value;
  var d4Op = document.getElementById('d4Operation').value;
  var d5Op = document.getElementById('d5Operation').value;
  var d6Op = document.getElementById('d6Operation').value;
  var d7Op = document.getElementById('d7Operation').value;
  var d8Op = document.getElementById('d8Operation').value;

  var d1Select = document.getElementById('d1Select').value;
  var d2Select = document.getElementById('d2Select').value;
  var d3Select = document.getElementById('d3Select').value;
  var d4Select = document.getElementById('d4Select').value;
  var d5Select = document.getElementById('d5Select').value;
  var d6Select = document.getElementById('d6Select').value;
  var d7Select = document.getElementById('d7Select').value;
  var d8Select = document.getElementById('d8Select').value;

  //add "- 1 " because software developer wanted the values at 0, 1 , 2 (the html is at 1, 2, 3)
  var d1Optional = document.getElementById('d1Optional').value - 1;
  var d2Optional = document.getElementById('d2Optional').value - 1;
  var d3Optional = document.getElementById('d3Optional').value - 1;
  var d4Optional = document.getElementById('d4Optional').value - 1;
  var d5Optional = document.getElementById('d5Optional').value - 1;
  var d6Optional = document.getElementById('d6Optional').value - 1;
  var d7Optional = document.getElementById('d7Optional').value - 1;
  var d8Optional = document.getElementById('d8Optional').value - 1;

  var coolingSystem = document.getElementById('coolingSystem').value;
  var anticipatorC = document.getElementById('anticipatorC').value;
  var coolingRunT = document.getElementById('coolingRunT').value;
  var coolingCycleT = document.getElementById('coolingCycleT').value;

  var heatingSystem = document.getElementById('heatingSystem').value;
  var anticipatorH = document.getElementById('anticipatorH').value;
  var heatingRunT = document.getElementById('heatingRunT').value;
  var heatingCycleT = document.getElementById('heatingCycleT').value;
  var overTemp = document.getElementById('overTemp').value;


  var errorCheck = 0; //1 = error
  var data = {
    zoneSetup: [z1Select, z2Select, z3Select, z4Select],
    damperSetup: [{
        operation: d1Op,
        location: d1Select,
        optional: d1Optional
      },
      {
        operation: d2Op,
        location: d2Select,
        optional: d2Optional
      },
      {
        operation: d3Op,
        location: d3Select,
        optional: d3Optional
      },
      {
        operation: d4Op,
        location: d4Select,
        optional: d4Optional
      },
      {
        operation: d5Op,
        location: d5Select,
        optional: d5Optional
      },
      {
        operation: d6Op,
        location: d6Select,
        optional: d6Optional
      },
      {
        operation: d7Op,
        location: d7Select,
        optional: d7Optional
      },
      {
        operation: d8Op,
        location: d8Select,
        optional: d8Optional
      }
    ],
    cooling: [coolingSystem,
      anticipatorC,
      coolingRunT,
      coolingCycleT
    ],
    heating: [heatingSystem,
      anticipatorH,
      heatingRunT,
      heatingCycleT,
      overTemp
    ]
  };
  //if any default, display an error
  //zonesetup.z1,z2,z3,z4 == "default"

  for (var i = 0; i < data.zoneSetup.length; i++) {
    if (data.zoneSetup[i] == "default") {
      onError(data, i+1);
      errorCheck = 1;
    }
  }
  //damperSetup[d1-d8].operation == "default"
  for (i = 0; i < data.damperSetup.length; i++) {
    if (data.damperSetup[i].operation == "default") {
      onError(data, i+5);
      errorCheck = 1;
    } else if ((data.damperSetup[i].location == "default") && (data.damperSetup[i].operation != "disabled")) {
      onError(data, i+5);
      errorCheck = 1;
    } else if ((data.damperSetup[i].optional == "default") && (data.damperSetup[i].operation != "disabled")) {
      onError(data, i+5);
      errorCheck = 1;
    }
  }
  //cooling.system, anticipator, runT, CycleT == "default"
  for (i = 0; i < data.cooling.length; i++) {
    if (data.cooling[i] == "default") {
      onError(data, i + 13);
      errorCheck = 1;
    }
  }
  //heating.system, anticipator, runT, CycleT == "default"
  for (i = 0; i < data.heating.length; i++) {
    if (data.heating[i] == "default") {
      onError(data, i + 17);
      errorCheck = 1;
    }
  }
  // if no default values exist, write the file
  if (errorCheck == 0) {
    writeMyFile(data);
  }
}


function writeMyFile(data) {
  let header = ["Param", "Config \n"];
  var parameter = ["z1,", "z2,", "z3,", "z4,", "d1Oper,", "d2Oper,",
    "d3Oper,", "d4Oper,", "d5Oper,", "d6Oper,", "d7Oper,",
    "d8Oper,", "d1Z,", "d2Z,", "d3Z,", "d4Z,", "d5Z,", "d6Z,", "d7Z,", "d8Z,",
    "d1Opt,", "d2Opt,", "d3Opt,", "d4Opt,", "d5Opt,", "d6Opt,",
    "d7Opt,", "d8Opt,", "cSys,", "cAnt,", "cRunT,", "cCycleT,", "hSys,",
    "hAnt,", "hRunT,", "hCycleT,", "overTemp,"];

  var config = []
  var i;
  //zones
  for (i = 0; i < data.zoneSetup.length; i++) {
    config.push(data.zoneSetup[i] + "\n");
  }
  //dampers
  //operation
  for (i = 0; i < data.damperSetup.length; i++) {
    config.push(data.damperSetup[i].operation + "\n");
  }
  //location
  for (i = 0; i < data.damperSetup.length; i++) {
    config.push(data.damperSetup[i].location + "\n");
  }
  //optional
  for (i = 0; i < data.damperSetup.length; i++) {
    config.push(data.damperSetup[i].optional + "\n");
  }
  //cooling
  for (i = 0; i < data.cooling.length; i++) {
    config.push(data.cooling[i] + "\n");
  }
  //heating
  for (i = 0; i < data.heating.length; i++) {
    config.push(data.heating[i] + "\n");
  }
  //combine all data into array, then consolidate in string
  var dataArray = [header];
  for (var i = 0; i < parameter.length; i++) {
    dataArray.push(parameter[i]);
    dataArray.push(config[i]);
  }
  var dataString = dataArray.join("");
  //write data string to file
  //$.post( "setup.php", { dataString } ); <--- this requires jQuery
  var url = "setup.php";
  var xhr = new XMLHttpRequest(); 
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
      // if (xhr.status === 200 && xhr.responseText !== dataString) {
      //     alert('Something went wrong. dataString is now ' + xhr.responseText);
      // }
      if (xhr.status !== 200) {
          alert('Request failed.  Returned status of ' + xhr.status);
          writeFailure();
      }
      else {
        configureMsg();
      }
  };
  xhr.send(encodeURI('dataString=' + dataString));
  // please wait (on Load)
  //onLoad();
  // setTimeout(function(){
  //     getFile();
  //   }, 3000)
}
function getFile() {
  $.ajax({
    url: "config.csv",
    type:'GET',
    error: function(){
      //file not exists
      //try again
      writeFailure();
    },
    success: function(){
      //file exists
      configureMsg();
    }
  });
}
function writeFailure(){
  var element = document.getElementById("attempt-container");
  element.style.display = "flex";
}
function configureMsg(){
  //remove setup-container
  setupDiv = document.getElementById("setupDiv");
  setupDiv.style.display = "none";
  //show success msg
  msgConfirm = document.getElementById('msgConfirm');
  msgConfirm.innerHTML = "Smart HVAC System Configured!";
  msgConfirm.style.display ="flex";
  msgConfirm.style.justifyContent ="center";
}
function onLoad(){
  setupDiv = document.getElementById("setupDiv");
  setupDiv.style.display = "none";
  msgConfirm = document.getElementById('msgConfirm');
  msgConfirm.innerHTML = "Please Wait.. (5 seconds)";
  msgConfirm.style.display ="flex";
  msgConfirm.style.justifyContent ="center";

}
function onError(data, errCode) {
  var zone1 = document.getElementById("zone1");
  var zone1 = document.getElementById("zone1");
  var zone1 = document.getElementById("zone1");
  var zone1 = document.getElementById("zone1");

  var damper1 = document.getElementById("damper1");
  var damper2 = document.getElementById("damper2");
  var damper3 = document.getElementById("damper3");
  var damper4 = document.getElementById("damper4");
  var damper5 = document.getElementById("damper5");
  var damper6 = document.getElementById("damper6");
  var damper7 = document.getElementById("damper7");
  var damper8 = document.getElementById("damper8");

  var coolingSystemTXT = document.getElementById('coolingSystemTXT');
  var anticipatorCTXT = document.getElementById('anticipatorCTXT');
  var coolingRunTTXT = document.getElementById('coolingRunTTXT');
  var coolingCycleTTXT = document.getElementById('coolingCycleTTXT');

  var heatingSystemTXT = document.getElementById('heatingSystemTXT');
  var anticipatorHTXT = document.getElementById('anticipatorHTXT');
  var heatingRunTTXT = document.getElementById('heatingRunTTXT');
  var heatingCycleTTXT = document.getElementById('heatingCycleTTXT');
  var overTempTXT = document.getElementById('overTempTXT');
  //just change css font color values to red that are on default?
  console.log("Error Code = " + errCode);
  // errCode = 0; // 1-4 = zones
  // 5-12 = dampers
  // 13-16 = cooling section
  // 17 - 21 = heating section
  switch (errCode) {
    case 1: //zones
      zone1.style.color = "red"
      zone1.style.fontWeight = "900";
      break;
    case 2:
      zone2.style.color = "red"
      zone2.style.fontWeight = "900";
      break;
    case 3:
      zone3.style.color = "red"
      zone3.style.fontWeight = "900";
      break;
    case 4:
      zone4.style.color = "red"
      zone4.style.fontWeight = "900";
      break;
    case 5:
      damper1.style.color = "red"
      damper1.style.fontWeight = "900";
      break;
    case 6:
      damper2.style.color = "red"
      damper2.style.fontWeight = "900";
      break;
    case 7:
      damper3.style.color = "red"
      damper3.style.fontWeight = "900";
      break;
    case 8:
      damper4.style.color = "red"
      damper4.style.fontWeight = "900";
      break;
    case 9:
      damper5.style.color = "red"
      damper5.style.fontWeight = "900";
      break;
    case 10:
      damper6.style.color = "red"
      damper6.style.fontWeight = "900";
      break;
    case 11:
      damper7.style.color = "red"
      damper7.style.fontWeight = "900";
      break;
    case 12:
      damper8.style.color = "red"
      damper8.style.fontWeight = "900";
      break;
    case 13: //cooling
      coolingSystemTXT.style.color = "red";
      coolingSystemTXT.style.fontWeight = "900";
      break;
    case 14: //cooling
      anticipatorCTXT.style.color = "red";
      anticipatorCTXT.style.fontWeight = "900";
      break;
    case 15: //cooling
      coolingRunTTXT.style.color = "red";
      coolingRunTTXT.style.fontWeight = "900";
      break;
    case 16: //cooling
      coolingCycleTTXT.style.color = "red";
      coolingCycleTTXT.style.fontWeight = "900";
      break;
    case 17: //heating
      heatingSystemTXT.style.color = "red";
      heatingSystemTXT.style.fontWeight = "900";
      break;
    case 18: //heating
      anticipatorHTXT.style.color = "red";
      anticipatorHTXT.style.fontWeight = "900";
      break;
    case 19: //heating
      heatingRunTTXT.style.color = "red";
      heatingRunTTXT.style.fontWeight = "900";
      break;
    case 20: //heating
      heatingCycleTTXT.style.color = "red";
      heatingCycleTTXT.style.fontWeight = "900";
      break;
    case 21: //heating
      overTempTXT.style.color = "red";
      overTempTXT.style.fontWeight = "900";
      break;

  }
}

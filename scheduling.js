//on window load, check if setup.csv exists
//if setup.csv exists
//prompt schedule selection
//see if schedule selection exists. if not, run app
//check if dampers exist
//check if zones exist

//if it doesn't show feedback
var counter = 1;
var day = [],
  zone = [],
  sTime = [],
  eTime = [],
  loPoint = [],
  hiPoint = [];

function onApply() {
  var errorCheck = 0;
  var table = document.getElementById("myTable");
  var schedule = $.trim(document.getElementById("selectSch").value);
  var curDay = $('#selectDay_00').val();
  var curZone = $('#selectZ_00').val();
  curDay = curDay.join(' ');
  curZone = curZone.join(' ');
  var curSTime = $.trim(document.getElementById("startTime_00").value);
  var curETime = $.trim(document.getElementById("endTime_00").value);
  var curLoPoint = $.trim(document.getElementById("loSet_00").value);
  var curHiPoint = $.trim(document.getElementById("hiSet_00").value);
  var currentData = {
    day: curDay,
    zone: curZone,
    startTime: $.trim(curSTime),
    endTime: $.trim(curETime),
    loPoint: curLoPoint,
    hiPoint: curHiPoint
  };
  if (currentData.startTime != "default" || //quick error check
    currentData.endTime != "default" ||
    currentData.loPoint != "default" ||
    currentData.hiPoint != "default") {
    var ruleNums = {
      zone: {
        z1: [],
        z2: [],
        z3: [],
        z4: []
      },
      day: {
        mon: [],
        tues: [],
        wed: [],
        thurs: [],
        fri: [],
        sat: [],
        sun: []
      }
    };
    //parse currentdata coming in
    var curz1Str = $.trim(currentData.zone.match("Z1"));
    var curz2Str = $.trim(currentData.zone.match("Z2"));
    var curz3Str = $.trim(currentData.zone.match("Z3"));
    var curz4Str = $.trim(currentData.zone.match("Z4"));
    var curmStr = $.trim(currentData.day.match("M"));
    var curtStr = $.trim(currentData.day.match("T"));
    var curwStr = $.trim(currentData.day.match("W"));
    var curthStr = $.trim(currentData.day.match("TH"));
    var curfStr = $.trim(currentData.day.match("F"));
    var cursatStr = $.trim(currentData.day.match("Sat"));
    var cursunStr = $.trim(currentData.day.match("Sun"));
    // This is the error checking section of the code. Parses through strings of data
    // to check if day and time are conflicting.
    // As a side note: this is extremely inefficient section of code and this will see improvement in the future.
    // For future works, this web page could improve with the use of react.
    for (var i = 0; i < window.zone.length; i++) {
      var ruleNum = i + 1;
      var case1 = (currentData.startTime > window.sTime[i]) && (currentData.startTime < window.eTime[i]);
      var case2 = (currentData.endTime > window.sTime[i]) && (currentData.endTime < window.eTime[i]);
      var case3 = (currentData.startTime > window.sTime[i]) && (currentData.endTime < window.eTime[i]);
      var case4 = (currentData.startTime < window.sTime[i]) && (currentData.endTime > window.eTime[i]);
      var timeCase = case1 || case2 || case3 || case4;
      var z1Str = $.trim(window.zone[i].match("Z1"));
      var z2Str = $.trim(window.zone[i].match("Z2"));
      var z3Str = $.trim(window.zone[i].match("Z3"));
      var z4Str = $.trim(window.zone[i].match("Z4"));
      var mStr = $.trim(window.day[i].match("M"));
      var tStr = $.trim(window.day[i].match("T"));
      var wStr = $.trim(window.day[i].match("W"));
      var thStr = $.trim(window.day[i].match("TH"));
      var fStr = $.trim(window.day[i].match("F"));
      var satStr = $.trim(window.day[i].match("Sat"));
      var sunStr = $.trim(window.day[i].match("Sun"));
      if (curz1Str == z1Str) {
        //check days
        if (curmStr == mStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curtStr == tStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curwStr == wStr && timeCase == true) {
            errorCheck = 1;
        }
        if (curthStr == thStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curfStr == fStr && timeCase == true) {
              errorCheck = 1;
        }
        if (cursatStr == satStr && timeCase == true) {
              errorCheck = 1;
        }
        if (cursunStr == sunStr && timeCase == true) {
              errorCheck = 1;
        }
      }
      if (curz2Str == z2Str) {
        //check days
        if (curmStr == mStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curtStr == tStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curwStr == wStr && timeCase == true) {
            errorCheck = 1;
        }
        if (curthStr == thStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curfStr == fStr && timeCase == true) {
              errorCheck = 1;
        }
        if (cursatStr == satStr && timeCase == true) {
              errorCheck = 1;
        }
        if (cursunStr == sunStr && timeCase == true) {
              errorCheck = 1;
        }
      }
      if (curz3Str == z3Str) {
        //check days
        if (curmStr == mStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curtStr == tStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curwStr == wStr && timeCase == true) {
            errorCheck = 1;
        }
        if (curthStr == thStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curfStr == fStr && timeCase == true) {
              errorCheck = 1;
        }
        if (cursatStr == satStr && timeCase == true) {
              errorCheck = 1;
        }
        if (cursunStr == sunStr && timeCase == true) {
              errorCheck = 1;
        }
      }
      if (curz4Str == z4Str) {
        //check days
        if (curmStr == mStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curtStr == tStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curwStr == wStr && timeCase == true) {
            errorCheck = 1;
        }
        if (curthStr == thStr && timeCase == true) {
              errorCheck = 1;
        }
        if (curfStr == fStr && timeCase == true) {
              errorCheck = 1;
        }
        if (cursatStr == satStr && timeCase == true) {
              errorCheck = 1;
        }
        if (cursunStr == sunStr && timeCase == true) {
              errorCheck = 1;
        }
      }
    }
    if (errorCheck == 0) {
      window.day.push(currentData.day);
      window.zone.push(currentData.zone);
      window.sTime.push(currentData.startTime);
      window.eTime.push(currentData.endTime);
      window.loPoint.push(currentData.loPoint);
      window.hiPoint.push(currentData.hiPoint + "\n");
      //Display data to the table
      //add rows to table
      var row = table.insertRow(counter);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      //add text to table
      cell1.innerHTML = currentData.day;
      cell2.innerHTML = currentData.zone;
      cell3.innerHTML = currentData.startTime;
      cell4.innerHTML = currentData.endTime;
      cell5.innerHTML = currentData.loPoint;
      cell6.innerHTML = currentData.hiPoint;
      window.counter++;
      //display default values in inputs
      document.getElementById("startTime_00").value = "default";
      document.getElementById("endTime_00").value = "default";
      document.getElementById("loSet_00").value = "default";
      document.getElementById("hiSet_00").value = "default";
      $('#selectDay_00').multiselect("deselectAll", false).multiselect("refresh");
      $('#selectZ_00').multiselect("deselectAll", false).multiselect("refresh");
      //if submit opacity is 0 and window.counter > 0
      var subElement = document.getElementById("submit-container");
      if (subElement.style.opacity == "0" && window.counter > 0) {
        subElement.style.opacity = "1";
      }
      else {}
    } else {
      //display error
      onError();
    }

  }
}
function onSubmit() {

}
function onError() {
  //display error
  var errorEl = document.getElementById("error-container");
  errorEl.style.animation = "fadein .5s";
  errorEl.style.display = "flex";
  errorEl.style.background = "red";
  setTimeout(function() {
    errorEl.style.display = "none";
  }, 3000);

}

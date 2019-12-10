var counter = 1;
var day = [],
zone = [],
sTime = [],
eTime = [],
loPoint = [],
hiPoint = [];
//on window load, check if setup.csv exists
//if setup.csv exists
function schSelection() {
  var schedule = $.trim(document.getElementById("selectSch").value);
  var url = "";
  switch (schedule) {
    case "SummerSch":
      url = "SummerSch.csv";
      break;
    case "WinterSch":
      url = "WinterSch.csv";
      break;
    case "VacSch":
      url = "VacSch.csv";
      break;
  }
  $.ajax({
    type: "GET",
    url: url,
    dataType: "text",
    success: function(response)
    {
      data = $.csv.toArrays(response);
      displayTable(data);
    }
  });
  function displayTable(data) {
    var html = "";
    var row = 0;
    $.each(data, function( index, row ) {
    if(index != 0)
    {
      console.log(row);
      html += '<tr>';
      i = 0;
			$.each(row, function( index, colData ) {
				html += '<td>';
				html += colData;
        console.log(i + "=" + colData);
        console.log("index = " + index);
				html += '</td>';
        i++
			});
      html += '<input id="delete" type="button" value="Delete Rule" onclick="deleteRule(this)">';
			html += '</tr>';
      row++;
		  }
  });
  html += '</table>';
  $('#myTable').append(html);
  }

}
//prompt schedule selection
//see if schedule selection exists. if not, run app
//check if dampers exist
//check if zones exist

//if it doesn't show feedback
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
    //parse currentdata coming in
    var curz1Str = $.trim(currentData.zone.match("Z1"));
    var curz2Str = $.trim(currentData.zone.match("Z2"));
    var curz3Str = $.trim(currentData.zone.match("Z3"));
    var curz4Str = $.trim(currentData.zone.match("Z4"));
    var curmStr = $.trim(currentData.day.match("M"));
    var curtStr = $.trim(currentData.day.match("T"));
    var curwStr = $.trim(currentData.day.match("W"));
    var curthStr = $.trim(currentData.day.match("TR"));
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
      if (curz1Str == z1Str && curz1Str != "") {
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
      if (curz2Str == z2Str && curz2Str != "") {
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
      if (curz3Str == z3Str && curz3Str != "") {
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
      if (curz4Str == z4Str && curz4Str != "") {
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
      //day number
      var dayNum = 0;
      if (cursunStr == "Sun"){dayNum += 64;}
      if (curmStr == "M") {dayNum += 32;}
      if (curtStr == "T") {dayNum += 16;}
      if (curwStr == "W") {dayNum += 8;}
      if (curthStr == "TR"){dayNum += 4;}
      if (curfStr == "F") {dayNum += 2;}
      if (cursatStr == "Sat"){dayNum += 1;}
      var zNum = 0;
      if (curz1Str == "Z1") {zNum += 8;}
      if (curz2Str == "Z2") {zNum += 4;}
      if (curz3Str == "Z3") {zNum += 2;}
      if (curz4Str == "Z4") {zNum += 1;}

      // window.day.push(currentData.day +",");
      // window.zone.push(currentData.zone + ",");
      window.day.push(dayNum +",");
      window.zone.push(zNum + ",");
      window.sTime.push(currentData.startTime + ",");
      window.eTime.push(currentData.endTime + ",");
      window.loPoint.push(currentData.loPoint + ",");
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
      var cell7 = row.insertCell(6);
      //add text to table
      cell1.innerHTML = currentData.day;
      cell2.innerHTML = currentData.zone;
      cell3.innerHTML = currentData.startTime;
      cell4.innerHTML = currentData.endTime;
      cell5.innerHTML = currentData.loPoint;
      cell6.innerHTML = currentData.hiPoint;
      cell7.innerHTML = '<input id="delete" type="button" value="Delete Rule" onclick="deleteRule(this)">';
      window.counter++;
      //display default values in inputs
      document.getElementById("startTime_00").value = "default";
      document.getElementById("endTime_00").value = "default";
      document.getElementById("loSet_00").value = "default";
      document.getElementById("hiSet_00").value = "default";
      $('#selectDay_00').multiselect("deselectAll", false).multiselect("refresh");
      $('#selectZ_00').multiselect("deselectAll", false).multiselect("refresh");
      //if submit opacity is 0 and window.counter > 0 <--- FIX THIS
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
function deleteRule(element){
  var rule = (element.parentNode.parentNode.rowIndex - 1);
  window.zone.splice(rule, 1);
  window.day.splice(rule, 1);
  window.sTime.splice(rule, 1);
  window.eTime.splice(rule, 1);
  window.loPoint.splice(rule, 1);
  window.hiPoint.splice(rule, 1);
  $('input[id="delete"]').click(function(e){
     $(element).closest('tr').remove()
  })
//splice window rules at counter to remove rules
  window.counter--;
}
function onSubmit() {
  console.log("entering onSubmit()");
  var selectSch = document.getElementById("selectSch").value;
  var element = document.getElementById("all-container");
  var summerSch, winterSch, vacSch;
  var header = "days,zones,sTime,eTime,loPoint,hiPoint\n";
  var scheduleArray =[header];
  for (var i = 0; i < window.zone.length; i++) {
    scheduleArray.push(window.day[i]);
    scheduleArray.push(window.zone[i]);
    scheduleArray.push(window.sTime[i]);
    scheduleArray.push(window.eTime[i]);
    scheduleArray.push(window.loPoint[i]);
    scheduleArray.push(window.hiPoint[i]);
  }
  switch (selectSch) {
    case "SummerSch":
      summerSch = scheduleArray.join("");
      $.post( "scheduling.php", { summerSch } );
      break;
    case "WinterSch":
      winterSch = scheduleArray.join("");
      $.post( "scheduling.html", { winterSch } );
      break;
    case "VacSch":
      vacSch = scheduleArray.join("");
      $.post( "scheduling.html", { vacSch } );
      break;
  }
  onLoad();

}
function onLoad() {
  console.log("entering onLoad()");
  var attemptContainer = document.getElementById("attempt-container");
  if (attemptContainer.style.display != "none") {
    attemptContainer.style.display = "none";
  }
  var state1 = "Loading.";
  var state2 = "Loading..";
  var state3 = "Loading...";
  var states = [state1, state2, state3];
  var url;
  loadDiv = document.getElementById("loadCont");
  loadText = document.getElementById("loadText");
  allDiv = document.getElementById("all-container");
  allDiv.style.display = "none";
  //please wait (8 seconds)
  loadDiv.style.display = "flex";
  loadText.innerHTML = "please wait";
  // setTimeout(function(){
  //   loadText.innerHTML = "checking.."
  // }, 8000)
  var selectSch = document.getElementById("selectSch").value;
  switch (selectSch){
    case "SummerSch":
      url = "SummerSch.csv";
      break;
    case "WinterSch":
      url = "WinterSch.csv";
      break;
    case "VacSch":
      url = "VacationSch.csv";
      break;
  }
  $.ajax({
      url: url,
      type:'GET',
      error: function(){
          //file not exists
          writeFailure();
      },
      success: function(){
          //file exists
          writeSuccess();
      }
  });
}
function writeSuccess(){
  console.log("entering writeSuccess()...");
  var selectSch = document.getElementById("selectSch").value;
  setupDiv = document.getElementById("all-container");
  setupDiv.style.display = "none";
  //show success msg
  wSuc = document.getElementById("loadText");
  switch (selectSch)
  {
    case "SummerSch":
      wSuc.innerHTML = "Success! Summer Schedule is saved";
      break;
    case "WinterSch":
      wSuc.innerHTML = "Success! Winter Schedule is configured";
      break;
    case "VacSch":
      wSuc.innerHTML = "Success! Vacation Schedule is configured";
      break;
  }
  wSuc.style.display ="flex";
  wSuc.style.justifyContent ="center";

}
function writeFailure(){
  console.log("entering writeFailure()");
  var element = document.getElementById("attempt-container");
  element.style.display = "flex";
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
function createBinaryString (nMask) {
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  return sMask;
}
var selectsch = document.getElementById("selectSch").addEventListener("change", schSelection);

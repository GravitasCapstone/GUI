//on window load, check if setup.csv exists
  //if setup.csv exists
  //prompt schedule selection
    //see if schedule selection exists. if not, run app
      //check if dampers exist
    //check if zones exist

  //if it doesn't show feedback
var counter = 1;
var day=[],zone=[],sTime=[],eTime=[],loPoint=[],hiPoint = [];
function onApply(){
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
    var currentData =
    {
        day: curDay,
        zone: curZone,
        startTime: curSTime,
        endTime: curETime,
        loPoint: curLoPoint,
        hiPoint: curHiPoint
    };
    console.log("start time = " + currentData.startTime);
    console.log("end time = " + currentData.endTime);
    console.log(currentData.startTime > currentData.endTime);
    if (currentData.startTime != "default" || //quick error check
      currentData.endTime != "default" ||
      currentData.loPoint != "default" ||
      currentData.hiPoint != "default") {
        var ruleNums = {
          zone: { z1: [], z2: [], z3: [], z4: [] },
          day: { mon: [], tues: [], wed: [], thurs: [], fri: [], sat: [], sun: [] }
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

        for (var i = 0; i < window.zone.length; i++) {
          var ruleNum = i + 1;
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
          if (curz1Str != "") {
            if (curz1Str == z1Str){
              //check days
              if (curmStr != ""){
                if (curmStr == mStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (M), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curtStr != ""){
                if (curtStr == tStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (T), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curwStr != ""){
                if (curwStr == wStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (W), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curthStr != ""){
                if (curthStr == thStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (TH), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curfStr != ""){
                if (curfStr == fStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (FRI), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (cursatStr != ""){
                if (cursatStr == satStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (SAT), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                  (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (cursunStr != "") {
                if (cursunStr == sunStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (SUN), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                  (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
            }
          }
          if (curz2Str != "") {
            if (curz2Str == z2Str)
            {
              //check days
              if (curmStr != ""){
                if (curmStr == mStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (M), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i])) {
                        console.log("I should not post this new rule");
                  }
                }
              }
              if (curtStr != ""){
                if (curtStr == tStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (T), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curwStr != ""){
                if (curwStr == wStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (W), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curthStr != ""){
                if (curthStr == thStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (TH), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curfStr != ""){
                if (curfStr == fStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (F), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (cursatStr != ""){
                if (cursatStr == satStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (SAT), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (cursunStr != "") {
                if (cursunStr == sunStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (SUN), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
            }
          }
          if (curz3Str != ""){
            if (curz3Str == z3Str)
            {
              //check days
              if (curmStr != ""){
                if (curmStr == mStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (M), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curtStr != ""){
                if (curtStr == tStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (T), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curwStr != ""){
                if (curwStr == wStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (W), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curthStr != ""){
                if (curthStr == thStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (TH), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curfStr != ""){
                if (curfStr == fStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (FRI), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (cursatStr != ""){
                if (cursatStr == satStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (SAT), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (cursunStr != "") {
                if (cursunStr == sunStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (SUN), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
            }
          }
          if (curz4Str != ""){
            if (curz4Str == z4Str)
            {
              //check days
              if (curmStr != ""){
                if (curmStr == mStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (M), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curtStr != ""){
                if (curtStr == tStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (T), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curwStr != ""){
                if (curwStr == wStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (W), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curthStr != ""){
                if (curthStr == thStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (TH), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (curfStr != ""){
                if (curfStr == fStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (F), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (cursatStr != ""){
                if (cursatStr == satStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (SAT), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
              if (cursunStr != "") {
                if (cursunStr == sunStr){
                  console.log("because rule " + ruleNum + " and " + window.counter + " have the same days (SUN), check time");
                  if ((currentData.startTime > window.sTime[i] && currentData.startTime < window.eTime[i]) ||
                      (currentData.endTime > window.sTime[i] && currentData.endTime < window.eTime[i]) ||
                      (currentData.startTime > window.sTime[i] && currentData.endTime < window.eTime[i]))
                  {
                    console.log("I should not post this new rule");
                  }
                }
              }
            }
          }
        }
        window.day.push(currentData.day);
        window.zone.push(currentData.zone);
        window.sTime.push(currentData.sTime);
        window.eTime.push(currentData.eTime);
        window.loPoint.push(currentData.loPoint);
        window.hiPoint.push(currentData.hiPoint + "\n");
        //displayData
        var row = table.insertRow(counter);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

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
    }
    else {
      //display error
    }

    //DEBUGGING
      // console.log("counter = " + window.counter);
      // console.log(window.zone);
}
function storeData(currentData) {

  console.log("current data coming in: " + currentData);


}
function displayData(data) {
var row = table.insertRow(i);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4);
var cell6 = row.insertCell(5);

cell1.innerHTML = data.day;
cell2.innerHTML = data.zone;
cell3.innerHTML = data.startTime;
cell4.innerHTML = data.endTime;
cell5.innerHTML = data.loPoint;
cell6.innerHTML = data.hiPoint;

}
function z1Flags(ruleNums) {
  var rulesToFlag = [];
  var conCounter = 0; //conflict counter
  for (var i = 0; i < ruleNums.zone.z1.length; i++) {
    let ruleNum = i + 1;
    for (var j = 0; j < ruleNums.day.mon.length; j++) {
      if(ruleNums.zone.z1[i] == ruleNums.day.mon[j])
      {
        conCounter++;
        if (conCounter > 1) { rulesToFlag.push(ruleNum);}
      }
    }
    conCounter = 0;
    for (var j = 0; j < ruleNums.day.tues.length; j++) {
      if(ruleNums.zone.z1[i] == ruleNums.day.tues[j])
      {
        conCounter++;
        if (conCounter > 1) { rulesToFlag.push(ruleNum);}
      }
    }
    conCounter = 0;
    for (var j = 0; j < ruleNums.day.wed.length; j++) {
      if(ruleNums.zone.z1[i] == ruleNums.day.wed[j])
      {
        conCounter++;
        if (conCounter > 1) { rulesToFlag.push(ruleNum);}
      }
    }
    conCounter = 0;
    for (var j = 0; j < ruleNums.day.thurs.length; j++) {
      if(ruleNums.zone.z1[i] == ruleNums.day.thurs[j])
      {
        conCounter++;
        if (conCounter > 1) { rulesToFlag.push(ruleNum);}
      }
    }
    conCounter = 0;
    for (var j = 0; j < ruleNums.day.fri.length; j++) {
      if(ruleNums.zone.z1[i] == ruleNums.day.fri[j])
      {
        conCounter++;
        if (conCounter > 1) { rulesToFlag.push(ruleNum);}
      }
    }
    conCounter = 0;
    for (var j = 0; j < ruleNums.day.sat.length; j++) {
      if(ruleNums.zone.z1[i] == ruleNums.day.sat[j])
      {
        conCounter++;
        if (conCounter > 1) { rulesToFlag.push(ruleNum);}
      }
    }
    conCounter = 0;
    for (var j = 0; j < ruleNums.day.sun.length; j++) {
      if(ruleNums.zone.z1[i] == ruleNums.day.sat[j])
      {
        conCounter++;
        if (conCounter > 1) { rulesToFlag.push(i+1);}
      }
    }
  }
  return rulesToFlag;

}

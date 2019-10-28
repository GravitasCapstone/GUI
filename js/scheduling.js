var counter = 1;
var day=[],zone=[],sTime=[],eTime=[],loPoint=[],hiPoint = [];
function onApply(){
    var table = document.getElementById("myTable");
    console.log(window.day);
    console.log(window.hiPoint);

    var schedule = document.getElementById("selectSch").value;
    var curDay = $('#selectDay_00').val();
    var curZone = $('#selectZ_00').val();
    if (curDay.length > 1){
      curDay = curDay.join(' ');
    }
    if (curDay.length > 1){
      curZone = curZone.join(' ');
    }
    var curSTime = document.getElementById("startTime_00").value;
    var curETime = document.getElementById("endTime_00").value;
    var curLoPoint = document.getElementById("loSet_00").value;
    var curHiPoint = document.getElementById("hiSet_00").value;
    var currentData =
    {
        day: curDay,
        zone: curZone,
        startTime: curSTime,
        endTime: curETime,
        loPoint: curLoPoint,
        hiPoint: curHiPoint
    };
    console.log(currentData);
    //pass current values to on-going data
    window.day.push(currentData.day);
    window.zone.push(currentData.zone);
    window.sTime.push(currentData.sTime);
    window.eTime.push(currentData.eTime);
    window.loPoint.push(currentData.loPoint);
    window.hiPoint.push(currentData.hiPoint + "\n");
    //displayData(currentData);
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
    //DEBUGGING
    console.log("counter = " + window.counter);
    console.log(window.zone);
    //display default values in inputs

    //show feedback that data has been received

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
function saveData(schedule, data) {

}

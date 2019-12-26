var data;
var myData;
window.onload = function() {
  $.ajax({
    type: "GET",
    url: "recentData.csv",
    dataType: "text",
    success: function(response)
    {
      data = $.csv.toArrays(response);
      generateHtmlTable(data);
    }
  });
  $.ajax({
    type: "GET",
    url: "config.csv",
    dataType: "text",
    success: function(response)
    {
      data = $.csv.toArrays(response);
      generateDamperTable(data);

    }
  });
  $.ajax({
    type: "GET",
    url: "ahuData.csv",
    dataType: "text",
    success: function(response)
    {
      data = $.csv.toArrays(response);
      generateAhuTable(data);
    }
  });
  $.ajax({
    type: "GET",
    url: "hvacstatus.json",
    dataType: "json",
    success: function(response)
    {
      console.log(response);
      generateHVACTable(response);
    }
  });
}
function generateHtmlTable(data) {
    var html = '<table  class="table table-condensed table-hover table-striped">';

      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
		$.each(data, function( index, row ) {
		  //bind header
		  if(index == 0) {
			html += '<thead>';
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<th>';
				html += colData;
				html += '</th>';
			});
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
		  } else {
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<td>';
				html += colData;
				html += '</td>';
			});
			html += '</tr>';
		  }
		});
		html += '</tbody>';
		html += '</table>';
		$('#StatusGlance').append(html);
	  }
	}
function generateDamperTable(data) {
  var table = document.getElementById("damperStatus");
  //location
   //rows 14-21
   var j = 1;
   for (var i = 13; i < 21; i++) {
     if(data[i][1] == "0") {
       table.rows[1].cells.item(j).innerHTML = "disabled";
     }
     table.rows[1].cells.item(j).innerHTML = "Zone " + data[i][1];
     j++;
   }
  //Operation
    //rows 6-13
  j = 1;
  var text;
  for (var i = 5; i < 13; i++) {
    switch(data[i][1])
    {
      case "0":
        text = "X"
        break;
      case "1":
        text = "Normally Open"
        break;
      case "2":
        text = "Normally Closed"
        break;
    }
    table.rows[2].cells.item(j).innerHTML = text;
    j++;
  }
  //Optional
    //rows 22-29
    j = 1;
    for (var i = 21; i < 29; i++) {
      switch(data[i][1])
      {
        case "0":
          text = " "
          break;
        case "1":
          text = "No Heat "
          break;
        case "2":
          text = "No Cool"
          break;
      }
      table.rows[3].cells.item(j).innerHTML = text;
      j++;
    }
}
function generateAhuTable(data) {
    var html = '<table  class="table table-condensed table-hover table-striped">';

      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
		$.each(data, function( index, row ) {
		  //bind header
		  if(index == 0) {
			html += '<thead>';
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<th>';
				html += colData;
				html += '</th>';
			});
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
		  } else {
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<td>';
				html += colData;
				html += '</td>';
			});
			html += '</tr>';
		  }
		});
		html += '</tbody>';
		html += '</table>';
		$('#ahuStatus').append(html);
	  }
	}
  function generateHVACTable(data) {
    var table = document.getElementById("FanStatus");

    table.rows[0].cells.item(1).innerHTML = data.fanstatus;
    table.rows[0].cells.item(2).innerHTML = data.hvacstatus;

  }

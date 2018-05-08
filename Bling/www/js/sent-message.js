function insertSentMsgData(res) {
    //Inserting parsed json values into localDB
    for (i = 0; i < res.length; i++) {
      var query = "INSERT INTO msg_data VALUES (?,?,?,?,?,?,?)";
      db.executeSql(query, [res[i].msg_id, res[i].date, res[i].time, res[i].department, res[i].year, res[i].subject, res[i].message], function (result) {
      },
        function (error) {
          myApp.alert('INSERT error(server data to localDB): ' + error.message);
        }
      );
    }
  }

function getNDisplaySentMsgData() {
    //Getting data to display in received msgs list
    var query = "SELECT * FROM msg_data ORDER BY msg_id DESC";
    var msg_html = "";
    db.executeSql(query, [], function (resultSet) {
      for (var x = 0; x < resultSet.rows.length; x++) {
  
        //Setting varibles to be concatenated into dynamic html string below
        var msg_id = resultSet.rows.item(x).msg_id;
        var dept_year = resultSet.rows.item(x).department + "  (" + resultSet.rows.item(x).year + ")";
        var msg_date = resultSet.rows.item(x).date;
        var msg_time = resultSet.rows.item(x).time;
        var msg_subject = resultSet.rows.item(x).subject;
        var message_content = resultSet.rows.item(x).message;
  
        if (message_content.length > 50) {
          var message_content_short = message_content.substring(0, 49) + "...";
        }
        else {
          var message_content_short = message_content;
        }
  
        //Dynamic html for list of msgs
          msg_html =
          '<li id="' + msg_id + '" class="msg">'+
            '<div class="card">'+
                '<div class="card-header item-title">'+msg_subject+
                '</div>'+
                '<div class="card-content">'+
                  '<div class="card-content-inner">'+
                    '<p class="sender color-gray">Posted to ' + dept_year +'</p>'+
                    '<p class="content">' + message_content_short+'</p>'+
                    '</div>'+
                '</div>'+
                '<div class="card-footer" id="footer">'+
                    '<label id="date">'+msg_date+'</label>'+
                    '<label id="time">' + msg_time+'</label>'+
                '</div>'+
            '</div>'+
          '</li>';
  
        //Appending generated html from above into parent html element i.e <ul> with id #msg_list
        $$("#msg_list").append(msg_html);
      }
  
    },
      function (error) {
        myApp.alert('SELECT error (msgs from localDB): ' + error.message);
      }
    );
  }

function newUserFunc() {
    // myApp.alert("in new func");
    var type = "new";

    $$.ajax({
      type: "POST",
      url: "http://bling-test.000webhostapp.com/get-sent-msg-data.php",
      data: { fac_id : localStorage.id },
      crossDomain: true,
      cache: false,
      success: function (data) {
  
        if (data.length > 10) {
          res = JSON.parse(data);
          insertSentMsgData(res);
          getNDisplaySentMsgData();
        }
        else{
          $$("#msg_list").html('<p style:"text-align:center">No messages sent</p>');
        }
      }
    });
  }

$$(document).on("pageInit", '.page[data-page="sent-message"]', function (e) {

    var mySearchbar = myApp.searchbar(".searchbar", {
      searchList: ".list-block-search",
      searchIn: ".card-header,.card-content-inner"
    });
  
    // if (!localStorage.table_create_flag) {
    db.sqlBatch(
      ["CREATE TABLE IF NOT EXISTS msg_data (msg_id PRIMARY KEY, date, time, department, year, subject, message)"],
      function () {
        // localStorage.table_create_flag = 1;
        // myApp.alert("msg_data table created");
      },
      function (error) {
        myApp.alert("SQL batch ERROR: " + error.message);
      });
    // }
  
    var query = "SELECT msg_id FROM msg_data ORDER BY msg_id DESC";
  
    db.executeSql(query, [], function (resultSet) {
      if (resultSet.rows.length == 0) {
        // myApp.alert("new");
        newUserFunc();
      }
      else {
        // myApp.alert("old");
        getNDisplaySentMsgData();
      }
    },
      function (error) {
        myApp.alert('SELECT error (user type): ' + error.message);
      }
    );
  
    $$(document).on("click", "li.msg", function () {
      var id = $$(this).attr('id');
      localStorage.clicked_msg_id = id;
      mainView.router.loadPage('view-sent-message.html');
    });
  
});
function insertMsgData(res,counter){
    //Inserting parsed json values into localDB
    if(counter>0) {
      i = res.length-counter;
      // myApp.alert(`counter=${counter} i=${i}`);
      var query = "INSERT INTO msg_data (msg_id, id, date, time, fac_name, subject, message) VALUES (?,?,?,?,?,?,?)";
      db.executeSql(query, [res[i].msg_id, res[i].id, res[i].date, res[i].time, res[i].fac_name, res[i].subject, res[i].message], function (result) {
        if(i==res.length-1){
          // myApp.alert(`i==res.length i=${i} res.length=${res.length-1}`);
          var query = "SELECT * FROM msg_data ORDER BY msg_id DESC";
          getNDisplayMsgData(query,"all");
          return 0;
        }
        else
          insertMsgData(res, counter - 1);
      },
        function (error) {
          myApp.alert('INSERT error(server data to localDB): ' + error.message);
        }
      );
    }
    else{
      return 0;
    }
  }

  function getNDisplayMsgData(query,disp_type){
    //Getting data to display in received msgs list

    var msg_html = "";
    db.executeSql(query, [], function (resultSet) {

      myApp.alert(resultSet.rows.length);

      for (var x = 0; x < resultSet.rows.length; x++) {

        //Setting varibles to be concatenated into dynamic html string below
        if (disp_type == "all"){
          var li_msg_id = "li_"+resultSet.rows.item(x).msg_id;
          var ic_msg_id = "ic_"+resultSet.rows.item(x).msg_id;
          var extra_class = "";
        }
        else{
          var li_msg_id = "star_li_" + resultSet.rows.item(x).msg_id;
          var ic_msg_id = "star_ic_" + resultSet.rows.item(x).msg_id;
          var extra_class = "starred";
        }

        var msg_fac_name = "Prof. " + resultSet.rows.item(x).fac_name;
        var msg_date = resultSet.rows.item(x).date;
        var msg_time = resultSet.rows.item(x).time;
        var msg_subject = resultSet.rows.item(x).subject;
        var message_content = resultSet.rows.item(x).message;
        var starred_flag = resultSet.rows.item(x).starred;

        if (starred_flag == "yes") {
          star_icon_class = " color-yellow"
          icon = "star_filled";
        }
        else {
          star_icon_class = "";
          icon = "star";
        }

        if (message_content.length > 50) {
          var message_content_short = message_content.substring(0, 49) + "...";
        }
        else {
          var message_content_short = message_content;
        }

        //Dynamic html for list of msgs
        msg_html =
          '<li id="'+li_msg_id+'" class="'+extra_class+' msg">'+
            '<div class="card">'+
                '<div class="card-header item-title">'+msg_subject+
                    '<i id="'+ic_msg_id+'" class="star-icon f7-icons'+star_icon_class+'">'+icon+'</i>'+
                '</div>'+
                '<div class="card-content">'+
                  '<div class="card-content-inner">'+
                    '<p class="sender color-gray">Posted by '+msg_fac_name+'</p>'+
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
        if(disp_type=="all")
          $$("#msg_list").append(msg_html);
        else
          $$("#starred_msg_list").append(msg_html);
      }

    },
      function (error) {
        myApp.alert('SELECT error (msgs from localDB): ' + error.message);
      }
    );
    return 0;
  }

  function newUserType(){

    var type = "new";
    $$.ajax({
      type: "POST",
      url: "http://bling-test.000webhostapp.com/get-msg-data.php",
      data: { type:type, department:localStorage.department, year:localStorage.year },
      crossDomain: true,
      cache: false,
      success: function (data) {
        myApp.alert(data.length);
        if (data != "none") {
          res = JSON.parse(data);
          myApp.alert(res.length);
          insertMsgData(res,res.length);
        }
        else{
          $$("#msg_list").html('<p style:"text-align:center">No new messages</p>');
        }
      }
    });
  }

  function oldUserType(resultSet) {
    // myApp.alert("in old func");
    var type = "old";
    var res;
    var msg_html;
    var msg_id = resultSet.rows.item(0).msg_id;
    $$.ajax({
      type: "POST",
      url: "http://bling-test.000webhostapp.com/get-msg-data.php",
      data: { type: type, msg_id: msg_id, department: localStorage.department, year: localStorage.year },
      crossDomain: true,
      cache: false,
      success: function (data) {
        //parsing into JSON from string type variable (data)

        if(data != "none"){
          res = JSON.parse(data);
          myApp.alert(res.length);
          insertMsgData(res,res.length);
        }
        else{
          var query = "SELECT * FROM msg_data ORDER BY msg_id DESC";
          getNDisplayMsgData(query, "all");
        }
      }
    });
  }

  $$(document).on("pageInit", '.page[data-page="received-message"]', function(e) {

    document.addEventListener("backbutton", onBackKeyDown, false);

    var mySearchbar = myApp.searchbar(".searchbar", {
      searchList: ".list-block-search",
      searchIn: ".card-header,.card-content-inner"
    });

    // if (!localStorage.table_create_flag) {
    db.sqlBatch(
      ["CREATE TABLE IF NOT EXISTS msg_data (msg_id PRIMARY KEY, id, date, time, fac_name, subject, message, starred DEFAULT 'no')"],
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
        if(resultSet.rows.length == 0) {
          // myApp.alert("new");
          newUserType();
        }
        else {
          // myApp.alert("old");
          oldUserType(resultSet);
        }
      },
      function (error) {
        myApp.alert('SELECT error (user type): ' + error.message);
      }
    );

    $$(document).on("click", "li.msg", function () {
      var id = $$(this).attr('id');
      // alert(id);
      localStorage.clicked_msg_id = id.substring(3,id.length);
      mainView.router.loadPage('view-received-message.html');
    });

    $$('#msg_list').on("click", "i.star-icon", function (e) {

      var icon_id = $$(this).attr("id");
      var id = icon_id.substring(3, icon_id.length);
      var star_flag;

      var query = "SELECT starred from msg_data WHERE msg_id = ?";
      db.executeSql(query, [id], function (result) {
        star_flag = result.rows.item(0).starred;

        if (star_flag == "no") {
          var query = "UPDATE msg_data SET starred = 'yes' WHERE msg_id = ?";
          db.executeSql(query, [id], function (result) {
              myApp.alert('UPDATE star flag  to yes success');
            },
            function (error) {
              myApp.alert('UPDATE star flag FAILED' + error.message);
            }
          );
          $$('#' + icon_id).addClass('color-yellow').html('star_filled');
        }
        else {
          var query = "UPDATE msg_data SET starred = 'no' WHERE msg_id = ?";
          db.executeSql(query, [id], function (result) {
              myApp.alert('UPDATE star flag to no success');
            },
            function (error) {
              myApp.alert('UPDATE star flag FAILED' + error.message);
            }
          );
          $$('#' + icon_id).removeClass('color-yellow').html('star');
        }
      },
        function (error) {
          myApp.alert('SELECT starred flag FAILED' + error.message);
        }
      );

      e.stopPropagation();
      e.preventDefault();
    });

  });
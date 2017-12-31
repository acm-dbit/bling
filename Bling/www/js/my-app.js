// Determine theme depending on device
var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;

// Set Template7 global devices flags
Template7.global = {
    android: isAndroid,
    ios: isIos
};

// Define Dom7
var $$ = Dom7;

// Change Through navbar layout to Fixed
if (isAndroid) {
    // Change class
    $$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
    // And move Navbar into Page
    $$('.view .navbar').prependTo('.view .page');
}

// Init App
var myApp = new Framework7({
    // Enable Material theme for Android device only
    material: isAndroid ? true : false,
    // Enable Template7 pages
    template7Pages: true
});


function Application(){
  var myApp = new Framework7({
    swipePanel : 'left'
  });

  var mainView = myApp.addView('.view-main');
  $$('#toggleID').on('click',function()
  {
    myApp.openPanel('left');
  });

  $$('#prefID').on('click',function(e)
  {
    myApp.closePanel();
    mainView.router.loadPage('pages/prefer.html');
  });

}

Application();

// localStorage.table_create_flag = 0;

//Create Database
var db = null;

document.addEventListener("deviceready", function () {
  db = window.sqlitePlugin.openDatabase({
    name: "bling.db",
    location: "default"
  });

});

function dropCheck(u_id){
  myApp.alert("in drop check function");
  if(localStorage.prev_id != u_id){
    db.executeSql("DROP TABLE IF EXISTS msg_data", [], function (resultSet) {
      myApp.alert("DROP statement executed");
    },
      function (error) {
        myApp.alert('DROP error : ' + error.message);
      }
    );
  }

}


// Init View
var mainView = myApp.addView('.view-main', {
    // Don't worry about that Material doesn't support it
    // F7 will just ignore it for Material theme
    dynamicNavbar: true

});



// $$(document).on("pageInit", '.page[data-page="index"]', function(e) {

// });

function getYear(semester) {
  if (semester == 1 || semester == 2)
    return('FE');

  else if (semester == 3 || semester == 4)
    return('SE');

  else if (semester == 5 || semester == 6)
    return('TE');

  else (semester == 7 || semester == 8)
    return('BE');
}

$$(document).on('pageInit', '.page[data-page="register"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "profile"
    var token = localStorage.token;

    $$('#t1').on('click', function () {
      $$(this).addClass('button-fill');
      $$("#t2").removeClass('button-fill');
      $$("#t3").removeClass('button-fill');
    });

    $$('#t2').on('click', function () {
      $$(this).addClass('button-fill');
      $$("#t1").removeClass('button-fill');
      $$("#t3").removeClass('button-fill');
    });

    $$('#t3').on('click', function () {
      $$(this).addClass('button-fill');
      $$("#t1").removeClass('button-fill');
      $$("#t2").removeClass('button-fill');
    });

    $$('#stud_btn').on('click', function () {

            var name=$$('#sname').val();
            var id=$$('#sid').val();
            var semester=$$('#ssemester').val();
            var department=$$('#sdepartment').val();
            var pass=$$('#spass').val();
            var con_pass=$$('#scpass').val();
            var year;

            if(pass==con_pass){

            year = getYear(semester);
            myApp.alert(year);
            window.FirebasePlugin.subscribe(department);
            window.FirebasePlugin.subscribe(year);

              $$.ajax({
              type: "POST",
              url:"http://bling-test.000webhostapp.com/stud_register.php",
              data: {name:name, id:id, pass:pass, semester:semester, department:department, token:token},
              crossDomain: true,
              cache: false,
              success: function(data){

              if(data=="success")
              {
                localStorage.id = id;
                localStorage.name = name;
                localStorage.department = department;
                localStorage.year = year;

                myApp.alert("Registration successfull");
                mainView.router.loadPage('received-message.html');

              }

              else if(data=="failed")
              {
                myApp.alert("Something Went Wrong !");
              }
            }
         });
        }

        else
          myApp.alert("Both the passwords do not match !");
    });

    $$('#fac_btn').on('click', function () {

          console.log("Clicked");

            var name=$$('#fname').val();
            var id=$$('#fid').val();
            var department=$$('#fdepartment').val();
            var pass=$$('#fpass').val();
            var con_pass=$$('#fcpass').val();

            if(pass==con_pass){

              $$.ajax({
              type: "POST",
              url:"http://bling-test.000webhostapp.com/fac_register.php",
              data: {name:name, id:id, pass:pass, department:department, token:token},
              crossDomain: true,
              cache: false,
              success: function(data){

              if(data=="success")
              {
                localStorage.id = id;
                localStorage.name = name;

                myApp.alert("Registration successfull");
                mainView.router.loadPage('sent-message.html');
              }

              else if(data=="failed")
              {
                myApp.alert("Something Went Wrong !");
              }
            }
         });
        }

        else
          myApp.alert("Both the passwords do not match !");
    });
})


$$(document).on('pageInit', '.page[data-page="message"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "message"
    var id = localStorage.id;
    var name = localStorage.name;
    $$('#msg_send').on('click', function () {

            var subject=$$('#subj').val();
            var message=$$('#msg').val();
            var department=$$('#dept').val();
            var year=$$('#year').val();
            var res = [];
              $$.ajax({
              type: "POST",
              url:"http://bling-test.000webhostapp.com/message.php",
                data: { id: id, fac_name: localStorage.name, department: department, year: year, subject: subject, message: message },
              crossDomain: true,
              cache: false,
              success: function(data){
                // myApp.alert(data);
                var resx = JSON.parse(data);
                if(resx.res_type=="success")
                {
                  // myApp.alert("in success condition");
                  resx["subject"] = subject;
                  resx["message"] = message;
                  resx["department"] = department;
                  resx["year"] = year;
                  res.push(resx);
                  // myApp.alert(JSON.stringify(res));
                  insertSentMsgData(res);
                  myApp.alert("Message sent Successfully!");
                  mainView.router.loadPage('sent-message.html');
                }
                else if(data=="failed")
                {
                  myApp.alert("Something Went Wrong !");
                }
             }
         });
    });
})

//javascript code for accessing the camera
$$(document).on('pageInit', '.page[data-page="camera"]', function (e) {

    $$('#cam_btn').on('click', function () {

        navigator.camera.getPicture(function(result){

          $$("#image").attr("src",result);
        },

        function(error){
        console.log(error);
        },

        {
        sourceType : Camera.PictureSourceType.CAMERA
        });
    });
})

function insertMsgData(res){
  //Inserting parsed json values into localDB
  // myApp.alert("in insert func");
  for (i = 0; i < res.length; i++) {
    var query = "INSERT INTO msg_data VALUES (?,?,?,?,?,?,?)";
    db.executeSql(query, [res[i].msg_id, res[i].id, res[i].date, res[i].time, res[i].fac_name, res[i].subject, res[i].message], function (result) {
      // myApp.alert("rowsAffected: " + result.rowsAffected);
    },
      function (error) {
        myApp.alert('INSERT error(server data to localDB): ' + error.message);
      }
    );
  }
}

function getNDisplayMsgData(){
  //Getting data to display in received msgs list
  // myApp.alert("in display func");
  var query = "SELECT * FROM msg_data ORDER BY msg_id DESC";
  var msg_html = "";
  db.executeSql(query, [], function (resultSet) {
    for (var x = 0; x < resultSet.rows.length; x++) {

      //Setting varibles to be concatenated into dynamic html string below
      var msg_id = resultSet.rows.item(x).msg_id;
      var msg_fac_name = "Prof. " + resultSet.rows.item(x).fac_name;
      var msg_date = resultSet.rows.item(x).date;
      var msg_time = resultSet.rows.item(x).time;
      var msg_subject = resultSet.rows.item(x).subject;
      var message_content = resultSet.rows.item(x).message;
      if (message_content.length > 40) {
        var message_content_short = message_content.substring(0, 39) + "...";
      }
      else {
        var message_content_short = message_content;
      }

      //Dynamic html for list of msgs
      msg_html = msg_html +
        '<li id="' + msg_id + '" class="msg">' +
        '<div class="item-inner">' +
        '<div class="item-title-row">' +
        '<div class="item-title">' + msg_fac_name + '</div>' +
        '<div class="item-after">' + msg_time + '</div>' +
        '</div>' +
        '<div class="item-subtitle">' + msg_subject + '</div>' +
        '<div class="item-text">' + message_content_short + '</div>' +
        '<div class="item-subtitle" style="text-align:right">' + msg_date + '</div>' +
        '</div>' +
        '</li>';
    }

    //Inserting generated html from above into parent html element i.e <ul> with id #msg_list
    $$("#msg_list").html(msg_html);
  },
    function (error) {
      myApp.alert('SELECT error (msgs from localDB): ' + error.message);
    }
  );
}

function newUserType(){
  // myApp.alert("in new func");
  var type = "new";
  // var date = moment().format('l');
  // var time = moment().format('LT');
  $$.ajax({
    type: "POST",
    url: "http://bling-test.000webhostapp.com/get-msg-data.php",
    data: { type:type, department:localStorage.department, year:localStorage.year },
    crossDomain: true,
    cache: false,
    success: function (data) {
      // myApp.alert(type+localStorage.department+localStorage.year);
      // myApp.alert(data);

      if (data.length > 50) {
        res = JSON.parse(data);
        insertMsgData(res);
        getNDisplayMsgData();
      }
      else{
        $$("#msg_list").html('<p style:"text-align:center">No new messages</p>');
      }
    }
  });
}

function oldUserType(resultSet) {
  myApp.alert("in old func");
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


      if(data.length > 50){
        myApp.alert(data);
        res = JSON.parse(data);
        insertMsgData(res);
      }
    }
  });
  getNDisplayMsgData();
}

$$(document).on("pageInit", '.page[data-page="received-message"]', function(e) {

  // if (!localStorage.table_create_flag) {
  db.sqlBatch(
    ["CREATE TABLE IF NOT EXISTS msg_data (msg_id PRIMARY KEY, id, date, time, fac_name, subject, message)"],
    function () {
      // localStorage.table_create_flag = 1;
      myApp.alert("msg_data table created");
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
    localStorage.clicked_msg_id = id;
    mainView.router.loadPage('view-received-message.html');
  });

});

function insertSentMsgData(res) {
  //Inserting parsed json values into localDB
  // myApp.alert("in insert func");
  for (i = 0; i < res.length; i++) {
    var query = "INSERT INTO msg_data VALUES (?,?,?,?,?,?,?)";
    db.executeSql(query, [res[i].msg_id, res[i].date, res[i].time, res[i].department, res[i].year, res[i].subject, res[i].message], function (result) {
      // myApp.alert("rowsAffected: " + result.rowsAffected);
    },
      function (error) {
        myApp.alert('INSERT error(server data to localDB): ' + error.message);
      }
    );
  }
}

function getNDisplaySentMsgData() {
  //Getting data to display in received msgs list
  // myApp.alert("in display func");
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

      if (message_content.length > 40) {
        var message_content_short = message_content.substring(0, 39) + "...";
      }
      else {
        var message_content_short = message_content;
      }

      //Dynamic html for list of msgs
      msg_html = msg_html +
        '<li id="' + msg_id + '" class="msg">' +
        '<div class="item-inner">' +
        '<div class="item-title-row">' +
        '<div class="item-title">' + dept_year + '</div>' +
        '<div class="item-after">' + msg_time + '</div>' +
        '</div>' +
        '<div class="item-subtitle">' + msg_subject + '</div>' +
        '<div class="item-text">' + message_content_short + '</div>' +
        '<div class="item-subtitle" style="text-align:right">' + msg_date + '</div>' +
        '</div>' +
        '</li>';
    }

    //Inserting generated html from above into parent html element i.e <ul> with id #msg_list
    $$("#msg_list").html(msg_html);
  },
    function (error) {
      myApp.alert('SELECT error (msgs from localDB): ' + error.message);
    }
  );
}

function newUserFunc() {
  // myApp.alert("in new func");
  var type = "new";
  // var date = moment().format('l');
  // var time = moment().format('LT');
  $$.ajax({
    type: "POST",
    url: "http://bling-test.000webhostapp.com/get-sent-msg-data.php",
    data: { fac_id : localStorage.id },
    crossDomain: true,
    cache: false,
    success: function (data) {
      // myApp.alert(type+localStorage.department+localStorage.year);
      // myApp.alert(data);

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

  // if (!localStorage.table_create_flag) {
  db.sqlBatch(
    ["CREATE TABLE IF NOT EXISTS msg_data (msg_id PRIMARY KEY, date, time, department, year, subject, message)"],
    function () {
      // localStorage.table_create_flag = 1;
      myApp.alert("msg_data table created");
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

$$(document).on("pageInit", '.page[data-page="view-sent-message"]', function (e) {
  // myApp.alert('here');
  var query = "SELECT * FROM msg_data WHERE msg_id = ?";

  db.executeSql(query, [localStorage.clicked_msg_id], function (resultSet) {

    // myApp.alert('here in sql execute');
    var dept_year = resultSet.rows.item(0).department + "  (" + resultSet.rows.item(0).year + ")";
    var msg_date = resultSet.rows.item(0).date;
    var msg_time = resultSet.rows.item(0).time;
    var msg_subject = resultSet.rows.item(0).subject;
    var message_content = resultSet.rows.item(0).message;


    //Dynamic html for single msg view
    msg_html =
      '<div id="'+localStorage.clicked_msg_id+'" class="card">'+
          '<div class="card-header">'+dept_year+'</div>'+
          '<div class="card-content">'+
              '<div class="list-block media-list">'+
                  '<ul>'+
                      '<li class="item-content">'+
                          '<div class="item-inner">'+
                              '<div class="item-title-row">'+
                                  '<div class="item-title"> <b>Subject</b> : <br>'+msg_subject+'</div>'+
                              '</div><br>'+
                              '<b>Message</b> : <br>'+message_content+'<br><br>'+
                          '</div>'+
                      '</li>'+
                ' </ul>'+
              '</div>'+
          '</div>'+
          '<div class="card-footer">'+
              '<span>'+msg_date+'</span>'+
              '<span>'+msg_time+'</span>'+
          '</div>'+
      '</div>';
    // alert(msg_html);
    //Inserting generated html from above into parent html element i.e <div> with id #view_message
    $$("#view_message").html(msg_html);
  },
    function (error) {
      myApp.alert('SELECT error (user type): ' + error.message);
    }
  );
});


$$(document).on("pageInit", '.page[data-page="view-received-message"]', function (e) {

  var query = "SELECT * FROM msg_data WHERE msg_id = ?";

  db.executeSql(query, [localStorage.clicked_msg_id], function (resultSet) {
    var msg_fac_name = "Prof. " + resultSet.rows.item(0).fac_name;
    var msg_date = resultSet.rows.item(0).date;
    var msg_time = resultSet.rows.item(0).time;
    var msg_subject = resultSet.rows.item(0).subject;
    var message_content = resultSet.rows.item(0).message;

    myApp.alert(message_content);

    //Dynamic html for single msg view
    msg_html =
      '<div id="'+localStorage.clicked_msg_id+'" class="card">'+
          '<div class="card-header">'+msg_fac_name+'</div>'+
          '<div class="card-content">'+
              '<div class="list-block media-list">'+
                  '<ul>'+
                      '<li class="item-content">'+
                          '<div class="item-inner">'+
                              '<div class="item-title-row">'+
                                  '<div class="item-title"> <b>Subject</b> : <br>'+msg_subject+'</div>'+
                                  '</div><br>'+
                              '<b>Message</b> : <br>'+message_content+'<br><br>'+
                          '</div>'+
                      '</li>'+
                ' </ul>'+
              '</div>'+
          '</div>'+
          '<div class="card-footer">'+
              '<span>'+msg_date+'</span>'+
              '<span>'+msg_time+'</span>'+
          '</div>'+
      '</div>';

    //Inserting generated html from above into parent html element i.e <div> with id #view_message
    $$("#view_message").html(msg_html);
  },
    function (error) {
      myApp.alert('SELECT error (user type): ' + error.message);
    }
  );

});


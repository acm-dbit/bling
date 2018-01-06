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

  var id = localStorage.id;

  if(id != "null"){
    $$('#log-list').show();
  }

  else{
    $$('#log-list').hide();
  }

  if (localStorage.type == 1) {
    $$('#starred-msgs-link').show();
  }

  else if (localStorage.type == 2) {
    $$('#starred-msgs-link').hide();
  }

  $$('#toggleID').on('click',function()
  {
    myApp.openPanel('left');
  });

  $$('##starred-msgs-link').on('click', function (e) {
    mainView.router.loadPage('starred-msgs.html');
  });

  $$('#prefID').on('click',function(e)
  {
    myApp.closePanel();
    mainView.router.loadPage('pages/prefer.html');
  });

  $$('#logoutID').on('click',function(e)
  {
    localStorage.id = null;
    location.reload();
  });

}

Application();

// localStorage.table_create_flag = 0;

//Create Database
var db = null;

document.addEventListener("deviceready", function () {

  var id = localStorage.id;

  if(id != "null"){

    myApp.alert("Not undef:"+id);
    if(localStorage.type == 1){
      mainView.router.loadPage('received-message.html');
    }

    else if(localStorage.type == 2){
      mainView.router.loadPage('sent-message.html');
    }
  }

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
    var query = "INSERT INTO msg_data (msg_id, id, date, time, fac_name, subject, message) VALUES (?,?,?,?,?,?,?)";
    db.executeSql(query, [res[i].msg_id, res[i].id, res[i].date, res[i].time, res[i].fac_name, res[i].subject, res[i].message], function (result) {
      // myApp.alert("rowsAffected: " + result.rowsAffected);
    },
      function (error) {
        myApp.alert('INSERT error(server data to localDB): ' + error.message);
      }
    );
  }
}

function getNDisplayMsgData(query){
  //Getting data to display in received msgs list
  // myApp.alert("in display func");
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
        '<li id="li_'+msg_id+'" class="msg">'+
          '<div class="card">'+
              '<div class="card-header item-title">'+msg_subject+
                  '<i id="ic_'+msg_id+'" class="star-icon f7-icons'+star_icon_class+'">'+icon+'</i>'+
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
      $$("#msg_list").append(msg_html);
      // alert($$(".card-header").html());
    }

    alert($$("#msg_list").html());

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
        var query = "SELECT * FROM msg_data ORDER BY msg_id DESC";
        getNDisplayMsgData(query);
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
  var query = "SELECT * FROM msg_data ORDER BY msg_id DESC";
  getNDisplayMsgData(query);
}

$$(document).on("pageInit", '.page[data-page="received-message"]', function(e) {

  var mySearchbar = myApp.searchbar(".searchbar", {
    searchList: ".list-block-search",
    searchIn: ".card-header,.card-content-inner"
  });

  // if (!localStorage.table_create_flag) {
  db.sqlBatch(
    ["CREATE TABLE IF NOT EXISTS msg_data (msg_id PRIMARY KEY, id, date, time, fac_name, subject, message, starred DEFAULT 'no')"],
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
    alert(id);
    localStorage.clicked_msg_id = id.substring(3,id.length);
    mainView.router.loadPage('view-received-message.html');
  });


  $$("i.star-icon").on("click", function () {

    var icon_id = $$(this).attr("id");
    myApp.alert(icon_id);
    var id = icon_id.substring(3, icon_id.length);
    myApp.alert(id);
    var star_flag;

    var query = "SELECT starred from msg_data WHERE msg_id = ?";
    db.executeSql(query, [id], function (result) {
      star_flag = res[0].starred;
    },
      function (error) {
        myApp.alert('SELECT starred flag FAILED' + error.message);
      }
    );

    if(star_flag == "no"){
      var query = "UPDATE msg_data SET starred = 'yes' WHERE msg_id = ?";
      db.executeSql(query, [id], function (result) {
        myApp.alert('UPDATE star flag success' + error.message);
      },
        function (error) {
          myApp.alert('UPDATE star flag FAILED' + error.message);
        }
      );
      $$('#' + icon_id).addClass('color-yellow').html('star_filled');
    }
    else{
      var query = "UPDATE msg_data SET starred = 'no' WHERE msg_id = ?";
      db.executeSql(query, [id], function (result) {
        myApp.alert('UPDATE star flag success' + error.message);
      },
        function (error) {
          myApp.alert('UPDATE star flag FAILED' + error.message);
        }
      );
      $$('#' + icon_id).removeClass('color-yellow').html('star');
    }

    e.stopPropagation();
    e.preventDefault();
  });

});

$$(document).on("pageInit", '.page[data-page="starred-msgs"]', function (e) {

  var mySearchbar = myApp.searchbar(".searchbar", {
    searchList: ".list-block-search",
    searchIn: ".card-header,.card-content-inner"
  });


  var query = "SELECT msg_id FROM msg_data WHERE starred = 'yes' ORDER BY msg_id DESC";

  db.executeSql(query, [], function (resultSet) {
    if (resultSet.rows.length == 0) {
      $$("#msg_list").html('<p style:"text-align:center">No starred messages</p>');

    }
    else {
      // myApp.alert("old");
      getNDisplayMsgData(query);
    }
  },
    function (error) {
      myApp.alert('SELECT error (user type): ' + error.message);
    }
  );

  $$(document).on("click", "li.msg", function () {
    var id = $$(this).attr('id');
    localStorage.clicked_msg_id = id.substring(3, id.length);;
    mainView.router.loadPage('view-received-message.html');
  });


  $$("i.star-icon").on("click", function (e) {

    var icon_id = $$(this).attr("id");
    var id = icon_id.substring(3, icon_id.length);
    myApp.alert(id);
    var star_flag;

    var query = "SELECT starred from msg_data WHERE msg_id = ?";
    db.executeSql(query, [id], function (result) {
      star_flag = res[0].starred;
    },
      function (error) {
        myApp.alert('SELECT starred flag FAILED' + error.message);
      }
    );

    if (star_flag == "no") {
      var query = "UPDATE msg_data SET starred = 'yes' WHERE msg_id = ?";
      db.executeSql(query, [id], function (result) {
        star_flag = res[0].starred;
        myApp.alert('UPDATE star flag FAILED' + error.message);
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
        star_flag = res[0].starred;
      },
        function (error) {
          myApp.alert('UPDATE star flag FAILED' + error.message);
        }
      );
      $$('#' + icon_id).removeClass('color-yellow').html('star');
    }

    e.stopPropagation();
    e.preventDefault();
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

  var mySearchbar = myApp.searchbar(".searchbar", {
    searchList: ".list-block-search",
    searchIn: ".card-header,.card-content-inner"
  });

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

    // myApp.alert(message_content);

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


$$(document).on("pageInit", '.page[data-page="upload"]', function (e) {

//     $$("#file").change(function() {
//       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
//         console.log('file system open: ' + fs.name);
//         fs.root.getFile(this.files[0], { create: true, exclusive: false }, function (fileEntry) {
//             fileEntry.file(function (file) {
//                 var reader = new FileReader();
//                 reader.onloadend = function() {
//                     // Create a blob based on the FileReader "result", which we asked to be retrieved as an ArrayBuffer
//                     console.log(tnis.result);
//                     var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpg" });
//                     var oReq = new XMLHttpRequest();
//                     oReq.open("POST", "http://bling-test.000webhostapp.com/upload.php", true);
//                     oReq.onload = function (oEvent) {
//                         // all done!
//                     };
//                     // Pass the blob in to XHR's send method
//                     oReq.send(blob);
//                 };
//                 // Read the file as an ArrayBuffer
//                 reader.readAsArrayBuffer(file);
//             }, function (err) { console.error('error getting fileentry file!' + err); });
//         }, function (err) { console.error('error getting file! ' + err); });
//     }, function (err) { console.error('error getting persistent fs! ' + err); });

//     });

  $$("#uploadimage").on('submit',(function(e) {

    console.log("submit click");
    console.log(new FormData(this));

    e.preventDefault();

    $$.ajax({
    type: "POST",             // Type of request to be send, called as method
    url: "http://bling-test.000webhostapp.com/upload.php", // Url to which the request is send
    //url: "http://localhost/upload.php", // Url to which the request is send
    data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
    crossDomain: true,
    cache: false,             // To unable request pages to be cached
    success: function(data)   // A function to be called if request succeeds
    {
      myApp.alert("success");
    }
    });

    return false;
    }));
});






// function openFilePicker(selection) {

//     var srcType = Camera.PictureSourceType.PHOTOLIBRARY;
//     var options = setOptions(srcType);
//     var func = createNewFileEntry;

//     navigator.camera.getPicture(function cameraSuccess(imageUri) {

//         onUploadFile(imageUri);
//     }, function cameraError(error) {
//         console.debug("Unable to obtain picture: " + error, "app");

//     }, options);
// }



// function onUploadFile(imageUri) {
//     window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

//         console.log('file system open: ' + fs.name);
//         var fileName = imageUri;
//         var dirEntry = fs.root;
//         dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

//             // Write something to the file before uploading it.
//             writeFile(fileEntry);

//         }, onErrorCreateFile);

//     }, onErrorLoadFs);
// }

// function writeFile(fileEntry, dataObj) {
//     // Create a FileWriter object for our FileEntry (log.txt).
//     fileEntry.createWriter(function (fileWriter) {

//         fileWriter.onwriteend = function () {
//             console.log("Successful file write...");
//             upload(fileEntry);
//         };

//         fileWriter.onerror = function (e) {
//             console.log("Failed file write: " + e.toString());
//         };

//         if (!dataObj) {
//           dataObj = new Blob(['file data to upload'], { type: 'text/plain' });
//         }

//         fileWriter.write(dataObj);
//     });
// }


// function upload(fileEntry) {
//     // !! Assumes variable fileURL contains a valid URL to a text file on the device,
//     var fileURL = fileEntry.toURL();

//     var success = function (r) {
//         console.log("Successful upload...");
//         console.log("Code = " + r.responseCode);
//         // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
//     }

//     var fail = function (error) {
//         alert("An error has occurred: Code = " + error.code);
//     }

//     var options = new FileUploadOptions();
//     options.fileKey = "file";
//     options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
//     options.mimeType = "text/plain";

//     var params = {};
//     params.value1 = "test";
//     params.value2 = "param";

//     options.params = params;

//     var ft = new FileTransfer();
//     // SERVER must be a URL that can handle the request, like
//     // http://some.server.com/upload.php
//     ft.upload(fileURL, encodeURI(SERVER), success, fail, options);
// };

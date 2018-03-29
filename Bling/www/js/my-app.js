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

  else {
    $$('#starred-msgs-link').hide();
  }

  $$('#toggleID').on('click',function()
  {
    myApp.openPanel('left');
  });

  $$('#starred-msgs-link').on('click', function (e) {
    mainView.router.loadPage('starred-msgs.html');
  });

  $$('#prefID').on('click',function(e)
  {
    myApp.closePanel();
    mainView.router.loadPage('pages/prefer.html');
  });

  $$('#logoutID').on('click',function(e)
  {
    localStorage.removeItem('id');
    location.reload();
  });

}

Application();

// localStorage.table_create_flag = 0;

//Create Database
var db = null;

document.addEventListener("deviceready", function () {

  var id = localStorage.id;

  if(typeof id != "undefined"){

    myApp.alert("Logged in user id: "+id);
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
  // myApp.alert("in drop check function");
  if(localStorage.prev_id != u_id){
    db.executeSql("DROP TABLE IF EXISTS msg_data", [], function (resultSet) {
      // myApp.alert("DROP statement executed");
    },
      function (error) {
        // myApp.alert('DROP error : ' + error.message);
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

            localStorage.reg_name = name;
            localStorage.reg_id = id;
            localStorage.reg_sem = semester;
            localStorage.reg_dept = department;
            localStorage.reg_pass = pass;

            if(pass==con_pass){

              //myApp.alert("continue");

              mainView.router.loadPage('icard.html');

        //     year = getYear(semester);
        //     myApp.alert(year);
        //     window.FirebasePlugin.subscribe(department);
        //     window.FirebasePlugin.subscribe(year);

        //       $$.ajax({
        //       type: "POST",
        //       url:"http://bling-test.000webhostapp.com/stud_register.php",
        //       data: {name:name, id:id, pass:pass, semester:semester, department:department, token:token},
        //       crossDomain: true,
        //       cache: false,
        //       success: function(data){

        //       if(data=="success")
        //       {
        //         localStorage.id = id;
        //         localStorage.name = name;
        //         localStorage.department = department;
        //         localStorage.year = year;

        //         myApp.alert("Registration successfull");
        //         mainView.router.loadPage('received-message.html');

        //       }

        //       else if(data=="failed")
        //       {
        //         myApp.alert("Something Went Wrong !");
        //       }
        //     }
        //  });
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

    $$("#sendmsg").on('submit',(function(e) {

      var subject=$$('#subject').val();
      var message=$$('#message').val();
      var department=$$('#dept').val();
      var year=$$('#year').val();

      myApp.alert("submit click");

      var formData = new FormData(this);
      formData.append("id",id);
      formData.append("fac_name",name);

      console.log(JSON.stringify(formData));
  
      e.preventDefault();
      var res = [];
  
      $$.ajax({
      type: "POST",             // Type of request to be send, called as method
      url: "http://bling-test.000webhostapp.com/message.php", // Url to which the request is send
      data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      crossDomain: true,
      cache: false,    
      enctype:"multipart/form-data",         // To unable request pages to be cached
      success: function(data)   // A function to be called if request succeeds
      {
        myApp.alert(data);

        var resx = JSON.parse(data);
        //myApp.alert(resx);
        if(resx.res_type=="success")
        {
          //myApp.alert(subject+" "+message+" "+department+" "+year);
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
        else if(resx.res_type=="failed")
        {
          myApp.alert("Something Went Wrong !");
        }
      }
      });
  
      return false;
      }));

    // $$('#send_msg').on('submit', function () {

    //   myApp.alert("clicked");


    //         var subject=$$('#subj').val();
    //         var message=$$('#msg').val();
    //         var department=$$('#dept').val();
    //         var year=$$('#year').val();
    //         var fileToUpload=document.getElementById('fileToUpload').files[0];
    //         myApp.alert(fileToUpload);
    //         var res = [];
    //           $$.ajax({
    //           type: "POST",
    //           url:"http://bling-test.000webhostapp.com/message.php",
    //           //data: { id: id, fac_name: localStorage.name, department: department, year: year, subject: subject, message: message, fileToUpload:fileToUpload },
    //           data: new FormData(this),
    //           crossDomain: true,
    //           cache: false,
    //           success: function(data){
    //             myApp.alert(data);
    //             var resx = JSON.parse(data);
    //             myApp.alert(resx);
    //             if(resx.res_type=="success")
    //             {
    //               // myApp.alert("in success condition");
    //               resx["subject"] = subject;
    //               resx["message"] = message;
    //               resx["department"] = department;
    //               resx["year"] = year;
    //               res.push(resx);
    //               // myApp.alert(JSON.stringify(res));
    //               insertSentMsgData(res);
    //               myApp.alert("Message sent Successfully!");
    //               mainView.router.loadPage('sent-message.html');
    //             }
    //             else if(resx.res_type=="failed")
    //             {
    //               myApp.alert("Something Went Wrong !");
    //             }
    //          }
    //      });
    // });
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

function getNDisplayMsgData(query,disp_type){
  //Getting data to display in received msgs list
  //  myApp.alert("in display func");
  //  myApp.alert("query : "+query);

  var msg_html = "";
  db.executeSql(query, [], function (resultSet) {

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

      // myApp.alert(msg_id);
      // myApp.alert(starred_flag);

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
      // alert($$(".card-header").html());
    }

    // alert($$("#msg_list").html());

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
        getNDisplayMsgData(query,"all");
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


      if(data.length > 50){
        // myApp.alert(data);
        res = JSON.parse(data);
        insertMsgData(res);
      }
    }
  });
  var query = "SELECT * FROM msg_data ORDER BY msg_id DESC";
  getNDisplayMsgData(query,"all");
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

    // myApp.alert("clickeeeed");

    var icon_id = $$(this).attr("id");
    // myApp.alert(icon_id);
    var id = icon_id.substring(3, icon_id.length);
    // myApp.alert(id);
    var star_flag;

    var query = "SELECT starred from msg_data WHERE msg_id = ?";
    db.executeSql(query, [id], function (result) {
      star_flag = result.rows.item(0).starred;
      // myApp.alert(star_flag);

      if (star_flag == "no") {
        // myApp.alert("in no");
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
        // myApp.alert("in yes");
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



    // myApp.alert("end");
    e.stopPropagation();
    e.preventDefault();
  });

});

$$(document).on("pageInit", '.page[data-page="starred-msgs"]', function (e) {

  var mySearchbar = myApp.searchbar(".searchbar", {
    searchList: ".list-block-search",
    searchIn: ".card-header,.card-content-inner"
  });


  var query = "SELECT * FROM msg_data WHERE starred = 'yes' ORDER BY msg_id DESC";

  db.executeSql(query, [], function (resultSet) {
    if (resultSet.rows.length == 0) {
      // myApp.alert("no starred");
      $$("#starred_msg_list").html('<p style:"text-align:center">No starred messages</p>');
    }
    else {
      // myApp.alert("old");
      // myApp.alert("befor disp func");
      getNDisplayMsgData(query,"starred");
    }
  },
    function (error) {
      myApp.alert('SELECT error (user type): ' + error.message);
    }
  );

  $$(document).on("click", "li.starred", function () {
    var id = $$(this).attr('id');
    localStorage.clicked_msg_id = id.substring(8, id.length);
    mainView.router.loadPage('view-received-message.html');
  });


  $$('#starred_msg_list').on("click", "i.star-icon", function (e) {

    var icon_id = $$(this).attr("id");
    var id = icon_id.substring(8, icon_id.length);
    // myApp.alert(id);
    var star_flag;

    var query = "SELECT starred from msg_data WHERE msg_id = ?";
    db.executeSql(query, [id], function (result) {
      star_flag = result.rows.item(0).starred;
      if (star_flag == "no") {
        var query = "UPDATE msg_data SET starred = 'yes' WHERE msg_id = ?";
        db.executeSql(query, [id], function (result) {
            myApp.alert('UPDATE star flag to yes success');
          },
          function (error) {
            myApp.alert('UPDATE star flag FAILED' + error.message);
          }
        );
        $$('#' + icon_id).addClass('color-yellow').html('star_filled');
      } else {
        var query = "UPDATE msg_data SET starred = 'no' WHERE msg_id = ?";
        db.executeSql(query, [id], function (result) {
            myApp.alert('UPDATE star flag to no success');
          },
          function (error) {
            myApp.alert('UPDATE star flag FAILED' + error.message);
          }
        );
        $$('#' + icon_id).removeClass('color-yellow').html('star');
        mainView.router.reloadPage("starred-msgs.html");
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

  function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
  
        fileWriter.onwriteend = function() {
            myApp.alert("Download Successfull ! Check root of Internal Storage");
            readFile(fileEntry);
        };
  
        fileWriter.onerror = function (e) {
          myApp.alert("Download Failed :(: " + e.toString());
        };
  
        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }
  
        fileWriter.write(dataObj);
    });
  }

  $$('#view_message').on("click", ".down", function () {
    var name = $$(this).attr('id');
    //myApp.alert(name);

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      //myApp.alert('file system open: ' + fs.name);
      fs.root.getFile(name, { create: true, exclusive: false }, function (fileEntry) {
          //myApp.alert('fileEntry is file? ' + fileEntry.isFile.toString());
          var oReq = new XMLHttpRequest();
          // Make sure you add the domain name to the Content-Security-Policy <meta> element.
          oReq.open("GET","http://bling-test.000webhostapp.com/upload/"+name, true);
          // Define how you want the XHR data to come back
          oReq.responseType = "blob";
          oReq.onload = function (oEvent) {
              var blob = oReq.response; // Note: not oReq.responseText
              if (blob) {
                  // Create a URL based on the blob, and set an <img> tag's src to it.
                  // var url = window.URL.createObjectURL(blob);
                  // document.getElementById('image').src = url;

                  writeFile(fileEntry, blob);

                  // Or read the data with a FileReader
                  var reader = new FileReader();
                  reader.addEventListener("loadend", function() { // reader.result contains the contents of blob as text
                    
                  });
                  reader.readAsText(blob);
              } else myApp.alert('we didnt get an XHR response!');
          };
          oReq.send(null);
      }, function (err) { myApp.alert(JSON.stringify(err)); });
  }, function (err) { myApp.alert('error getting persistent fs! ' + err); });

  });


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

      $$("#view_message").html(msg_html);

      $$.ajax({
        type: "POST",
        url: "http://bling-test.000webhostapp.com/get-file-data.php",
        data: {msg_id: localStorage.clicked_msg_id},
        crossDomain: true,
        cache: false,
        success: function (data) {
          
          if(data!="none"){
            myApp.alert(data);
            data = data.replace(/"/g,'');
            $$("#view_message").append('<a class="button button-big button-fill color-gray down" id="'+data+'">'+data+'</a>');
          }
        }
      });

    //Inserting generated html from above into parent html element i.e <div> with id #view_message
  },
    function (error) {
      myApp.alert('SELECT error (user type): ' + error.message);
    }
  );

});


$$(document).on("pageInit", '.page[data-page="upload"]', function (e) {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      //myApp.alert('file system open: ' + fs.name);
      fs.root.getFile(name, { create: true, exclusive: false }, function (fileEntry) {
          //myApp.alert('fileEntry is file? ' + fileEntry.isFile.toString());
          var oReq = new XMLHttpRequest();
          // Make sure you add the domain name to the Content-Security-Policy <meta> element.
          oReq.open("GET","http://bling-test.000webhostapp.com/upload/1522304059-blob", true);
          // Define how you want the XHR data to come back
          oReq.responseType = "blob";
          oReq.onload = function (oEvent) {
              var blob = oReq.response; // Note: not oReq.responseText
              if (blob) {
                  // Create a URL based on the blob, and set an <img> tag's src to it.
                  var url = window.URL.createObjectURL(blob);
                  document.getElementById('image').src = url;

                  //writeFile(fileEntry, blob);

                  // Or read the data with a FileReader
                  var reader = new FileReader();
                  reader.addEventListener("loadend", function() { // reader.result contains the contents of blob as text
                    
                  });
                  reader.readAsText(blob);
              } else myApp.alert('we didnt get an XHR response!');
          };
          oReq.send(null);
      }, function (err) { myApp.alert(JSON.stringify(err)); });
  }, function (err) { myApp.alert('error getting persistent fs! ' + err); });
});


$$(document).on("pageInit", '.page[data-page="icard"]', function (e) {

      var fd = new FormData();

      var year = getYear(semester);
      myApp.alert(year);

      var name = localStorage.reg_name;
      var id = localStorage.reg_id;
      var pass = localStorage.reg_pass;
      var semester = localStorage.reg_sem;
      var department = localStorage.reg_dept;
      var token = localStorage.token;

      fd.append('name',name);
      fd.append('id',id);
      fd.append('pass',pass);
      fd.append('semester',token);
      fd.append('department',department);
      fd.append('token',token);

      window.FirebasePlugin.subscribe(department);
      window.FirebasePlugin.subscribe(year);

      function setOptions(srcType) {
        var options = {
            // Some common settings are 20, 50, and 100
            quality: 20,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true  //Corrects Android orientation quirks
        }
        return options;
    }
    
      function openCamera() {
    
        console.log("open");
    
        var srcType = Camera.PictureSourceType.CAMERA;
        var options = setOptions(srcType);
    
        navigator.camera.getPicture(function cameraSuccess(imageUri) {
          console.log(imageUri);
          $$("#image").attr("src",imageUri);
              
          window.resolveLocalFileSystemURL(imageUri, function(fileEntry) {
              fileEntry.file(function(file) {
                  var reader = new FileReader();
                      reader.onloadend = function(e) {
                            var imgBlob = new Blob([ this.result ], { type: "image/jpeg" } );
                            fd.append('fileToUpload', imgBlob);
                      };
                      reader.readAsArrayBuffer(file);
    
              }, function(e){$scope.errorHandler(e)});
          }, function(e){$scope.errorHandler(e)});
    
        }, function cameraError(error) {
            console.log("Unable to obtain picture: " + error, "app");
    
        }, options);
    }
    
    
    $$('#cam').on('click', function () {

      console.log("clicked");

        openCamera();
    });

    $$('#done').on('click', function () {

      console.log("done");
    });

    $$('#stud_reg').on('click', function () {

      $$.ajax({
        type: "POST",
        url:"http://bling-test.000webhostapp.com/stud_register.php",
        data: fd,
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
    });
});


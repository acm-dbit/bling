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


// Init View
var mainView = myApp.addView('.view-main', {
    // Don't worry about that Material doesn't support it
    // F7 will just ignore it for Material theme
    dynamicNavbar: true

});



// $$(document).on("pageInit", '.page[data-page="index"]', function(e) {

// });


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

            if(semester==1 || semester==2)
              year = 'FE';

            if(semester==3 || semester==4)
              year = 'SE';

            if(semester==5 || semester==6)
              year = 'TE';

            if(semester==7 || semester==8)
              year = 'BE';

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

    $$('#msg_send').on('click', function () {

            var message=$$('#msg').val();
            var department=$$('#dept').val();
            var year=$$('#year').val();

              $$.ajax({
              type: "POST",
              url:"http://bling-test.000webhostapp.com/message.php",
              data: { id:id, message:message, department:department, year:year},
              crossDomain: true,
              cache: false,
              success: function(data){

              if(data=="success")
              {
                myApp.alert("Message sent successfull");
              }

              else if(data=="failed")
              {
                myApp.alert("Something Went Wrong !");
              }
            }
         });
    });
})

$$(document).on("pageInit", '.page[data-page="view-message"]', function(e) {
  //Create Database
  var db = null;
  myApp.alert("Here");
  document.addEventListener("deviceready", function() {
    db = window.sqlitePlugin.openDatabase({
      name: "bling.db",
      location: "default"
    });
  });

  db.sqlBatch(
    [
      "CREATE TABLE IF NOT EXISTS stud_details (name, id, dep, sem, pass)",
      [
        "INSERT INTO stud_details VALUES (?,?,?,?,?)",
        ["Alice", 101, "comps", "3", "lol"]
      ]
    ],
    function() {
      myApp.alert("Table created and values entered");
    },
    function(error) {
      myApp.alert("SQL batch ERROR: " + error.message);
    })

    var query = "SELECT name, id, dep, sem, pass FROM stud_details";

    db.executeSql(query, [], function (resultSet) {
        for(var x = 0; x < resultSet.rows.length; x++) {
            myApp.alert("Name: " + resultSet.rows.item(x).name +
                ", ID: " + resultSet.rows.item(x).id);
        }
    },
    function (error) {
        myApp.alert('SELECT error: ' + error.message);
      }
  );


});
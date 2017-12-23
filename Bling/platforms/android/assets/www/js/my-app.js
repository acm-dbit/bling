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

// Init View
var mainView = myApp.addView('.view-main', {
    // Don't worry about that Material doesn't support it
    // F7 will just ignore it for Material theme
    dynamicNavbar: true

});



// $$(document).on("pageInit", '.page[data-page="index"]', function(e) {

// });


$$(document).on('pageInit', '.page[data-page="profile"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "profile"
    var token = localStorage.token;

    $$('#reg_btn').on('click', function () {

            var name=$$('#name').val();
            var id=$$('#sid').val();
            var pass=$$('#spass').val();
            var semester=$$('#semester').val();
            var department=$$('#department').val();

            window.FirebasePlugin.subscribe(department);

              $$.ajax({
              type: "POST",
              url:"http://bling-test.000webhostapp.com/register.php",
              data: {name:name, id:id, pass:pass, semester:semester, department:department, token:token},
              crossDomain: true,
              cache: false,
              success: function(data){

              if(data=="success")
              {
                localStorage.id = id;
                myApp.alert("Registration successfull");
              }

              else if(data=="failed")
              {
                myApp.alert("Something Went Wrong !");
              }
            }
         });
    });
})


$$(document).on('pageInit', '.page[data-page="message"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "message"
    var id = localStorage.id;

    $$('#msg_send').on('click', function () {

            var message=$$('#msg').val();
            var department=$$('#dept').val();

            myApp.alert(department);

              $$.ajax({
              type: "POST",
              url:"http://bling-test.000webhostapp.com/message.php",
              data: { id:id, message:message, department:department },
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
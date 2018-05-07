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
    $$('#profile-link').show();
  }

  else {
    $$('#starred-msgs-link').hide();
    $$('#profile-link').hide();
  }

  $$('#toggleID').on('click',function()
  {
    myApp.openPanel('left');
  });

  $$('#profile-link').on('click', function (e) {
    mainView.router.loadPage('profile.html');
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


// Init View
var mainView = myApp.addView('.view-main', {
    // Don't worry about that Material doesn't support it
    // F7 will just ignore it for Material theme
    dynamicNavbar: true

});
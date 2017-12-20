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

$$(document).on('pageInit', '.page[data-page="profile"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    $$('#reg_btn').on('click', function () {
              
            var name=$$('#name').val();
            var id=$$("#id").val();
            var pass=$$("#pass").val();
            var semester=$$("#semester").val();
            var department=$$("#department").val();

            //myApp.alert("name="+name+"\nid="+id+"\ndob="+dob+"\nsemester="+semester+"\ndepartment="+department);


              $$.ajax({
              type: "POST",
              url:"http://bling-test.000webhostapp.com/register.php",
              data: {name:name, id:id, pass:pass, semester:semester, department:department},
              crossDomain: true,
              cache: false,
              success: function(data){
 
              if(data=="success")
              {
                myApp.alert("Registration successfull");
              }
  
              else if(data=="failed")
              {
                myApp.alert("Something Went Wrong !");
              }
            }
         });

         //$$('#reg_btn').html('Clicked');
         //myApp.alert(name);
    });
})
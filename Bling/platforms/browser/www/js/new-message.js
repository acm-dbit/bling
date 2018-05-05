$$(document).on('pageInit', '.page[data-page="new-message"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "new-message"
    var id = localStorage.id;
    var name = localStorage.name;

    $$("#sendmsg").on('submit',(function(e) {

      myApp.alert("submit click");

      var subject=$$('#subject').val();
      var message=$$('#message').val();
      var department=$$('#dept').val();
      var year=$$('#year').val();

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
      },
      error:function(data){
        myApp.alert(data);
      }
      });
  
      return false;
      }));
})
$$(document).on('pageInit', '.page[data-page="select-class"]', function (e) {

    $$(document).on('click', 'a.color-red', function(){

        $$(this).toggleClass('color-green');
    });

    myApp.alert(localStorage.formData);

    $$('#send-btn').on('click',function(){

      var res = [];
  
      $$.ajax({
      type: "POST",             // Type of request to be send, called as method
      url: "http://bling-test.000webhostapp.com/message.php", // Url to which the request is send
      data: localStorage.formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      crossDomain: true,
      cache: false,    // To unable request pages to be cached
      enctype:"multipart/form-data",         
      success: function(data)   // A function to be called if request succeeds, the 'data' variable contains the returned value from php
      {
        myApp.alert(data);
  
        var resx = JSON.parse(data);
        if(resx.res_type=="success")
        {
          resx["subject"] = subject;
          resx["message"] = message;

          res.push(resx);
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
    });
});
  
  $$(document).on('pageInit', '.page[data-page="new-message"]', function (e) {

    document.addEventListener("backbutton", onBackKeyDown, false);

    var id = localStorage.id;
    var name = localStorage.name;
  
    $$("#sendmsg").on('submit',(function(e) {

      //myApp.showPreloader("Sending Notice");
  
      var subject=$$('#subject').val(); //Used to obtain the value entered in form field
      var message=$$('#message').val();
  
      //myApp.alert("submit click");
  
      var formData = new FormData(this); //When clicked on submit, all the data entered in the form, including the selected file (if any) is stored in the formData object 
      formData.append("id",id); //Explicitly adding more data to the existing formdata obtained from the form
      formData.append("fac_name",name);
    
      e.preventDefault();

      //myApp.alert(formData);

      localStorage.formData = formData;

      myApp.popup('.popup-select');

      return false;
      }));

    $$(document).on('click', 'a.color-red', function(){

        $$(this).toggleClass('color-green');
    });

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
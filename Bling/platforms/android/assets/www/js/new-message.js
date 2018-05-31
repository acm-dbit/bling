  
  $$(document).on('pageInit', '.page[data-page="new-message"]', function (e) {

    document.addEventListener("backbutton", onBackKeyDown, false);

    var id = localStorage.id;
    var name = localStorage.name;
  
    $$("#sendmsg").on('submit',(function(e) {
  
      var subject=$$('#subject').val(); //Used to obtain the value entered in form field
      var message=$$('#message').val();
      var department=$$('#dept').val();
      var year=$$('#year').val();
  
      myApp.alert("submit click");
  
      var formData = new FormData(this); //When clicked on submit, all the data entered in the form, including the selected file (if any) is stored in the formData object 
      formData.append("id",id); //Explicitly adding more data to the existing formdata obtained from the form
      formData.append("fac_name",name);
  
      console.log(JSON.stringify(formData));
  
      e.preventDefault();
      var res = [];
  
      $$.ajax({
      type: "POST",             // Type of request to be send, called as method
      url: "http://bling-test.000webhostapp.com/message.php", // Url to which the request is send
      data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
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
          resx["department"] = department;
          resx["year"] = year;
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
  
      return false;
      }));
  })
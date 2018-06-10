  
  $$(document).on('pageInit', '.page[data-page="new-message"]', function (e) {

    document.addEventListener("backbutton", onBackKeyDown, false);

    var id = localStorage.id;
    var name = localStorage.name;
    var formData;
  
    $$("#sendmsg").on('submit',(function(e) {
  
      myApp.alert("continue click");
  
      formData = new FormData(this); //When clicked on submit, all the data entered in the form, including the selected file (if any) is stored in the formData object 
      formData.append("id",id); //Explicitly adding more data to the existing formdata obtained from the form
      formData.append("fac_name",name);
    
      e.preventDefault();

      myApp.popup('.popup-select');

      return false;
      }));

    var class_array = [0,0,0,0,0,0,0,0,0,0,0,0];

    $$(document).on('click', 'a.color-red', function(){

        $$(this).toggleClass('color-green');

        var id = $$(this).attr('id');

        //myApp.alert(id);

        class_array[id-1] = 1 - class_array[id-1];
        // myApp.alert(JSON.stringify(class_array));
    });

    $$('#send-btn').on('click',function(){
      console.log("send clicked");
      for (var i = 0; i < class_array.length; i++) {
        formData.append('class_array[]', class_array[i]);
      }

      var res = [];

      myApp.showPreloader("Sending Notice");
  
      $$.ajax({
      type: "POST",             // Type of request to be send, called as method
      url: "http://bling-test.000webhostapp.com/message.php", // Url to which the request is send
      data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      crossDomain: true,
      cache: false,    // To unable request pages to be cached
      enctype:"multipart/form-data",         
      success: function(data)   // A function to be called if request succeeds, the 'data' variable contains the returned value from php
      {
        myApp.hidePreloader();
        myApp.alert(data);
  
        var resx = JSON.parse(data);

        if(resx.res_type=="success")
        {
          resx["subject"] = formData.get("subj");
          resx["message"] = formData.get("msg");

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
  
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
    
});
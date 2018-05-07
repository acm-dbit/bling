$$(document).on('pageInit', '.page[data-page="register"]', function (e) {
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
            var year=$$('#syear').val();
            var department=$$('#sdepartment').val();
            var pass=$$('#spass').val();
            var con_pass=$$('#scpass').val();

            localStorage.reg_name = name;
            localStorage.reg_id = id;
            localStorage.reg_year = year;
            localStorage.reg_dept = department;
            localStorage.reg_pass = pass;

            if(pass==con_pass){

              mainView.router.loadPage('capture-icard.html');
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
                localStorage.name = name;

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
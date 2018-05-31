$$(document).on('pageInit', '.page[data-page="profile"]', function (e) {

    document.addEventListener("backbutton", onBackKeyDown, false);

    var id = localStorage.id;

    $$.ajax({
        type: 'POST',
        url: "http://bling-test.000webhostapp.com/get-profile.php", //getting the profile details from server
        data: {id:id}, 
        crossDomain: true,
        cache: false,
        success: function(data){
            
            myApp.alert(data);
            data = JSON.parse(data);

            $$('#id').text(data.id); //Adding the data to HTML
            $$('#name').text(data.name);
            $$('#depart').text(data.department);
            $$('#year').text(data.year);
        }
    });

    $$('#save').on('click', function () {
    
        var year = $$('#pyear').val();

        if(year == "Change Year" || year == localStorage.year){ //If no year selected or selected year same as current year
            myApp.alert("Nothing to Save");
        }

        else{
            $$.ajax({
                type: 'POST',
                url: "http://bling-test.000webhostapp.com/update-profile.php", // Url to which the request is send
                data: {id:id,year:year}, 
                crossDomain: true,
                cache: false,
                success: function(data){

                    if(data=="success"){
                        db.executeSql("DROP TABLE IF EXISTS msg_data", [], function (resultSet) { //Drop all data stored locally since it contains data from the previous year of student 
                            myApp.alert("DROP statement executed");
                          },
                            function (error) {
                              myApp.alert('DROP error : ' + error.message);
                            }
                        );
                        localStorage.year = year;
                        myApp.alert("Profile Updated");
                        mainView.router.loadPage('received-message.html');
                    }

                    else{
                        myApp.alert("Update failed");
                    }
                    
                }
            });
        }
    });
});
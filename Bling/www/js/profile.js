$$(document).on('pageInit', '.page[data-page="profile"]', function (e) {

    var id = localStorage.id;
    myApp.alert(id);

    $$.ajax({
        type: 'POST',
        url: "http://bling-test.000webhostapp.com/get-profile.php", // Url to which the request is send
        data: {id:id}, 
        crossDomain: true,
        cache: false,
        success: function(data){
            
            myApp.alert(data);
            data = JSON.parse(data);

            $$('#id').text(data.id);
            $$('#name').text(data.name);
            $$('#depart').text(data.department);
            $$('#year').text(data.year);
        }
    });

    $$('#save').on('click', function () {
    
        var year = $$('#pyear').val();

        if(year == "Change Year" || year == localStorage.year){
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
                        db.executeSql("DROP TABLE IF EXISTS msg_data", [], function (resultSet) {
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
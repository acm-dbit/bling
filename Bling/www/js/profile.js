$$(document).on('pageInit', '.page[data-page="profile"]', function (e) {

    $$.ajax({
        type: 'POST',
        url: "http://bling-test.000webhostapp.com/get-profile.php", // Url to which the request is send
        data: {id:1111}, 
        crossDomain: true,
        cache: false,
        success: function(data){
            
            data = JSON.parse(data);

            $$('#name').text(data.name);
            $$('#depart').text(data.department);
            $$('#year').text(data.semester);
        }
    });
});
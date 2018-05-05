function getYear(semester) {
  if (semester == 1 || semester == 2)
    return('FE');

  else if (semester == 3 || semester == 4)
    return('SE');

  else if (semester == 5 || semester == 6)
    return('TE');

  else (semester == 7 || semester == 8)
    return('BE');
}

$$(document).on("pageInit", '.page[data-page="capture-icard"]', function (e) {

    var fd = new FormData();


    var name = localStorage.reg_name;
    var id = localStorage.reg_id;
    var pass = localStorage.reg_pass;
    var semester = localStorage.reg_sem;
    var department = localStorage.reg_dept;
    var token = localStorage.token;

    myApp.alert(semester);
    var year = getYear(semester);


    fd.append('name',name);
    fd.append('id',id);
    fd.append('pass',pass);
    fd.append('semester',semester);
    fd.append('department',department);
    fd.append('token',token);

    window.FirebasePlugin.subscribe(department);
    window.FirebasePlugin.subscribe(year);

    function setOptions(srcType) {
      var options = {
          // Some common settings are 20, 50, and 100
          quality: 10,
          destinationType: Camera.DestinationType.FILE_URI,
          // In this app, dynamically set the picture source, Camera or photo gallery
          sourceType: srcType,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: false,
          correctOrientation: true  //Corrects Android orientation quirks
      }
      return options;
  }
  
    function openCamera() {
  
      console.log("open");
  
      var srcType = Camera.PictureSourceType.CAMERA;
      var options = setOptions(srcType);
  
      navigator.camera.getPicture(function cameraSuccess(imageUri) {
        console.log(imageUri);
        $$("#image").attr("src",imageUri);
            
        window.resolveLocalFileSystemURL(imageUri, function(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();
                    reader.onloadend = function(e) {
                          var imgBlob = new Blob([ this.result ], { type: "image/jpeg" } );
                          fd.append('fileToUpload', imgBlob);
                    };
                    reader.readAsArrayBuffer(file);
  
            }, function(e){$scope.errorHandler(e)});
        }, function(e){$scope.errorHandler(e)});
  
      }, function cameraError(error) {
          console.log("Unable to obtain picture: " + error, "app");
  
      }, options);
  }
  
  
  $$('#cam').on('click', function () {

    console.log("clicked");

      openCamera();
  });


  $$('#stud_reg').on('click', function () {

    $$.ajax({
      type: "POST",
      url:"http://bling-test.000webhostapp.com/stud_register.php",
      data: fd,
      crossDomain: true,
      cache: false,
      success: function(data){

      myApp.alert(data);
    
      if(data=="success")
      {
        localStorage.id = id;
        localStorage.name = name;
        localStorage.department = department;
        localStorage.year = year;
    
        myApp.alert("Verification pending!!");
        mainView.router.loadPage('index.html');
    
      }
    
      else if(data=="failed")
      {
        myApp.alert("Something Went Wrong !");
      }
    }
    });
  });
});



$$(document).on("pageInit", '.page[data-page="icard-list"]', function (e) {

    $$('#list').on("click", ".ilist", function () {
      var card_id = $$(this).attr('id');
      localStorage.icard_id = card_id;
      mainView.router.loadPage('view-icard.html');
    });
  
    $$.ajax({
      type: "GET",
      url:"http://bling-test.000webhostapp.com/get-icard-list.php",
      crossDomain: true,
      cache: false,
      success: function(data){
        var list = JSON.parse(data);
        
        for(var i=0;i<list.length;i++){
          $$('#list').append(
              '<li class="item-content ilist" id="'+list[i].id+'">'+
                  '<div class="item-media">'+(i+1)+'</div>'+
                  '<div class="item-inner">'+
                      '<div class="item-title label">'+list[i].stud_id+'</div>'+
                  '</div>'+
              '</li>'
          );
        }
      }
    });
  });


  $$(document).on("pageInit", '.page[data-page="view-icard"]', function (e) {

    var file_name = null;
  
    $$.ajax({
      type: "POST",
      url:"http://bling-test.000webhostapp.com/get-icard-image.php",
      data: {id:localStorage.icard_id},
      crossDomain: true,
      cache: false,
      success: function(data){
        file_name = data;
        myApp.alert("http://bling-test.000webhostapp.com/icard/"+data);
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
          //myApp.alert('file system open: ' + fs.name);
          fs.root.getFile("image.jpeg", { create: true, exclusive: false }, function (fileEntry) {
              //myApp.alert('fileEntry is file? ' + fileEntry.isFile.toString());
              var oReq = new XMLHttpRequest();
              // Make sure you add the domain name to the Content-Security-Policy <meta> element.
              oReq.open("GET","http://bling-test.000webhostapp.com/icard/"+data, true);
              // Define how you want the XHR data to come back
              oReq.responseType = "blob";
              oReq.onload = function (oEvent) {
                  var blob = oReq.response; // Note: not oReq.responseText
                  if (blob) {
                      // Create a URL based on the blob, and set an <img> tag's src to it.
                      var url = window.URL.createObjectURL(blob);
                      document.getElementById('image').src = url;
      
                      // Or read the data with a FileReader
                      var reader = new FileReader();
                      reader.addEventListener("loadend", function() { // reader.result contains the contents of blob as text
                        
                      });
                      reader.readAsText(blob);
                  } else myApp.alert('we didnt get an XHR response!');
              };
              oReq.send(null);
          }, function (err) { myApp.alert(JSON.stringify(err)); });
      }, function (err) { myApp.alert('error getting persistent fs! ' + err); });
      }
    });
  
    $$.ajax({
      type: "POST",
      url:"http://bling-test.000webhostapp.com/get-verify-data.php",
      data: {id:localStorage.icard_id},
      crossDomain: true,
      cache: false,
      success: function(data){
        var info = JSON.parse(data);
        myApp.alert(JSON.stringify(info));
        $$('#name').html("Name: "+info.name);
        $$('#id').html("Student ID: "+info.id);
  
        if(file_name == null){
          myApp.alert("File is null");
        }
  
        $$('#accept').on('click', function () {
          $$.ajax({
            type: "POST",
            url:"http://bling-test.000webhostapp.com/verify.php",
            data: {id:info.id, status:1, file_name:file_name},
            crossDomain: true,
            cache: false,
            success: function(data){
              if(data=="success"){
                myApp.alert("Successfully Accepted");
                mainView.router.loadPage('icard-list.html');
              }
  
              else{
                myApp.alert(data);
              }
            }
          });
        });
  
        $$('#reject').on('click', function () {
          $$.ajax({
            type: "POST",
            url:"http://bling-test.000webhostapp.com/verify.php",
            data: {id:info.id, status:0, file_name:file_name},
            crossDomain: true,
            cache: false,
            success: function(data){
              if(data=="success"){
                myApp.alert("Successfully Rejected");
                mainView.router.loadPage('icard-list.html');
              }
  
              else{
                myApp.alert(data);
              }
            }
          });
        });
      }
    });
  
  });
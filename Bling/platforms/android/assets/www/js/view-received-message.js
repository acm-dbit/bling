$$(document).on("pageInit", '.page[data-page="view-received-message"]', function (e) {

    document.addEventListener("backbutton", onBackKeyDown, false);

    function writeFile(fileEntry, dataObj) {
      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function (fileWriter) {
    
          fileWriter.onwriteend = function() {
              myApp.hidePreloader();
              myApp.alert("Download Successfull ! Check root of Internal Storage");
              readFile(fileEntry);
          };
    
          fileWriter.onerror = function (e) {
            myApp.alert("Download Failed :(: " + e.toString());
          };
    
          // If data object is not passed in,
          // create a new Blob instead.
          if (!dataObj) {
              dataObj = new Blob(['some file data'], { type: 'text/plain' });
          }
    
          fileWriter.write(dataObj);
      });
    }
  
    $$('#view_message').on("click", ".down", function () {

     myApp.showPreloader('Downloading')

      var name = $$(this).attr('id');
      //myApp.alert(name);
  
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        //myApp.alert('file system open: ' + fs.name);
        fs.root.getFile(name, { create: true, exclusive: false }, function (fileEntry) {
            //myApp.alert('fileEntry is file? ' + fileEntry.isFile.toString());
            var oReq = new XMLHttpRequest();
            // Make sure you add the domain name to the Content-Security-Policy <meta> element.
            oReq.open("GET","http://bling-test.000webhostapp.com/upload/"+name, true);
            // Define how you want the XHR data to come back
            oReq.responseType = "blob";
            oReq.onload = function (oEvent) {
                var blob = oReq.response; // Note: not oReq.responseText
                if (blob) {
                    // Create a URL based on the blob, and set an <img> tag's src to it.
                    // var url = window.URL.createObjectURL(blob);
                    // document.getElementById('image').src = url;
  
                    writeFile(fileEntry, blob);
  
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
  
    });
  
  
    var query = "SELECT * FROM msg_data WHERE msg_id = ?";
  
    db.executeSql(query, [localStorage.clicked_msg_id], function (resultSet) {
      var msg_fac_name = "Prof. " + resultSet.rows.item(0).fac_name;
      var msg_date = resultSet.rows.item(0).date;
      var msg_time = resultSet.rows.item(0).time;
      var msg_subject = resultSet.rows.item(0).subject;
      var message_content = resultSet.rows.item(0).message;
  
      // myApp.alert(message_content);
  
      //Dynamic html for single msg view
      msg_html =
        '<div id="'+localStorage.clicked_msg_id+'" class="card">'+
            '<div class="card-header">'+msg_fac_name+'</div>'+
            '<div class="card-content">'+
                '<div class="list-block media-list">'+
                    '<ul>'+
                        '<li class="item-content">'+
                            '<div class="item-inner">'+
                                '<div class="item-title-row">'+
                                    '<div class="item-title"> <b>Subject</b> : <br>'+msg_subject+'</div>'+
                                    '</div><br>'+
                                '<b>Message</b> : <br>'+message_content+'<br><br>'+
                            '</div>'+
                        '</li>'+
                  ' </ul>'+
                '</div>'+
            '</div>'+
            '<div class="card-footer">'+
                '<span>'+msg_date+'</span>'+
                '<span>'+msg_time+'</span>'+
            '</div>'+
        '</div>';
  
        $$("#view_message").html(msg_html);
  
        $$.ajax({
          type: "POST",
          url: "http://bling-test.000webhostapp.com/get-file-data.php",
          data: {msg_id: localStorage.clicked_msg_id},
          crossDomain: true,
          cache: false,
          success: function (data) {
            
            if(data!="none"){
              myApp.alert(data);
              data = data.replace(/"/g,'');
              $$("#view_message").append('<a class="button button-big button-fill color-gray down" id="'+data+'">'+data+'</a>');
            }
          }
        });
  
      //Inserting generated html from above into parent html element i.e <div> with id #view_message
    },
      function (error) {
        myApp.alert('SELECT error (user type): ' + error.message);
      }
    );
  
  });
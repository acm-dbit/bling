$$(document).on("pageInit", '.page[data-page="view-sent-message"]', function (e) {
    // myApp.alert('here');
    var query = "SELECT * FROM msg_data WHERE msg_id = ?";
  
    db.executeSql(query, [localStorage.clicked_msg_id], function (resultSet) {
  
      // myApp.alert('here in sql execute');
      var dept_year = resultSet.rows.item(0).department + "  (" + resultSet.rows.item(0).year + ")";
      var msg_date = resultSet.rows.item(0).date;
      var msg_time = resultSet.rows.item(0).time;
      var msg_subject = resultSet.rows.item(0).subject;
      var message_content = resultSet.rows.item(0).message;
  
  
      //Dynamic html for single msg view
      msg_html =
        '<div id="'+localStorage.clicked_msg_id+'" class="card">'+
            '<div class="card-header">'+dept_year+'</div>'+
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
      // alert(msg_html);
      //Inserting generated html from above into parent html element i.e <div> with id #view_message
      $$("#view_message").html(msg_html);
    },
      function (error) {
        myApp.alert('SELECT error (user type): ' + error.message);
      }
    );
  });
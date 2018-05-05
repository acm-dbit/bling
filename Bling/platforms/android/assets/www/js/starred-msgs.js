$$(document).on("pageInit", '.page[data-page="starred-msgs"]', function (e) {

    var mySearchbar = myApp.searchbar(".searchbar", {
      searchList: ".list-block-search",
      searchIn: ".card-header,.card-content-inner"
    });
  
  
    var query = "SELECT * FROM msg_data WHERE starred = 'yes' ORDER BY msg_id DESC";
  
    db.executeSql(query, [], function (resultSet) {
      if (resultSet.rows.length == 0) {
        // myApp.alert("no starred");
        $$("#starred_msg_list").html('<p style:"text-align:center">No starred messages</p>');
      }
      else {
        // myApp.alert("old");
        // myApp.alert("befor disp func");
        getNDisplayMsgData(query,"starred");
      }
    },
      function (error) {
        myApp.alert('SELECT error (user type): ' + error.message);
      }
    );
  
    $$(document).on("click", "li.starred", function () {
      var id = $$(this).attr('id');
      localStorage.clicked_msg_id = id.substring(8, id.length);
      mainView.router.loadPage('view-received-message.html');
    });
  
  
    $$('#starred_msg_list').on("click", "i.star-icon", function (e) {
  
      var icon_id = $$(this).attr("id");
      var id = icon_id.substring(8, icon_id.length);
      // myApp.alert(id);
      var star_flag;
  
      var query = "SELECT starred from msg_data WHERE msg_id = ?";
      db.executeSql(query, [id], function (result) {
        star_flag = result.rows.item(0).starred;
        if (star_flag == "no") {
          var query = "UPDATE msg_data SET starred = 'yes' WHERE msg_id = ?";
          db.executeSql(query, [id], function (result) {
              myApp.alert('UPDATE star flag to yes success');
            },
            function (error) {
              myApp.alert('UPDATE star flag FAILED' + error.message);
            }
          );
          $$('#' + icon_id).addClass('color-yellow').html('star_filled');
        } else {
          var query = "UPDATE msg_data SET starred = 'no' WHERE msg_id = ?";
          db.executeSql(query, [id], function (result) {
              myApp.alert('UPDATE star flag to no success');
            },
            function (error) {
              myApp.alert('UPDATE star flag FAILED' + error.message);
            }
          );
          $$('#' + icon_id).removeClass('color-yellow').html('star');
          mainView.router.reloadPage("starred-msgs.html");
        }
      },
        function (error) {
          myApp.alert('SELECT starred flag FAILED' + error.message);
        }
      );
  
      e.stopPropagation();
      e.preventDefault();
    });
  
  });
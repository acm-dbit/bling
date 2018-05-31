function onBackKeyDown(e) {

    var name = mainView.activePage.name;
    myApp.alert(name);

    switch(name){

        case 'register': 
        mainView.router.back();
        break;

        case 'received-message':
        myApp.confirm('Do you want to exit the app?', function () {
            navigator.app.exitApp();
        }); 
        break;
        
        case 'view-received-message': 
        mainView.router.back();
        break;

        case 'profile': 
        mainView.router.loadPage('received-message.html');
        break;

        case 'starred-msgs': 
        mainView.router.loadPage('received-message.html');
        break;

        case 'new-message': 
        mainView.router.back();
        break;

        case 'sent-message':
        myApp.confirm('Do you want to exit the app?', function () {
            navigator.app.exitApp();
        }); 
        break;

        case 'view-sent-message': 
        mainView.router.back();
        break;

        case 'capture-icard': 
        myApp.confirm('All data will be lost, do you want to go back?', 'Warning',function () {
            mainView.router.loadPage('register.html');
        }); 
        break;

        case 'icard-list':
        myApp.confirm('Do you want to exit the app?', function () {
            navigator.app.exitApp();
        }); 
        break;

        case 'view-icard':
        mainView.router.back(); 
        break;

        default: 
        navigator.app.exitApp();
        break;
    }
}
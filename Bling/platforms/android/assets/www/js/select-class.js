$$(document).on('pageInit', '.page[data-page="select-class"]', function (e) {

    $$(document).on('click', 'a.color-red', function(){

        $$(this).toggleClass('color-green');
    });

    // $$(document).on('click', 'a.color-green', function(){

    //     $$(this).removeClass('color-green');
    //     $$(this).addClass('color-red');
    // });
});
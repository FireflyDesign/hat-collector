function open_new() {
    jQuery('button.new').removeClass('fa-plus').removeClass('new')
        .addClass('close').addClass('fa-times');
    jQuery('#new-form').addClass('opened');
    jQuery('#new-form form').addClass('visible');

}

function close_new() {
    jQuery('button.close').removeClass('fa-times').removeClass('close')
        .addClass('new').addClass('fa-plus');
    jQuery('#new-form').removeClass('opened');
    jQuery('#new-form form').removeClass('visible');
}
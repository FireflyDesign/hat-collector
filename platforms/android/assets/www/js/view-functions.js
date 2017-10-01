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

function start_talkwrite(container, title) {

    var options = {
        language: 'pl-PL',
        matches: 1,
        prompt: title
    };

    window.plugins.speechRecognition.startListening(function (result) {
        jQuery(container).val(result[0]);
    }, function (error) {
        console_log(error);
    }, options);
}


function take_photo(CameraPreview, img) {
    var options = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: false,
        tapPhoto: true,
        tapFocus: false,
        previewDrag: false
    };

    CameraPreview.startCamera(options);

    CameraPreview.takePicture({width: 1280, height: 800, quality: 85}, function (base64PictureData) {
        var imageSrcData = 'data:image/jpeg;base64,' + base64PictureData;
        jQuery(img).attr('src', imageSrcData);

        CameraPreview.stopCamera();
    },
    function (error) {
        console_log(error);
    });
}
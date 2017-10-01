var db = null;
document.addEventListener('deviceready', function() {
    db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});

    create_table(db, 'my_table', ['name', 'surname', 'desc']);
    jQuery('.insert').click(function(){
        insert(db, 'my_table', ['eR', 'Martin', 'Morda mordzie morduchna']);
    });
    jQuery('.check').click(function(){
        jQuery('#console').append('<span>' + get_info(db, 'my_table', 'desc', 'name', 'eR') + '</span>');
    });

    jQuery('.listen.chuj').click(function(){
        start_talkwrite('#chuj', 'Chuj');
    });

    window.plugins.speechRecognition.requestPermission(function () {
        //console_log('Nadano');
    }, function () {
        //console_log('Nie nadano');
    });


    /* Open new form */
    jQuery('button.new-button').click(function () {
        if(jQuery(this).hasClass('new')){
            open_new()
        }else {
            close_new();
        }
    });


    /* New form listen actions */
    jQuery('.listen.name').click(function(){
        start_talkwrite('#name', 'Podaj nazwę czapki');
    });
    jQuery('.listen.description').click(function(){
        start_talkwrite('#description', 'Opisz czapkę...');
    });
    jQuery('#new-form .image-preview').click(function(){
        // If figure already contains img - remove it
        var prevImg = jQuery(this).children('img')[0];
        if(prevImg){
            jQuery(prevImg).remove();
        }
        // Create new img
        var thisImg = jQuery('<img>').addClass('img-responsive');
        jQuery(this).addClass('contains-picture').append(thisImg);

        // Take photo and set its base64 src to new img
        take_photo(CameraPreview, thisImg);
    });

});


function console_log(item) {
    alert(JSON.stringify(item));
}

function create_table(db, name, columns) {

    var colString = '';
    for(i = 0; columns.length > i; i++){
        if(i !== 0){
            colString += ', '
        }
        colString += columns[i];
    }

    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS '+ name +' ('+ colString +')');
    }, function(error) {
        console_log('Transaction ERROR: ' + error.message);
    }, function(msg) {
        //console_log('Database created. ' + msg + ' OK');
    });
}
function insert(db, tableName, value) {

    var questions = '?';
    if(typeof value === 'object'){
        for(i = 0; value.length - 1 > i; i++){
            questions += ',?';
        }
    }

    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO '+ tableName +' VALUES ('+ questions +')', value);
    }, function(error) {
        console_log('Transaction ERROR: ' + error.message);
    }, function() {
        console_log('Populated database OK');
    });
}
function get_info(db, tableName, what, where, value) {

    var query = 'SELECT ' + what + ' FROM ' + tableName + ' WHERE ' + where + ' = "' + value + '"';
    var result = false;

    db.transaction(function(tx) {
        tx.executeSql(query, [], function(tx, rs) {
            console_log('Record count: ' + rs.rows.item(0)[what]);
            result = rs.rows.item(0)[what];
            return result;
        }, function(tx, error) {
            console_log('SELECT error: ' + error.message);
        });
    });
}
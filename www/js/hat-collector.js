var db = null;/*
document.addEventListener('deviceready', function () {
    db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});

    create_table(db, 'my_table', ['name', 'surname', 'desc']);
    jQuery('.insert').click(function () {
        insert(db, 'my_table', ['eR', 'Martin', 'Morda mordzie morduchna']);
    });
    jQuery('.check').click(function () {
        jQuery('#console').append('<span>' + get_info(db, 'my_table', 'desc', 'name', 'eR') + '</span>');
    });
    jQuery('.listen').click(function () {
        var options = {
            language: 'pl-PL',
            matches: 1,
            prompt: 'Opisz czapkę'
        };
        window.plugins.speechRecognition.startListening(function (result) {
            console_log(result);
        }, function (error) {
            console_log(error);
        }, options);
    });

    window.plugins.speechRecognition.requestPermission(function () {
        console_log('Nadano');
    }, function () {
        console_log('Nie nadano');
    });

});
*/







jQuery(document).ready(function () {



    jQuery('button.new-button').click(function () {
        if(jQuery(this).hasClass('new')){
            open_new();
        }else{
            close_new();
        }
    });

});






function console_log(item) {
    alert(JSON.stringify(item));
}

function create_table(db, name, columns) {

    var colString = '';
    for (i = 0; columns.length > i; i++) {
        if (i !== 0) {
            colString += ', '
        }
        colString += columns[i];
    }

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + name + ' (' + colString + ')');
    }, function (error) {
        console_log('Transaction ERROR: ' + error.message);
    }, function (msg) {
        //console_log('Database created. ' + msg + ' OK');
    });
}

function insert(db, tableName, value) {

    var questions = '?';
    if (typeof value === 'object') {
        for (i = 0; value.length - 1 > i; i++) {
            questions += ',?';
        }
    }

    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO ' + tableName + ' VALUES (' + questions + ')', value);
    }, function (error) {
        console_log('Transaction ERROR: ' + error.message);
    }, function () {
        console_log('Populated database OK');
    });
}

function get_info(db, tableName, what, where, value) {

    var query = 'SELECT ' + what + ' FROM ' + tableName + ' WHERE ' + where + ' = "' + value + '"';
    var result = false;

    db.transaction(function (tx) {
        tx.executeSql(query, [], function (tx, rs) {
            console_log('Record count: ' + rs.rows.item(0)[what]);
            result = rs.rows.item(0)[what];
            return result;
        }, function (tx, error) {
            console_log('SELECT error: ' + error.message);
        });
    });
}
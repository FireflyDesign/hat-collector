cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-sqlite-2.sqlitePlugin",
        "file": "plugins/cordova-plugin-sqlite-2/dist/sqlite-plugin.js",
        "pluginId": "cordova-plugin-sqlite-2",
        "clobbers": [
            "sqlitePlugin"
        ]
    },
    {
        "id": "cordova-plugin-speechrecognition.SpeechRecognition",
        "file": "plugins/cordova-plugin-speechrecognition/www/speechRecognition.js",
        "pluginId": "cordova-plugin-speechrecognition",
        "merges": [
            "window.plugins.speechRecognition"
        ]
    },
    {
        "id": "cordova-plugin-camera-preview.CameraPreview",
        "file": "plugins/cordova-plugin-camera-preview/www/CameraPreview.js",
        "pluginId": "cordova-plugin-camera-preview",
        "clobbers": [
            "CameraPreview"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-sqlite-2": "1.0.4",
    "cordova-plugin-console": "1.1.0",
    "cordova-plugin-speechrecognition": "1.1.2",
    "cordova-plugin-camera-preview": "0.9.0"
};
// BOTTOM OF METADATA
});
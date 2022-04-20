/*
 * This is the production build
 */
import registerPlugin from './plugin';

// Adds this plugin to the LibreEditor for later activation
// this will ensure that `registerPlugin()` be called after
// CKeditor is initialized on Libretexts page

// Use if changing config settings
/*
LibreEditor.editorConfig = function ( config ) {

}
*/

LibreEditor.a11yPlugin = (config) => {
  registerPlugin();
  config.toolbar[12].push('a11yButton');

  console.log("config: ", config);
  console.log("params: ",config.a11ychecker_quailParams);
};


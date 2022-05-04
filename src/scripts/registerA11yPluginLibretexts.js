/*
 * This is the production build
 */
import registerPlugin from './plugin';

LibreEditor.a11yPlugin = (config) => {
  registerPlugin();
  config.toolbar[12].push('a11yButton');
};

// Use if changing config settings
/*
LibreEditor.editorConfig = function ( config ) {

}
*/


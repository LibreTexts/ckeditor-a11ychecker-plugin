/*
 * This is the production build
 */
import registerPlugin from './plugin';

LibreEditor.a11yPlugin = (config) => {
  registerPlugin();                       // Calling the main function to register a11ychecker
  config.toolbar[12].push('a11yButton');  // Pushing the plugin's icon onto the CKEditor's toolbar
};


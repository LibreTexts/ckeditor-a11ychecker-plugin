/*
 * This is the production build. 
 * This calls our main function and pushes the a11yButton/a11ychecker icon onto the LibreText CKEditor toolbar.
 * 
 * Many thanks to previous dev teams of LibreTexts (the creators of query/adapt plugin), Yasin, and Ethan for the guidelines & help putting this all together.
 */
import registerPlugin from './plugin';

LibreEditor.a11yPlugin = (config) => {
  registerPlugin();                       // Calling the main function to register a11ychecker
  config.toolbar[12].push('a11yButton');  // Pushing the plugin's icon onto the CKEditor's toolbar
};


/*
*
* This is the main function that registers everything needed to run a11ychecker.
* Small functions are added here such as adding CSS, changing the magic line, and registering the plugin to the config.
* Feel free to organize these functions into their own file or keep them here.
*/

import addBalloonPanel from "./balloonpanel";
import "../styles/contents.css";
import loadPlugin from "./loadPlugin";
import loadCustomFixes from "./customFixes";
import addA11yChecker from "./a11ychecker";

// Main
const registerPlugin = () => {
    addBalloonPanel();
    addA11yChecker();
    loadPlugin();
    loadCustomFixes();
    changeMagicLineConfig();
    addCss();
    register();
};

// Adding any CSS styles to the editor.
// This is where we change the blue/red/orange borders of the focused issues
function addCss() {
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_error.cke_a11yc_issue { outline:5px dashed #ff6863 !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_warning.cke_a11yc_issue { outline:5px dashed #f3994a !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_notice.cke_a11yc_issue { outline:5px dashed #68bb59 !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_issue { outline:3px dotted #03a9f4 !important; }' );
}

// Changing the magic line config
function changeMagicLineConfig() {
    // Ensures that figures are considered block level (see https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_dtd.html)
    CKEDITOR.dtd.$block['figure'] = 1;

    // Adds magic line to all block level elements that are specifid in CKEDITOR.dtd.$block
    CKEDITOR.config.magicline_everywhere = true;
}

// Registering the plugins
function register() {
  if (CKEDITOR.config.extraPlugins === '') {
    CKEDITOR.config.extraPlugins += 'a11ychecker,a11yButton';
  } else {
    CKEDITOR.config.extraPlugins += ',a11ychecker,a11yButton';
  }
}

export default registerPlugin;

import addBalloonPanel from "./balloonpanel";
import "../styles/contents.css";
import loadPlugin from "./loadPlugin";
import loadCustomFixes from "./customFixes";
import addA11yChecker from "./a11ychecker";

const registerPlugin = () => {
  if (!CKEDITOR.config.extraPlugins.includes('a11ychecker')) {
    addBalloonPanel();
    addA11yChecker();
    loadPlugin();
    loadCustomFixes();
    addCss();
  
    if (CKEDITOR.config.extraPlugins === '') {
      CKEDITOR.config.extraPlugins += 'a11ychecker,a11yButton';
    } else {
      CKEDITOR.config.extraPlugins += ',a11ychecker,a11yButton';
    }
  }
};


// Adding any CSS styles to the editor.
// This is where we change the blue/red/orange borders of the balloon panel
function addCss() {
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_error.cke_a11yc_issue { outline:5px dashed #ff6863 !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_warning.cke_a11yc_issue { outline:5px dashed #f3994a !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_notice.cke_a11yc_issue { outline:5px dashed #68bb59 !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_issue { outline:3px dashed #03a9f4 !important; }' );
}

export default registerPlugin;

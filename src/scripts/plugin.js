import addBalloonPanel from "./balloonpanel";
import "../styles/contents.css";
import loadPlugin from "./loadPlugin";
import loadCustomFixes from "./customFixes";
import addA11yChecker from "./a11ychecker";
const registerPlugin = () => {
    addBalloonPanel();
    addA11yChecker();
    loadPlugin();
    loadCustomFixes();
    addCss();

    // Changing magic line config
    CKEDITOR.dtd.$block['figure'] = 1;
    CKEDITOR.config.magicline_everywhere = true;

  if (CKEDITOR.config.extraPlugins === '') {
    CKEDITOR.config.extraPlugins += 'a11ychecker,a11yButton';
  } else {
    CKEDITOR.config.extraPlugins += ',a11ychecker,a11yButton';
  }

};


// Adding any CSS styles to the editor.
// This is where we change the blue/red/orange borders of the balloon panel
function addCss() {
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_error.cke_a11yc_issue { outline:5px dashed #ff6863 !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_warning.cke_a11yc_issue { outline:5px dashed #f3994a !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_notice.cke_a11yc_issue { outline:5px dashed #68bb59 !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_issue { outline:3px dotted #03a9f4 !important; }' );
}

export default registerPlugin;

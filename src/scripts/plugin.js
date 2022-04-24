import addA11yChecker from "./a11ychecker";
import addBalloonPanel from "./balloonpanel";
import "../styles/contents.css";
import loadPlugin from "./loadPlugin";
import loadCustomFixes from "./customFixes";


console.log('CKEditor A11y Plugin Development Version');

const registerPlugin = () => {
  addBalloonPanel();
  addA11yChecker();
  loadPlugin();
  loadCustomFixes();
  addCss();

  if (CKEDITOR.config.extraPlugins === '') {
    CKEDITOR.config.extraPlugins += 'a11ychecker, a11yButton';
  } else {
    CKEDITOR.config.extraPlugins += ',a11ychecker, a11yButton';
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


/*
  If you are trying to map a quick fix to an existing issue (NOT a custom issue),
  then you can simply map it in this format:
  Format:     a11ychecker.Engine.prototype.fixesMapping.ISSUE_NAME = ['QUICK_FIX_NAME'];
  Example:    a11ychecker.Engine.prototype.fixesMapping.ReservedHeaders = ['ReservedHeaders'];
*/
// function loadFixesForExistingIssues() {
//   a11ychecker.Engine.prototype.fixesMapping.aLinksDontOpenNewWindow = ['NewWindowLink'];
//     return;
// }

export default registerPlugin;

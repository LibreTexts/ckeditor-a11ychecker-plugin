import addA11yChecker from "./a11ychecker";
import addBalloonPanel from "./balloonpanel";
import loadPlugin from "./button";
import "../styles/contents.css";

console.log('CKEditor A11y Plugin Development Version');

const registerPlugin = () => {
  addBalloonPanel();
  addA11yChecker();
  loadPlugin();

  // TODO: Add to function
  // Adding CSS to the editor
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_error.cke_a11yc_issue { outline:5px dashed #ff6863 !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_warning.cke_a11yc_issue { outline:5px dashed #f3994a !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_focused.cke_a11yc_notice.cke_a11yc_issue { outline:5px dashed #68bb59 !important; }' );
  CKEDITOR.addCss( '.cke_editable .cke_a11yc_issue { outline:3px dashed #03a9f4 !important; }' );
  //CKEDITOR.addCss( '.cke_a11yc_ui_button_ignore_wrapper { border: 10px solid red !important }' );
  //CKEDITOR.addCss( 'div.cke_a11yc_ui_button_wrapper.cke_a11yc_ui_button_ignore_wrapper { display: none; !important }' );


  // TODO: a11yButton is no longer needed..i think lol
  
  if (CKEDITOR.config.extraPlugins === '') {
    CKEDITOR.config.extraPlugins += 'a11ychecker, a11yButton';
  } else {
    CKEDITOR.config.extraPlugins += ',a11ychecker, a11yButton';
  }
};

export default registerPlugin;

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

  CKEDITOR.on("instanceReady", function() {
    var a11ychecker = CKEDITOR.plugins.a11ychecker;
    a11ychecker.IssueDetails.avoidStrongs = {
      title: 'Avoid strongs',
      descr: 'Our users do not like <strong>strongs</strong>, use <em>emphasize</em> instead 😉'
    };

    a11ychecker.Engine.prototype.on( 'process', function( evt ) {
      // This is where the actual checking occurs, and this is where you want to report custom issues.
      var Issue = a11ychecker.Issue,
          contentElement = evt.data.contentElement,
          issues = evt.data.issues
      CKEDITOR.tools.array.forEach( contentElement.find( 'strong' ).toArray(), function( strong ) {
          issues.addItem( new Issue( {
              originalElement: strong,
              testability: Issue.testability.NOTICE,
              id: 'avoidStrongs',
              details: {
                title: 'Avoid strongs',
                descr: 'Our users do not like <strong>strongs</strong>, use <em>emphasize</em> instead 😉'
              }
          }, a11ychecker.Engine ) );
      } );   
    } );
  })


  // TODO: a11yButton is no longer needed..i think lol
  
  if (CKEDITOR.config.extraPlugins === '') {
    CKEDITOR.config.extraPlugins += 'a11ychecker, a11yButton';
  } else {
    CKEDITOR.config.extraPlugins += ',a11ychecker, a11yButton';
  }
};

export default registerPlugin;

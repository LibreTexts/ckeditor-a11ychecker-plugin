import addA11yChecker from "./a11ychecker";
import addBalloonPanel from "./balloonpanel";
import loadPlugin from "./button";
import "../styles/contents.css";

console.log('CKEditor A11y Plugin Development Version');

const registerPlugin = () => {
  addBalloonPanel();
  addA11yChecker();
  loadPlugin();
  addCss();
  addCustomIssues();

  
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

// Adding custom issues to a11ychecker.
function addCustomIssues() {
  CKEDITOR.on("instanceReady", function() {
    var a11ychecker = CKEDITOR.plugins.a11ychecker;

    a11ychecker.Engine.prototype.on( 'process', function( evt ) {
      // This is where the actual checking occurs, and this is where you want to report custom issues.
      var Issue = a11ychecker.Issue,
          contentElement = evt.data.contentElement,
          issues = evt.data.issues

      //  ************************
      // Add all custom tests here
      // *************************
      CKEDITOR.tools.array.forEach( contentElement.find( 'h5:not(section h5, div h5),h6:not(section h6, div h6)').toArray(), function( orig ) {
          issues.addItem( new Issue( {
            originalElement: orig,
            testability: Issue.testability.ERROR,
            id: 'ReservedHeaders',
            details: {
              title: 'H5 and H6 is reserved for LibreTexts',
              descr: 'LibreTexts reserves heading level 5 and heading level 6, and should not be used outside of boxes for sidebar content. Clicking quick fix will change this heading to a header level 4.'
            }
        }, a11ychecker.Engine.prototype ) );
      });  

      // Testing buttons without alts
      CKEDITOR.tools.array.forEach( contentElement.find( 'button:not([alt]), button[alt=""]').toArray(), function( orig ) {
        issues.addItem( new Issue( {
          originalElement: orig,
          testability: Issue.testability.ERROR,
          id: 'testing',
          details: {
            title: 'Tetsing buttons without alt text',
            descr: 'Buttons should have alt text.'
          }
      }, a11ychecker.Engine.prototype ) );
    });  

      // Testing gifs without alt images
      CKEDITOR.tools.array.forEach( contentElement.find( 'img[src$=".gif"]:not([alt])').toArray(), function( orig ) {
        issues.addItem( new Issue( {
          originalElement: orig,
          testability: Issue.testability.ERROR,
          id: 'testing',
          details: {
            title: 'Gifs without alt text',
            descr: 'Gifs should have alt text.'
          }
      }, a11ychecker.Engine.prototype ) );
    });  

      // Testing divs into landscapes -- quick fix has been written
      CKEDITOR.tools.array.forEach( contentElement.find( 'div').toArray(), function( orig ) {
        issues.addItem( new Issue( {
          originalElement: orig,
          testability: Issue.testability.NOTICE,
          id: 'DivsShouldBeSections',
          details: {
            title: 'Div elements should be sections',
            descr: 'All divs in LibreTexts should be section landmarks instead.'
          }
      }, a11ychecker.Engine.prototype ) );
    });  

        // Testing font size 8 -- quick fix has been written
        // NOTE: this only works with MindTouch settings
        CKEDITOR.tools.array.forEach( contentElement.find( '.mt-font-size-8').toArray(), function( orig ) {
          issues.addItem( new Issue( {
            originalElement: orig,
            testability: Issue.testability.NOTICE,
            id: 'FontSizeIsTooSmall',
            details: {
              title: 'Font size is too small',
              descr: 'All text elements should be at least 10pt font size.'
            }
        }, a11ychecker.Engine.prototype ) );
      });  

      // Testing second scan of alt tags
        CKEDITOR.tools.array.forEach( contentElement.find( 'img[alt]:not(img[alt].alt-tag-verified), img[alt=" "]:not(img[alt=" "].alt-tag-verified').toArray(), function( orig ) {
          issues.addItem( new Issue( {
            originalElement: orig,
            testability: Issue.testability.NOTICE,
            id: 'VerifyAltTag',
            details: {
              title: 'Verify the alt tag',
              descr: 'Verify that the alt tag correctly describes the image. If the alt tag is blank, verify that it is decorative or that it has a caption describing the image.'
            }
        }, a11ychecker.Engine.prototype ) );
      });  



      // *************************************************
      // Map all quick fixes here
      // *************************************************
      a11ychecker.Engine.prototype.fixesMapping.ReservedHeaders = ['ReservedHeaders'];
      a11ychecker.Engine.prototype.fixesMapping.DivsShouldBeSections = ['DivToSection'];
      a11ychecker.Engine.prototype.fixesMapping.FontSizeIsTooSmall = ['FontSizeFix'];
      a11ychecker.Engine.prototype.fixesMapping.VerifyAltTag = ['ImgAltVerify'];
    });
  })
}

export default registerPlugin;

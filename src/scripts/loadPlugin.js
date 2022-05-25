import "../styles/index.scss";

var filteredIssues = {};
const loadPlugin = () => {

    CKEDITOR.plugins.add('a11yButton', {
    init(editor) {
      CKEDITOR.dialog.add('a11yTestDialog', (editor) => {
        return {
          title: 'Accessibility Checker',
          resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
          minWidth: 500,
          minHeight: 400,
          contents: [
            {
              id: 'a11yTOC',
              label: 'A11y Table Of Contents',
              title: 'A11y Table Of Contents',
              accessKey: 'Q',
              elements: [
                {
                  type: 'html',
                  html: '<p>Please select which issues you would like to test for:</p>'
                },
                {
                  type: 'checkbox',
                  label: '1. All accessibility issues (DEFAULT)',
                  id: 'testAll',
                  labelStyle: 'margin-left: 30px;',
                  focus: function() {
                    $('#testAll').focus();
                  }
                },
                {
                  type: 'checkbox',
                  label: '2. Headings',
                  id: 'testHeadings',
                  labelStyle: 'margin-left: 30px;',
                  focus: function() {
                    $('#testHeadings').focus();
                  }
                },
                {
                  type: 'checkbox',
                  label: '3. Alt Image Tags',
                  id: 'testImages',
                  labelStyle: 'margin-left: 30px;',
                  focus: function() {
                    $('#testImages').focus();
                  }
                },
                {
                  type: 'checkbox',
                  label: '4. Tables',
                  id: 'testTables',
                  labelStyle: 'margin-left: 30px;',
                  focus: function() {
                    $('#testTables').focus();
                  }
                },
                {
                  type: 'checkbox',
                  label: '5. Links',
                  id: 'testLinks',
                  labelStyle: 'margin-left: 30px;',
                  focus: function() {
                    $('#testLinks').focus();
                  }
                },
                {
                  type: 'checkbox',
                  label: '6. Color Contrast',
                  id: 'testColor',
                  labelStyle: 'margin-left: 30px;',
                  focus: function() {
                    $('#testColor').focus();
                  }
                },
                {
                  type: 'checkbox',
                  label: '7. Labels',
                  id: 'testLabels',
                  labelStyle: 'margin-left: 30px;',
                  focus: function() {
                    $('#testLabels').focus();
                  }
                }
              ],
            },
          ],

          // When the user presses OK, it will get the values of each of the checkboxes,
          // then send this data to customFixes to filter.
          onOk() {
            const menu = this;

            filteredIssues = {
              "All":      menu.getValueOf( 'a11yTOC', 'testAll'      ),
              "Headings": menu.getValueOf( 'a11yTOC', 'testHeadings' ),
              "Images":   menu.getValueOf( 'a11yTOC', 'testImages'   ),
              "Tables":   menu.getValueOf( 'a11yTOC', 'testTables'   ),
              "Links":    menu.getValueOf( 'a11yTOC', 'testLinks'    ),
              "Color":    menu.getValueOf( 'a11yTOC', 'testColor'    ),
              "Labels":    menu.getValueOf( 'a11yTOC', 'testLabels'    )
            };

            editor.execCommand('a11ychecker')
          },

          // When the dialog loads in, this will set up a keyboard shortcut of the keys 1, 2, 3, etc. to the corresponding test.
          // Used for easier keyboard access when selecting tests.
          onLoad() {
            const menu = this;
            const key_test_map = { '1': 'testAll', '2': 'testHeadings', '3': 'testImages', '4': 'testTables', '5': 'testLinks', '6': 'testColor', '7': 'testLabels' };

            CKEDITOR.document.on("keydown", function(evt) {

              // First, get the key that was pressed, and check if the key is valid (a key from 1-6 was pressed).
              // If so, get the test name.
              let key = evt.data.$.key, test_name;
              key in key_test_map ? test_name = key_test_map[ key ] : test_name = '';

              // If the test exists, focus on that option and toggle its value.
              if ( test_name ) {
                let val = menu.getValueOf('a11yTOC', test_name);
                menu.setValueOf('a11yTOC', test_name, !val); 
                menu.getContentElement('a11yTOC', test_name).focus();
              }

            })
          }

        }
      });

      editor.addCommand('testDialog', new CKEDITOR.dialogCommand('a11yTestDialog'));

      editor.ui.addButton('a11yButton', {
          label: 'Accessibility Checker',
          command: 'testDialog',
          toolbar: 'insert',
          icon: 'https://test.libretexts.org/alvin/public/ckeditor-a11ychecker/dist/icons/a11ychecker.png'
        });
      },
    });
};
  
export var filteredIssues;
export default loadPlugin;

/* 
SOURCES:
https://stackoverflow.com/questions/41577975/ckeditor-put-focus-on-html-type-dialog
Credit to this stack overflow post for figuring out how to make elements in a dialog focusable
*/

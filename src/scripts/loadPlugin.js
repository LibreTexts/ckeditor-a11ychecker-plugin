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
                  label: 'Test for all accessibility issues (DEFAULT)',
                  id: 'testAll',
                  labelStyle: 'margin-left: 30px;'
                },
                {
                  type: 'checkbox',
                  label: 'Headings',
                  id: 'testHeadings',
                  labelStyle: 'margin-left: 30px;',
                },
                {
                  type: 'checkbox',
                  label: 'Alt Image Tags',
                  id: 'testImages',
                  labelStyle: 'margin-left: 30px;',
                },
                {
                  type: 'checkbox',
                  label: 'Tables',
                  id: 'testTables',
                  labelStyle: 'margin-left: 30px;',
                },
                {
                  type: 'checkbox',
                  label: 'Links',
                  id: 'testLinks',
                  labelStyle: 'margin-left: 30px;',
                },
                {
                  type: 'checkbox',
                  label: 'Color Contrast',
                  id: 'testColor',
                  labelStyle: 'margin-left: 30px;',
                }
              ],
            },
          ],

          // When the user presses OK, it will get the values of each of the checkboxes,
          // then send this data to customFixes to filter.
          onOk() {
            const menu = this;

            filteredIssues = {
              "All":      menu.getValueOf( 'a11yTOC',  'testAll'      ),
              "Headings": menu.getValueOf( 'a11yTOC',  'testHeadings' ),
              "Images":   menu.getValueOf( 'a11yTOC',  'testImages'   ),
              "Tables":   menu.getValueOf( 'a11yTOC',  'testTables'   ),
              "Links":    menu.getValueOf( 'a11yTOC',  'testLinks'    ),
              "Color":    menu.getValueOf( 'a11yTOC',  'testColor'    )
            };

            editor.execCommand('a11ychecker')
          },

          // When the dialog loads in, this will set up a mapping of the keys 1, 2, 3, etc. to the corresponding test.
          // Used for easier keyboard access when selecting tests.
          onLoad() {
            const menu = this;
            const key_test_map = { '1': 'testAll', '2': 'testHeadings', '3': 'testImages', '4': 'testTables', '5': 'testLinks', '6': 'testColor' };

            CKEDITOR.document.on("keydown", function(evt) {
              let key = evt.data.$.key;

              if ( key in key_test_map ) { 
                let val = menu.getValueOf('a11yTOC', key_test_map[key]);
                menu.setValueOf('a11yTOC', key_test_map[key], !val); 
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

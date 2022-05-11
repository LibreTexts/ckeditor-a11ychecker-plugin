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
                  labelStyle: 'margin-left: 30px;'
                },
                {
                  type: 'checkbox',
                  label: 'Alt Image Tags',
                  id: 'testImages',
                  labelStyle: 'margin-left: 30px;'
                },
                {
                  type: 'checkbox',
                  label: 'Tables',
                  id: 'testTables',
                  labelStyle: 'margin-left: 30px;'
                },
                {
                  type: 'checkbox',
                  label: 'Links',
                  id: 'testLinks',
                  labelStyle: 'margin-left: 30px;'
                }
              ],
            },
          ],
          onOk() {
            const menu = this;

            filteredIssues = {
              "All":      menu.getValueOf( 'a11yTOC',  'testAll'      ),
              "Headings": menu.getValueOf( 'a11yTOC',  'testHeadings' ),
              "Images":   menu.getValueOf( 'a11yTOC',  'testImages'   ),
              "Tables":   menu.getValueOf( 'a11yTOC',  'testTables'   ),
              "Links":    menu.getValueOf( 'a11yTOC',  'testLinks'    )
            };

            editor.execCommand('a11ychecker')
          }
        };
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

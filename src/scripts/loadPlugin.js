import "../styles/index.scss";
import loadCustomFixes from "./customFixes";

const loadPlugin = () => {

    CKEDITOR.plugins.add('a11yButton', {
    init(editor) {

      CKEDITOR.dialog.add('a11yTestDialog', (editor) => {
        return {
          title: 'Accessibility Checker (Menu is WIP)',
          resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
          minWidth: 500,
          minHeight: 400,
          contents: [
            {
              id: 'tab1',
              label: 'First Tab',
              title: 'First Tab Title',
              accessKey: 'Q',
              elements: [
                {
                  type: 'checkbox',
                  label: 'Test for all accessibility issues',
                  id: 'pickAllTests',
                  labelStyle: 'margin-left: 30px'
                },
                {
                  type: 'checkbox',
                  label: 'Headings',
                  id: 'pickHeadings',
                  labelStyle: 'margin-left: 30px'
                },
                {
                  type: 'checkbox',
                  label: 'Alt Image Tags',
                  id: 'pickAltTags',
                  labelStyle: 'margin-left: 30px'
                },
                {
                  type: 'checkbox',
                  label: 'Tables',
                  id: 'pickCheckbox',
                  labelStyle: 'margin-left: 30px'
                }
              ],
            },
          ],
          onOk() {
            // We need to filter out the issues here somehow...
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
  
  export default loadPlugin;

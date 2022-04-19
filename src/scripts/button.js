import "../styles/index.scss";
const loadPlugin = () => {
    CKEDITOR.plugins.add('a11yButton', {
    init(editor) {
        editor.ui.addButton('a11yButton', {
          label: 'Accessibility Checker',
          command: 'a11ychecker',
          toolbar: 'insert',
          icon: 'https://test.libretexts.org/a11y/ckeditor-a11ychecker/dist/icons/a11ychecker.png'
        });
      },
    });
};
  
  export default loadPlugin;

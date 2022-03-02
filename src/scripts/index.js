/*
 * This file is for development only
 */
import './config';
import 'ckeditor4';
import registerPlugin from './plugin';

require('../index.html');
registerPlugin();
CKEDITOR.replace('editor');
CKEDITOR.plugins.add('testing', {
    onLoad: () => {
      window.ckeditorBinderPlugin = {};
    },
    init: (editor) => {

      // add button to toolbar
      editor.ui.addButton('testing', {
        label: 'Accessibility Checker',
        command: 'a11ychecker',
        toolbar: 'insert',
        icon: 'https://test.libretexts.org/alvin/public/ckeditor-a11ychecker/dist/icons/a11ychecker.png',
      });
    },
  });

  if (CKEDITOR.config.extraPlugins === '') {
    CKEDITOR.config.extraPlugins += 'testing';
  } else {
    CKEDITOR.config.extraPlugins += ',testing';
  }


( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {

			var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;
			
			/**
			 * {DESC of quick fix here}
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class {Name of quick fix here}
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function inputTextHasValue( issue ) {
				QuickFix.call( this, issue );
			}

			inputTextHasValue.prototype = new QuickFix();

			inputTextHasValue.prototype.constructor = inputTextHasValue;


			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 inputTextHasValue.prototype.fix = function( formAttributes, callback ) {
                var element = this.issue.element;

                let value = element.getAttribute('name');
                element.setAttribute('value', value);
            

                // element.removeAttribute('href');
                // element.renameNode('span');
    
				if ( callback ) {
					callback( this );
				}
			};

			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/inputTextHasValue', inputTextHasValue);
		}
	} );
}() );

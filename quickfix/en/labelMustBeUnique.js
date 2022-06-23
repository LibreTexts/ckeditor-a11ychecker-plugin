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
			function labelMustBeUnique( issue ) {
				QuickFix.call( this, issue );
			}

			labelMustBeUnique.prototype = new QuickFix();
			labelMustBeUnique.prototype.constructor = labelMustBeUnique;
			

			/**s
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 labelMustBeUnique.prototype.fix = function( formAttributes, callback ) {
				var currElement = this.issue.element;
				var duplicate = currElement.getNext();
				
				duplicate.remove();

    
				if ( callback ) {
					callback( this );
				}
			};

			labelMustBeUnique.prototype.lang = {};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/labelMustBeUnique', labelMustBeUnique);
		}
	} );
}() );

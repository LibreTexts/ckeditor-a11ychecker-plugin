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

			labelMustBeUnique.prototype.display = function( form ) {
				form.setInputs( {
					label: {
						type: 'text',
						label: this.lang.labelText
					}
				} );
			};
			

			/**s
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 labelMustBeUnique.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element;
				var duplicate = element.getNext();

				duplicate.remove();

				element.setHtml(formAttributes.label);

    
				if ( callback ) {
					callback( this );
				}
			};

			labelMustBeUnique.prototype.validate = function( formAttributes ) {
				var proposedLabel = formAttributes.label,
					ret = [];

				// Test if the label has only whitespaces.
				if ( !proposedLabel || proposedLabel.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			labelMustBeUnique.prototype.lang = {"labelText":"Label","errorEmpty":"Label can not be empty"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/labelMustBeUnique', labelMustBeUnique);
		}
	} );
}() );

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
			function imgShouldNotHaveTitle( issue ) {
				QuickFix.call( this, issue );
			}

			imgShouldNotHaveTitle.prototype = new QuickFix();
			imgShouldNotHaveTitle.prototype.constructor = imgShouldNotHaveTitle;
			

			/**s
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 imgShouldNotHaveTitle.prototype.fix = function( formAttributes, callback ) {
				var currElement = this.issue.element;

				var title = currElement.getAttribute('title');
				console.log(title);

				if (currElement.hasAttribute('alt') == false){
					currElement.setAttribute('alt', title);
				}
                currElement.removeAttribute('title');

				if ( callback ) {
					callback( this );
				}
			};

			imgShouldNotHaveTitle.prototype.lang = {};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/imgShouldNotHaveTitle', imgShouldNotHaveTitle);
		}
	} );
}() );

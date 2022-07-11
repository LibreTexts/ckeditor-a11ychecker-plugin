( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {

			var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;
			
			/**
			 * Quick fix for changing header of a box legend to h5.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class BoxLegendHeaderFix
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function BoxLegendHeaderFix( issue ) {
				QuickFix.call( this, issue );
			}

			BoxLegendHeaderFix.prototype = new QuickFix();

			BoxLegendHeaderFix.prototype.constructor = BoxLegendHeaderFix;

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 BoxLegendHeaderFix.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element;

                element.renameNode('h5');
				
				if ( callback ) {
					callback( this );
				}
			};

			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/BoxLegendHeaderFix', BoxLegendHeaderFix);
		}
	} );
}() );

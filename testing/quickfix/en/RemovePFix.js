/**
 * @license Copyright (c) 2014-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/license
 */

/*
*/
( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {
			var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;

			/**
			 * QuickFix for fixing text inputs without a label.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class TextInputs
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function RemovePFix( issue ) {
				QuickFix.call( this, issue );
			}

			RemovePFix.prototype = new QuickFix();

			RemovePFix.prototype.constructor = RemovePFix;

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
             RemovePFix.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element.getAscendant( 'figure' );
				let textArray = element.find('p, figcaption').toArray(),
					newTextContent = element.getText();

				textArray.forEach((item) => { item.remove(); })
				
				element.appendHtml(`<figcaption>${newTextContent}</figcaption>`)

				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/RemovePFix', RemovePFix);
		}
	} );
}() );
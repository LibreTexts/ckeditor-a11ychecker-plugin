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
			function RemoveEmptyPFix( issue ) {
				QuickFix.call( this, issue );
			}

			RemoveEmptyPFix.prototype = new QuickFix();

			RemoveEmptyPFix.prototype.constructor = RemoveEmptyPFix;

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
             RemoveEmptyPFix.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element;

                element.remove();

				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/RemoveEmptyPFix', RemoveEmptyPFix);
		}
	} );
}() );
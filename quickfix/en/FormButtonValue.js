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
			 * QuickFix for adding a value attribute to form inputs with a button type
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class TextInputs
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function FormButtonValueFix( issue ) {
				QuickFix.call( this, issue );
			}

			FormButtonValueFix.prototype = new QuickFix();

			FormButtonValueFix.prototype.constructor = FormButtonValueFix;

			FormButtonValueFix.prototype.display = function( form ) {
				form.setInputs( {
					value: {
						type: 'text',
						label: this.lang.textValue
					}
				} );
			};


			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
             FormButtonValueFix.prototype.fix = function( formAttributes, callback ) {
				var element = this.issue.element;
				element.setAttribute('value', formAttributes.value);
	
				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			FormButtonValueFix.prototype.validate = function( formAttributes ) {
				var proposedText = formAttributes.value,
					ret = [];

				// Test if the caption has only whitespaces.
				if ( !proposedText || proposedText.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			FormButtonValueFix.prototype.lang = {"textValue":"Value","errorEmpty":"Value title can not be empty"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/FormButtonValue', FormButtonValueFix);
		}
	} );
}() );
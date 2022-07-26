/**
 * @license Copyright (c) 2014-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/license
 */

 ( function() {
	'use strict';

	CKEDITOR.plugins.a11ychecker.quickFixes.get( { langCode: 'en',
		name: 'QuickFix',
		callback: function( QuickFix ) {

			var emptyWhitespaceRegExp = /^[\s\n\r]+$/g;
			var decorative = false;
			
			/**
			 * Fixes the image within an anchor tag that is missing alt attribute.
			 *
			 * @constructor
			 */
			function ImgAltAnchor( issue ) {
				QuickFix.call( this, issue );
			}

			/**
			 * Maximal count of characters in the alt. It might be changed to `0` to prevent
			 * length validation.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix.AttributeRename
			 * @static
			 */
             ImgAltAnchor.altLengthLimit = 150;

             ImgAltAnchor.prototype = new QuickFix();
             ImgAltAnchor.prototype.constructor = ImgAltAnchor;

             ImgAltAnchor.prototype.display = function( form ) {
				var dict = {
					'Non-decorative': 'Non-decorative',					
					'Decorative': 'Decorative (select if image is already discussed on page)',
					'Caption': 'Change alt text to caption'
				}
				form.setInputs( {
					type: {
						type: 'select',
						label: 'Image type',
						value: 'Non-decorative',
						options: dict
					},
					alt: {
						type: 'text',
						label: this.lang.altLabel,
						value: this.issue.element.getAttribute( 'alt' ) || ' '
					}
				} );
			};

			ImgAltAnchor.prototype.fix = function( formAttributes, callback ) {
				let element = this.issue.element
                let imgElement = element.findOne('img'); // First image within the anchor tag w/o alt text
                if ( imgElement  ) {
					// If selected decorative,
					// we ignore the form and just set the alt image to blank
					if (formAttributes.type === 'Decorative') {
						element.setAttribute( 'alt', " " );

					// Else if selected caption,
					// check if img is under a figure parent first
					// then set caption
					} else if (formAttributes.type === 'Caption') {
						imgElement.setAttribute( 'alt', " " );
						let parent = element.getParent();
						var figcaption = parent.findOne('figcaption');
						if (!figcaption) {
							figcaption = new CKEDITOR.dom.element( 'figcaption' );
						}
						figcaption.appendText(formAttributes.alt.trim())
						if ( parent.getName() != "figure") {
							var figure = new CKEDITOR.dom.element( 'figure' );
							var elementCopy = element.clone()
							figure.append(elementCopy)
							figure.append(figcaption)
	
							element.insertBeforeMe(figure);
							element.remove()
						} else {
							parent.append(figcaption)
						}
					} else { // Non-decorative needs alt text
						imgElement.setAttribute( 'alt', formAttributes.alt.trim() );
					}
                }

				if ( callback ) {
					callback( this );
				}
			};

			ImgAltAnchor.prototype.validate = function( formAttributes ) {
				if (formAttributes.type === 'Non-decorative' || formAttributes.type === 'Caption') {
					var ret = [],
					proposedAlt = formAttributes.alt + '',
					imgElem = this.issue && this.issue.element,
					lang = this.lang;

					// Test if the alt has only whitespaces.
					if ( proposedAlt.match( emptyWhitespaceRegExp ) ) {
						ret.push( lang.errorWhitespace );
					}

					// Testing against exceeding max length.
					if ( ImgAltAnchor.altLengthLimit && proposedAlt.length > ImgAltAnchor.altLengthLimit && formAttributes.type === 'Non-decorative') {
						var errorTemplate = new CKEDITOR.template( lang.errorTooLong );

						ret.push( errorTemplate.output( {
							limit: ImgAltAnchor.altLengthLimit,
							length: proposedAlt.length
						} ) );
					}

					if ( imgElem ) {
						var fileName = String( imgElem.getAttribute( 'src' ) ).split( '/' ).pop();
						if ( fileName == proposedAlt ) {
							ret.push( lang.errorSameAsFileName );
						}
					}
					return ret;
				}
				return [];
			};

			ImgAltAnchor.prototype.lang = {"altLabel":"Alternative text","errorTooLong":"Alternative text is too long. It should be up to {limit} characters while your has {length}","errorWhitespace":"Alternative text/captions can not only contain whitespace characters/can not be empty","errorSameAsFileName":"Image alt should not be the same as the file name"};
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/ImgAltAnchor', ImgAltAnchor );
		}
	} );
}() );

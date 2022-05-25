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
			function TextLabelFix( issue ) {
				QuickFix.call( this, issue );
			}

			TextLabelFix.prototype = new QuickFix();

			TextLabelFix.prototype.constructor = TextLabelFix;

			TextLabelFix.prototype.display = function( form ) {
				let recommendedPosition,
					inputType = this.issue.element.getAttribute( "type" ),
					lang = this.lang,
					posOptions = {
						"Left": lang["position-left"],
						"Right": lang["position-right"],
						"Above": lang["position-above"]
					},
					isCheckboxOrRadio = inputType == "checkbox" || inputType == "radio";

				isCheckboxOrRadio ? recommendedPosition = "Right" : recommendedPosition = "Above";
				posOptions[recommendedPosition] += " (Recommended)";

				form.setInputs( {
					label: {
						type: 'text',
						label: this.lang.textLabel
					},
					select: {
						type: 'select',
						label: 'Position',
						value: recommendedPosition,
						options: posOptions
					}
				} );
			};


			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
             TextLabelFix.prototype.fix = function( formAttributes, callback ) {
				let element = this.issue.element,
					label = new CKEDITOR.dom.element( 'label' ),
                	id = element.getAttribute("id"),
					selection = formAttributes.select;

                label.appendText(formAttributes.label);

				// Determining if the input has an ID
                if (id == null) { 
					element.setAttribute("id", formAttributes.label);
					label.setAttribute("for", formAttributes.label);
				} else {
					label.setAttribute("for", id);
				}

				// Determining where to place the label
				switch( selection ) {
					case "Right":
						label.setStyle("display", "inline-block");
						label.setStyle("margin-left", "30px");
						label.insertAfter(element);
						break;
					case "Above":
						label.setStyle("display", "block");
						element.insertBeforeMe(label);
						break;
					default:
						label.setStyle("display", "inline-block");
						element.insertBeforeMe(label);
						break;
				}

				// Callback
				if ( callback ) {
					callback( this );
				}
			};

			TextLabelFix.prototype.validate = function( formAttributes ) {
				var proposedText = formAttributes.label,
					ret = [];

				// Test if the caption has only whitespaces.
				if ( !proposedText || proposedText.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};

			TextLabelFix.prototype.lang = {
				"textLabel":"Label","errorEmpty":"Label title can not be empty", 
				"position-left": "Left", 
				"position-right": "Right",
				"position-above": "Above"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/FormFieldLabel', TextLabelFix);
		}
	} );
}() );
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

			/**
			 * QuickFix adding a caption in the `table` element.
			 *
			 * @member CKEDITOR.plugins.a11ychecker.quickFix
			 * @class AcronymFix
			 * @constructor
			 * @param {CKEDITOR.plugins.a11ychecker.Issue} issue Issue QuickFix is created for.
			 */
			function AcronymFix( issue ) {
				QuickFix.call( this, issue );
			}

			// Parses the content into a list of acronyms (occurs BEFORE quickfix is clicked)
			// Returns null if the element is span.acronym
			function findAcronyms( issue ) {
				const alpha = /^[A-Z]{2,}(?=(<\/(?!span)\w*?|\s|\,|\.|(&nbsp)))?/g; // Uppercase letters with length of at least 2 from beginning (^) to end ($)
				let issueElement = issue.element;
				if (issueElement.getName() == 'span') { return null };

				// Get inner text and parse into a list of words (span.acronym will only have one word)
				let text = issueElement.getHtml().split(/(\s|>)/g),
					newText = [];
				console.log("Text, ", text);
				// Find all the unique acronyms in issueElement
				let uniqueAcronyms = text.filter( (word, index) => {
					return word.match(alpha) && text.indexOf(word.match(/^[A-Z]{2,}/g)) == index;
					// return word.match(alpha) && text.indexOf(word) == index;
				});
				console.log("unique ", uniqueAcronyms);

				// Wrap all acronyms in a span tag (with acronym class if first occurence)
				text.forEach( function(word, index) {
					newText[index] = word;
					if ( uniqueAcronyms.includes(word) ) {
						let acronym = CKEDITOR.document.createElement('span');
						acronym.setHtml(word);
						if ( text.indexOf(word) == index ) {
							acronym.addClass('acronym');
						}
						newText[index] = acronym.getOuterHtml();
					}
				});
				issueElement.setHtml(newText.join(" "));
				return uniqueAcronyms;
			}

			AcronymFix.prototype = new QuickFix();

			AcronymFix.prototype.constructor = AcronymFix;

			AcronymFix.prototype.display = function( form ) {
				let acronymList = findAcronyms(this.issue);
				let acronym = this.issue.element.getText();
				if (acronymList) { 
					// If scanning whole page, only allow input if there's one acronym
					acronym = acronymList[0];
					if (acronymList.length > 1) { return; }
				}

				form.setInputs( {
					acronym: {
						type: 'text',
						label: `Definition of "${acronym}"`
					}
				} );
			};

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 AcronymFix.prototype.fix = function( formAttributes, callback ) {
				let issueElement = this.issue.element;
				// Only allows acronymFix if issueElement is a single acronym
				if (formAttributes.acronym) {
					issueElement.removeClass('acronym');
					if (formAttributes.acronym.indexOf('N/A') == -1)  {
						issueElement.renameNode('abbr');
						issueElement.setAttribute('title', formAttributes.acronym);
					}
				}
				
				if ( callback ) {
					callback( this );
				}
			};

			AcronymFix.prototype.validate = function( formAttributes ) {
				let ret = [];
				if ("acronym" in formAttributes) {
					if ( !formAttributes.acronym || formAttributes.acronym.match( emptyWhitespaceRegExp ) ) {
						ret.push( this.lang.errorEmpty );
					}
				}
				return ret;
			};

			AcronymFix.prototype.lang = {"acronymLabel":"Acronym","errorEmpty":"Acronym definition can not be empty"};
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/AcronymFix', AcronymFix );
		}
	} );
}() );

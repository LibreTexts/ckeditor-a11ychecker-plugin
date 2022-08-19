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

			// Parses the content into a list of acronyms (occurs BEFORE user clicks quickfix button)
			function findAcronyms( issue ) {
				let issueElement = issue.element;
				// span.acronym tags are individually marked and do not need to be found
				if (issueElement.getName() == 'span') { return; }
				
				// All uppercase, >2 length, surrounded by whitespace (including &nbsp;), punctuation, or HTML tags (excluding span)
            	// first char = whitespace or '>' bc positive lookbehind is not supported on Safari yet (July 2022)
				// const alphaRegex = /((>|\s)[A-Z]{2,}(?=(<\/(?!span)\w*?>|\s|\,|\.|(&nbsp))))/g
				const alphaRegex = /((>|\s)[A-Z]{2,}(?=(<\/\w*?>|\s|\,|\.|(&nbsp))))/g
				const acronymRegex = /[A-Z]{2,}/g

				let acronyms = issueElement.getHtml().match(alphaRegex);
				// console.log(issueElement.getHtml())

				// Ignore Chemical Compounds
				const chemTags = ['sub', 'sup']
				chemTags.forEach( tag => {
					let tags = issueElement.find(tag).toArray();
					if (tags) {
						tags = tags.map( e => { 
							let html = e.getParent().getHtml().match(acronymRegex);
							// console.log(html)
							return html ? html.join() : "";
						});
						acronyms = acronyms.filter( a => { return !tags.includes(a.slice(1)) });
						// console.log("filtered ", acronyms);
					}
				});

				// Remove any acronyms that are already properly tagged
				const ignoreTags = ['abbr', 'span.acronym-ignore', 'span.acronym', 'a'];
           		ignoreTags.forEach( tag => {
					let tags = issueElement.find(tag).toArray();
					if (tags) {
						tags = tags.map( e => { 
							let html = e.getHtml().match(acronymRegex);
							return html ? html.join() : "";
						});
						acronyms = acronyms.filter( a => { return !tags.includes(a.slice(1)) });
					}
				});
				// console.log("acronyms ", acronyms);

				// Split the page's text by each untagged acronym
				let text = issueElement.getHtml(),
					newText = [];
				acronyms.forEach( a => { 
					newText.push( text.slice(0, text.indexOf(a) + 1) ); // text preceding the acronym
					// Place acronym within a span.acronym tag
					let acronymSpan = CKEDITOR.document.createElement('span');
					acronymSpan.addClass('acronym');
					acronymSpan.setHtml(a.slice(1)); // exclude first char (see alphaRegex note)
					// Add the span if its the acronym's first occurance
					if (!newText.includes(acronymSpan.getOuterHtml())) {
						newText.push( acronymSpan.getOuterHtml() );
					} else {
						newText.push( a.slice(1) );
					}
					// Remove preceding text and acronym for next iteration
					text = text.slice(text.indexOf(a) + a.length);
				});
				if (text) { newText.push(text); }

				// console.log(newText);
				issueElement.setHtml(newText.join(""));
			}

			AcronymFix.prototype = new QuickFix();

			AcronymFix.prototype.constructor = AcronymFix;

			AcronymFix.prototype.display = function( form ) {
				let dict = {
					'Acronym': 'Label Acronym',					
					'Reformat': 'Reformat text to lowercase (Recommended for non-acronyms)',
					'Ignore': 'Ignore text'
				}

				findAcronyms(this.issue);
				if (this.issue.element.getName() == 'span') {
					
					let acronym = this.issue.element.getText();
					form.setInputs( {
						type: {
							type: 'select',
							label: 'Fix',
							value: 'Acronym',
							options: dict
						},
						acronym: {
							type: 'text',
							label: `Definition of "${acronym}"`
						}
					} );
				}
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
				if (formAttributes.acronym && issueElement.getName() == 'span') {
					issueElement.removeClass('acronym');
					if (formAttributes.type == 'Acronym') {
						issueElement.renameNode('abbr');
						issueElement.setAttribute('title', formAttributes.acronym);
					} else if ( formAttributes.type == 'Reformat') { 
						// Get any text preceding the issueElement's text within the block/paragraph
						const inlineTags = ['b', 'strong', 'em', 'i']; // tags to ignore when finding parent
						let parent = issueElement.getAscendant( e => !inlineTags.includes(e.getName()) ).getText();
						let prevText = parent.slice(0, parent.indexOf(issueElement.getText())).trim();

						// Change the word to lowercase but capitalize the word if it is at the beginning of a block or sentence
						let text = issueElement.getText().toLowerCase();
						if (!prevText || prevText[prevText.length-1] == '.') {
							text = text[0].toUpperCase() + text.slice(1);
						}
						issueElement.setText(text);

						// Remove surrounding span tag used to identify potential acronyms
						if (issueElement.hasNext()) { // Insert before next sibling
							issueElement.getNext().insertBeforeMe(issueElement.getChild(0));
						} else { // just append to parent if last/only child
							issueElement.moveChildren(issueElement.getParent());
						}
						issueElement.remove();
					} else if ( formAttributes.type == 'Ignore') {
						issueElement.addClass('acronym-ignore');
					}
				}
				
				if ( callback ) {
					callback( this );
				}
			};

			AcronymFix.prototype.validate = function( formAttributes ) {
				let ret = [];
				if (!("acronym" in formAttributes)) { return ret; }
				// Cannot have empty input
				if ( !formAttributes.acronym || formAttributes.acronym.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
					return ret;
				}
				// Acronym definition cannot be "N/A"
				if (formAttributes.type == 'Acronym' && formAttributes.acronym.trim().toUpperCase() == 'N/A') {
					ret.push( this.lang.errorNA );
				} 
				// Reformatting or Ignoring does not need an acronym definition -> set to "N/A" to avoid losing user input
				else if (formAttributes.type != 'Acronym'  && formAttributes.acronym.trim().toUpperCase() != 'N/A') {
					ret.push( this.lang.errorMissingNA );
				}
				return ret;
			};

			AcronymFix.prototype.lang = {"acronymLabel":"Acronym","errorEmpty":"Acronym definition can not be empty", "errorNA":"Acronym definition cannot be \"N/A\"", "errorMissingNA":"For non-acronyms, set the definition to \"N/A\""};
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/AcronymFix', AcronymFix );
		}
	} );
}() );

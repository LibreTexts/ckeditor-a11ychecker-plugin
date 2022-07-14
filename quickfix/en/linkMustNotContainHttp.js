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
			function linkMustNotContainHttp( issue ) {
				QuickFix.call( this, issue );
			}

			linkMustNotContainHttp.prototype = new QuickFix();

			linkMustNotContainHttp.prototype.constructor = linkMustNotContainHttp;

			linkMustNotContainHttp.prototype.display = function( form ) {
				form.setInputs( {
					link: {
						type: 'text',
						label: this.lang.linkText
					}
				} );
			};


			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 linkMustNotContainHttp.prototype.fix = function( formAttributes, callback ) {
                var element = this.issue.element;
				// console.log(element);

				// var html = element.getHtml();
				// console.log(html);

				element.setHtml(formAttributes.link);

				if ( callback ) {
					callback( this );
				}
			};


			linkMustNotContainHttp.prototype.validate = function( formAttributes ) {
				var proposedLink = formAttributes.link,
					ret = [];

				// Test if the label has only whitespaces.
				if ( !proposedLink || proposedLink.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};



			linkMustNotContainHttp.prototype.lang = {"linkText":"Link","errorEmpty":"Link can't be empty and has to have some text"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/linkMustNotContainHttp', linkMustNotContainHttp);
		}
	} );
}() );

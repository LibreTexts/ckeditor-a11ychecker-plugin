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
			function mailToLinkMustNotHaveEmail( issue ) {
				QuickFix.call( this, issue );
			}

			mailToLinkMustNotHaveEmail.prototype = new QuickFix();

			mailToLinkMustNotHaveEmail.prototype.constructor = mailToLinkMustNotHaveEmail;

			mailToLinkMustNotHaveEmail.prototype.display = function( form ) {
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
			 mailToLinkMustNotHaveEmail.prototype.fix = function( formAttributes, callback ) {
                var element = this.issue.element;
 
				element.setHtml('Email: ');
                element.appendHtml(formAttributes.link);

				if ( callback ) {
					callback( this );
				}
			};


			mailToLinkMustNotHaveEmail.prototype.validate = function( formAttributes ) {
				var proposedLink = formAttributes.link,
					ret = [];

				// Test if the label has only whitespaces.
				if ( !proposedLink || proposedLink.match( emptyWhitespaceRegExp ) ) {
					ret.push( this.lang.errorEmpty );
				}

				return ret;
			};



			mailToLinkMustNotHaveEmail.prototype.lang = {"linkText":"Email Owner","errorEmpty":"Link can't be empty and has to have some text"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/mailToLinkMustNotHaveEmail', mailToLinkMustNotHaveEmail);
		}
	} );
}() );

// To use this template, copy this file and paste it in plugins/a11ychecker/quickfix/en and rename it
// to the name of your quick fix.

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
			function ColorContrastFix( issue ) {
				QuickFix.call( this, issue );
			}

			ColorContrastFix.prototype = new QuickFix();

			ColorContrastFix.prototype.constructor = ColorContrastFix;

			/**
			 * @param {Object} formAttributes Object containing serialized form inputs. See
			 * {@link CKEDITOR.plugins.a11ychecker.ViewerForm#serialize}.
			 * @param {Function} callback Function to be called when a fix was applied. Gets QuickFix object
			 * as a first parameter.
			 */
			 ColorContrastFix.prototype.fix = function( formAttributes, callback ) {
				var issueElement = this.issue.element;
				console.log("issue: ", issueElement);
				var colorSpan; // Change this span's class to the font color
				var bgColorSpan;
				var bgColor;
				
				// Find issue parent span with color font class (if exists)
				var parentSpans = issueElement.getParents(true);
				parentSpans.forEach(function(parent) {
					if (parent.getName() == 'span') {
						// Convert any style attributes to class attributes
						var styleAttribute = parent.getStyle("background-color");
						console.log("Style Attribute", styleAttribute);
						if (styleAttribute != "") {
							bgColor = RGBToHex(styleAttribute.toString());
							console.log("BGCOLOR: ", bgColor);
							bgColorSpan = parent;
						}

						var spanClass = parent.getAttribute("class");
						if (spanClass && spanClass.startsWith("mt-color")) {
							parent.remove(true);
						}
						if (spanClass && spanClass.startsWith("mt-bgcolor")) {
							bgColorSpan = parent;
							bgColor = spanClass.substr(11);
						}
					}
				});
				if (!bgColorSpan && issueElement.getAttribute("class")) {
					if (issueElement.getAttribute("class").startsWith("mt-bgcolor")) {
						bgColorSpan = issueElement;
						bgColor = issueElement.getAttribute("class").substr(11);
					}
				}
				console.log("bgColorSpan:", bgColorSpan);
				colorSpan = new CKEDITOR.dom.element( 'span' );
				if (!bgColorSpan) {
					colorSpan.setText(issueElement.getText());
					issueElement.setText("");
					issueElement.append(colorSpan); 
				} else {
					bgColorSpan.insertBeforeMe(colorSpan);
					colorSpan.append(bgColorSpan.clone(true, true));
					colorSpan.getNext().remove();
				}

				
				
				// bgColorSpan.getParent().moveChildren(colorSpan);
				// bgColorSpan.getParent().append(colorSpan);

				
				// Get the background color's luminosity 
				if (!bgColor) bgColor = "ffffff";
				var lBg = getLuminosity(bgColor);
				// console.log("lb", getLuminosity("000000"));
				// console.log("lw", getLuminosity("ffffff"));
				// console.log("lbg", getLuminosity(bgColor));
				// Relative Luminosity for white = 1 and black = 0
				var ratioB = ((Math.max(0, lBg) + 0.05)/(Math.min(0, lBg) + 0.05)*10)/10;
				var ratioW = ((Math.max(1, lBg) + 0.05)/(Math.min(1, lBg) + 0.05)*10)/10;

				console.log("ratioB", ratioB);
				console.log("ratioW", ratioW);
				var fontColor = (ratioB <= ratioW) ? "ffffff" : "000000";
				var colorClass = "mt-color-" + fontColor;
				console.log("Class: ", colorClass);

				colorSpan.addClass(colorClass);

				if ( callback ) {
					callback( this );
				}
			};

			ColorContrastFix.prototype.lang = {"summaryLabel":"Summary","errorEmpty":"Summary text can not be empty"};
			// Add to our quick fixes
			CKEDITOR.plugins.a11ychecker.quickFixes.add( 'en/ColorContrastFix', ColorContrastFix);
		}
	} );
}() );

// Get the luminosity of a input color string
function getLuminosity (color) {
	// Parse color into R, B, G
	var RsRGB2 = parseInt(color.substr(0, 2), 16)/255;
	var GsRGB2 = parseInt(color.substr(2, 2), 16)/255;
	var BsRGB2 = parseInt(color.substr(4, 2), 16)/255;

	var R = (RsRGB2 <= 0.03928) ? RsRGB2/12.92 : Math.pow((RsRGB2+0.055)/1.055, 2.4);
	var G = (GsRGB2 <= 0.03928) ? GsRGB2/12.92 : Math.pow((GsRGB2+0.055)/1.055, 2.4);
	var B = (BsRGB2 <= 0.03928) ? BsRGB2/12.92 : Math.pow((BsRGB2+0.055)/1.055, 2.4);
	var l1 = (0.2126 * R + 0.7152 * G + 0.0722 * B);
	return l1;
}

function RGBToHex(color) {
	let colors = color.substr(color.indexOf("(")+1).split(",");
	console.log("Colors: ", colors);
	r = parseInt(colors[0]).toString(16);
	g = parseInt(colors[1]).toString(16);
	b = parseInt(colors[2]).toString(16);

	if (r.length == 1)
	  r = "0" + r;
	if (g.length == 1)
	  g = "0" + g;
	if (b.length == 1)
	  b = "0" + b;
	var color = r.toString() + g.toString() + b.toString();
	console.log("RGBTOHEXCOLOR: ", color);
	return color;
  }
/*
*
* This is where we determine what issues to test for, and where we map those issues with a quick fix.
*
*/

// Pre-built issues. You can find them all at the bottom of the file.
var issueList = [
    "aLinksDontOpenNewWindow", 
    "aAdjacentWithSameResourceShouldBeCombined",
    // "aImgAltNotRepetitive", // Not mapped
    "aMustNotHaveJavascriptHref",
    // "documentVisualListsAreMarkedUp", // Not mapped
    "imgAltNotEmptyInAnchor",
    "imgShouldNotHaveTitle",
    "pNotUsedAsHeader",
    "tableDataShouldHaveTh",
    "tableWithBothHeadersUseScope",
    "tableComplexHasSummary",
    "aSuspiciousLinkText",
    "tableSummaryDoesNotDuplicateCaption",
    "imgAltIsDifferent",
    "imgAltIsTooLong",
    "imgWithEmptyAlt",
    "headerH1",
    "headerH2",
    "headerH3",
    "headerH4",
    "headerH5",
    "headerH6",
    "inputTextHasLabel",
    "checkboxHasLabel",
    "radioHasLabel",
    "textareaHasAssociatedLabel",
    "selectHasAssociatedLabel",
    "passwordHasLabel",
    "fileHasLabel",
    "fieldsetHasLabel",
    "tableUsesCaption",
    // "labelMustBeUnique",
    // "colorFontContrast", // Removed from live (7/22)
    // 'documentIDsMustBeUnique', // Not mapped
    "formButtonsHaveValue"
    //"blockquoteNotUsedForIndentation",
];

// Mapping pre-built issues with quick fixes
var issueMapping = {
    aLinksDontOpenNewWindow:["NewWindowLink"],
    KINGUseLongDateFormat:["DateUnfold"],
    aAdjacentWithSameResourceShouldBeCombined:["AnchorsMerge"],
    aMustNotHaveJavascriptHref: ["aMustNotHaveJShref"],
    imgImportantNoSpacerAlt:["ImgAlt"], // Not live
    imgWithEmptyAlt:["ImgAltNonEmpty"],
    imgAltNotEmptyInAnchor:["ImgAltAnchor"],
    imgAltIsDifferent:["ImgAlt"],
    imgAltIsTooLong:["ImgAlt"],
    imgShouldNotHaveTitle:["AttributeRenameDefault"],
    pNotUsedAsHeader:["ParagraphToHeader"],
    headerH1:["ParagraphToHeader"],
    headerH2:["ParagraphToHeader"],
    headerH3:["ParagraphToHeader"],
    headerH4:["ParagraphToHeader"],
    headerH5:["ParagraphToHeader"],
    headerH6:["ParagraphToHeader"],
    inputTextHasLabel:["FormFieldLabel"],
    checkboxHasLabel:["FormFieldLabel"],
    radioHasLabel:["FormFieldLabel"],
    textareaHasAssociatedLabel:["FormFieldLabel"],
    selectHasAssociatedLabel:["FormFieldLabel"],
    passwordHasLabel:["FormFieldLabel"],
    fileHasLabel:["FormFieldLabel"],
    fieldsetHasLabel:["FieldsetLegend"],
    aSuspiciousLinkText:["SuspiciousLinkFix"],
    // aMustHaveTitle:["LinkTitleFix"], // Not live (a tags shouldn't have titles)
    tableUsesCaption:["AddTableCaption"],
    tableDataShouldHaveTh:["TableHeaders"],
    tableWithBothHeadersUseScope:["TableScope"],
    tableSummaryDoesNotDuplicateCaption:["ChangeTableSummary"],
    tableComplexHasSummary:["AddTableSummary"],
    // colorFontContrast:["ColorContrastFix"],
    formButtonsHaveValue: ["FormButtonValue"],
    labelMustBeUnique: ["labelMustBeUnique"]

    //RemoveP:["RemoveEmptyPFix"]
}

/*
* Custom tests + fixes
*
* Add all custom tests here as an object to the end of customIssues array.
* If there is no quick fix name available, just leave quickfixName blank.
*
* If a custom test does not require a custom selector function, set customSelector to null
* The custom selector function returns null if CKeditor should NOT mark as an issues
*/

var customIssues = [
    {
        selector: 'h5:not(section h5, div h5),h6:not(section h6, div h6)',
        customSelector: null,
        testability: 'Error',
        id: 'ReservedHeaders',
        title: 'H5 and H6 is reserved for LibreTexts',
        desc: 'LibreTexts reserves heading level 5 and heading level 6, and should not be used outside of boxes for sidebar content. Clicking quick fix will change this heading to a header level 4.',
        quickfixName: 'ReservedHeaders'
    },
    {
        selector: '.mt-font-size-8',
        customSelector: null,
        testability: 'Notice',
        id: 'FontSizeIsTooSmall',
        title: 'Font size is too small',
        desc: 'All text elements should be at least 10pt font size.',
        quickfixName: 'FontSizeFix'
    },
    {
        // !! We are checking for not media attributes because they break the plugin !!
        selector: 'img:not([alt]):not([media], a img:not([alt]))',
        customSelector: null,
        testability: 'Error',
        id: 'ImgHasAltNew',
        title: 'Images must provide alternative text',
        desc: 'Alternative text needs to convey the same information as the image. This text will be used when the browser has disabled images, the image was not found on the server, or by non-sighted visitors who use screen readers.',
        quickfixName: 'ImgAlt'
    },
    {
        selector: 'figure p',
        customSelector: null,
        testability: 'Error',
        id: 'CombineFigcaptionAndPTags',
        title: 'Use a single figcaption in a figure',
        desc: "Accessibility checker has noticed in the HTML that text other than the figcaption is present in this figure. Pressing quick fix will combine it for you into one caption. " + "<br/><br/>" + "Tip: When typing a new line in your caption, use SHIFT + ENTER.",
        quickfixName: 'RemovePFix'
    }, 
    {
        selector: 'h1.dummyClass',
        customSelector: null,
        testability: 'Error',
        id: 'DummyID',
        title: 'This is a dummy custom test.',
        desc: 'If you are reading this, this is a dummy class that is kept for development purposes. Please rename the class of this element.',
        quickfixName: ''
    },
    {
        selector: '.box-legend:not(h5)',
        customSelector: null,
        testability: 'Error',
        id: 'boxLegendHasHeader',
        title: 'Headers for box legends should use an h5 tag',
        desc: 'Box legends should use headers to maintain page organization',
        quickfixName: 'BoxLegendHeaderFix'
    },
    {
        selector: 'a',
        customSelector: function(element){
                let text  = element.getText();
                if(text.includes('/'))
                    return text;
            },
        testability: 'Error',
        id: 'linkMustNotContainHttp',
        title: 'There exists a link text that contains or starts with http(s)',
        desc: "URL's are inaccessible to screenreaders due to the long text link, shorten to a link description for accessibility purposes. If leaving libretext, the checker will list site automatically.",
        quickfixName: 'linkMustNotContainHttp'
    },
    {
        selector: 'a[href*="mailto"]',
        customSelector: function(element){
                let text  = element.getText();
                if(text.includes('@'))
                    return text;
            },
        testability: 'Error',
        id: 'mailToLinkMustNotHaveEmail',
        title: 'There exists a link displaying the whole email address',
        desc: "A 'mail-to' link must not contain the whole email address as its text as it already links to it. Please input name only, email will be placed before the name.",
        quickfixName: 'mailToLinkMustNotHaveEmail'
    },
    {
        selector: 'iframe',
        customSelector: function(element){
                if(element.hasAttribute('title') == false)
                    return element;
                else if(element.getAttribute('title') == '')
                    return element;
            },
        testability: 'Error',
        id: 'iframeMustHaveTitle',
        title: 'The iframe does not contain a title',
        desc: "All iframes must contain a title for the screen reader to provide information about the video.",
        quickfixName: 'iframeMustHaveTitle'
    }
    // Do not push yet: This is for Acronyms and Chemical Compounds
    // {
    //     selector: 'span.chemical-compound',
    //     customSelector: function(element) {
    //         if (element.getName() == 'span') {
    //             return true;
    //         }
    //         // console.log("Editor: ", CKEDITOR.document.getBody());
    //         // All uppercase, >2 length, surrounded by whitespace (including &nbsp;), punctuation, or HTML tags (excluding span)
    //         const chemRegex = /(<sup>)|(<sub>)|(([A-Z][a-z]?){2,})/g;
    //         // const chemDelim = /\s|(?:<(?!(?:\/?sup)|(?:\/?sub))(?:.)*?>)/g; // delimiter to split 
    //         const chemDelim = /(\s)|(<(?!(\/?sup)|(\/?sub))(.)*?>)/g; // delimiter to split 
    //         const chemElemRegex = /[^HBCNOFPSKVYIWU]/g; // Alphabet excluding any single char elements 
    //         console.log("text: ", element.getHtml());
    //         let words = element.getHtml().split(chemDelim).filter(w => w);
    //         console.log("words: ", words);
    //         // Merge split elements 
    //         for (let i = 0; i < words.length; i++) {
    //             if (words[i].includes('<sub') || words[i].includes('<sup')) {
    //                 let next = 1, concatWord = words[i];
    //                 while (!concatWord.includes('>')) {
    //                     concatWord += words[i+next];
    //                     next++;
    //                 }
    //                 words.splice(i, next, concatWord);
    //                 i += next-1;
    //             }
    //         }
    //         console.log("words: ", words);
    //         let chem_com = words.filter( (w) => { return chemRegex.test(w) });
    //         console.log("chemical compounds: ", chem_com);
    //         // Remove any acronyms that are already within an abbr tag
    //         let abbrTags = element.find('abbr').toArray();
    //         abbrTags.concat(element.find('span').toArray());
    //         abbrTags = abbrTags.map( e => {return e.getHtml().slice()});
    //         chem_com = chem_com.filter( a => { 
    //             return !abbrTags.includes(a) && a.match(/[A-Z]{2,}/g) ? !chemElemRegex.test(a.match(/[A-Z]/g).join('')) : true;
    //         });
    //         console.log("chemical compounds filtered: ", chem_com);
    //         return chem_com ? chem_com.length : 0;
    //     },
    //     testability: 'Error',
    //     id: 'ChemAbbrInTags',
    //     title: 'This page contains at least one chemical compound that should be within an abbr tag',
    //     desc: 'Chemical compounds should be given a definition by adding a title to an abbr tag. Input "N/A" if this should be ignored. If no input appears, press "Quick fix" to mark individual compounds.',
    //     quickfixName: ''
    // },
    // Do not push yet: custom color contrast
    /*{
        selector: 'p',
        customSelector: function(element){
            function getColor(color) {
                let colorHex = "";
                let colors = color.slice(4).split(',');
                colors.forEach(color => {
                    let c = parseInt(color).toString(16);
                    colorHex += (c.length == 1) ? "0" + c : c;
                });
                return colorHex;
            };

            // get foreground color and check for LibreTexts class mt-color-######
            function getFgColor(element) {
                let foreground = element.getComputedStyle('color') ? element.getComputedStyle('color') : 'rbg(0,0,0)';
                let fgClass = element.getAscendant(function (e) {
                    return e.type == 1 && e.getAttribute('class') ? e.getAttribute('class').indexOf('mt-color') != -1 : null;
                }, true);
                return fgClass ? fgClass.getAttribute('class').slice(9) : getColor(foreground);
            }

            function getBgColor(element) {
                let background = element.getAscendant( function(e) {
                    if (e!= 1) {
                        return null;
                    }
                    return hasBackgroundColor(e.getComputedStyle('background-color'));
                }, true );
                if (!background) {
                    return 'ffffff'; // Assume default background is white
                }
                // Check if mt-bgcolor-##### span exists because class supercedes style
                let bgClass = element.getAscendant(function (e) {
                    return e.type == 1 && e.getAttribute('class') ? e.getAttribute('class').indexOf('mt-bgcolor') != -1 : null;
                }, true);
                return bgClass ? bgClass.getAttribute('class').slice(11) : getColor(background.getComputedStyle('background-color'));
            }

            function hasBackgroundColor(bcolor) {
                return bcolor !== 'rgba(0, 0, 0, 0)' && bcolor !== 'transparent';
            };


            function testElementContrast(element) {
                console.log("foreground color: ", getFgColor(element));
                console.log("background color: ", getBgColor(element));
                return true;
                // test that the colors pass the wcag color contrast
            };

            return testElementContrast(element);
        },
        testability: 'Error',
        id: 'colorFontContrastCustom',
        title: 'All elements should be checked for appropriate color contrast, excluding links',
        desc: 'This checks that all elements (ignoring links) have a 5:1 color font contrast',
        quickfixName: 'ColorContrastFix'
    }*/
    // Do not push yet: This is checking for captions in video media
    // {
    //     selector: 'div.mt-video-widget',
    //     customSelector: function( element ) {
    //         if (element.getAttribute("data-video-url")) {
    //             return element.getAttribute("data-video-url").indexOf("//www.youtube.com/embed/") !== -1;
    //         } else if (element.getElementsByTag("iframe").getItem(0).getAttribute("src")) {
    //             return element.getElementsByTag("iframe").getItem(0).getAttribute("src").indexOf("//player.vimeo.com/video/") !== -1;
    //         }
    //         return false;
    //     },
    //     testability: 'Notice',
    //     id: 'embeddedMedia',
    //     title: 'This is embedded media',
    //     desc: 'This should mark embedded video media as a notice',
    //     quickfixName: ''
    // }
    // !! DO NOT PUSH YET, ONLY COMMENT OUT FOR TESTING !!
    // {
    //     selector: 'img[alt]:not(img[alt].alt-tag-verified), img[alt=" "]:not(img[alt=" "].alt-tag-verified',
    //     testability: 'Notice',
    //     id: 'VerifyAltTag',
    //     title: 'Verify the alt tag',
    //     desc: 'Verify that the alt tag correctly describes the image. If the alt tag is blank, verify that it is decorative or that it has a caption describing the image.',
    //     quickfixName: 'ImgAltVerify',
    // },
    // {
    //     selector: 'figure p:not(figcaption p)',
    //     testability: 'Error',
    //     id: 'RemoveP',
    //     title: 'Remove p tags in figures',
    //     desc: 'Title',
    //     quickfixName: 'RemoveEmptyPFix'
    // }
    // {
    //     selector: 'div',
    //     testability: 'Notice',
    //     id: 'DivsShouldBeSections',
    //     title: 'Div elements should be sections',
    //     desc: 'All divs in LibreTexts should be section landmarks instead.',
    //     quickfixName: 'DivToSection'
    // },
    // {
    //     selector: 'th p',
    //     testability: 'Error',
    //     id: 'TableHeaderShouldNotHavePTag',
    //      title: 'Paragraph elements should not be inside table headers',
    //     desc: 'Using paragraph tags inside table header elements will disrupt the flow of the table.',
    //     quickfixName: 'PTagInTableHeaderFix'
    // },
]

// These are categories of issues that help us filter. Add accordingly.
var headingTests = ["pNotUsedAsHeader", "headerH1","headerH2","headerH3","headerH4","headerH5","headerH6"];
var imageTests = ["imgShouldNotHaveTitle","imgAltIsDifferent","imgAltIsTooLong","imgWithEmptyAlt", "imgAltNotEmptyInAnchor"];
var tableTests = ["tableWithBothHeadersUseScope","tableComplexHasSummary","tableSummaryDoesNotDuplicateCaption", "tableUsesCaption"];
var linkTests = ["aLinksDontOpenNewWindow", "aAdjacentWithSameResourceShouldBeCombined","aImgAltNotRepetitive", "aSuspiciousLinkText"];
var colorTests = ["KINGUseLongDateFormat"]; // change to "colorFontContrast" to re-enable color contrast checker
var labelTests = ["inputTextHasLabel", "checkboxHasLabel", "radioHasLabel", "textareaHasAssociatedLabel", "selectHasAssociatedLabel", "passwordHasLabel", "fileHasLabel", "fieldsetHasLabel"];
var customHeadingTests = ["ReservedHeaders", "boxLegendHasHeader"];
var customImageTests = ["ImgHasAltNew"];
// var customAbbreviationTests = ["ChemAbbrInTags", "AcronymInTag"];

export var issueList, issueMapping, customIssues, headingTests, imageTests, tableTests, linkTests, colorTests, labelTests, customHeadingTests, customImageTests;
// export var issueList, issueMapping, customIssues, headingTests, imageTests, tableTests, linkTests, colorTests, labelTests, customHeadingTests, customImageTests, customAbbreviationTests;

/*
MASTER LIST
***********
aAdjacentWithSameResourceShouldBeCombined
aImgAltNotRepetitive
aInPHasADistinctStyle
aLinkTextDoesNotBeginWithRedundantWord
aLinksAreSeparatedByPrintableCharacters
aLinksDontOpenNewWindow
aLinksNotSeparatedBySymbols
aLinksToMultiMediaRequireTranscript
aLinksToSoundFilesNeedTranscripts
aLinkWithNonText
aMultimediaTextAlternative
aMustContainText
aMustHaveTitle
aMustNotHaveJavascriptHref
aSuspiciousLinkText
aTitleDescribesDestination
addressForAuthor
addressForAuthorMustBeValid
appletContainsTextEquivalent
appletContainsTextEquivalentInAlt
appletProvidesMechanismToReturnToParent
appletTextEquivalentsGetUpdated
appletUIMustBeAccessible
appletsDoNotFlicker
appletsDonotUseColorAlone
areaAltIdentifiesDestination
areaAltRefersToText
areaDontOpenNewWindow
areaHasAltValue
areaLinksToSoundFile
ariaOrphanedContent
basefontIsNotUsed
blinkIsNotUsed
blockquoteNotUsedForIndentation
blockquoteUseForQuotations
boldIsNotUsed
buttonHasName
checkboxHasLabel
checkboxLabelIsNearby
closingTagsAreUsed
contentPositioningShouldNotChangeMeaning
cssDocumentMakesSenseStyleTurnedOff
colorFontContrast
colorElementBehindContrast
colorBackgroundImageContrast
colorElementBehindBackgroundImageContrast
colorBackgroundGradientContrast
colorElementBehindBackgroundGradientContrast
definitionListsAreUsed
doctypeProvided
documentAbbrIsUsed
documentAcronymsHaveElement
documentAutoRedirectNotUsed
documentContentReadableWithoutStylesheets
documentHasTitleElement
documentIDsMustBeUnique
documentIsWrittenClearly
documentLangIsISO639Standard
documentLangNotIdentified
documentMetaNotUsedWithTimeout
documentReadingDirection
documentStrictDocType
documentTitleDescribesDocument
documentTitleIsNotPlaceholder
documentTitleIsShort
documentTitleNotEmpty
documentValidatesToDocType
documentVisualListsAreMarkedUp
domOrderMatchesVisualOrder
elementAttributesAreValid
embedHasAssociatedNoEmbed
elementsDoNotHaveDuplicateAttributes
embedMustHaveAltAttribute
embedMustNotHaveEmptyAlt
embedProvidesMechanismToReturnToParent
emoticonsExcessiveUse
emoticonsMissingAbbr
fieldsetHasLabel
fileHasLabel
fileLabelIsNearby
focusIndicatorVisible
fontIsNotUsed
formAllowsCheckIfIrreversable
formButtonsHaveValue
formDeleteIsReversable
formErrorMessageHelpsUser
formHasGoodErrorMessage
formHasSubmitButton
formWithRequiredLabel
frameIsNotUsed
frameRelationshipsMustBeDescribed
framesAreUsedToGroupContent
frameSrcIsAccessible
frameTitlesDescribeFunction
frameTitlesNotEmpty
frameTitlesNotPlaceholder
framesHaveATitle
framesetIsNotUsed
framesetMustHaveNoFramesSection
headersAttrRefersToATableCell
headerH1
headerH1Format
headerH2
headerH2Format
headerH3
headerH3Format
headerH4
headerH4Format
headerH5Format
headerH6Format
headerTextIsTooLong
headersHaveText
headersUsedToIndicateMainContent
headersUseToMarkSections
idRefHasCorrespondingId
idrefsHasCorrespondingId
iIsNotUsed
iframeMustNotHaveLongdesc
imageMapServerSide
imgAltEmptyForDecorativeImages
imgAltIdentifiesLinkDestination
imgAltIsDifferent
imgAltIsSameInText
imgAltIsTooLong
imgAltNotEmptyInAnchor
imgAltNotPlaceHolder
imgAltTextNotRedundant
imgGifNoFlicker
imgHasAlt
imgHasLongDesc
imgImportantNoSpacerAlt
imgMapAreasHaveDuplicateLink
imgNonDecorativeHasAlt
imgNotReferredToByColorAlone
imgServerSideMapNotUsed
imgShouldNotHaveTitle
imgWithEmptyAlt
imgWithMapHasUseMap
imgWithMathShouldHaveMathEquivalent
inputCheckboxHasTabIndex
inputCheckboxRequiresFieldset
inputDoesNotUseColorAlone
inputElementsDontHaveAlt
inputFileHasTabIndex
inputImageAltIdentifiesPurpose
inputImageAltIsNotFileName
inputImageAltIsNotPlaceholder
inputImageAltIsShort
inputImageAltNotRedundant
inputImageHasAlt
inputImageNotDecorative
inputPasswordHasTabIndex
inputRadioHasTabIndex
inputSubmitHasTabIndex
inputTextHasLabel
inputTextHasTabIndex
inputTextHasValue
inputTextValueNotEmpty
inputWithoutLabelHasTitle
labelDoesNotContainInput
labelMustBeUnique
labelMustNotBeEmpty
labelsAreAssignedToAnInput
languageDirAttributeIsUsed
languageChangesAreIdentified
languageDirectionPunctuation
languageUnicodeDirection
legendDescribesListOfChoices
legendTextNotEmpty
legendTextNotPlaceholder
liDontUseImageForBullet
linkHasAUniqueContext
linkUsedForAlternateContent
linkUsedToDescribeNavigation
listNotUsedForFormatting
listOfLinksUseList
marqueeIsNotUsed
menuNotUsedToFormatText
newWindowIsOpened
noembedHasEquivalentContent
noframesSectionMustHaveTextEquivalent
objectContentUsableWhenDisabled
objectDoesNotFlicker
objectDoesNotUseColorAlone
objectInterfaceIsAccessible
objectLinkToMultimediaHasTextTranscript
objectMustContainText
objectMustHaveEmbed
objectMustHaveTitle
objectMustHaveValidTitle
objectProvidesMechanismToReturnToParent
objectShouldHaveLongDescription
objectTextUpdatesWhenObjectChanges
objectUIMustBeAccessible
objectWithClassIDHasNoText
pNotUsedAsHeader
paragraphIsWrittenClearly
passwordHasLabel
passwordLabelIsNearby
preShouldNotBeUsedForTabularLayout
radioHasLabel
radioLabelIsNearby
radioMarkedWithFieldgroupAndLegend
scriptContentAccessibleWithScriptsTurnedOff
scriptInBodyMustHaveNoscript
scriptOnclickRequiresOnKeypress
scriptOndblclickRequiresOnKeypress
scriptOnmousedownRequiresOnKeypress
scriptOnmousemove
scriptOnmouseoutHasOnmouseblur
scriptOnmouseoverHasOnfocus
scriptOnmouseupHasOnkeyup
scriptUIMustBeAccessible
scriptsDoNotFlicker
scriptsDoNotUseColorAlone
selectDoesNotChangeContext
selectHasAssociatedLabel
selectJumpMenu
selectWithOptionsHasOptgroup
siteMap
skipToContentLinkProvided
svgContainsTitle
tableAxisHasCorrespondingId
tabIndexFollowsLogicalOrder
tableCaptionIdentifiesTable
tableComplexHasSummary
tableDataShouldHaveTh
tableHeaderLabelMustBeTerse
tableIsGrouped
tableLayoutDataShouldNotHaveTh
tableLayoutHasNoCaption
tableLayoutHasNoSummary
tableLayoutMakesSenseLinearized
tableNotUsedForLayout
tableShouldUseHeaderIDs
tableSummaryDescribesTable
tableSummaryDoesNotDuplicateCaption
tableSummaryIsEmpty
tableSummaryIsNotTooLong
tableSummaryIsSufficient
tableUseColGroup
tableUsesAbbreviationForHeader
tableUsesCaption
tableUsesScopeForRow
tableWithBothHeadersUseScope
tableWithMoreHeadersUseID
tagsAreNestedCorrectly
tabularDataIsInTable
textIsNotSmall
textareaHasAssociatedLabel
textareaLabelPositionedClose
videoProvidesCaptions
videosEmbeddedOrLinkedNeedCaptions
whiteSpaceInWord
whiteSpaceNotUsedForFormatting
doNotUseGraphicalSymbolToConveyInformation
linkDoesNotChangeContextOnFocus
buttonDoesNotChangeContextOnFocus
KINGStrongList
KINGUseLongDateFormat
KINGUsePercentageWithSymbol
KINGUseCurrencyAsSymbol
videoMayBePresent
audioMayBePresent
animatedGifMayBePresent
userInputMayBeRequired
 */

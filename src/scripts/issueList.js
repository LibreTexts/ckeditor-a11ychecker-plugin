// Pre-built issues
var issueList = [
    "aLinksDontOpenNewWindow", 
    "aAdjacentWithSameResourceShouldBeCombined",
    "aImgAltNotRepetitive",
    "aMustNotHaveJavascriptHref",
    "documentVisualListsAreMarkedUp",
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
    "colorFontContrast",
    'documentIDsMustBeUnique',
    //"blockquoteNotUsedForIndentation",
];

// Mapping pre-built issues with quick fixes
var issueMapping = {
    aLinksDontOpenNewWindow:["NewWindowLink"],
    KINGUseLongDateFormat:["DateUnfold"],
    aAdjacentWithSameResourceShouldBeCombined:["AnchorsMerge"],
    imgImportantNoSpacerAlt:["ImgAlt"],
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
    aMustHaveTitle:["LinkTitleFix"],
    tableUsesCaption:["AddTableCaption"],
    tableDataShouldHaveTh:["TableHeaders"],
    tableWithBothHeadersUseScope:["TableScope"],
    tableSummaryDoesNotDuplicateCaption:["ChangeTableSummary"],
    tableComplexHasSummary:["AddTableSummary"],
    colorFontContrast:["ColorContrastFix"],
    //RemoveP:["RemoveEmptyPFix"]
}

// Custom tests + fixes
/*************************
Add all custom tests here as an object to the end of customIssues array.
If there is no quick fix name available, just leave quickfixName blank.
*************************/

var customIssues = [
    {
        selector: 'h5:not(section h5, div h5),h6:not(section h6, div h6)',
        testability: 'Error',
        id: 'ReservedHeaders',
        title: 'H5 and H6 is reserved for LibreTexts',
        desc: 'LibreTexts reserves heading level 5 and heading level 6, and should not be used outside of boxes for sidebar content. Clicking quick fix will change this heading to a header level 4.',
        quickfixName: 'ReservedHeaders'
    },
    {
        selector: '.mt-font-size-8',
        testability: 'Notice',
        id: 'FontSizeIsTooSmall',
        title: 'Font size is too small',
        desc: 'All text elements should be at least 10pt font size.',
        quickfixName: 'FontSizeFix'
    },
    // Images that do not have alts
    //      AND do not have media tags
    //      AND are not children of a tags
    {
        selector: 'img:not([alt]):not([media], a img:not([alt]))',
        testability: 'Error',
        id: 'ImgHasAltNew',
        title: 'Images must provide alternative text',
        desc: 'Alternative text needs to convey the same information as the image. This text will be used when the browser has disabled images, the image was not found on the server, or by non-sighted visitors who use screen readers.',
        quickfixName: 'ImgAlt'
    },
    {
        selector: 'figure p',
        testability: 'Error',
        id: 'CombineFigcaptionAndPTags',
        title: 'Use a single figcaption in a figure',
        desc: "Accessibility checker has noticed in the HTML that text other than the figcaption is present in this figure. Pressing quick fix will combine it for you into one caption. " + "<br/><br/>" + "Tip: When typing a new line in your caption, use SHIFT + ENTER.",
        quickfixName: 'RemovePFix'
    }, 
    {
        selector: 'h1.dummyClass',
        testability: 'Error',
        id: 'DummyID',
        title: 'This is a dummy custom test.',
        desc: 'If you are reading this, this is a dummy class that is kept for development purposes. Please rename the class of this element.',
        quickfixName: ''
    },
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

// TODO: probably make into one big object to export
var headingTests = ["pNotUsedAsHeader", "headerH1","headerH2","headerH3","headerH4","headerH5","headerH6"];
var imageTests = ["imgShouldNotHaveTitle","imgAltIsDifferent","imgAltIsTooLong","imgWithEmptyAlt", "imgAltNotEmptyInAnchor"];
var tableTests = ["tableWithBothHeadersUseScope","tableComplexHasSummary","tableSummaryDoesNotDuplicateCaption", "tableUsesCaption"];
var linkTests = ["aLinksDontOpenNewWindow", "aAdjacentWithSameResourceShouldBeCombined","aImgAltNotRepetitive", "aSuspiciousLinkText"];
var colorTests = ["colorFontContrast"];
var labelTests = ["inputTextHasLabel", "checkboxHasLabel", "radioHasLabel", "textareaHasAssociatedLabel", "selectHasAssociatedLabel", "passwordHasLabel", "fileHasLabel", "fieldsetHasLabel"];
var customHeadingTests = ["ReservedHeaders"];
var customImageTests = ["ImgHasAltNew"];


export var issueList, issueMapping, customIssues, headingTests, imageTests, tableTests, linkTests, colorTests, labelTests, customHeadingTests, customImageTests;

/*
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

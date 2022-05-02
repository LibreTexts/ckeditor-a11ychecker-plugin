// Pre-built issues
var issueList = [
    "aLinksDontOpenNewWindow", 
    "aAdjacentWithSameResourceShouldBeCombined",
    "aImgAltNotRepetitive",
    "aLinksAreSeparatedByPrintableCharacters",
    "aMustNotHaveJavascriptHref",
    "blockquoteNotUsedForIndentation",
    "documentVisualListsAreMarkedUp",
    "imgAltNotEmptyInAnchor",
    "imgAltTextNotRedundant",
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
    "aMustContainText"];

// Mapping pre-built issues with quick fixes
var issueMapping = {
    aLinksDontOpenNewWindow:["NewWindowLink"],
    KINGUseLongDateFormat:["DateUnfold"],
    aAdjacentWithSameResourceShouldBeCombined:["AnchorsMerge"],
    imgImportantNoSpacerAlt:["ImgAlt"],
    imgWithEmptyAlt:["ImgAltNonEmpty"],
    imgAltNotEmptyInAnchor:["ImgAlt"],
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
    aMustContainText:["EmptyLink"],
    tableUsesCaption:["AddTableCaption"],
    tableDataShouldHaveTh:["TableHeaders"],
    tableWithBothHeadersUseScope:["TableScope"],
    tableSummaryDoesNotDuplicateCaption:["ChangeTableSummary"],
    tableComplexHasSummary:["AddTableSummary"]
}

// Custom tests + fixes
/*************************
Add all custom tests here as an object to the end of customIssues array.
If there is no quick fix name available, just leave quickfixName blank.
*************************/

var customIssues = [
    {
        selector: 'img[alt]:not(img[alt].alt-tag-verified), img[alt=" "]:not(img[alt=" "].alt-tag-verified',
        testability: 'Notice',
        id: 'VerifyAltTag',
        title: 'Verify the alt tag',
        desc: 'Verify that the alt tag correctly describes the image. If the alt tag is blank, verify that it is decorative or that it has a caption describing the image.',
        quickfixName: 'ImgAltVerify'
    },
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
    {
        selector: 'img:not([alt]):not([media])',
        testability: 'Error',
        id: 'ImgHasAltNew',
            title: 'Images must provide alternative text',
        desc: 'Alternative text needs to convey the same information as the image. This text will be used when the browser has disabled images, the image was not found on the server, or by non-sighted visitors who use screen readers.',
        quickfixName: 'ImgAlt'
    }
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



export var issueList, issueMapping, customIssues;
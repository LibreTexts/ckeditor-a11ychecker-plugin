import filteredIssues from "./filteredIIssues";

const loadCustomFixes = () => {

    /*************************
    Add all custom tests here as an object to the end of customIssues array.
    If there is no quick fix name available, just leave quickfixName blank.
    *************************/

    // ALVIN NOTE: Only ReservedHeaders is in production
    // If there is no quick fix name available, just leave quickfixName blank
    const customIssues = [
        // {
        //     selector: 'img[alt]:not(img[alt].alt-tag-verified), img[alt=" "]:not(img[alt=" "].alt-tag-verified',
        //     testability: 'Notice',
        //     id: 'VerifyAltTag',
        //     title: 'Verify the alt tag',
        //     desc: 'Verify that the alt tag correctly describes the image. If the alt tag is blank, verify that it is decorative or that it has a caption describing the image.',
        //     quickfixName: 'ImgAltVerify'
        // },
        {
            selector: 'h5:not(section h5, div h5),h6:not(section h6, div h6)',
            testability: 'Error',
            id: 'ReservedHeaders',
            title: 'H5 and H6 is reserved for LibreTexts',
            desc: 'LibreTexts reserves heading level 5 and heading level 6, and should not be used outside of boxes for sidebar content. Clicking quick fix will change this heading to a header level 4.',
            quickfixName: 'ReservedHeaders'
        },
        // {
        //     selector: 'div',
        //     testability: 'Notice',
        //     id: 'DivsShouldBeSections',
        //     title: 'Div elements should be sections',
        //     desc: 'All divs in LibreTexts should be section landmarks instead.',
        //     quickfixName: 'DivToSection'
        // },
        // {
        //     selector: '.mt-font-size-8',
        //     testability: 'Notice',
        //     id: 'FontSizeIsTooSmall',
        //     title: 'Font size is too small',
        //     desc: 'All text elements should be at least 10pt font size.',
        //     quickfixName: 'FontSizeFix'
        // },
        // {
        //     selector: 'th p',
        //     testability: 'Error',
        //     id: 'TableHeaderShouldNotHavePTag',
        //      title: 'Paragraph elements should not be inside table headers',
        //     desc: 'Using paragraph tags inside table header elements will disrupt the flow of the table.',
        //     quickfixName: 'PTagInTableHeaderFix'
        // },
        {
            selector: 'img:not([alt]):not([media])',
            testability: 'Error',
            id: 'ImgHasAltNew',
             title: 'Images must provide alternative text',
            desc: 'Alternative text needs to convey the same information as the image. This text will be used when the browser has disabled images, the image was not found on the server, or by non-sighted visitors who use screen readers.',
            quickfixName: 'ImgAlt'
        }
        
    ]

    CKEDITOR.on("instanceReady", function() {
        console.log("ckeditor instance ready")
        // Creating custom issues and registering them in a11ychecker.
        var a11ychecker = CKEDITOR.plugins.a11ychecker;

        a11ychecker.Engine.prototype.on( 'process', function( evt ) {
            console.log("event: ", evt);
            var Issue = a11ychecker.Issue,
                contentElement = evt.data.contentElement,
                issues = evt.data.issues;

            console.log("evt.data.issues.list: ", evt.data.issues.list);

            function createNewIssue( data ) {
                var testability = Issue.testability.ERROR;
                if (data.testability == 'Notice') {
                    testability = Issue.testability.NOTICE;
                } else if (data.testability == 'Warning') {
                    testability = Issue.testability.WARNING;
                }

                CKEDITOR.tools.array.forEach( contentElement.find( data.selector ).toArray(), function( orig ) {
                    console.log("adding issue ", data.id);
                    issues.addItem( new Issue( {
                        originalElement: orig,
                        testability: testability,
                        id: data.id,
                        details: {
                            title: data.title,
                            descr: data.desc
                        }
                    }, a11ychecker.Engine.prototype ) );
                });  

                if (data.quickfixName) {
                    a11ychecker.Engine.prototype.fixesMapping[data.id] = [data.quickfixName];
                }
            }
            
            customIssues.forEach(function(data) {
                createNewIssue( data );
            });
            console.log(issues);
            
            // if (filteredIssues.includes("images")) {
            //     console.log("Filtering images issues..");
            //     issues = issues.filter((element) => element.id == "tableWithBothHeadersUseScope")
            // }
        });
    })
};
  
export default loadCustomFixes;

const loadCustomFixes = () => {
    /*************************
    Add all custom tests here as an object to the end of customIssues array.
    If there is no quick fix name available, just leave quickfixName blank.
    *************************/

    // ALVIN NOTE: Only ReservedHeaders is in production
    // If there is no quick fix name available, just leave quickfixName blank
    const customIssues = [
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
            selector: 'div',
            testability: 'Notice',
            id: 'DivsShouldBeSections',
            title: 'Div elements should be sections',
            desc: 'All divs in LibreTexts should be section landmarks instead.',
            quickfixName: 'DivToSection'
        },
        {
            selector: '.mt-font-size-8',
            testability: 'Notice',
            id: 'FontSizeIsTooSmall',
            title: 'Font size is too small',
            desc: 'All text elements should be at least 10pt font size.',
            quickfixName: 'FontSizeFix'
        }
    ]


    // Creating custom issues and registering them in a11ychecker.
    CKEDITOR.on("instanceReady", function() {
        var a11ychecker = CKEDITOR.plugins.a11ychecker;
    
        a11ychecker.Engine.prototype.on( 'process', function( evt ) {
            var Issue = a11ychecker.Issue,
                contentElement = evt.data.contentElement,
                issues = evt.data.issues

            function createNewIssue( data ) {
                var testability = Issue.testability.ERROR;
                if (data.testability == 'Notice') {
                    testability = Issue.testability.NOTICE;
                } else if (data.testability == 'Warning') {
                    testability = Issue.testability.WARNING;
                }

                CKEDITOR.tools.array.forEach( contentElement.find( data.selector ).toArray(), function( orig ) {
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

                if (data.quickFixName) {
                    a11ychecker.Engine.prototype.fixesMapping[data.id] = [data.quickfixName];
                }
            }

            customIssues.forEach(function(data) {
                createNewIssue( data );
            });
        });
    })
};
  
export default loadCustomFixes;

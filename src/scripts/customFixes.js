import { customIssues } from "./issueList";
const loadCustomFixes = () => {

    // Creating custom issues and registering them in a11ychecker.
    CKEDITOR.on("instanceReady", function() {
        var a11ychecker = CKEDITOR.plugins.a11ychecker;
    
        a11ychecker.Engine.prototype.on( 'process', function( evt ) {
            var Issue = a11ychecker.Issue,
                contentElement = evt.data.contentElement,
                issues = evt.data.issues;

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

                if (data.quickfixName) {
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

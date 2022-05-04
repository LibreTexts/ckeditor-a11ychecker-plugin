import { customIssues, issueList, headingTests, imageTests, tableTests, customHeadingTests, customImageTests } from "./issueList";
import { filteredIssues } from "./loadPlugin";

const loadCustomFixes = () => {
    CKEDITOR.on("instanceReady", function() {
        var a11ychecker = CKEDITOR.plugins.a11ychecker;

        a11ychecker.Engine.prototype.on( 'process', function( evt ) {
            console.log("Process event: ", evt);
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

            // This is how you filter!!!!!!!!!
            // !! IMPORTANT: GUIDELINE CAN NOT EVER BE AN EMPTY LIST
            function filterIssues() {
                let newGuidelines = [];
                let testAll = filteredIssues["All"],
                    testHeadings = filteredIssues["Headings"],
                    testImages = filteredIssues["Images"],
                    testTables = filteredIssues["Tables"];
                let allFalse = (testAll == false && testHeadings == false && testImages == false && testTables == false);
                    

                // If the user selected all, we don't need to filter issues.
                if (testAll || allFalse) {
                    evt.sender.config.guideline = issueList;
                    return;
                } 
                
                if (testHeadings) { newGuidelines.push(...headingTests);   }
                if (testImages)   { newGuidelines.push(...imageTests);     }
                if (testTables)   { newGuidelines.push(...tableTests);     }

                // testing purposes
                // let testing = ["ImgHasAltNew"];
                // issues.each((element) => {
                //     console.log(element.id, " is ", testing.includes(element.id));
                // })

                // TOOD: Refactor this.
                if (testHeadings && testImages) { 
                    issues = issues.filter(element => element.id == "ImgHasAltNew" || element.id == "VerifyAltTag" || element.id == "ReservedHeaders");
                } else if (testImages) { 
                    issues = issues.filter(element => element.id == "ImgHasAltNew" || element.id == "VerifyAltTag");
                } else if (testHeadings) {
                    issues = issues.filter(element => element.id == "ReservedHeaders");
                }

                // Custom issue guidelines and the built-in guidelines can NOT be empty.
                // This is to ensure they're never empty by having them check for dummy & barely used tests just in case
                // they are somehow empty.
                //issues = issues.filter(element => element.id == "ImgHasAltNew");
                //console.log(issues, issues.list.length);
                //newIssues == [] ? issues = issues.filter(element => element.id == "DummyID") : issues = issues.filter(element => element.id in newIssues);
                newGuidelines == [] ? evt.sender.config.guideline = ["KINGUseLongDateFormat"] : evt.sender.config.guideline = newGuidelines;

                return;
            }
            

            // Create new custom issues and filter out issues based on checkbox
            customIssues.forEach( (data) => { createNewIssue(data) });
            filterIssues();
        });
    })
};
  
export default loadCustomFixes;

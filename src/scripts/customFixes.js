/*
*
* This is the file where custom issues (which are specified in issueList) are created.
* This is also where filtering happens. See filterIssues().
*/

// import { customIssues, issueList, headingTests, imageTests, tableTests, customHeadingTests, customImageTests, linkTests, colorTests, labelTests } from "./issueList";
import { customIssues, issueList, headingTests, imageTests, tableTests, customHeadingTests, customImageTests, linkTests, colorTests, labelTests, customAbbreviationTests } from "./issueList";
import { filteredIssues } from "./loadPlugin";

const loadCustomFixes = () => {
    CKEDITOR.on("instanceReady", function() {
        var a11ychecker = CKEDITOR.plugins.a11ychecker;

        // This 
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

                let selectedIssues = contentElement.find( data.selector ).toArray();
                // For abbreviations, set the entire content as an issue if no span.acronym tags already exist on the page
                if ( customAbbreviationTests.includes(data.id) && !selectedIssues.length) {
                    // console.log("Scan Page: ", contentElement);
                    selectedIssues.push(contentElement);
                }

                CKEDITOR.tools.array.forEach( selectedIssues, function( orig ) {
                    if (data.customSelector == null || data.customSelector(orig)){
                        issues.addItem( new Issue( {
                            originalElement: orig,
                            testability: testability,
                            id: data.id,
                            details: {
                                title: data.title,
                                descr: data.desc
                            }
                        }, a11ychecker.Engine.prototype ) );
                    }
                });  

                if (data.quickfixName) {
                    a11ychecker.Engine.prototype.fixesMapping[data.id] = [data.quickfixName];
                }
            }

            function filterIssues() {
                let newGuidelines = [], 
                    newCustomIssues = [],
                    testAll = filteredIssues["All"],
                    testHeadings = filteredIssues["Headings"],
                    testImages = filteredIssues["Images"],
                    testTables = filteredIssues["Tables"],
                    testLinks = filteredIssues["Links"],
                    testColor = filteredIssues["Color"],
                    testLabels = filteredIssues["Labels"],
                    testAbbrs = filteredIssues["Abbreviations"],
                    // allFalse = !(testAll || testHeadings || testImages || testTables || testLinks || testColor || testLabels);
                    allFalse = !(testAll || testHeadings || testImages || testTables || testLinks || testColor || testLabels || testAbbrs);



                // If the user selected all, we don't need to filter issues.
                // By default, if nothing is selected, let's just test for everything as well.
                if (testAll || allFalse) { 
                    // Remove custom abbreviations by default if not explicitly checked off
                    if (!testAbbrs) { issues = issues.filter(element => !customAbbreviationTests.includes(element.id)); };

                    // Remove color contrast and label issues by default
                    if (!testColor) { issues = issues.filter(element => !colorTests.includes(element.id)); };
                    if (!testLabels) { issues = issues.filter(element => !labelTests.includes(element.id)); };

                    evt.sender.config.guideline = issueList;
                    return; 
                } 


                // Push the respecitve tests based on what the user selected.
                // See the file 'issueList.js' to configure what should be tested.
                if (testHeadings) { newGuidelines.push(...headingTests);  newCustomIssues.push(...customHeadingTests) };
                if (testImages)   { newGuidelines.push(...imageTests);    newCustomIssues.push(...customImageTests)   };
                if (testTables)   { newGuidelines.push(...tableTests); };
                if (testLinks)    { newGuidelines.push(...linkTests);  };
                if (testColor)    { newGuidelines.push(...colorTests); };
                if (testLabels)   { newGuidelines.push(...labelTests); };
                // Add Abbreviations (must include "headerH1" to avoid bugs)
                // Note: "headerH1" should never appear on LibreTexts pages because only the title can be H1
                if (testAbbrs)    { newGuidelines.push("headerH1"); newCustomIssues.push(...customAbbreviationTests); };


                // Custom issue guidelines and the built-in guidelines can NOT be empty, otherwise terrible bugs will occur.
                // This is to really ensure they're never empty by having them check for dummy & barely used tests just in case
                // they are somehow empty.
                if (newCustomIssues == []) { newCustomIssues.push("DummyID");             };
                if (newGuidelines   == []) { newGuidelines.push("headerH1"); };

                // Filter!
                /*
                                      issues : any custom issues that is built
                 evt.sender.config.guideline : any pre-built issues
                */
                issues = issues.filter(element => newCustomIssues.includes(element.id));
                evt.sender.config.guideline = newGuidelines;

                return;
            }
            // Create new custom issues and filter out issues based on checkbox
            customIssues.forEach( (data) => { createNewIssue(data) });
            filterIssues();
        });
    })
};
  
export default loadCustomFixes;

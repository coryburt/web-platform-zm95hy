/*
 *
 *  Main JS file
 *
 * =============================================================== */

function ResetDebugBox() {
    function UC(str) {
        let words = str.split(" ");
        for (let i = 0; i < words.length; i++) {
            if( words[i].length < 4 ) { continue; }
            if( words[i].includes(`-`) ) {
                let hyph = words[i].split(`-`);
                for( let j = 0; j < hyph.length; j++ ) {
                    if( hyph[j].length < 4 ) { continue; }
                    hyph[j] = hyph[j][0].toUpperCase() 
                                + hyph[j].substr(1).toLowerCase();
                }
                words[i] = hyph.join(`-`);
            } else {
                words[i] = words[i][0].toUpperCase() 
                            + words[i].substr(1).toLowerCase();
            }
        }
        return( words.join(" ") );
    }

    let debugBox = document.getElementById('debugBox');
    if (debugBox !== null) {
        let txt = '';

        while (debugBox.firstChild) {
            debugBox.removeChild(debugBox.firstChild);
        }

        txt += 'WELCOME <br/>';
        txt += sessionStorage.getItem('firstName') + ' ' 
        txt += sessionStorage.getItem('lastName') + '<br/>';
        txt += UC(sessionStorage.getItem('title')) + '<br/>';

        debugBox.innerHTML = txt;
        debugBox.addEventListener('click', 
            (e) => { 
                if(e.ctrlKey) { InfoItSession(); }
            }
        );
    }
}

function SelectContentPanel(target) {
    if( target.startsWith("sb_opt") ) {
        sidebarMap.forEach( function(obj, key) {
            if( key.startsWith("sb_opt") ) {
                // console.debug("typeof " + typeof(mainScreen.getCell(obj.cellConfig.id)));
                if( key == target ) { 
                    mainScreen.getCell(obj.cellConfig.id).show();
                } else {
                    mainScreen.getCell(obj.cellConfig.id).hide();
                }
            }
        });
    }
}

export function main() {

    if( mainScreen == null ) {
        mainScreen = new dhx.Layout("mainPage", masterLayoutConfig);
        mainSidebar = new dhx.Sidebar(null, mainSidebarConfig);

        mainScreen.getCell("sidebar_wrapper").attach(mainSidebar);
        mainScreen.getCell("content_wrapper").progressShow();

        //  ----------------------------------------------------------------------
        //      ALMOST ALL initialization routines are called in the "then" 
        //      function of the AJAX call to "fetchAppSession.php," below.
        //      This guarantees that they do not run until the PHP session is 
        //      populated into the browser session.  This includes permissions
        //      and assures that these are established before the UI is built,
        //      (this is important because the rendering of some elements of 
        //      the UI depends on the current user's permissions).  This approach
        //      also provides plenty of load-time for other DOM elements and 
        //      Javascript files that need to be loaded, rendered, and parsed at
        //      run-time, before the app is ready for use.
        //  ----------------------------------------------------------------------

        dhx.ajax.get('includes/json/fetchAppSession.php').then(
            function(rr){

                //  NOTE: the "category" session value is JSON.parse'd here, then
                //  "re-encoded" with JSON.stringify to be put into session storage.
                //  It's then JSON.parse'd again when fetched from session storage.

                for (let el of Object.keys(rr)) {
                    if (rr.hasOwnProperty(el)) {
                        if( Array.isArray(rr[el]) ) {
                            sessionStorage.setItem(el, JSON.stringify(rr[el]));
                        } else {
                            sessionStorage.setItem(el, rr[el]);
                        }
                    }
                }

                /*********************************************************************
                 * DOCUMENTATION NOTE:
                 * sessionStorage items that are arrays are "stringified" with
                 * JSON.stringify, as shown in the above for-loop.  
                 * These are dereferenced with code like this:
                 * 
                 *      const array = JSON.parse(sessionStorage.getItem(array_entry));
                 * 
                 *********************************************************************/

                // --------------------------------------------------------------------
                //  "super" role settings must come first, immediately after the
                //  parsing of the session data.
                // --------------------------------------------------------------------
        
                if( sessionStorage.getItem(`role`) ) {
                    CURRENT.userRole = sessionStorage.getItem(`role`).toUpperCase();
                    if( CURRENT.userRole == `SUPER` ) {
                        // turn on developer stuff...
                        CURRENT.debug = true;
                        mainSidebar.show("sb_dev_tools");
                    }
                } else {
                    console.debug(`Configuration error - no user-role specified`);
                }

                // --------------------------------------------------------------------
                //  Permissions are now fetched from DB, so all 
                //  other initialization must wait for that return.
                // --------------------------------------------------------------------

                if (sessionStorage.getItem('staffID')) {
                    ResetDebugBox();
                    InitPermissions(sessionStorage.getItem('staffID')).then(
                        (msg) => {
                            if( msg.match(/error/gi) ) {
                                DebugIt(msg,0);
                            } else {
                                console.info(msg);
                            }

                            // Set Current Fiscal Year and add it to the masthead
                            InitFiscalYear();

                            // Initialize Splash Page and DevTools
                            InitAnalytics(mainScreen.getCell("contentCell01"));

                            // Initialize Report General Screen
                            InitReport(mainScreen.getCell("allReportsContentCell"));

                            InitExpVerification(mainScreen.getCell("contentCell03"));

                            // Initialize Picklist Options
                            InitPicklist(mainScreen.getCell("allPicklistsContentCell"));

                            // Initialize DevTools
                            InitRevealTable(mainScreen.getCell("contentCell20"));
                            InitRevealCode(mainScreen.getCell("contentCell21"));

                            // Admin
                            InitSecurityRoles(mainScreen.getCell("contentCell09"));
                            InitStaffCerts(mainScreen.getCell("contentCell10"));
                            InitYearRollover(mainScreen.getCell("contentCell11"));

                            // Initialize Help
                            InitHelp(mainScreen.getCell("contentCell22"));

                            // Initialize Supplemental UI
                            InitSupplemental(mainScreen.getCell("contentCell02"));

                            mainScreen.getCell("content_wrapper").progressHide();

                            //  --- MAINSIDEBAR events --------------------------------

                            mainSidebar.events.on("click",
                                function(id){
                                    if( id == "sb_opt01" ) {
                                        mainSidebar.toggle();
                                    } else if( id.startsWith("sb_rpt") ) {
                                        getReport(id);
                                        SelectContentPanel("sb_opt04");
                                    } else if( id.startsWith("sb_pcklst") ) {
                                        getPicklist(id);
                                        SelectContentPanel("sb_opt08");
                                    } else if( id.startsWith("sb_theme") ) {
                                        if( sidebarMap.has(id) ) {
                                            ThemeSet(sidebarMap.get(id).theme);
                                        }
                                    } else if (id == "sb_opt09" ) {
                                        getSecurityGrid();
                                        SelectContentPanel("sb_opt09");
                                    } else if (id == "sb_devtool_show_session" ) {
                                        InfoItSession();
                                    } else {
                                        SelectContentPanel(id);
                                    }
                                }
                            );

                            mainSidebar.events.on("afterCollapse",
                                () => {
                                    mainSidebar.data.update("sb_opt01",
                                        { icon: "fas fa-chevron-right" }
                                    )
                                }
                            );

                            mainSidebar.events.on("afterExpand",
                                () => {
                                    mainSidebar.data.update("sb_opt01",
                                        { icon: "fas fa-chevron-left" }
                                    )
                                }
                            );
                        }
                    ).catch(
                        (err) => { 
                            mainScreen.getCell("content_wrapper").progressHide();
                            DebugIt(err); 
                        }
                    )
                } else {
                    mainScreen.getCell("content_wrapper").progressHide();
                    SnackBar("No user info passed to session! Cannot continue.", 0);
                    return;
                }
            }
        ).catch(
            err => {
                mainScreen.getCell("content_wrapper").progressHide();
                DebugIt(err)
            }
        )

        //  --- Browser Size Tracker ----------------------------------------------------

        dhx.resizeHandler(document.body,
            (w, h) => {
                if( browserSize.width != w || browserSize.height != h ) {
                    browserSize.width = w;
                    browserSize.height = h;
                }
            }
        );
    }
}

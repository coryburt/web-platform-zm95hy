// ----------------------------------------------------------------------
//  revealStuff.js
//  Part of the mDevtools module
// ----------------------------------------------------------------------
/*
 *  The functions "GetCode" and "GetTable" are used in HTML 
 *  "onClick" events.
 *  They're found in code generated and downloaded via AJAX call
 *  from "revealCode.php" and "revealTable.php," respectively.
 * 
 *  These depend on the pre-existing declaration of "viewCell" 
 *  and "dbgridCell" in the global namespace as a DHTMLX widget
 *  that implements the "attachHTML" or "attach" (grid) methods.
 * ************************************************************** */

function GetCode(f) {
    const url = 'mDevtools/php/revealCode.php?file=' + f;
    dhx.ajax.get(url).then(
        html => {
            viewCell.attachHTML(html);
        }
    ).catch(
        err => {
            DebugIt(err);
        }
    );
}

//  ------------------------------------------------------------------------------------

function GetTable(f) {
    const url = 'mDevtools/php/revealTable.php?table=' + f;
    dbgridCell.progressShow();
    dhx.ajax.get(url).then(
        json => {
            const grid = new dhx.Grid(null, {
                columns: MakeGridColumns(json.columns),
                autoWidth: true,
                resizable: true,
                data: MakeGridRows(json.data)
            });
            dbgridCell.attach(grid);
            dbgridHeaderCell.attachHTML(
                `<div id="data-table-header">`+Wordify(f)+` Data</div>`
            );
            dbgridCell.progressHide();
        }
    ).catch(
        err => {
            DebugIt(err);
        }
    );
}

//  ------------------------------------------------------------------------------------

function InitRevealCode(contentCell) {

    const metadataLayoutConfig = {
        type: "none",
        cols: [
            {
                id: "metadata_sidepanel",
                // css: "dhx_layout-cell--bordered",
                html: "Metadata Menu",
                height: "100%",
                resizable: true,
                maxWidth: "content",
                minWidth: "50px"
            },
            {
                rows: [
                    {
                        id: "metadata_menu",
                        css: "dhx_layout-cell--bordered",
                        html: `<div class="placeholder">Meta-data Content Area</div>`,
                        height: "content"
                    },
                    {
                        id: "metadata_content",
                        css:  "dhx_layout-cell--bordered"
                    }
                ]
            }
        ]
    };

    let metadataScreen = new dhx.Layout(null, metadataLayoutConfig);
    contentCell.attach(metadataScreen);
    //  The following assignments are to global variables
    viewCell = metadataScreen.getCell("metadata_content");
    metadataMenuCell = metadataScreen.getCell("metadata_sidepanel");

    const url = 'mDevtools/php/revealCode.php';

    dhx.ajax.get(url).then(
        html => {
            metadataMenuCell.attachHTML(html);
            // console.debug(url);
        }
    ).catch(
        err => {
            DebugIt(err);
        }
    );
}

//  ------------------------------------------------------------------------------------

function InitRevealTable(contentCell) {
    const quickviewLayoutConfig = {
        type: "none",
        cols: [
            {
                id: "quickview_sidepanel",
                // css: "dhx_layout-cell--bordered",
                html: "Database Tables",
                height: "100%",
                resizable: true,
                maxWidth: "content",
                minWidth: "60px",
            },
            {
                rows: [
                    {
                        id: "quickview_menu",
                        css: "dhx_layout-cell--bordered",
                        html: `<div id="data-table-header">Table Data</div>`,
                        height: "content"
                    },
                    {
                        id: "quickview_content",
                        css:  "dhx_layout-cell--bordered"
                    }
                ]
            }
        ]
    };
    
    let quickviewScreen = new dhx.Layout(null, quickviewLayoutConfig);
    contentCell.attach(quickviewScreen);
    //  The following assignments are to global variables
    dbgridHeaderCell = quickviewScreen.getCell("quickview_menu");
    dbgridCell = quickviewScreen.getCell("quickview_content");
    quickviewMenuCell = quickviewScreen.getCell("quickview_sidepanel");

    const url = 'mDevtools/php/revealTable.php';

    dhx.ajax.get(url).then(
        html => {
            quickviewMenuCell.attachHTML(html);
            // console.debug(url);
        }
    ).catch(
        err => { DebugIt(err); }
    );
}

//  ------------------------------------------------------------------------------------
//      Reveal the contents of sessionStorage in the InfoIt window.
//      Note: for this app... 
//      sessionStorage should only be used to store values that 
//      are actually in the PHP session, lest confusion reign.
//  ------------------------------------------------------------------------------------

function InfoItSession() {

    function MapBreakout(that) {
        let res = ``;
        that.forEach(
            (val, key) => {
                res += `<br >` + key + ` : `;
                if( typeof val == `object` ) {
                    if( val instanceof Map ) {
                        res += MapBreakout(val);
                    } else {
                        let x = null, v = null, i = null, s = [];
                        if( Array.isArray(val) ) {
                            val.forEach(
                                (v, i) => {
                                    if( typeof v == `object` ) {
                                        if( v instanceof Map ) {
                                            res += MapBreakout(v);
                                        } else {
                                            for(x in v) {
                                                s.push(x + ` -> ` + v[x]);
                                            }
                                        }
                                    } else {
                                        s.push(i + ` = ` + v);
                                    }
                                }
                            );
                        } else {
                            for(x in val) {
                                s.push(x + ` -> ` + val[x]);
                            }
                        }
                        res += s.join(`, `) + `<br />`;
                    }
                } else {
                    res += val;
                }
            }
        );
        return res;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    let message = `
        <div class="info-title">Session, Etc.</div>
        <p>The values currently stored in the Session &mdash; and some other globals.</p>
        <ul>
    `;

    let key = null;

    for(key of Object.keys(sessionStorage)) {
        message += `<li>${key} = ${sessionStorage.getItem(key)}</li>`;
    }
    
    message += `</ul><ul>`;

    for(key of Object.keys(CURRENT) ) {
        message += `<li>CURRENT.${key} = `;
        if( typeof CURRENT[key] === `object` ) {
            if( CURRENT[key] instanceof Map ) {
                message += MapBreakout(CURRENT[key]);
            } else {
                message += JSON.stringify(CURRENT[key]);
            }
        } else {
            message += CURRENT[key];
        }
        message += `</li>`;
    }

    message += `</ul><ul>`;

    for(key of Object.keys(SUP.current) ) {
        message += `<li>SUP.current.${key} = ` + SUP.current[key] + `</li>`;
    }

    message += `</ul>`;

    InfoIt(message, 700, 620);

}

/* **************************************************************
 *
 *  Functions in the global namespace
 * 
 * ************************************************************** */

dhx.awaitRedraw().then(
    () => {
        const el = document.getElementById("snackBar");
        el.setAttribute( "onClick", "HideSnackBar();" );
    }
);

//  -------------------------------------------------------

function HideSnackBar() {
    const el = document.getElementById("snackBar");
    el.classList.remove('showSnack', 'showSnack-NoFade');
}

/*
 *  The purpose of the function "SnakeCase" is to convert generally
 *  readable strings into lower-snake-case strings.  This allows
 *  readable strings to be used in menus and prompts that are then easily
 *  converted into lower-snake-case forms that can be used as the 
 *  applicable DOM element ID values or DHTMLX widget element ID values.
 *  For example, you could have a menu that prompts with the string:
 * 
 *      "Data Entry Window"
 * 
 *  and then implement a DHTMLX widget with the ID of "data_entry_window".
 *  The SnakeCase function takes the "Data Entry Window" string and returns
 *  "data_entry_window", making it simple to activate the appropriate
 *  widget.
 * 
 *  The function "KababCase" does the same thing, but converts the
 *  phrase into a "kabab-case" string.
 *********************************************************************** */

function SnakeCase(string) {
    return string.replace(/\W]+/g, " ")
    .replace(/[\)|\(|\#]+/g, "")
    .split(/ /)
    .map(word => word.toLowerCase())
        .join('_');
}

function KababCase(string) {
    return string.replace(/\W]+/g, " ")
    .replace(/[\)|\(|\#]+/g, "")
    .split(/ /)
    .map(word => word.toLowerCase())
        .join('-');
}

function UCword(str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }
    return( words.join(" ") );
}

// =====================================================================================================
//  "DebugIt" message handler
//      To simply report the context of an invocation, call:
//          DebugIt(null, `Calling context`);
//      then check console.debug.  Otherwise, it "should"
//      handle string messages, objects, and Error objects
//      that are thrown by try...catch constructs.
//  ----------------------------------------------------------------------------------------

function DebugIt(msg = null, timeout = 4000) {
    let isError = (e) => {
        return e && e.stack && e.message 
                && typeof e.stack === 'string' 
                && typeof e.message === 'string';
    }

    let FindContext = (x) => {
        const A = x.stack.toString().split(/\r\n|\n/);
        const B = A[1].split(`@`).pop().split(`:`);
        if( Array.isArray(B) ) {
            if( typeof B[1] != `undefined` ) {
                const fname = B[1].split(`/`).pop();
                return(fname + ` [line:` + B[2] + `:` + B[3] + `]`);
            } else {
                return( JSON.stringify(B) );
            }
        } else {
            return( JSON.stringify(A) );
        }
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

    if(msg == null) {
        if( CURRENT.debug ) { 
            console.debug(`DebugIt called with null value`);
        }
        return;
    } 

    let sayThis = ``;

    if( isError(msg) ) {
        sayThis = msg.name + `: ` + msg.message;
        sayThis += `<span>` + FindContext(msg) + `</span>`;
    } else if( typeof msg == `object` ) {
        sayThis = JSON.stringify(msg);
    } else {
        sayThis = msg;
    }

    if( CURRENT.debug ) { console.debug(sayThis); }

    let pause = timeout;
    if( pause > 0 ) {
        const sizeTime = Math.min((sayThis.length * 100), 9000);
        pause = Math.max(sizeTime, 4000);
    }
    SnackBar(sayThis, pause);
}

// =====================================================================================================
//  "Snackbar message"
// ---------------------------------------------------------------------------------

function SnackBar(userMsg = '', waitTime = 4500) {
    const el = document.getElementById("snackBar");
    if( el !== null )
    {
        // let pixels = Math.ceil(userMsg.length * 0.75);
        // el.style.minWidth = pixels.toString() + 'em';
        // pixels = Math.ceil(pixels / 2);
        // el.style.marginLeft = '-' + pixels.toString() + 'em';
        if( waitTime > 0 ) {
            el.innerHTML = userMsg;
            el.classList.add("showSnack");
            setTimeout(
                function() { 
                    el.classList.remove("showSnack"); 
                }, waitTime
            );
        } else {
            el.innerHTML = userMsg + '<span class="snackBar-dismiss">Click here to dismiss</span>';
            el.classList.add("showSnack-NoFade");
        }
    }
}

// =====================================================================================================
//  DHTMLX8 application theme setter
// ---------------------------------------------------------------------------------

function ThemeSet(theme) {
    dhx.setTheme(theme);
}

// =====================================================================================================
//  Convert a kabab-case or snake-case string into a capitalized-word string
// ---------------------------------------------------------------------------------

function Wordify(input) {
    const str1 = input.replace(/\-+/g, "_");
    const str2 = str1.replace(/_+/g, " ");
    const words = str2.split(" ");
    for (let i in words) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}

// =====================================================================================================
//  Table Columns (JSON formatted) to Grid Columns
// ---------------------------------------------------------------------------------

function MakeGridColumns(fields) {
    const result = [];

    fields.forEach(
        (v) => {
            const col = {
                id: v[0],
                header: [{ text: Wordify(v[0]) }, { content: "inputFilter" }]
            };
            result.push(col);
        }
    );

    return result;
}

// =====================================================================================================
//  Table Data (JSON formatted) to Grid Rows
// ---------------------------------------------------------------------------------

function MakeGridRows(data) {
    const result = [];
    data.forEach(
        (row) => {
            const newRow = {};
            for(const prop in row) {
                if( typeof row[prop] == 'object' ) {
                    if( row[prop] == null ) {
                        newRow[prop] = null;
                    } else if( Object.hasOwn(row[prop], "date") ) {
                        let d = new Date(row[prop].date);
                        newRow[prop] = d.toLocaleDateString() + " " + d.toLocaleTimeString();
                    } else {
                        newRow[prop] = row[prop].toString();
                    }
                } else {
                    newRow[prop] = row[prop];
                }
            };
            result.push(newRow);
        }
    );
    return result;
}

// =====================================================================================================
//  Customized DHX.MESSAGE
// ---------------------------------------------------------------------------------

function MessageIt(str, t="info") {
    const msg = `<div class="custom-dhx-message-box">
    <object data="./includes/images/athletics.svg" width="50" height="45"></object>
    <span>` + str + `</span></div>`;
    const msgCss = `custom-dhx-message-` + t;
    dhx.message( {html: msg, css: msgCss, expire: 6000} );
}

// =====================================================================================================
//  General-purpose INFO window
//
//  Expects the parameter "info" to be an object configured like this:
//      info = {
//          title : `Info Window Title!`,
//          info  : `Here is all the information you need about this!`
//      };
//
// ---------------------------------------------------------------------------------

function InfoIt(info, uW = null, uH = null) {

    const pW = (Number.isInteger(uW) && uW >= 350 && uW <= 850) ? uW : 520;
    const pH = (Number.isInteger(uH) && uH >= 200 && uH <= 650) ? uH : 530;

    if( infoWindow === null ) {
        infoWindow = new dhx.Window({
            width: pW,
            height: pH,
            movable: true,
            resizable: true,
            closable: true,
            modal: false,
            viewportOverflow: true,
            css: "custom-window-border-1"
        });

        infoWindow.events.on("BeforeHide", function (p, e) {
            if (e.target.className.indexOf("dhx_button") == -1) {
                return false
            }
            return true;
        });

        infoLayout = new dhx.Layout(null, {
            type: "none",
            rows: [
                {
                    id : "info_info_cell",
                    height: "content",
                    html: `<div id="info_info" className="info-wrapper"></div>`,
                }
            ]            
        });

        infoWindow.attach(infoLayout);
    } else {
        const currSize = infoWindow.getSize();
        if( currSize.width != pW || currSize.height != pH ) {
            infoWindow.setSize(pW, pH);
        }
    }

    if( ! infoWindow.isVisible() ) infoWindow.show();

    dhx.awaitRedraw().then(function() {
        document.getElementById("info_info").innerHTML = info;
    });
}

// =====================================================================================================
//  Function To Get Fiscal Year
//
//  NOTE: the "main" function in "main.js" will call this on startup
//  and populate the CURRENT.fiscalYear global value; if it is already
//  in the PHP session, it will be set from that.
//  Unless there is a reason (and method) for changing the current year, 
//  the value should be obtained from this global rather than calling 
//  this function.  It is here only for the instance that the app's focus
//  needs to change to some other year in the past.
// ---------------------------------------------------------------------------------

function InitFiscalYear() {

    function UpdateVariousTitles() {
        const flel = document.getElementById("banner_fy");
        if( flel !== 'undefined' ) {
            flel.innerHTML = "&mdash; " + CURRENT.fiscalYear;
        }
        // SUP.toolbar.get(`stip`).data.update(
        //     "popup-title", 
        //     {html: "Stipends Picklist &ndash; " + CURRENT.fiscalYear}
        // );
    }

    if( sessionStorage.getItem('fiscalYear') != null ) {
        dhx.awaitRedraw().then(
            () => { 
                CURRENT.fiscalYear = sessionStorage.getItem('fiscalYear');
                UpdateVariousTitles(); 
            }
        ).catch(
            e => { DebugIt(e); }
        );
    } else {
        dhx.ajax.get('mAdmin/php/getCurrentYear.php').then(
            data => {
                CURRENT.fiscalYear = data[0].YEAR_RANGE;
                UpdateVariousTitles();
            }
        ).catch(
            e => { DebugIt(e); }
        );
    }
}

// =====================================================================================================
//  Set CURRENT user category permissions
//  This is called at startup, after the session is fetched,
//  and is implemented as a function so that a developer/admin
//  can alter permissions on the fly... 
//  NOTE for code maintenance: altering permissions on the fly 
//  requires (almost) everything to be re-initialized in order 
//  take effect!
// ---------------------------------------------------------------------------------

function ResetUserPermissions(category) {
    CURRENT.userCategory = [];
    if( Array.isArray(category) ) {
        CURRENT.userCategory.push(...category);
    } else {
        CURRENT.userCategory.push(category);
    }
}

// =====================================================================================================
//  Check CURRENT.userRole and CURRENT.userCategory permissions
//  again the passed-in category (or category array) and feature
// ---------------------------------------------------------------------------------

function Permitted(category, feature, role = null) {

    if( CURRENT.userRole.startsWith(`SUPER`) ) return true;

    // --- Any other permissions actions that are to be decide
    // --- solely by the user's CURRENT.userRole should be built
    // --- here, (before category permissions are tested).

    const tCatList = [];
    let result = 0;
    
    if( Array.isArray(category) ) {
        tCatList.push(...category);
    } else {
        tCatList.push(category);
    }

    const iCatList = CURRENT.userCategory.filter(x => tCatList.includes(x));

    if( iCatList.length > 0 ) {
        iCatList.forEach(
            (iCat) => {
                if( CURRENT.userMap.has(iCat) ) {
                    const categoryArray = CURRENT.userMap.get(iCat);
                    for(const idx in categoryArray ) {
                        for(const featurekey of Object.getOwnPropertyNames(categoryArray[idx])) {
                            if( feature == featurekey ) {
                                result += categoryArray[idx][featurekey];
                            }
                            if( result > 0 ) { break; }
                        }
                        if( result > 0 ) { 
                            break; 
                        }
                    }
                }
            }
        )
    }
    return( (result > 0) ? true : false );
}

// ================================================================================
//  Permissions model initialization
//      This runs asynchronously, and returns a Promise object result because
//      almost all other initialization must wait for these results to return.
// ---------------------------------------------------------------------------------

async function InitPermissions(badge_id) {

    CURRENT.userMap = new Map();
    let msg = `Permissions Set OK`, data = null;
    if( !CURRENT.userRole.startsWith(`SUPER`) ) {
        const url = 'mAdmin/php/getPermissions.php?id=' + badge_id;
        const response = await fetch(url, {method: 'GET', cache: 'no-cache'});
        if(response.ok) {
            const results = await response.text();
            if( (data = isJson(results)) !== false ) {
                for( let [category, features] of Object.entries(data) ) {
                    CURRENT.userMap.set(category, features);
                    CURRENT.userCategory.push(category);
                }
                return Promise.resolve(msg);
            } else {
                msg = `ERROR: ` + results;
            }
        } else {
            msg = `ERROR: unable to obtain permissions data from the database`;
        }
        return Promise.reject(msg);
    } else {
        return Promise.resolve(msg);
    }
}

// ======================================================================================
//  UTILITY FUNCTIONS...
// ======================================================================================
//  "isJson" answers the burning question: is it JSON?
//  And, does it without croaking by try-catching JSON.parse.
//  This can help with AJAX return values; when DB errors 
//  occur, handlers may be built to just die, or will not 
//  return well-formed JSON.  This function facilitates 
//  testing before confusing errors show up in the console.
//  If a "thing" is JSON, it returns the parsed value, else false.
//
//  Make sure to test for identity with "false" -- not just
//  boolean "false" -- something like this:
//
//      if( (let parsedThing = isJson(thing)) !== false ) { 
//          parsedThing.data ... 
//      } else {
//          InformButDoNotDieOverThis(thing) ...
//      }
//
//  AND... do not neglect to do this test for "false" or you might
//  end up with behavior that will be even more difficult to
//  debug than it would have if you hadn't used it at all.
// --------------------------------------------------------------------------------------

function isJson(str) {
    try {
        const data = JSON.parse(str);
        return data;
    } catch (e) {
        return false;
    }
}

function fullDocumentPath() {
    let link = window.location.protocol + '//' + window.location.hostname;
    let pathway = window.location.pathname.split('/');
    pathway.pop();
    return( link + pathway.join('/') );
};

function BuildGET(params = {}, base = ``) {
    let comps = [];
    for(let p in params) {
        comps.push(p + `=` + params[p]);
    }
    return( base + `?` + comps.join(`&`) );
}
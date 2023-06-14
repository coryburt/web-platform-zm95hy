/*
 *
 *  supplementals_main.js
 * 
 * ***************************************************************************************** */

// --- Async function to fetch a staff image from the bethel media server -----------

SUP.func.FetchStaffImage = async ( sid = SUP.current.badgeID ) => {
    const url = './includes/php/staffImageFeed.php?id=' + sid;
    const response = await fetch(url, {method: 'GET', cache: 'no-cache'});
    if (response.ok) {
        const image_data = await response.json();
        return Promise.resolve(image_data);
    } else {
        return Promise.reject('Call to server failed');
    }
}

//  --- Function to "clear" the image box with "default3.png" ------------------------

SUP.func.ResetStaffImage = function(STIP = SUP.current.STIP, ACT = SUP.current.ACT) {
    const defaultImage = `<img src="includes/images/default3.png" width="183" height="154" />`;
    SUP.form.get(STIP).get(ACT)
        .getItem(`staff_image`)
        .attachHTML(defaultImage);
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.ToggleSuppMenuYear = function(titleID, optID) {
    const opt = SUP.toolbar.get(`nav`).data.getItem(optID);
    const title = SUP.toolbar.get(`nav`).data.getItem(titleID);

    if( CURRENT.fiscalState == `current` ) { // switch to all...
        title.html = `All Fiscal Years`;
        opt.value = `Change Focus To Current Fiscal Year Only`;
        opt.icon = `fa-regular fa-toggle-on fa-rotate-180`;
        CURRENT.fiscalState = `all`;
    } else {    // toggle to the current fiscal year...
        title.html = `Current Fiscal Year - ` + CURRENT.fiscalYear;
        opt.icon = `fa-regular fa-toggle-on`;
        opt.value = `Change Focus To ALL Fiscal Years`;
        CURRENT.fiscalState = `current`;
    }

    SUP.toolbar.get(`nav`).paint();
    SUP.func.RefreshAllSuppGrid();
    SUP.func.RefreshAthSuppGrid();
    SUP.func.RefreshOthSuppGrid();
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.RefreshAllSuppGrid = function() {
    let q = {};
    if( CURRENT.fiscalState != `current` ) {
        q[`all`] = `1`;
    } else {
        if( Permitted(`ATH`, `suppMod`) ) {
            q[`athOK`] = `1`;
        }
        if( Permitted(`OTH`, `oth1Mod`) ) {
            q[`oth1OK`] = `1`;
        }
    }

    let url = BuildGET(q, 'mSupplementals/php/getSupplementals.php');

    if( SUP.grid.has(`allsupplemental`) 
                && SUP.grid.get(`allsupplemental`) != null ) {
        SUP.grid.get(`allsupplemental`).data.removeAll();
    } else {
        SUP.grid.set(
            `allsupplemental`,
            new dhx.Grid(null, SUP.gridCfg.get(`allsupplemental`))
        );
    }

    if( CURRENT.fiscalState != `current` ) {
        SUP.grid.get(`allsupplemental`).showColumn(`YEAR`);
    } else {
        SUP.grid.get(`allsupplemental`).hideColumn(`YEAR`);
    }

    SUP.grid.get(`allsupplemental`).data.load(url)
        .then(
            () => {
                SUP.layout.get(`allSuppList`)
                    .getCell(SUP.layoutCell.get(`allSuppList`).contentCellID)
                    .attach(SUP.grid.get(`allsupplemental`));
            }
        )
        .catch(
            (e) => { DebugIt(e); }
        );
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//      This is the supplementals content panel cell selector;
//      it is patterned after the main sidebar content cell selector
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.SuppContentPanel = function(request = null) {

    let target = "supp_opt_list_other";
    if( request == null ) {
        if( Permitted(`ALL`, `suppLst`) ) {
            target = `supp_opt_list_all`;
        } else if ( Permitted(`ATH`, `suppLst`) ) {
            target = `supp_opt_list_athletic`;
        } else if ( Permitted(`OTH`, `suppLst`) ) {
            target = `supp_opt_list_other`;
        }
    } else {
        target = request;
    }

    SUP.navMap.forEach(
        (obj, key) => {
            if( key == target ) {
                SUP.navLayout.getCell(obj.id).show();
            } else {
                SUP.navLayout.getCell(obj.id).hide();
            }
        }
    )
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//      Close, clear, and save (or cancel) supplemental input/edit forms
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.CompleteSupplementalForm = function(saveOrCancel, STIP, ACT) {

    function ShowSavedData(json) {
        let message = `
            <div class="info-title">Data Returned by Successful Submit</div>
            <ul>
        `;

        // data = JSON.parse(json);
        // for (const [key, value] of Object.entries(data)) {
        //     message += `<li>${key} : ${cval}</li>`;
        // }
        // message += `</ul>`;
        // return message;
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    // Always clear info containers, whether the form is saved or cancelled...
    const url = 
        (STIP == `ath`)
            ? `mSupplementals/php/athleticSupplementalSubmit.php`
            : `mSupplementals/php/otherSupplementalSubmit.php`;
    if( saveOrCancel == `save`) {
        SUP.form.get(STIP).get(ACT).send(url, "POST").then (
            function(json) {
                const data = JSON.parse(json);
                let insOK = 0;
                data.OK.forEach(
                    (val, idx) => {
                        insOK += (parseInt(val,10) > 0) ? 1 : 0; 
                        if( CURRENT.debug && data.ERR[idx] && data.ERR[idx].length > 0 ) {
                            console.debug(data.ERR[idx]);
                        }
                    }
                )

                if( insOK == 1 ) {
                    MessageIt(`One record updated/inserted OK`);
                } else if( insOK > 1 ) {
                    MessageIt(insOK + ` records updated/inserted OK`);
                } else {
                    MessageIt(`No records inserted or updated`);
                }

                if( CURRENT.debug ) {
                    console.debug(`data.OK = ` + JSON.stringify(data.OK,null,2));
                    // console.debug(JSON.stringify(data.RCVD,null,2));
                    console.debug(JSON.stringify(data.SENT,null,2));
                }
                SUP.func.FetchStaffImage().then( 
                    imgEl => {
                        SUP.form.get(STIP).get(ACT)
                            .getItem("staff_image")
                            .attachHTML(imgEl.data);
                    }
                ).catch(
                    (e) => { DebugIt(e); }
                );
            
                SUP.form.get(STIP).get(ACT).clear();    // Will be done always once saving is
                SUP.func.ResetStaffImage(STIP, ACT);
            }
        ).catch (
            (err) => { DebugIt(err); }
        );
    } else {
        SUP.form.get(STIP).get(ACT).clear();    // Will be done always once saving is
        SUP.func.ResetStaffImage(STIP, ACT);    // working, (barring errors in saving).
    }        

}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

//      InitSupplemental() must be called as part of the "then"
//      function envoked by the "fetchAppSession.php" AJAX call.

//      The steps of the InitSupplemental process are broken up into
//      functions internal to this function for readability convenience

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

function InitSupplemental(contentCell) {

    const tbID = [];
    const config = [];

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // - - - Here beginneth the embedded function steps... ;o)
    // - - - They need to be called in order.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // -=-=- Build the supplemental content panel's top toolbar -=-=-=-=-=-=-=-=-=-

    function BuildEditToolbar() {
        SUP.toolbar.set(
            `nav`, 
            new dhx.Toolbar(null, SUP.closure.configNavTBar.GetConfig())
        );

        SUP.navLayout.getCell("supp_top_menu_cell")
            .attach(SUP.toolbar.get(`nav`));

        SUP.toolbar.get(`nav`).events.on("click",
            function(id) {
                switch(id) {
                    case `supp_opt_add_athletic`:
                        SUP.current.STIP = `ath`;
                        SUP.current.ACT = `input`;
                        SUP.toolbar.get(`nav`).disable();
                        mainSidebar.disable();
                        SUP.func.RefreshExpContainer();
                        SUP.func.RefreshReqdCertGrid();
                        SUP.func.RefreshActvCertGrid();
                        SUP.func.RefreshStaffOtherStipendsGrid();
                        SUP.func.InitInputFormFields();
                        SUP.func.SuppContentPanel(id);
                        break;
                    case `supp_opt_add_other`:
                        SUP.current.STIP = `oth`;
                        SUP.current.ACT = `input`;
                        SUP.toolbar.get(`nav`).disable();
                        mainSidebar.disable();
                        SUP.func.InitInputFormFields();
                        SUP.func.SuppContentPanel(id);
                        break;
                    case `supp_opt_list_all`:
                        SUP.current.STIP = ``;
                        SUP.current.ACT = ``;
                        SUP.func.SuppContentPanel(id);
                        break;
                    case `supp_opt_list_athletic`:
                        SUP.current.STIP = `ath`;
                        SUP.current.ACT = ``;
                        SUP.func.SuppContentPanel(id);
                        break;
                    case `supp_opt_list_other`:
                        SUP.current.STIP = `oth`;
                        SUP.current.ACT = ``;
                        SUP.func.SuppContentPanel(id);
                        break;
                    case `supp_opt_list_info`:
                        InfoIt(SUP.blurbs.supplementalInfo);
                        break;
                    case `supp_menu_title`:
                        break;
                    case `supp_opt_toggle_fiscal_year`:
                        SUP.func.ToggleSuppMenuYear(`supp_menu_title`, id);
                        break;
                    default:
                        MessageIt(`Not Yet Implemented`);
                }
            }
        );
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // -=-=- Build the supplemental picklist and layout -=-=-=-=-=-=-=-=-=-=-=-=-=-

    function BuildAllSupplementalPicklist() {
        SUP.toolbar.set(
            `all`, new dhx.Toolbar(null, SUP.suppTBCfg.get(`all`))
        );
        SUP.layout.set(
            `allSuppList`,
            new dhx.Layout(null, SUP.layoutCfg.get(`allSuppList`))
        );

        SUP.layout.get(`allSuppList`)
            .getCell(SUP.layoutCell.get(`allSuppList`).toolbarCellID)
            .attach(SUP.toolbar.get(`all`));

        SUP.navLayout
            .getCell(SUP.navMap.get("supp_opt_list_all").id)
            .attach(SUP.layout.get(`allSuppList`));
        
        //  -----------------------------------------------------------
        
        SUP.func.RefreshAllSuppGrid();

        SUP.toolbar.get(`all`).events.on("click",
            (id) => { 
                switch(id) {
                    case "supplist-grid-title":
                        break;
                    case "supplist-grid-refresh":
                        SUP.func.RefreshAllSuppGrid();
                        break;
                    default:
                        // console.log(id);
                        MessageIt("Not Yet Implemented");
                }
            }
        );
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    function BuildPicklistWindows() {
        const offsetWidth = parseInt(0.75 * browserSize.width);
        const offsetHeight = browserSize.height - 80;
        const offsetLeft = parseInt((0.5 * browserSize.width) - (0.275 * browserSize.width));

        if( SUP.win.stipendList == null ) {  // True the first time...
            SUP.win.stipendList = new dhx.Window(
                {
                    width: offsetWidth,
                    height: offsetHeight,
                    top: 120,
                    left: offsetLeft,
                    modal: true,
                    resizable: true,
                    closable: true,
                    movable: true,
                    header: false,
                    css: "custom-window-fit",
                }
            );

            SUP.layout.set(
                `stipendList`,
                new dhx.Layout(null, SUP.layoutCfg.get(`stipendList`))
            );
            dhx.setTheme("light", SUP.layoutCell.get(`stipendList`).toolbarCellID);
            dhx.setTheme("light", SUP.layoutCell.get(`stipendList`).contentCellID);

            SUP.toolbar.set(
                `stip`, new dhx.Toolbar(null, SUP.suppTBCfg.get(`stip`))
            );

            SUP.toolbar.get(`stip`).events.on("click",
                (id) => { 
                    switch(id) {
                        case "popup-grid-refresh":
                            SUP.func.RefreshStipendPicklistGrid();
                            break;
                        case "popup-window-close":
                            SUP.win.stipendList.hide();
                            break;
                        case "popup-title":
                            break;
                        default:
                            MessageIt("Not Yet Implemented");
                    }
                }
            );

            SUP.func.RefreshStipendPicklistGrid();
        }
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    function BuildAthViewOnlyWindow() {
        const offsetWidth = parseInt(0.7 * browserSize.width);
        const offsetHeight = browserSize.height - 100;

        if( SUP.win.athViewOnly == null ) {  // True the first time...
            SUP.win.athViewOnly = new dhx.Window(
                {
                    minWidth: offsetWidth,
                    minHeight: offsetHeight,
                    top: 110,
                    modal: true,
                    resizable: true,
                    closable: true,
                    movable: false,
                    css: "custom-view-only-window",
                }
            );

            SUP.win.athViewOnly.events.on("BeforeHide", function(p,e) {
                if(e.target.className.indexOf("dhx_button") == -1 ) {
                    return false;
                }
                return true;
            });

            SUP.layout.set(
                `athViewOnly`,
                new dhx.Layout(null, SUP.layoutCfg.get(`athViewOnly`))
            );
            dhx.setTheme("light", SUP.layoutCell.get(`athViewOnly`).toolbarCellID);
            dhx.setTheme("light", SUP.layoutCell.get(`athViewOnly`).contentCellID);

            SUP.toolbar.set(
                `athViewOnly`, new dhx.Toolbar(null, SUP.suppTBCfg.get(`athViewOnly`))
            );

            SUP.layout.get(`athViewOnly`)
                .getCell(SUP.layoutCell.get(`athViewOnly`).toolbarCellID)
                .attach(SUP.toolbar.get(`athViewOnly`));

            SUP.win.athViewOnly.attach(SUP.layout.get(`athViewOnly`));

            SUP.toolbar.get(`athViewOnly`).events.on("click",
                (id) => { 
                    switch(id) {
                        case "athViewOnly-refresh":
                            break;
                        case "athViewOnly-title":
                            break;
                        default:
                            MessageIt("Not Yet Implemented");
                    }
                }
            );
        }
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    function BuildOthViewOnlyWindow() {
        const offsetWidth = parseInt(0.7 * browserSize.width);
        const offsetHeight = browserSize.height - 100;

        if( SUP.win.othViewOnly == null ) {  // True the first time...
            SUP.win.othViewOnly = new dhx.Window(
                {
                    minWidth: offsetWidth,
                    minHeight: offsetHeight,
                    top: 110,
                    modal: true,
                    resizable: true,
                    closable: true,
                    movable: false,
                    css: "custom-view-only-window",
                }
            );

            SUP.win.othViewOnly.events.on("BeforeHide", function(p,e) {
                if(e.target.className.indexOf("dhx_button") == -1 ) {
                    return false;
                }
                return true;
            });

            SUP.layout.set(
                `othViewOnly`,
                new dhx.Layout(null, SUP.layoutCfg.get(`othViewOnly`))
            );
            dhx.setTheme("light", SUP.layoutCell.get(`othViewOnly`).toolbarCellID);
            dhx.setTheme("light", SUP.layoutCell.get(`othViewOnly`).contentCellID);

            SUP.toolbar.set(
                `othViewOnly`, new dhx.Toolbar(null, SUP.suppTBCfg.get(`othViewOnly`))
            );

            SUP.layout.get(`othViewOnly`)
                .getCell(SUP.layoutCell.get(`othViewOnly`).toolbarCellID)
                .attach(SUP.toolbar.get(`othViewOnly`));

            SUP.win.othViewOnly.attach(SUP.layout.get(`othViewOnly`));

            SUP.toolbar.get(`othViewOnly`).events.on("click",
                (id) => { 
                    switch(id) {
                        case "othViewOnly-title":
                            break;
                        case "othViewOnly-refresh":
                        default:
                            MessageIt("Not Yet Implemented");
                    }
                }
            );
        }
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    if( SUP.navLayout == null ) {

        // --- Initialize the "FiscalSet" dhx.DataCollections --------------
        // --- These are used to populate the Fiscal Year form combo -------
        SUP.current.currFiscalSet = new dhx.DataCollection();
        SUP.current.allFiscalSet = new dhx.DataCollection();
        const yearLookup = `includes/php/getComboYear.php?current_future=`;
        SUP.current.allFiscalSet.load(yearLookup).then(
            () => {
                const id = SUP.current.allFiscalSet.getId(0);
                const item = SUP.current.allFiscalSet.getItem(id);
                SUP.current.allFiscalSet.remove([id]);
                SUP.current.currFiscalSet.parse([item]);
                if( CURRENT.debug ) {
                    // console.log(JSON.stringify(SUP.current.allFiscalSet.serialize(),null,4));
                }
            }
        );

        SUP.navMap.forEach(
            (obj, key) => {
                tbID.push(key);
                config.push(obj);
            }
        );

        SUP.navLayout = new dhx.Layout(null, {
            type: "none",
            rows: [
                {
                    id: "supp_top_menu_cell",
                    height: "content",
                },{
                    id: "supp_content_cell",
                    css: "dhx_layout-cell--border_top",
                    rows: config
                }
            ]
        });

        // --- Must be called in this order ---

        dhx.setTheme("light", "supp_content_cell");

        BuildEditToolbar();
        BuildAllSupplementalPicklist();
        BuildPicklistWindows();
        BuildAthViewOnlyWindow();
        BuildOthViewOnlyWindow();

        SUP.func.BuildAthSupplementalPicklist();
        SUP.func.BuildAthleticInputForm();
        SUP.func.BuildAthleticEditForm();
        SUP.func.BuildAthleticViewForm();

        SUP.func.BuildOthSupplementalPicklist();
        SUP.func.BuildOtherInputForm();
        SUP.func.BuildOtherEditForm();
        SUP.func.BuildOtherViewForm();

        contentCell.attach(SUP.navLayout);

        SUP.func.SuppContentPanel();
    }
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.InsertStipendGU = function(stipend_vc, activity) {
    SUP.form.get(SUP.current.STIP).get(SUP.current.ACT)
        .getItem(`stipend_vc`).setValue(stipend_vc);
    SUP.form.get(SUP.current.STIP).get(SUP.current.ACT)
        .getItem(`stipend`).setValue(activity);
    SUP.current.stipendGU = stipend_vc;
    const currBadge = SUP.form.get(SUP.current.STIP).get(SUP.current.ACT)
        .getItem(`badge_id`).getValue();
    SUP.func.RefreshExpContainer(currBadge, SUP.current.stipendGU);
    SUP.win.stipendList.hide();
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.InitInputFormFields = function(STIP = SUP.current.STIP, ACT = SUP.current.ACT) {

    const form = SUP.form.get(STIP).get(ACT);
    const flds = SUP.formFlds.get(STIP).get(ACT);

    const yrid = SUP.combo.get(STIP).get(ACT).supp_year.data.getId(0);
    form.getItem(flds.supp_year.fname).setValue(yrid);
    form.getItem(flds.supp_year_vc.fname).setValue(yrid);

    form.getItem(flds.distrib.fname).setValue(`OTH`);
    form.getItem(flds.distrib_vc.fname).setValue(`OTH`);
    form.getItem(flds.freq.fname).setValue(`OTH`);
    form.getItem(flds.freq_vc.fname).setValue(`OTH`);
    form.getItem(flds.split.fname).setValue(`NOT`);
    form.getItem(flds.split_vc.fname).setValue(`NOT`);

    if( STIP == `ath` ) {
        form.getItem(flds.is_expr.fname).setValue(0);
        form.getItem(flds.non_cont.fname).setValue(0);
    }
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//  Create and populate an external browser instance
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.externalBrowserPopup = function(data) {
    if( SUP.externalBrowserRef === null || SUP.externalBrowserRef.closed ) {
        SUP.externalBrowserRef = window.open('', 'ExternalInfoWindow', SUP.externalBrowserProps);
    } else {
        SUP.externalBrowserRef.focus();
    }
    SUP.externalBrowserRef.document.write(data);
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.factory.BuildForm = function (stip, act) {
    if( ! (SUP.listOfStipends.includes(stip) && SUP.listOfActions.includes(act)) ) {
        DebugIt(`ERROR: form factory inputs invalid: [${stip}] [${act}]`);
        return false;
    }

    if( ! Object.hasOwn(SUP.form, stip) ) {
        SUP.form[stip] = {};
    }
    if( ! Object.hasOwn(SUP.form[stip], act) ) {
        SUP.form[stip][act] = new dhx.Form(
            null, SUP.formCfg[stip][act]
        );
    }
    return true;
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
// SUP.func.InitializeWidget = function (sType = '', iType = '', wType = '', name = '') {
//     let retval = true;
//     let err = `\nUsage: SUP.func.InitializeWidget(<stipend type>, <input or edit>, <widget type>, <name>)`;
//     const wTypeList = ['form', 'grid', 'toolbar'];
//     try {
//         if( ! wTypeList.includes(wType) ) {
//             err = `ERROR: must specify "form," "grid," or "toolbar" for the widget type` + err;
//             throw err;
//         } else if( !(sType == 'ath' || sType == 'oth') ) {
//             err = `ERROR: must specify "ath" or "oth" for the stipend type` + err;
//             throw err;
//         } else if( !(iType == 'input' || iType == 'edit') ) {
//             err = `ERROR: must specify "input" or "edit" for the input type` + err;
//             throw err;
//         } else if( name == '' ) {
//             err = `ERROR: must supply a name for the widget` + err;
//             throw err;
//         } else if( ! SUP[sType][iType][wType].hasOwnProperty(name) ) {
//             switch (wType) {
//                 case `form`:
//                     SUP[sType][iType]['form'][name] = new dhx.Form(null, SUP[sType][iType].formCfg);
//                     break;
//                 case `grid`:
//                     SUP[sType][iType]['grid'][name] = new dhx.Grid(null, config);
//                     break;
//                 case `toolbar`:
//                     SUP[sType][iType]['toolbar'][name] = new dhx.Toolbar(null, config);
//                     break;
//             }
//         }
//     } catch(e) {
//         e => { 
//             DebugIt(e); 
//             retval = false;
//         }
//     }
//     return retval;
// }

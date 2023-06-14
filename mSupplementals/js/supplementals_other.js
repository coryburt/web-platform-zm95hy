/*
 *
 *  supplementals_other.js
 * 
 * ***************************************************************************************** */

//  ----------------------------------------------------------------------------------
//      Initialization function; called once at startup by the
//      "InitSupplemental" function
//  ----------------------------------------------------------------------------------

SUP.func.BuildOtherInputForm = function() {

    const STIP = `oth`;
    const ACT = `input`;

    function ImageFetcher(id = '') {
        SUP.func.FetchStaffImage(id).then( 
            imgEl => {
                SUP.form.get(STIP).get(ACT)
                    .getItem("staff_image")
                    .attachHTML(imgEl.data);
            }
        ).catch(
            (e) => { 
                DebugIt(e); 
            }
        );
    }

    //  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    SUP.form.get(STIP).set(
        ACT, new dhx.Form(null, SUP.formCfg.get(STIP).get(ACT))
    )

    //  --- Grab combo widgets and work'em over -----------------------------------------------

    SUP.combo.get(STIP).get(ACT).supp_year = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).supp_year.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).bnum = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).badge_id.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).name = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).name.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).location = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).location.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).distrib = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).distrib.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).freq = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).freq.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).splt = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).split.fname).getWidget();

    //  --- Load combos -------------------------------------------------------------

    let allCombosURL  = "includes/php/getMultiComboLookup.php?";
    allCombosURL     += "id[]=DISTRIBUTION&id[]=FREQUENCY&id[]=SPLIT";
    allCombosURL     += "&id[]=NAME&id[]=LOCATION&id[]=YEAR";
    
    dhx.ajax.get(allCombosURL).then(
        (allData) => {
            SUP.combo.get(STIP).get(ACT).supp_year.data.parse(allData.YEAR);
            SUP.combo.get(STIP).get(ACT).location.data.parse(allData.LOCATION);
            SUP.combo.get(STIP).get(ACT).freq.data.parse(allData.FREQUENCY);
            SUP.combo.get(STIP).get(ACT).distrib.data.parse(allData.DISTRIBUTION);
            SUP.combo.get(STIP).get(ACT).splt.data.parse(allData.SPLIT);
            SUP.combo.get(STIP).get(ACT).name.data.parse(allData.NAME);
            SUP.combo.get(STIP).get(ACT).bnum.data.parse(allData.BADGE);

            SUP.combo.get(STIP).get(ACT).splt.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT)
                        .getItem(SUP.formFlds.get(STIP).get(ACT).split_vc.fname)
                        .setValue(id);
                }
            );
            SUP.combo.get(STIP).get(ACT).freq.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT)
                        .getItem(SUP.formFlds.get(STIP).get(ACT).freq_vc.fname)
                        .setValue(id);
                }
            );
            SUP.combo.get(STIP).get(ACT).location.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT)
                        .getItem(SUP.formFlds.get(STIP).get(ACT).location_vc.fname)
                        .setValue(id);
                }
            );
            SUP.combo.get(STIP).get(ACT).distrib.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT)
                        .getItem(SUP.formFlds.get(STIP).get(ACT).distrib_vc.fname)
                        .setValue(id);
                }
            );
            SUP.combo.get(STIP).get(ACT).bnum.events.on("change",
                (id) => {
                    if( typeof id !== 'undefined' ) {
                        SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).name.fname).setValue(id);
                        ImageFetcher(id);
                    }
                }
            );
            SUP.combo.get(STIP).get(ACT).name.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT)
                        .getItem(SUP.formFlds.get(STIP).get(ACT).badge_id.fname)
                        .setValue(SUP.combo.get(STIP).get(ACT).name.getValue());
                }
            );
        }
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ImageFetcher();

    //  --- Finally, we can attach the form layout to it's main content cell ---
    SUP.navLayout
        .getCell(SUP.navMap.get("supp_opt_add_other").id)
        .attach(SUP.form.get(STIP).get(ACT));

    //  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    SUP.form.get(STIP).get(ACT).getItem("save_and_close").events.on("click", 
        function(events) {
            SUP.func.CompleteSupplementalForm(`save`, STIP, ACT);
            SUP.toolbar.get(`nav`).enable();
            mainSidebar.enable();
            SUP.func.SuppContentPanel();
        }
    );
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    SUP.form.get(STIP).get(ACT).getItem("cancel_and_close").events.on("click", 
        function(events) {
            SUP.func.CompleteSupplementalForm(`cancel`, STIP, ACT);
            SUP.toolbar.get(`nav`).enable();
            mainSidebar.enable();
            SUP.func.SuppContentPanel();
        }
    );
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).stip_lookup.fname)
        .events.on("click", function(events) {
            SUP.win.stipendList.show();
        }
    );
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    SUP.form.get(STIP).get(ACT).getItem("form_info").events.on("click",
        function(events) {
            InfoIt(SUP.func.ShowOthFormInfo(ACT), 620);
        }
    );
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//      Initialization function; called once at startup by the
//      "InitSupplemental" function
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

SUP.func.BuildOtherEditForm = function() {

    const STIP = `oth`;
    const ACT = `edit`;

    SUP.form.get(STIP).set(
        ACT, new dhx.Form(null, SUP.formCfg.get(STIP).get(ACT))
    )

    //  --- Grab combo widgets and work'em over -----------------------------------------------

    SUP.combo.get(STIP).get(ACT).supp_year = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).supp_year.fname).getWidget();

    SUP.combo.get(STIP).get(ACT).bnum = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).badge_id.fname).getWidget();

    SUP.combo.get(STIP).get(ACT).name = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).name.fname).getWidget();

    SUP.combo.get(STIP).get(ACT).location = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).location.fname).getWidget();

    SUP.combo.get(STIP).get(ACT).distrib = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).distrib.fname).getWidget();

    SUP.combo.get(STIP).get(ACT).freq = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).freq.fname).getWidget();

    SUP.combo.get(STIP).get(ACT).splt = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).split.fname).getWidget();

    //  --- Fill combos from lookups ---------------------------------------------------------------------

    // SUP.combo.get(STIP).get(ACT).bnum.data.load("./includes/php/getComboStaff.php?all=yes&type=badge");
    // SUP.combo.get(STIP).get(ACT).splt.data.load("./includes/php/getComboLookup.php?id=SPLIT");
    // SUP.combo.get(STIP).get(ACT).freq.data.load("./includes/php/getComboLookup.php?id=FREQUENCY");
    // SUP.combo.get(STIP).get(ACT).distrib.data.load("./includes/php/getComboLookup.php?id=DISTRIBUTION");
    // SUP.combo.get(STIP).get(ACT).location.data.load("./includes/php/getComboSecondaryLocations.php");
    // SUP.combo.get(STIP).get(ACT).name.data.load("./includes/php/getComboStaff.php?all=yes");

    let allCombosURL  = "includes/php/getMultiComboLookup.php?";
    allCombosURL     += "id[]=DISTRIBUTION&id[]=FREQUENCY&id[]=SPLIT";
    allCombosURL     += "&id[]=NAME&id[]=LOCATION&id[]=YEAR";
    
    dhx.ajax.get(allCombosURL).then(
        (allData) => {
            SUP.combo.get(STIP).get(ACT).supp_year.data.parse(allData.YEAR);
            SUP.combo.get(STIP).get(ACT).location.data.parse(allData.LOCATION);
            SUP.combo.get(STIP).get(ACT).freq.data.parse(allData.FREQUENCY);
            SUP.combo.get(STIP).get(ACT).distrib.data.parse(allData.DISTRIBUTION);
            SUP.combo.get(STIP).get(ACT).splt.data.parse(allData.SPLIT);
            SUP.combo.get(STIP).get(ACT).name.data.parse(allData.NAME);
            SUP.combo.get(STIP).get(ACT).bnum.data.parse(allData.BADGE);

            //  --- Initialize combo event handlers -------------------------------------------------------

            SUP.combo.get(STIP).get(ACT).supp_year.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).supp_year_vc.fname).setValue(id);
                }
            );
            SUP.combo.get(STIP).get(ACT).location.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).location_vc.fname).setValue(id);
                }
            );
            SUP.combo.get(STIP).get(ACT).distrib.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).distrib_vc.fname).setValue(id);
                }
            );
            SUP.combo.get(STIP).get(ACT).freq.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).freq_vc.fname).setValue(id);
                }
            );
            SUP.combo.get(STIP).get(ACT).splt.events.on("change",
                (id) => {
                    SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).split_vc.fname).setValue(id);
                }
            );
        }
    );

    //  --- Finally, we can attach the form layout to it's main content cell ---

    SUP.navLayout
        .getCell(SUP.navMap.get("supp_opt_edit_other").id)
        .attach(SUP.form.get(STIP).get(ACT));

/* */
    //  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    SUP.form.get(STIP).get(ACT).getItem("save_and_close").events.on("click", 
        function(events) {
            SUP.func.CompleteSupplementalForm(`save`, STIP, ACT);
            SUP.toolbar.get(`nav`).enable();
            mainSidebar.enable();
            SUP.func.SuppContentPanel();
        }
    );
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    SUP.form.get(STIP).get(ACT).getItem("cancel_and_close").events.on("click", 
        function(events) {
            SUP.func.CompleteSupplementalForm(`cancel`, STIP, ACT);
            SUP.toolbar.get(`nav`).enable();
            mainSidebar.enable();
            SUP.func.SuppContentPanel();
        }
    );
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).stip_lookup.fname).events.on("click",
        function(events) {
            SUP.win.stipendList.show();
        }
    );
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    SUP.form.get(STIP).get(ACT).getItem("form_info").events.on("click",
        function(events) {
            InfoIt(SUP.func.ShowOthFormInfo(ACT), 620);
        }
    );

/* */

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//      Initialization function; called once at startup by the
//      "InitSupplemental" function
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

SUP.func.BuildOtherViewForm = function() {

    const STIP = `oth`;
    const ACT = `view`;

    SUP.form.get(STIP).set(
        ACT, new dhx.Form(null, SUP.formCfg.get(STIP).get(ACT))
    )
    //  --- Finally, we can attach the form layout to it's main content cell ---

    SUP.layout.get(`othViewOnly`)
        .getCell(SUP.layoutCell.get(`othViewOnly`).contentCellID)
        .attach(SUP.form.get(STIP).get(ACT));
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// -=-=- Build the Other-only supplemental picklist and layout -=-=-=-=-=-=-=-=-=-=-=-=-=-
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

SUP.func.BuildOthSupplementalPicklist = function() {

    SUP.toolbar.set(
        `oth`, new dhx.Toolbar(null, SUP.suppTBCfg.get(`oth`))
    );

    SUP.layout.set(
        `othSuppList`,
        new dhx.Layout(null, SUP.layoutCfg.get(`othSuppList`))
    );

    SUP.layout.get(`othSuppList`)
        .getCell(SUP.layoutCell.get(`othSuppList`).toolbarCellID)
        .attach(SUP.toolbar.get(`oth`));

    SUP.navLayout
        .getCell(SUP.navMap.get("supp_opt_list_other").id)
        .attach(SUP.layout.get(`othSuppList`));
    
    //  -----------------------------------------------------------
    
    SUP.func.RefreshOthSuppGrid();

    SUP.toolbar.get(`oth`).events.on("click",
        (id) => { 
            switch(id) {
                case "othlist-grid-title":
                    break;
                case "othlist-grid-refresh":
                    SUP.func.RefreshOthSuppGrid();
                    break;
                default:
                    MessageIt("Not Yet Implemented");
            }
        }
    );
}

//  ----------------------------------------------------------------------------------
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  ----------------------------------------------------------------------------------

SUP.func.RefreshOthSuppGrid = function() {
    let q = { type : `oth` };
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

    if( SUP.grid.has(`othSuppList`)
                && SUP.grid.get(`othSuppList`) != null ) {
        SUP.grid.get(`othSuppList`).data.removeAll();
    } else {
        SUP.grid.set(
            `othSuppList`, 
            new dhx.Grid(null, SUP.gridCfg.get(`othSuppList`))
        )
    }

    if( CURRENT.fiscalState != `current` ) {
        SUP.grid.get(`othSuppList`).showColumn(`YEAR`);
    } else {
        SUP.grid.get(`othSuppList`).hideColumn(`YEAR`);
    }

    SUP.grid.get(`othSuppList`).data.load(url).then(
        () => {
            SUP.layout.get(`othSuppList`)
            .getCell(SUP.layoutCell.get(`othSuppList`).contentCellID)
            .attach(SUP.grid.get(`othSuppList`));  
        }
    )
    .catch(
        (e) => { DebugIt(e); }
    );
}

//  ----------------------------------------------------------------------------------
//  ----------------------------------------------------------------------------------

SUP.func.PopulateOthEditForm = function(supp_gu) {
    const STIP = `oth`;
    const ACT = `edit`;
    const contentCell = SUP.navLayout.getCell("supp_content_edit_other");
    const url = './mSupplementals/php/getSupplementalDetails.php?gu=' + supp_gu;
    contentCell.progressShow();
    dhx.ajax.get(url).then(
        data => {
            SUP.form.get(STIP).get(ACT).clear();
            SUP.form.get(STIP).get(ACT).setValue(data.data);

            SUP.form.get(STIP).get(ACT)
                .getItem(SUP.formFlds.get(STIP).get(ACT).id_stamp.fname)
                .setValue(sessionStorage.getItem(`staffID`));

            const badge_id = SUP.form.get(STIP).get(ACT)
                .getItem(SUP.formFlds.get(STIP).get(ACT).badge_id.fname).getValue();
            SUP.combo.get(STIP).get(ACT).name.setValue(badge_id);

            const location = SUP.form.get(STIP).get(ACT)
                .getItem(SUP.formFlds.get(STIP).get(ACT).location_vc.fname).getValue();
            SUP.combo.get(STIP).get(ACT).location.setValue(location);

            const distribution = SUP.form.get(STIP).get(ACT)
                .getItem(SUP.formFlds.get(STIP).get(ACT).distrib_vc.fname).getValue();
            SUP.combo.get(STIP).get(ACT).distrib.setValue(distribution);

            const frequency = SUP.form.get(STIP).get(ACT)
                .getItem(SUP.formFlds.get(STIP).get(ACT).freq_vc.fname).getValue();
            SUP.combo.get(STIP).get(ACT).freq.setValue(frequency);

            const split = SUP.form.get(STIP).get(ACT)
                .getItem(SUP.formFlds.get(STIP).get(ACT).split_vc.fname).getValue();
            SUP.combo.get(STIP).get(ACT).splt.setValue(split);

            if( data.error.length > 0 ) {
                contentCell.progressHide();
                DebugIt(data.error);
            } else {
                SUP.func.FetchStaffImage(badge_id).then( 
                    imgEl => {
                        contentCell.progressHide();
                        SUP.form.get(STIP).get(ACT)
                            .getItem("staff_image")
                            .attachHTML(imgEl.data);
                    }
                ).catch(
                    (e) => { 
                        contentCell.progressHide();
                        DebugIt(e); 
                    }
                );
            }
        }
    );
}

//  ----------------------------------------------------------------------------------

SUP.func.EditOther = function(supp_gu) {
    SUP.current.STIP = `oth`;
    SUP.current.ACT = `edit`;
    SUP.toolbar.get(`nav`).disable();
    mainSidebar.disable();
    SUP.func.SuppContentPanel("supp_opt_edit_other");
    SUP.func.PopulateOthEditForm(supp_gu);
}

//  ----------------------------------------------------------------------------------

SUP.func.CloneOther = function(supp_gu) {
    SUP.current.STIP = `oth`;
    SUP.current.ACT = ``;
    MessageIt("Not Yet Implemented");
}

//  ----------------------------------------------------------------------------------

SUP.func.ViewOther = function(supp_gu) {
    SUP.current.suppGU = supp_gu;

    const STIP = SUP.current.STIP = `oth`;
    const ACT = SUP.current.ACT = `view`;

    const fieldMap = SUP.formFlds.get(STIP).get(ACT);
    const contentCell = SUP.layout.get(`othViewOnly`)
                            .getCell(SUP.layoutCell.get(`othViewOnly`).contentCellID);

    const p = { gu : supp_gu };
    const url = BuildGET(p, `./mSupplementals/php/getSupplementalDetails.php`);
    dhx.ajax.get(url).then(
        data => {
            SUP.form.get(STIP).get(ACT).clear();
            SUP.form.get(STIP).get(ACT).setValue(data.data);

            SUP.current.badgeID = data.data.badge_id;
            SUP.current.stipendGU = data.data.stipend_vc;
            SUP.current.suppGU = supp_gu;

            SUP.win.othViewOnly.show();

            dhx.awaitRedraw().then(
                () => {
                    SUP.func.FetchStaffImage(SUP.current.badgeID).then( 
                        imgEl => {
                            SUP.form.get(SUP.current.STIP).get(SUP.current.ACT)
                                .getItem("staff_image")
                                .attachHTML(imgEl.data);
                        }
                    ).catch(
                        (e) => { 
                            DebugIt(e);
                        }
                    );
                }
            );

        }
    ).catch(
        (err) => { DebugIt(err); }
    );
}

//  ----------------------------------------------------------------------------------

SUP.func.ShowOthFormInfo = function (ACT) {
    let message = `
        <div class="info-title">Form Information</div>
        <p>The current values in the form being entered or edited here.</p>
        <ul>
    `;

    const STIP = `oth`;

    let nameCombo = SUP.combo.get(STIP).get(ACT).name,
        lctnCombo = SUP.combo.get(STIP).get(ACT).location,
        distCombo = SUP.combo.get(STIP).get(ACT).distrib,
        freqCombo = SUP.combo.get(STIP).get(ACT).freq,
        spltCombo = SUP.combo.get(STIP).get(ACT).splt,
        cval      = null;

    const fieldMap  = SUP.form.get(STIP).get(ACT);
    const currFlds  = SUP.formFlds.get(STIP).get(ACT);

    let v = null;
    const currVals = fieldMap.getValue();

    for (const [key, value] of Object.entries(currVals)) {
        cval = value;
        if( key == currFlds.name.fname ) {
            if(typeof (v = nameCombo.data.getItem(value)) != 'undefined' ) {
                cval = v.value;
            }
        } else if( key == currFlds.location.fname ) {
            if(typeof (v = lctnCombo.data.getItem(value)) != 'undefined' ) {
                cval = v.value;
            }
        } else if( key == currFlds.distrib.fname ) {
            if(typeof (v = distCombo.data.getItem(value)) != 'undefined' ) {
                cval = v.value;
            }
        } else if( key == currFlds.freq.fname ) {
            if(typeof (v = freqCombo.data.getItem(value)) != 'undefined' ) {
                cval = v.value;
            }
        } else if( key == currFlds.split.fname ) {
            if(typeof (v = spltCombo.data.getItem(value)) != 'undefined' ) {
                cval = v.value;
            }
        }
        message += `<li>${key} : ${cval}</li>`;
    }

    message += `</ul>`;

    return message;
}

/*
 *
 *  supplementals_athletic.js
 * 
 * ***************************************************************************************** */

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//      Initialize Combo Event Handlers
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.ParseFiscalYearCombo = function(STIP, ACT, is_expr = 0) {
    const theCombo = SUP.combo.get(STIP).get(ACT).supp_year;
    let json = ( is_expr == 0 )
            ? SUP.current.currFiscalSet.serialize()
            : SUP.current.allFiscalSet.serialize();
    theCombo.data.removeAll();
    theCombo.data.parse(json);
    theCombo.setValue(theCombo.data.getId(0));
    theCombo.paint();
    if( is_expr == 0 ) {
        theCombo.disable();
    } else {
        theCombo.enable();
    }
}

SUP.func.InitFiscalYearCombo = function(STIP, ACT, is_expr = 0) {
    SUP.combo.get(STIP).get(ACT).supp_year.events.on(`change`,
        () => {
            const cvals = SUP.combo.get(STIP).get(ACT).supp_year.getValue(true);
            SUP.form.get(STIP).get(ACT)
                .getItem(SUP.formFlds.get(STIP).get(ACT).supp_year_vc.fname)
                .setValue(cvals.join(`,`));
        }
    );
    SUP.func.ParseFiscalYearCombo(STIP, ACT, is_expr);
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.InitComboEventHandler = function(comboName, formFld, STIP, ACT) {
    const theCombo = SUP.combo.get(STIP).get(ACT)[comboName];
    theCombo.events.on("change",
        (id) => {
            if( typeof id !== 'undefined' ) {
                SUP.form.get(STIP).get(ACT)
                    .getItem(SUP.formFlds.get(STIP).get(ACT)[formFld].fname)
                    .setValue(id);
            }
        }
    );
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//
//      Initialization function; called once at startup by the
//      "InitSupplemental" function
//
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.BuildAthleticInputForm = function() {

    const STIP = `ath`;
    const ACT = `input`;

    function ImageFetcher(id = '') {
        SUP.func.FetchStaffImage(id).then( 
            imgEl => {
                SUP.form.get(STIP).get(ACT)
                    .getItem("staff_image")
                    .attachHTML(imgEl.data);
            }
        ).catch(
            (e) => { DebugIt(e); }
        );
    }

    // -------------------------------------------------------------------------------
    //      End of internal functions; now, the input form is initialized
    // -------------------------------------------------------------------------------

    SUP.form.get(STIP).set(
        ACT, 
        new dhx.Form(null, SUP.formCfg.get(STIP).get(ACT) )
    );

    // -------------------------------------------------------------------------------
    //      Users's "other stipends" and experience layouts are initialized
    // -------------------------------------------------------------------------------

    SUP.layout.set(
        `staffOthStipInput`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffOthStipInput`))
    );

    SUP.layout.set(
        `staffExprInput`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffExprInput`))
    )

    // -------------------------------------------------------------------------------
    //      Certification layouts are now initialized
    // -------------------------------------------------------------------------------

    SUP.layout.set(
        `staffReqdInput`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffReqdInput`))
    );

    SUP.layout.set(
        `staffActvInput`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffActvInput`))
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Initialize staff "other stipends" grid and experience grid...
    //      ... if they haven't already been initialized. (The same grid
    //          widget can be attached to multiple layout cells; therefore,
    //          the same grid widget is used in both input and edit forms;
    //          and, conditional code assures that they are initialized
    //          only once).
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    if( SUP.grid.get(`staffStip`) == null ) {
        SUP.grid.set(`staffStip`, new dhx.Grid(null, SUP.gridCfg.get(`staffStip`)));
    }

    // if( SUP.grid.get(`expr`) == null ) {
    //     SUP.grid.set(`expr`, new dhx.Grid(null, SUP.gridCfg.get(`expr`)));
    // }

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Certification grids can now be initialized
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    if( SUP.grid.get(`actv`) == null ) {
        SUP.grid.set(
            `actv`, 
            new dhx.Grid(null, SUP.gridCfg.get(`actv`))
        )
    }

    if( SUP.grid.get(`reqd`) == null ) {
        SUP.grid.set(
            `reqd`,
            new dhx.Grid(null, SUP.gridCfg.get(`actv`))
        )
    }

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Certfication container toolbars can now be initialized
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.toolbar.get(`actv`).set(
        ACT, 
        new dhx.Toolbar(null, SUP.closure.configCertTBar.GetActv(ACT))
    );
    SUP.toolbar.get(`reqd`).set(
        ACT,
        new dhx.Toolbar(null, SUP.closure.configCertTBar.GetReqd(ACT))
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      "Other" stipends and experience grid layout cells can now be populated
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.layout.get(`staffOthStipInput`)
        .getCell(SUP.layoutCell.get(`staffOthStipInput`).menuCellID)
        .attachHTML(`<span class="form-grid-title">Current Stipends</span>`);

    SUP.layout.get(`staffOthStipInput`)
        .getCell(SUP.layoutCell.get(`staffOthStipInput`).gridCellID)
        .attach(SUP.grid.get(`staffStip`));

    SUP.layout.get(`staffExprInput`)
        .getCell(SUP.layoutCell.get(`staffExprInput`).menuCellID)
        .attachHTML(`<span class="form-grid-title">Experience & Longevity</span>`);

    SUP.layout.get(`staffExprInput`)
        .getCell(SUP.layoutCell.get(`staffExprInput`).gridCellID)
        .attachHTML(SUP.html.expr);

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Certification grid layout cells can now be populated
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.layout.get(`staffActvInput`)
        .getCell(SUP.layoutCell.get(`staffActvInput`).menuCellID)
        .attach(SUP.toolbar.get(`actv`).get(ACT));

    SUP.layout.get(`staffActvInput`)
        .getCell(SUP.layoutCell.get(`staffActvInput`).gridCellID)
        .attach(SUP.grid.get(`actv`));

    SUP.layout.get(`staffReqdInput`)
        .getCell(SUP.layoutCell.get(`staffReqdInput`).menuCellID)
        .attach(SUP.toolbar.get(`reqd`).get(ACT));

    SUP.layout.get(`staffReqdInput`)
        .getCell(SUP.layoutCell.get(`staffReqdInput`).gridCellID)
        .attach(SUP.grid.get(`reqd`));

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Grid layouts can now be attached to form containers
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    try {
        SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).stip_grid.fname)
            .attach(SUP.layout.get(`staffOthStipInput`));
        SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).exp_grid.fname)
            .attach(SUP.layout.get(`staffExprInput`));
        SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).reqd_certs.fname)
            .attach(SUP.layout.get(`staffReqdInput`));
        SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).actv_certs.fname)
            .attach(SUP.layout.get(`staffActvInput`));
    } catch(e) {
        DebugIt(e);
    }

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Form combos can now be "converted" to combobox widgets
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    try {
        SUP.combo.get(STIP).get(ACT).supp_year = SUP.form.get(STIP).get(ACT)
                                        .getItem(SUP.formFlds.get(STIP).get(ACT).supp_year.fname)
                                        .getWidget();

        SUP.combo.get(STIP).get(ACT).location = 
            SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).location.fname).getWidget();
        SUP.combo.get(STIP).get(ACT).gender = 
            SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).gender.fname).getWidget();
        SUP.combo.get(STIP).get(ACT).freq = 
            SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).freq.fname).getWidget();
        SUP.combo.get(STIP).get(ACT).distrib = 
            SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).distrib.fname).getWidget();
        SUP.combo.get(STIP).get(ACT).bnum = 
            SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).badge_id.fname).getWidget();
        SUP.combo.get(STIP).get(ACT).name = 
            SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).name.fname).getWidget();
        SUP.combo.get(STIP).get(ACT).splt = 
            SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).split.fname).getWidget();
    } catch(e) {
        DebugIt(e);
    }

    let allCombosURL  = "includes/php/getMultiComboLookup.php?";
    allCombosURL     += "id[]=GENDER&id[]=DISTRIBUTION&id[]=FREQUENCY&id[]=SPLIT";
    allCombosURL     += "&id[]=NAME&id[]=LOCATION";
    
    dhx.ajax.get(allCombosURL).then(
        (allData) => {
            SUP.combo.get(STIP).get(ACT).location.data.parse(allData.LOCATION);
            SUP.combo.get(STIP).get(ACT).gender.data.parse(allData.GENDER);
            SUP.combo.get(STIP).get(ACT).freq.data.parse(allData.FREQUENCY);
            SUP.combo.get(STIP).get(ACT).distrib.data.parse(allData.DISTRIBUTION);
            SUP.combo.get(STIP).get(ACT).splt.data.parse(allData.SPLIT);
            SUP.combo.get(STIP).get(ACT).name.data.parse(allData.NAME);
            SUP.combo.get(STIP).get(ACT).bnum.data.parse(allData.BADGE);

            SUP.func.InitFiscalYearCombo(STIP, ACT, 1);
            SUP.func.InitComboEventHandler(`location`, `location_vc`, STIP, ACT);
            SUP.func.InitComboEventHandler(`gender`, `gender_vc`, STIP, ACT);
            SUP.func.InitComboEventHandler(`freq`, `freq_vc`, STIP, ACT);
            SUP.func.InitComboEventHandler(`distrib`, `distrib_vc`, STIP, ACT);

            SUP.combo.get(STIP).get(ACT).bnum.events.on("change",
                (id) => {
                    if( typeof id !== 'undefined' ) {
                        SUP.form.get(STIP).get(ACT)
                            .getItem(SUP.formFlds.get(STIP).get(ACT).name.fname)
                            .setValue(id);
                    }
                }
            );

            SUP.combo.get(STIP).get(ACT).name.events.on("change",
                (id) => {
                    if( typeof id !== 'undefined' ) {
                        SUP.form.get(STIP).get(ACT)
                            .getItem(SUP.formFlds.get(STIP).get(ACT).badge_id.fname)
                            .setValue(id);
                        const stipend_gu = SUP.form.get(STIP).get(ACT)
                            .getItem(SUP.formFlds.get(STIP).get(ACT).stipend_vc.fname)
                            .getValue();
                        ImageFetcher(id);
                        SUP.func.RefreshStaffOtherStipendsGrid(id);
                        SUP.func.RefreshExpContainer(id, stipend_gu);
                        SUP.func.RefreshReqdCertGrid(id, stipend_gu);
                        SUP.func.RefreshActvCertGrid(id);
                    }
                }
            );

            SUP.combo.get(STIP).get(ACT).splt.events.on("change",
                (id) => {
                    if( typeof id !== 'undefined' ) {
                        const other = SUP.form.get(STIP).get(ACT)
                            .getItem(SUP.formFlds.get(STIP).get(ACT).split_amt.fname);
                        if( id.includes("NOT") ) {
                            other.clear();
                            other.disable();
                        } else {
                            other.enable();
                        }
                        SUP.form.get(STIP).get(ACT)
                            .getItem(SUP.formFlds.get(STIP).get(ACT).split_vc.fname).setValue(id);
                    }
                }
            );

            //  ImageFetcher is called once without a parameter to initialize it

            ImageFetcher();

            //  Now, we can attach the form layout to the main content layout cell

            SUP.navLayout
                .getCell(SUP.navMap.get("supp_opt_add_athletic").id)
                .attach(SUP.form.get(STIP).get(ACT));

            SUP.form.get(STIP).get(ACT)
                .getItem(SUP.formFlds.get(STIP).get(ACT).is_expr.fname)
                .setValue(0);
        }
    ).catch(
        (err) => { DebugIt(err); }
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      "Is Experience" radio button event handler
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).is_expr.fname).events.on("change", 
            (val) => {
                SUP.func.ParseFiscalYearCombo(STIP, ACT, val);
            }
        );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      The form's buttons can given event handlers
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.form.get(STIP).get(ACT).getItem("save_and_close").events.on("click", 
        function(events) {
            SUP.func.CompleteSupplementalForm(`save`, STIP, ACT);
            SUP.toolbar.get(`nav`).enable();
            mainSidebar.enable();
            SUP.func.SuppContentPanel();
        }
    );

    SUP.form.get(STIP).get(ACT).getItem("cancel_and_close").events.on("click", 
        function(events) {
            SUP.func.CompleteSupplementalForm(`cancel`, STIP, ACT);
            SUP.toolbar.get(`nav`).enable();
            mainSidebar.enable();
            SUP.func.SuppContentPanel();
        }
    );

    SUP.form.get(STIP).get(ACT).getItem("reset_form").events.on("click",
        function(e) {
            SUP.func.CompleteSupplementalForm(`reset`, STIP, ACT);
        }
    );

    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).stip_lookup.fname)
        .events.on("click",
        function(events) {
            SUP.win.stipendList.show();
        }
    );

    SUP.form.get(STIP).get(ACT).getItem("form_info").events.on("click",
        function(events) {
            InfoIt(SUP.func.ShowAthFormInfo(ACT), 620, 590);
        }
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Lastly, we assign an event handlers to the certs toolbars
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.toolbar.get(`actv`).get(ACT).events.on("click",
        function(id) {
            switch(id) {
                case SUP.certTBCfg.get(`actv`).get(ACT).title:
                    break;
                case SUP.certTBCfg.get(`actv`).get(ACT).info:
                    InfoIt(SUP.blurbs.actvCertsInfo, 500);
                    break;
                case SUP.certTBCfg.get(`actv`).get(ACT).mod:
                    MessageIt("Adding/Editing Not Implemented Yet");
                    break;
                default:
                    MessageIt("Not Implemented Yet");
            };
        }
    );

    SUP.toolbar.get(`reqd`).get(ACT).events.on("click",
        function(id) {
            switch(id) {
                case SUP.certTBCfg.get(`reqd`).get(ACT).title:
                    break;
                case SUP.certTBCfg.get(`reqd`).get(ACT).info:
                    InfoIt(SUP.blurbs.reqdCertsInfo, 575);
                    break;
                default:
                    MessageIt("Not Implemented Yet");
            };
        }
    );
    /* */
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//
//      BUILD EDIT FORM...
//      Initialization function; called once at startup by the
//      "InitSupplemental" function
//
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.BuildAthleticEditForm = function() {

    const STIP = SUP.current.STIP = `ath`;
    const ACT  = SUP.current.ACT = `edit`;

    function ImageFetcher(id = '') {
        SUP.func.FetchStaffImage(id).then( 
            imgEl => {
                SUP.form.get(STIP).get(ACT)
                    .getItem("staff_image")
                    .attachHTML(imgEl.data);
            }
        ).catch(
            (e) => { DebugIt(e); }
        );
    }

    function UpdateFromName(badge_id = ``) {
        const stipend_gu = SUP.form.get(STIP).get(ACT)
            .getItem(SUP.formFlds.get(STIP).get(ACT).stipend_vc.fname)
            .getValue();
        ImageFetcher(badge_id);
        SUP.func.RefreshStaffOtherStipendsGrid(badge_id);
        SUP.func.RefreshExpContainer(badge_id, stipend_gu);
        SUP.func.RefreshReqdCertGrid(badge_id, stipend_gu);
        SUP.func.RefreshActvCertGrid(badge_id);
    }

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.form.get(STIP).set(
        ACT,
        new dhx.Form(null, SUP.formCfg.get(STIP).get(ACT))
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.layout.set(
        `staffOthStipEdit`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffOthStipEdit`))
    );

    SUP.layout.set(
        `staffExprEdit`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffExprEdit`))
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.layout.set(
        `staffActvEdit`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffActvEdit`))
    );

    SUP.layout.set(
        `staffReqdEdit`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffReqdEdit`))
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Initialize staff "other stipends" grid and experience grid...
    //      ... if they haven't already been initialized. (The same grid
    //          widget can be attached to multiple layout cells; therefore,
    //          the same grid widget is used in both input and edit forms;
    //          and, conditional code assures that they are initialized
    //          only once).
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    if( SUP.grid.get(`staffStip`) == null ) {
        SUP.grid.set(`staffStip`, new dhx.Grid(null, SUP.gridCfg.get(`staffStip`)));
    }

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    if( SUP.grid.get(`actv`) == null ) {
        SUP.grid.set(
            `actv`, 
            new dhx.Grid(null, SUP.gridCfg.get(`actv`))
        )
    }

    if( SUP.grid.get(`reqd`) == null ) {
        SUP.grid.set(
            `reqd`,
            new dhx.Grid(null, SUP.gridCfg.get(`actv`))
        )
    }

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Certfication container toolbars can now be initialized
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.toolbar.get(`actv`).set(
        ACT, new dhx.Toolbar(null, SUP.closure.configCertTBar.GetActv(ACT))
    );
    SUP.toolbar.get(`reqd`).set(
        ACT, new dhx.Toolbar(null, SUP.closure.configCertTBar.GetReqd(ACT))
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.layout.get(`staffOthStipEdit`)
        .getCell(SUP.layoutCell.get(`staffOthStipEdit`).menuCellID)
        .attachHTML(`<span class="form-grid-title">Current Stipends</span>`);

    SUP.layout.get(`staffExprEdit`)
        .getCell(SUP.layoutCell.get(`staffExprEdit`).menuCellID)
        .attachHTML(`<span class="form-grid-title">Experience & Longevity</span>`);

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.layout.get(`staffOthStipEdit`)
        .getCell(SUP.layoutCell.get(`staffOthStipEdit`).gridCellID)
        .attach(SUP.grid.get(`staffStip`));

    SUP.layout.get(`staffExprEdit`)
        .getCell(SUP.layoutCell.get(`staffExprEdit`).gridCellID)
        .attachHTML(SUP.html.expr);

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.layout.get(`staffActvEdit`)
        .getCell(SUP.layoutCell.get(`staffActvEdit`).menuCellID)
        .attach(SUP.toolbar.get(`actv`).get(ACT));

    SUP.layout.get(`staffActvEdit`)
        .getCell(SUP.layoutCell.get(`staffActvEdit`).gridCellID)
        .attach(SUP.grid.get(`actv`));

    SUP.layout.get(`staffReqdEdit`)
        .getCell(SUP.layoutCell.get(`staffReqdEdit`).menuCellID)
        .attach(SUP.toolbar.get(`reqd`).get(ACT));

    SUP.layout.get(`staffReqdEdit`)
        .getCell(SUP.layoutCell.get(`staffReqdEdit`).gridCellID)
        .attach(SUP.grid.get(`reqd`));

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Attach various layouts to form containers
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).stip_grid.fname)
        .attach(SUP.layout.get(`staffOthStipEdit`));
    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).exp_grid.fname)
        .attach(SUP.layout.get(`staffExprEdit`));

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).actv_certs.fname)
        .attach(SUP.layout.get(`staffActvEdit`));
    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).reqd_certs.fname)
        .attach(SUP.layout.get(`staffReqdEdit`));

    /* */
    //  --- Grab combo widgets and work'em over -----------------------------------------------

    SUP.combo.get(STIP).get(ACT).supp_year = SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).supp_year.fname)
        .getWidget();

    SUP.combo.get(STIP).get(ACT).location = 
        SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).location.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).gender = 
        SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).gender.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).freq = 
        SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).freq.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).distrib = 
        SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).distrib.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).bnum = 
        SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).badge_id.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).name = 
        SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).name.fname).getWidget();
    SUP.combo.get(STIP).get(ACT).splt = 
        SUP.form.get(STIP).get(ACT).getItem(SUP.formFlds.get(STIP).get(ACT).split.fname).getWidget();

    let allCombosURL  = "includes/php/getMultiComboLookup.php?";
    allCombosURL     += "id[]=GENDER&id[]=DISTRIBUTION&id[]=FREQUENCY&id[]=SPLIT";
    allCombosURL     += "&id[]=NAME&id[]=LOCATION";
    
    dhx.ajax.get(allCombosURL).then(
        (allData) => {
            SUP.combo.get(STIP).get(ACT).location.data.parse(allData.LOCATION);
            SUP.combo.get(STIP).get(ACT).gender.data.parse(allData.GENDER);
            SUP.combo.get(STIP).get(ACT).freq.data.parse(allData.FREQUENCY);
            SUP.combo.get(STIP).get(ACT).distrib.data.parse(allData.DISTRIBUTION);
            SUP.combo.get(STIP).get(ACT).splt.data.parse(allData.SPLIT);
            SUP.combo.get(STIP).get(ACT).name.data.parse(allData.NAME);
            SUP.combo.get(STIP).get(ACT).bnum.data.parse(allData.BADGE);

            SUP.func.InitFiscalYearCombo(STIP, ACT);
            SUP.func.InitComboEventHandler(`location`, `location_vc`, STIP, ACT);
            SUP.func.InitComboEventHandler(`gender`, `gender_vc`, STIP, ACT);
            SUP.func.InitComboEventHandler(`freq`, `freq_vc`, STIP, ACT);
            SUP.func.InitComboEventHandler(`distrib`, `distrib_vc`, STIP, ACT);

            SUP.combo.get(STIP).get(ACT).bnum.events.on("change",
                (id) => {
                    if( typeof id !== 'undefined' ) {
                        SUP.form.get(STIP).get(ACT)
                            .getItem(SUP.formFlds.get(STIP).get(ACT).name.fname)
                            .setValue(id);
                        UpdateFromName(id);
                    }
                }
            );

            SUP.combo.get(STIP).get(ACT).name.events.on("change",
                (id) => {
                    if( typeof id !== 'undefined' ) {
                        SUP.form.get(STIP).get(ACT)
                            .getItem(SUP.formFlds.get(STIP).get(ACT).badge_id.fname)
                            .setValue(id);
                        UpdateFromName(id);
                    }
                }
            );

            SUP.combo.get(STIP).get(ACT).splt.events.on("change",
                (id) => {
                    if( typeof id !== 'undefined' ) {
                        const other = SUP.form.get(STIP).get(ACT)
                            .getItem(SUP.formFlds.get(STIP).get(ACT).split_amt.fname);
                        if( id.includes("NOT") ) {
                            other.clear();
                            other.disable();
                        } else {
                            other.enable();
                        }
                        SUP.form.get(STIP).get(ACT)
                            .getItem(SUP.formFlds.get(STIP).get(ACT).split_vc.fname).setValue(id);
                    }
                }
            );

            SUP.navLayout
                .getCell(SUP.navMap.get("supp_opt_edit_athletic").id)
                .attach(SUP.form.get(STIP).get(ACT));
        }
    ).catch(
        (err) => { DebugIt(err); }
    );

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
            InfoIt(SUP.func.ShowAthFormInfo(ACT), 620);
        }
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Lastly, we assign an event handlers to the certs toolbars
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.toolbar.get(`actv`).get(ACT).events.on("click",
        function(id) {
            switch(id) {
                case SUP.certTBCfg.get(`actv`).get(ACT).title:
                    break;
                case SUP.certTBCfg.get(`actv`).get(ACT).info:
                    InfoIt(SUP.blurbs.actvCertsInfo, 535);
                    break;
                case SUP.certTBCfg.get(`actv`).get(ACT).mod:
                default:
                    MessageIt("Not Implemented Yet");
            };
        }
    );

    SUP.toolbar.get(`reqd`).get(ACT).events.on("click",
        function(id) {
            switch(id) {
                case SUP.certTBCfg.get(`reqd`).get(ACT).title:
                    break;
                case SUP.certTBCfg.get(`reqd`).get(ACT).info:
                    InfoIt(SUP.blurbs.reqdCertsInfo);
                    break;
                default:
                    MessageIt("Not Implemented Yet");
            };
        }
    );
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//
//      Initialization function; called once at startup by the
//      "InitSupplemental" function
//
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.BuildAthleticViewForm = function() {

    const STIP = `ath`;
    const ACT = `view`;

    // -------------------------------------------------------------------------------
    //      End of internal functions; now, the input form is initialized
    // -------------------------------------------------------------------------------

    SUP.form.get(STIP).set(
        ACT, 
        new dhx.Form(null, SUP.formCfg.get(STIP).get(ACT) )
    );

    // -------------------------------------------------------------------------------
    //      Users's "other stipends" and experience layouts are initialized
    // -------------------------------------------------------------------------------

    SUP.layout.set(
        `staffOthStipView`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffOthStipView`))
    );

    SUP.layout.set(
        `staffExprView`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffExprView`))
    )

    // -------------------------------------------------------------------------------
    //      Certification layouts are now initialized
    // -------------------------------------------------------------------------------

    SUP.layout.set(
        `staffReqdView`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffReqdView`))
    );

    SUP.layout.set(
        `staffActvView`,
        new dhx.Layout(null, SUP.layoutCfg.get(`staffActvView`))
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Initialize staff "other stipends" grid and experience grid...
    //      ... if they haven't already been initialized. (The same grid
    //          widget can be attached to multiple layout cells; therefore,
    //          the same grid widget is used in both input and edit forms;
    //          and, conditional code assures that they are initialized
    //          only once).
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    if( SUP.grid.get(`staffStip`) == null ) {
        SUP.grid.set(`staffStip`, new dhx.Grid(null, SUP.gridCfg.get(`staffStip`)));
    }

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Certification grids can now be initialized
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    if( SUP.grid.get(`actv`) == null ) {
        SUP.grid.set(
            `actv`, 
            new dhx.Grid(null, SUP.gridCfg.get(`actv`))
        )
    }

    if( SUP.grid.get(`reqd`) == null ) {
        SUP.grid.set(
            `reqd`,
            new dhx.Grid(null, SUP.gridCfg.get(`actv`))
        )
    }

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Certfication container toolbars can now be initialized
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.toolbar.get(`actv`).set(
        ACT, 
        new dhx.Toolbar(null, SUP.closure.configCertTBar.GetActv(ACT))
    );
    SUP.toolbar.get(`reqd`).set(
        ACT,
        new dhx.Toolbar(null, SUP.closure.configCertTBar.GetReqd(ACT))
    );

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      "Other" stipends and experience grid layout cells can now be populated
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.layout.get(`staffOthStipView`)
        .getCell(SUP.layoutCell.get(`staffOthStipView`).menuCellID)
        .attachHTML(`<span class="form-grid-title">Current Stipends</span>`);

    SUP.layout.get(`staffOthStipView`)
        .getCell(SUP.layoutCell.get(`staffOthStipView`).gridCellID)
        .attach(SUP.grid.get(`staffStip`));

    SUP.layout.get(`staffExprView`)
        .getCell(SUP.layoutCell.get(`staffExprView`).menuCellID)
        .attachHTML(`<span class="form-grid-title">Experience & Longevity</span>`);

    SUP.layout.get(`staffExprView`)
        .getCell(SUP.layoutCell.get(`staffExprView`).gridCellID)
        .attachHTML(SUP.html.expr);

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Certification grid layout cells can now be populated
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.layout.get(`staffActvView`)
        .getCell(SUP.layoutCell.get(`staffActvView`).menuCellID)
        .attach(SUP.toolbar.get(`actv`).get(ACT));

    SUP.layout.get(`staffActvView`)
        .getCell(SUP.layoutCell.get(`staffActvView`).gridCellID)
        .attach(SUP.grid.get(`actv`));

    SUP.layout.get(`staffReqdView`)
        .getCell(SUP.layoutCell.get(`staffReqdView`).menuCellID)
        .attach(SUP.toolbar.get(`reqd`).get(ACT));

    SUP.layout.get(`staffReqdView`)
        .getCell(SUP.layoutCell.get(`staffReqdView`).gridCellID)
        .attach(SUP.grid.get(`reqd`));

    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //      Grid layouts can now be attached to form containers
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).stip_grid.fname)
        .attach(SUP.layout.get(`staffOthStipView`));
    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).exp_grid.fname)
        .attach(SUP.layout.get(`staffExprView`));
    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).reqd_certs.fname)
        .attach(SUP.layout.get(`staffReqdView`));
    SUP.form.get(STIP).get(ACT)
        .getItem(SUP.formFlds.get(STIP).get(ACT).actv_certs.fname)
        .attach(SUP.layout.get(`staffActvView`));

    SUP.layout.get(`athViewOnly`)
        .getCell(SUP.layoutCell.get(`athViewOnly`).contentCellID)
        .attach(SUP.form.get(STIP).get(ACT));
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//
// -=-=- Build the athletic-only supplemental picklist and layout -=-=-=-=-=-=
//
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.BuildAthSupplementalPicklist = function() {
    const STIP = `ath`;
    SUP.toolbar.set(
        STIP, new dhx.Toolbar(null, SUP.suppTBCfg.get(STIP))
    );

    SUP.layout.set(
        `athSuppList`,
        new dhx.Layout(null, SUP.layoutCfg.get(`athSuppList`))
    );

    SUP.layout.get(`athSuppList`)
        .getCell(SUP.layoutCell.get(`athSuppList`).toolbarCellID)
        .attach(SUP.toolbar.get(STIP));

    SUP.navLayout
        .getCell(SUP.navMap.get("supp_opt_list_athletic").id)
        .attach(SUP.layout.get(`athSuppList`));
    
    //  -----------------------------------------------------------
    
    SUP.func.RefreshAthSuppGrid();

    SUP.toolbar.get(STIP).events.on("click",
        (id) => { 
            switch(id) {
                case "athlist-grid-title":
                    break;
                case "athlist-grid-refresh":
                    SUP.func.RefreshAthSuppGrid();
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

SUP.func.RefreshAthSuppGrid = function() {
    let q = { type : `ath` };
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

    if( SUP.grid.has(`athSuppList`) && SUP.grid.get(`athSuppList`) != null ) {
        SUP.grid.get(`athSuppList`).data.removeAll();
    } else {
        SUP.grid.set(
            `athSuppList`,
            new dhx.Grid(null, SUP.gridCfg.get(`athSuppList`))
        );
    }

    if( CURRENT.fiscalState != `current` ) {
        SUP.grid.get(`athSuppList`).showColumn(`YEAR`);
    } else {
        SUP.grid.get(`athSuppList`).hideColumn(`YEAR`);
    }

    SUP.grid.get(`athSuppList`).data.load(url)
        .then(
            () => {
                SUP.layout.get(`athSuppList`)
                    .getCell(SUP.layoutCell.get(`athSuppList`).contentCellID)
                    .attach(SUP.grid.get(`athSuppList`));
            }
        )
        .catch(
            (e) => { DebugIt(e); }
        );
}

//  ----------------------------------------------------------------------------------
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  ----------------------------------------------------------------------------------

SUP.func.RefreshStipendPicklistGrid = function() {
    let url = 'mSupplementals/php/getStipendPicklist.php';

    if( SUP.grid.has(`athStip`) && SUP.grid.get(`athStip`) != null ) {
        SUP.grid.get(`athStip`).data.removeAll();
    } else {
        SUP.grid.set(
            `athStip`, new dhx.Grid(null, SUP.gridCfg.get(`athStip`))
        );
    }

    SUP.grid.get(`athStip`).data.load(url).then(
        () => {
            SUP.layout.get(`stipendList`)
                .getCell(SUP.layoutCell.get(`stipendList`).toolbarCellID)
                .attach(SUP.toolbar.get(`stip`));

            SUP.layout.get(`stipendList`)
                .getCell(SUP.layoutCell.get(`stipendList`).contentCellID)
                .attach(SUP.grid.get(`athStip`));
    
            SUP.win.stipendList
                .attach(SUP.layout.get(`stipendList`));
        }
    ).catch (
        (e) => { 
            DebugIt(e);
        }
    );
}

//  ----------------------------------------------------------------------------------
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  ----------------------------------------------------------------------------------

SUP.func.PopulateAthEditForm = function(supp_gu) {
    const STIP = SUP.current.STIP, ACT = SUP.current.ACT;
    const fieldMap = SUP.formFlds.get(STIP).get(ACT);
    const contentCell = SUP.navLayout.getCell("supp_content_edit_athletic");
    const url = './mSupplementals/php/getSupplementalDetails.php?gu=' + supp_gu;
    contentCell.progressShow();
    dhx.ajax.get(url).then(
        data => {
            SUP.form.get(STIP).get(ACT).clear();

            // --- Insert data from lookup and sessionStorage ---

            SUP.form.get(STIP).get(ACT).setValue(data.data);
            SUP.form.get(STIP).get(ACT)
                .getItem(fieldMap.id_stamp.fname)
                .setValue(sessionStorage.getItem(`staffID`));

            SUP.current.badgeID = data.data.badge_id;
            SUP.current.stipendGU = data.data.stipend_vc;
            SUP.current.suppGU = supp_gu;

            // --- Setup comboboxes ---

            const is_expr = SUP.form.get(STIP).get(ACT)
                                .getItem(fieldMap.is_expr.fname).getValue();

            SUP.func.ParseFiscalYearCombo(STIP, ACT, is_expr );

            const badge_id = SUP.form.get(STIP).get(ACT)
                                .getItem(fieldMap.badge_id.fname).getValue();
            SUP.combo.get(STIP).get(ACT).name.setValue(badge_id);

            const location = SUP.form.get(STIP).get(ACT)
                                .getItem(fieldMap.location_vc.fname).getValue();
            SUP.combo.get(STIP).get(ACT).location.setValue(location);

            SUP.combo.get(STIP).get(ACT).supp_year.setValue(
                SUP.form.get(STIP).get(ACT)
                    .getItem(fieldMap.supp_year_vc.fname).getValue()
            );

            const gender = SUP.form.get(STIP).get(ACT)
                                .getItem(fieldMap.gender_vc.fname).getValue();
            SUP.combo.get(STIP).get(ACT).gender.setValue(gender);

            const distribution = SUP.form.get(STIP).get(ACT)
                                .getItem(fieldMap.distrib_vc.fname).getValue();
            SUP.combo.get(STIP).get(ACT).distrib.setValue(distribution);

            const frequency = SUP.form.get(STIP).get(ACT)
                                .getItem(fieldMap.freq_vc.fname).getValue();
            SUP.combo.get(STIP).get(ACT).freq.setValue(frequency);

            const split = SUP.form.get(STIP).get(ACT)
                                .getItem(fieldMap.split_vc.fname).getValue();
            SUP.combo.get(STIP).get(ACT).splt.setValue(split);

            if( split.includes("NOT") ) {
                SUP.form.get(STIP).get(ACT).getItem(fieldMap.split_amt.fname).disable();
            } else {
                SUP.form.get(STIP).get(ACT).getItem(fieldMap.split_amt.fname).enable();
            }

            const stipend_gu = SUP.form.get(STIP).get(ACT)
                                .getItem(SUP.formFlds.get(STIP).get(ACT).stipend_vc.fname)
                                .getValue();

            if( data.error.length > 0 ) {
                contentCell.progressHide();
                DebugIt(data.error);
            } else {
                SUP.func.RefreshStaffOtherStipendsGrid(badge_id);
                SUP.func.RefreshExpContainer(badge_id, stipend_gu);
                SUP.func.RefreshReqdCertGrid(badge_id, stipend_gu);
                SUP.func.RefreshActvCertGrid(badge_id);
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
    ).catch(
        (e) => { 
            contentCell.progressHide();
            DebugIt(e);
        }
    );
}

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

SUP.func.EditAthletic = function(supp_gu) {
    SUP.current.STIP = `ath`;
    SUP.current.ACT = `edit`;
    SUP.current.suppGU = supp_gu;
    SUP.toolbar.get(`nav`).disable();
    mainSidebar.disable();
    SUP.func.SuppContentPanel("supp_opt_edit_athletic");
    SUP.func.PopulateAthEditForm(supp_gu);
}

//  ----------------------------------------------------------------------------------

SUP.func.ViewAthletic = function(supp_gu) {
    const STIP = SUP.current.STIP = `ath`;
    const ACT = SUP.current.ACT = `view`;

    const fieldMap = SUP.formFlds.get(STIP).get(ACT);
    const contentCell = SUP.layout.get(`athViewOnly`)
                            .getCell(SUP.layoutCell.get(`athViewOnly`).contentCellID);

    const p = { gu : supp_gu };
    const url = BuildGET(p, `./mSupplementals/php/getSupplementalDetails.php`);
    dhx.ajax.get(url).then(
        data => {
            SUP.form.get(STIP).get(ACT).clear();
            SUP.form.get(STIP).get(ACT).setValue(data.data);

            SUP.current.badgeID = data.data.badge_id;
            SUP.current.stipendGU = data.data.stipend_vc;
            SUP.current.suppGU = supp_gu;

            SUP.win.athViewOnly.show();

            dhx.awaitRedraw().then(
                () => {
                    SUP.func.RefreshStaffOtherStipendsGrid(SUP.current.badgeID);
                    SUP.func.RefreshExpContainer(SUP.current.badgeID, SUP.current.stipendGU);
                    SUP.func.RefreshReqdCertGrid(SUP.current.badgeID, SUP.current.stipendGU);
                    SUP.func.RefreshActvCertGrid(SUP.current.badgeID);
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

SUP.func.CloneAthletic = function(supp_gu) {
    MessageIt("Not Yet Implemented");
}

//  ----------------------------------------------------------------------------------
//  ----------------------------------------------------------------------------------

SUP.func.RefreshExpContainer = function(badge_id = null, stipend_gu = null) {

    function LoadHTML(db = null) {
        for(let key in SUP.htmlCfg ) {
            const field = SUP.htmlCfg[key];
            const el = document.getElementById(field.id);
            if( el != null ) {
                el.innerHTML = (db && db[field.columnName]) 
                                    ? db[field.columnName] 
                                    : field.default;
            } else if(CURRENT.debug) { 
                // console.debug(field.id + ` not in DOM`); 
            }
        }
    }

    function LoadLights(input = null) {
        let data = [];
        if( Array.isArray(input) ) {
            input.forEach(
                (rangeObj) => {
                    data.push(rangeObj.YEAR_RANGE);
                }
            )
        }
        const sources = [
            `2021-22`, `2020-21`, `2019-20`, 
            `2018-19`, `2017-18`, `2016-17`, 
            `2015-16`, `2014-15`, `2013-14`, 
            `2012-13`
        ].forEach(
            (yr) => {
                const id = `expr-fid-` + yr;
                const el = document.getElementById(id);
                if( el != null ) {
                    if( data.includes(yr) ) {
                        el.src = `includes/images/greenButton1.png`;
                    } else {
                        el.src = `includes/images/redButton1.png`;
                    }
                }
            }
        )
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    let url = ``;
    if(badge_id != null && stipend_gu !=  null) {
        url = `mSupplementals/php/getExperience.php?id=${badge_id}&stip=${stipend_gu}`;
        dhx.ajax.get(url).then(
            data => {
                if(!Array.isArray(data)) {
                    LoadHTML(data);
                } else {
                    LoadHTML();
                }
            }
        ).catch(
            err => { DebugIt(err); }
        );
    } else {
        dhx.awaitRedraw().then(
            () => {
                LoadHTML();
            }
        );
    }

    if(badge_id != null && stipend_gu !=  null) {
        url = `mSupplementals/php/getStaffStipendHistory.php?id=${badge_id}&stip=${stipend_gu}`;
        dhx.ajax.get(url).then(
            data => {
                LoadLights(data);
            }
        ).catch(
            err => { DebugIt(err); }
        );
    } else {
        dhx.awaitRedraw().then(
            () => {
                LoadLights();
            }
        );
    }
}

//  ----------------------------------------------------------------------------------

SUP.func.RefreshStaffOtherStipendsGrid = function (badge_id = null) {
    const url = (badge_id != null )
                    ? `mSupplementals/php/getOtherStipends.php?id=${badge_id}`
                    : null;

    if( SUP.grid.has(`staffStip`) && SUP.grid.get(`staffStip`) != null ) {
        SUP.grid.get(`staffStip`).data.removeAll();
        if( url != null ) {
            SUP.grid.get(`staffStip`).data.load(url).then(
                () => {
                    // SUP.grid.get(`staffStip`).paint();
                }
            ).catch(
                (e) => { DebugIt(e); }
            );
        }
    }
}

//  ----------------------------------------------------------------------------------

SUP.func.RefreshActvCertGrid = function (badge_id = null) {
    const url = (badge_id != null )
                    ? `mSupplementals/php/getActiveCerts.php?id=${badge_id}`
                    : null;

    if( SUP.grid.has(`actv`) && SUP.grid.get(`actv`) != null) {
        SUP.grid.get(`actv`).data.removeAll();
        if( url != null ) {
            SUP.grid.get(`actv`).data.load(url).then(
                () => {}
            ).catch(
                (e) => { DebugIt(e); }
            );
        }
    }
}

//  ----------------------------------------------------------------------------------

SUP.func.RefreshReqdCertGrid = function ( badge_id   = null, stipend_gu = null ) {
    const url = (badge_id != null && stipend_gu != null)
                    ? `mSupplementals/php/getRequiredCerts.php?id=${badge_id}&stip=${stipend_gu}`
                    : null;

    if( SUP.grid.has(`reqd`) && SUP.grid.get(`reqd`) != null ) {
        SUP.grid.get(`reqd`).data.removeAll();
        if( url != null ) {
            SUP.grid.get(`reqd`).data.load(url).then(
                () => {}
            ).catch(
                (e) => { DebugIt(e); }
            );
        }
    }
}

//  ----------------------------------------------------------------------------------

SUP.func.GetAthInputValues = function() {
    const STIP = `ath`;
    const ACT  = `input`;
    const currVals = SUP.form.get(STIP).get(ACT).getValue();
    const currFlds = SUP.formCfg.get(STIP).get(ACT);
    const result = { fld: null, val: null };

    for (const [key, value] of Object.entries(currVals)) {
        result.fld = key;
        if( key == currFlds.name.id ) {
            result.val = SUP.combo.get(STIP).get(ACT).name.data.getItem(value).value;
        } else if( key == currFlds.location.id ) {
            result.val = SUP.combo.get(STIP).get(ACT).location.data.getItem(value).value;
        } else if( key == currFlds.gender.id ) {
            result.val = SUP.combo.get(STIP).get(ACT).gender.data.getItem(value).value;
        } else if( key == currFlds.distrib.id ) {
            result.val = SUP.combo.get(STIP).get(ACT).distrib.data.getItem(value).value;
        } else if( key == currFlds.freq.id ) {
            result.val = SUP.combo.get(STIP).get(ACT).freq.data.getItem(value).value;
        } else if( key == currFlds.split.id ) {
            result.val = SUP.combo.get(STIP).get(ACT).splt.data.getItem(value).value;
        } else {
            result.val = value;
        }
    }
    return result;
}

//  ----------------------------------------------------------------------------------

SUP.func.ShowAthFormInfo = function (ACT) {
    let message = `
        <div class="info-title">Form Information</div>
        <p>The current values in the form being entered or edited here.</p>
        <ul>
    `;

    const STIP = `ath`;
    const yearCombo = SUP.combo.get(STIP).get(ACT).supp_year;
    let cval = JSON.stringify(yearCombo.getValue(true));

    message += `<li>supp_year : ${cval}</li>`;

    let nameCombo = SUP.combo.get(STIP).get(ACT).name,
        lctnCombo = SUP.combo.get(STIP).get(ACT).location,
        gndrCombo = SUP.combo.get(STIP).get(ACT).gender,
        distCombo = SUP.combo.get(STIP).get(ACT).distrib,
        freqCombo = SUP.combo.get(STIP).get(ACT).freq,
        spltCombo = SUP.combo.get(STIP).get(ACT).splt;

    const fieldMap  = SUP.form.get(STIP).get(ACT);
    const currFlds  = SUP.formFlds.get(STIP).get(ACT);

    let v = null;
    const currVals = fieldMap.getValue();

    for (const [key, value] of Object.entries(currVals)) {
        if( key == currFlds.supp_year.fname ) { continue; }
        cval = value;
        if( key == currFlds.name.fname ) {
            if(typeof (v = nameCombo.data.getItem(value)) != 'undefined' ) {
                cval = v.value;
            }
        } else if( key == currFlds.location.fname ) {
            if(typeof (v = lctnCombo.data.getItem(value)) != 'undefined' ) {
                cval = v.value;
            }
        } else if( key == currFlds.gender.fname ) {
            if(typeof (v = gndrCombo.data.getItem(value)) != 'undefined' ) {
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

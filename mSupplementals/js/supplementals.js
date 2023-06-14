/*
 *  supplementals.js
 *  
 *  Supplemental variable declarations in the global namespace; including:
 *  -- the SUP namespace declaration,
 *  -- initialization of some of the SUP mappings,
 *  -- the supplementals layouts configuration,
 *  -- and, a self-evoking function that loads all the other supplementals JS
 * 
 * ***************************************************************************************** */

//      This is the declaration of the SUP namespace

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

const SUP = {
    win      : { 
        stipendList   : null,
        addCerts      : null,
        athViewOnly   : null,
        othViewOnly   : null,
    }, 
    current           : { 
        STIP          : null, 
        ACT           : null, 
        stipendGU     : null, 
        suppGU        : null,
        badgeID       : null,
        currFiscalSet : null,
        allFiscalSet  : null,
    },
    factory           : {},
    closure           : {},
    func              : {},
    listOfScalars     : [ `ath`, `oth`, `formfieldID`, `toolbarCellID`, `toolbarItemID`,
                          `contentCellID`, `gridCellID`, `titleCellID`, `menuCellID`, `current`],
    listOfStipends    : [ `ath`, `oth` ],
    listOfActions     : [ `input`, `edit` ],
    listOfContainers  : [ `reqd`, `actv`, `expr`, `othStip` ],
    listOfGrids       : [ `reqd`, `actv`, `expr`, `staffStip`, `athStip`, 
                          `othStip`, `athSuppList`, `othSuppList`, `allsupplemental`],
    listOfLayouts     : [ `staffOthStipInput`, `staffExprInput`, `staffOthStipEdit`, `staffExprEdit`,
                          `staffActvInput`, `staffReqdInput`, `staffActvEdit`, `staffReqdEdit`,
                          `staffActvView`, `staffReqdView`, `staffOthStipView`, `staffExprView`,
                          `athSuppList`, `othSuppList`, `allSuppList`, `stipendList`,
                          `athViewOnly`, `othViewOnly`],
    listOfGenTBars    : [ `nav`, `stip`, `cert`, `athViewOnly`, `othViewOnly` ],
    listOfCertTBars   : [ `actv`, `reqd` ],
    listOfSuppTBars   : [ `ath`, `oth`, `all` ],
    combo             : new Map(),
    toolbar           : new Map(),
    certTBCfg         : new Map(),
    suppTBCfg         : new Map(),
    layout            : new Map(),
    layoutCfg         : new Map(),
    layoutCell        : new Map(),
    scalar            : new Map(),
    common            : new Map(),
    gridCfg           : new Map(),
    formFlds          : new Map(),
    formCfg           : new Map(),
    formCSS           : new Map(),
    grid              : new Map(),
    form              : new Map(),
    html              : {},
    htmlCfg           : {    
        expr    : { id : `expr-fid-expr`, default: `0`     , columnName : `EXPERIENCE` },
        step    : { id : `expr-fid-step`, default: `A`     , columnName : `STEP` },
        base    : { id : `expr-fid-base`, default: `$0.00` , columnName : `STEP_AMOUNT` },
        long    : { id : `expr-fid-long`, default: `N`     , columnName : `LONGEVITY` },
        lamt    : { id : `expr-fid-lamt`, default: `$0.00` , columnName : `LONGEVITY_AMOUNT` },
        tot     : { id : `expr-fid-tot`,  default: `$0.00` , columnName : `TOTAL` },
    },
    navLayout         : null,
    navMap            : new Map([
        [ "supp_opt_add_athletic",  { id: "supp_content_add_athletic",  hidden: true, html: "<h2>Add Athletic</h2>" } ]
      , [ "supp_opt_add_other",     { id: "supp_content_add_other",     hidden: true, html: "<h2>Add Other</h2>" } ]
      , [ "supp_opt_edit_athletic", { id: "supp_content_edit_athletic", hidden: true, html: "<h2>Edit Athletic</h2>" } ]
      , [ "supp_opt_edit_other",    { id: "supp_content_edit_other",    hidden: true, html: "<h2>Edit Other</h2>" } ]
      , [ "supp_opt_list_athletic", { id: "supp_content_list_athletic", hidden: true, html: "<h2>Athletic Picklist</h2>" } ]
      , [ "supp_opt_list_other",    { id: "supp_content_list_other",    hidden: true, html: "<h2>Other Supplements Picklist</h2>" } ]
      , [ "supp_opt_list_all",      { id: "supp_content_list_all",      hidden: true, html: "<h2>All Supplements Picklist</h2>" } ]
  ]),
  blurbs : {
        supplementalInfo      : `
            <div class="info-title">Supplemental Info</div>
            <p>The "Supplementals Menu" is where action is taken on supplemental
            records.&puncsp; Depending on your particular user permissions, you
            can add new supplemental records, or, by selecting them from picklist
            grids below, you can edit existing records.&puncsp; Your permissions
            may allow you to see supplemental records in particular categories, or
            all categories, by clicking on the button that selects a given list.</p>
        `,
        actvCertsInfo : `
            <div class="info-title">Active Certifications Listing</div>
            <p>This is a list of the active certifications associated with the staff
            member showing in this form.&puncsp; If this is the "add-supplementals" form,
            this list will change if you change the staff member in the field above; and,
            if no staff member has yet been chosen, this listing will be empty.&puncsp; If
            your permissions allow, <i>and</i> you have selected a staff member <i>or</i>
            you are editing an existing supplemental, you can click on the "Add 
            Certifications" button and add a new certification for that staff member.</p>
            <p><b>Please note</b>: if you add a new certification to a staff member, that 
            addition will be saved (retained) <i>even if you do not save any entry or change
            on this form</i>.</p>
        `,
        reqdCertsInfo : `
            <div class="info-title">Required Certifications Listing</div>
            <p>This is a list of the required certifications found for the staff member
            showing in this form above.  If you are in the "add-supplementals" form and 
            you change the staff member above, this listing will change with it.&puncsp; If 
            this is the "add-supplementals" form and you haven't yet selected a staff member,
            this listing should be empty.</p><p>If you are editing an existing supplemental,
            you cannot change the staff member, so this listing will not vary.</p>
        `,
    },
    externalBrowserRef   : null,
    externalBrowserProps : `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,
                             menubar=no,width=700,height=400,left=100,top=100`,
};

// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
//  --- INITIALIZE CONFIGURATION MAPPINGS ---
//  --- Further initialization happens below...
// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

SUP.listOfGrids.forEach( 
    (gridName) => { 
        SUP.gridCfg.set(gridName, {});
        SUP.grid.set(gridName, null);
    }
);

//  --- INITIALIZE THE LAYOUTS AND LAYOUT CONFIGURATION MAPPINGS ---

SUP.listOfLayouts.forEach( 
    (layoutName) => { 
        SUP.layout.set(layoutName, null);
        SUP.layoutCfg.set(layoutName, {});
        SUP.layoutCell.set(
            layoutName, 
            { titleCellID : `NA`, menuCellID : `NA`, gridCellID : `NA` }
        );
    }
);

//  --- INITIALIZE THE MAPPINGS OF MAPS FOR THE CONFIGURATION OF OTHER WIDGETS ---

SUP.listOfStipends.forEach(
    (stipend) => {
        SUP.formFlds.set(stipend, new Map());
        SUP.formCSS.set(stipend, new Map());
        SUP.formCfg.set(stipend, new Map());
        SUP.form.set(stipend, new Map());
        SUP.scalar.set(stipend, new Map());
        SUP.combo.set(stipend, new Map());

        SUP.listOfActions.forEach(
            (action) => {
                SUP.formFlds.get(stipend).set(action, {});
                SUP.formCSS.get(stipend).set(action, {});
                SUP.formCfg.get(stipend).set(action, {});
                SUP.form.get(stipend).set(action, null);
                SUP.scalar.get(stipend).set(action, {});
                SUP.combo.get(stipend).set(action, {});
            }
        );
    }
);

//  --- Initialize a common map for values that are used in multiple 
//  --- sub-initialization files, such as Supplementals_forms_init.js,
//  --- Supplementals_grids_init.js, and so forth.  This is, primarily,
//  --- a technique for building unique DHTMLX widget ID strings, and
//  --- then being able to access them based on the context of a function
//  --- call or configuration process.
//  --- NOTE: the "SUP.common" mapping is not meant to define every ID used.
//  --- It is only employed in specific situations where a "global of 
//  --- globals" is needed.

SUP.listOfStipends.forEach(
    (STIP) => {
        SUP.common.set(STIP, new Map());
        [`input`, `edit`, `view`].forEach(
            (ACT) => {
                const prefix = STIP + `_` + ACT + `_`;
                SUP.common.get(STIP).set(
                    ACT,
                    {
                        stipend_vc_id    : prefix + `stipend_vc_id`,
                        stipend_vc_fname : `stipend_vc`,
                    }
                );
            }
        )
    }
);


// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
//      LAYOUT CELL CONFIG DECLARATIONS
// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

[`staffActvInput`, `staffActvEdit`,  
 `staffActvView`,  `staffReqdView`,
 `staffReqdInput`, `staffReqdEdit`].forEach(
    (vid) => {
        SUP.layoutCell.get(vid).menuCellID = vid + `_menu_cell`;
        SUP.layoutCell.get(vid).gridCellID = vid + `_grid_cell`;
        
        SUP.layoutCfg.set(
            vid,
            {
                type: "none",
                css: "dhx_widget--bordered",
                rows: [
                    {
                        id : SUP.layoutCell.get(vid).menuCellID,
                        height: `content`,
                    },{
                        id : SUP.layoutCell.get(vid).gridCellID,
                        // height: `content`,
                    }
                ]
            }
        );
    }
);

[`staffOthStipInput`, `staffExprInput`,
 `staffOthStipView`,  `staffExprView`,
 `staffExprEdit`,     `staffOthStipEdit`].forEach(
    (vid) => {
        SUP.layoutCell.get(vid).menuCellID = vid + `_menu_cell`;
        SUP.layoutCell.get(vid).gridCellID = vid + `_grid_cell`;
        
        SUP.layoutCfg.set(
            vid,
            {
                type: "none",
                css: "dhx_widget--bordered",
                rows: [
                    {
                        id : SUP.layoutCell.get(vid).menuCellID,
                        height: 35,
                    },{
                        id : SUP.layoutCell.get(vid).gridCellID,
                        // height: `content`,
                    }
                ]
            }
        );
    }
);

// ----------------------------------------------------------------------------------

[`athSuppList`, `othSuppList`, `allSuppList`, 
 `stipendList`, `athViewOnly`, `othViewOnly`].forEach(
    (vid) => {
        SUP.layoutCell.get(vid).toolbarCellID = vid + `_toolbar_area`;
        SUP.layoutCell.get(vid).contentCellID = vid + `_content_area`;

        SUP.layoutCfg.set(
            vid,
            {
                type: "none",
                rows: [
                    {
                        id : SUP.layoutCell.get(vid).toolbarCellID,
                        height: `content`,
                    },{
                        id : SUP.layoutCell.get(vid).contentCellID,
                        css: "dhx_layout_cell--border-top"
                    }
                ]
            }
        )
    }
);

// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//  SUPPLEMENTALS PRE-INIT SELF-EVOKING FUNCTION
//      (Keep this at the bottom for ease of maintenance)
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

(function() {
    [
        `mSupplementals/js/supplementals_grids_init.js`,
        `mSupplementals/js/supplementals_forms_init.js`,
        `mSupplementals/js/supplementals_toolbars_init.js`,
        `mSupplementals/js/supplementals_main.js`,
        `mSupplementals/js/supplementals_other.js`,
        `mSupplementals/js/supplementals_athletic.js`,
    ].forEach(
        (src) => {
            var script = document.createElement('script');
            script.src = src;
            script.async = false;
            document.head.appendChild(script);
        }
    );
})();

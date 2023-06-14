// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
//
//      supplementals_toolbars_init.js
//
//      TOOLBAR CONFIG DECLARATIONS
//
// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

// listOfGenTBars  : [ `nav`, `stip`, `cert` ],
// listOfCertTBars : [ `actv`, `reqd` ],
// listOfSuppTBars : [ `ath`, `oth`, `all` ],

SUP.listOfGenTBars.forEach(
    TB => {
        SUP.toolbar.set(TB, null);
    }
);

SUP.listOfCertTBars.forEach(
    CB => {
        SUP.certTBCfg.set(CB, new Map());
        SUP.toolbar.set(CB, new Map());
        SUP.listOfActions.forEach(
            ACT => {
                SUP.toolbar.get(CB).set(ACT, null);
                SUP.certTBCfg.get(CB).set(ACT, {});
            }
        )
    }
);

SUP.listOfSuppTBars.forEach(
    SB => {
        SUP.toolbar.set(SB, null);
        SUP.suppTBCfg.set(SB, {});
    }
)

// ----------------------------------------------------------------------------

SUP.certTBCfg.get(`actv`).set(
    `input`,
    {
        title   : `i_tb_test_actv_title`,
        mod     : `i_tb_test_actv_add`,
        info    : `i_tb_test_actv_info`,
        tooltip : `Info about new active certifications`
    }
);

SUP.certTBCfg.get(`actv`).set(
    `edit`,
    {
        title   : `e_tb_test_actv_title`,
        mod     : `e_tb_test_actv_add`,
        info    : `e_tb_test_actv_info`,
        tooltip : `Info about editing existing certifications`
    }
);

SUP.certTBCfg.get(`actv`).set(
    `view`,
    {
        title   : `v_tb_test_actv_title`,
        mod     : `v_tb_test_actv_add`,
        info    : `v_tb_test_actv_info`,
        tooltip : `Info about editing existing certifications`
    }
);

SUP.certTBCfg.get(`reqd`).set(
    `input`,
    {
        title   : `i_tb_test_reqd_title`,
        mod     : `i_tb_test_reqd_add`,
        info    : `i_tb_test_reqd_info`,
        tooltip : `Certification requirements`
    }
);

SUP.certTBCfg.get(`reqd`).set(
    `edit`,
    {
        title   : `e_tb_test_reqd_title`,
        mod     : `e_tb_test_reqd_add`,
        info    : `e_tb_test_reqd_info`,
        tooltip : `Certification requirements`
    }
);

SUP.certTBCfg.get(`reqd`).set(
    `view`,
    {
        title   : `v_tb_test_reqd_title`,
        mod     : `v_tb_test_reqd_add`,
        info    : `v_tb_test_reqd_info`,
        tooltip : `Certification requirements`
    }
);

// ----------------------------------------------------------------------------

SUP.suppTBCfg.set(
    `ath`,
    {
        css: "supplist-toolbar-custom",
        data: [
            {
                id: "athlist-grid-title",
                type: "customHTML",
                html: "Athletic Supplementals List",
                css: "supplist-toolbar-title",
            },{
                type: "spacer",
            },{
                icon: "fas fa-arrows-rotate", 
                id: "athlist-grid-refresh",
                tooltip: "Refresh This Pick-list",
                type: "button",
                size: "small",
                circle: true,
                color: "primary",
            }
        ]
    }
);

SUP.suppTBCfg.set(
    `stip`,
    {
        css: "toolbar-custom",
        data: [
            {
                id: "popup-title",
                type: "customHTML",
                html: "Stipends Picklist",
                css: "toolbar-title",
            },{
                type: "spacer",
            },{
                icon: "fas fa-arrows-rotate", 
                id: "popup-grid-refresh",
                tooltip: "Refresh This Pick-list",
                type: "button",
                size: "small",
                circle: true,
                color: "primary",
            },{
                icon: "dxi dxi-close", 
                id: "popup-window-close",
                tooltip: "Close Picklist",
                type: "button",
                size: "small",
                circle: true,
                color: "primary",
            }
        ]
    }
);

SUP.suppTBCfg.set(
    `all`,
    {
        css: "supplist-toolbar-custom",
        data: [
            {
                id: "supplist-grid-title",
                type: "customHTML",
                html: "All Supplementals List",
                css: "supplist-toolbar-title",
            },{
                type: "spacer",
            },{
                icon: "fas fa-arrows-rotate", 
                id: "supplist-grid-refresh",
                tooltip: "Refresh This Pick-list",
                type: "button",
                size: "small",
                circle: true,
                color: "primary",
            }
        ]
    }
);

SUP.suppTBCfg.set(
    `oth`,
    {
        css: "supplist-toolbar-custom",
        data: [
            {
                id: "othlist-grid-title",
                type: "customHTML",
                html: "Other Supplementals List",
                css: "supplist-toolbar-title",
            },{
                type: "spacer",
            },{
                icon: "fas fa-arrows-rotate", 
                id: "othlist-grid-refresh",
                tooltip: "Refresh This Pick-list",
                type: "button",
                size: "small",
                circle: true,
                color: "primary",
            }
        ]
    }
);

SUP.suppTBCfg.set(
    `suppViewOnly`,
    {
        css: "supplist-toolbar-custom",
        data: [
            {
                id: "suppViewOnly-title",
                type: "customHTML",
                html: "View Supplemental",
                css: "supplist-toolbar-title",
            },{
                type: "spacer",
            },{
                icon: "fas fa-arrows-rotate", 
                id: "suppViewOnly-refresh",
                tooltip: "Refresh This View",
                type: "button",
                size: "small",
                circle: true,
                color: "primary",
            }
        ]
    }
);

// ----------------------------------------------------------------------------

SUP.closure.configNavTBar = (function() {
    let toolbardata = [];
    function EchoConfig() {
        return({
            css  : `toolbar-custom`,
            data : toolbardata
        })
    }

    return {
        GetConfig() {
            toolbardata = [];
            if( Permitted(`ATH`, "suppAdd") ) {
                toolbardata.push(
                    {
                        id: "supp_opt_add_athletic",
                        icon: "fa-solid fa-circle-plus",
                        value: "Add Athletic",
                        type: "button",
                        tooltip: "Create a new athletic supplemental record",
                        size: "small",
                        circle: true,
                        // color: "primary",
                    }
                );
            }
            if( Permitted(`OTH`, "oth1Add") ) {
                toolbardata.push(
                    {
                        id: "supp_opt_add_other",
                        icon: "fa-solid fa-circle-plus",
                        value: "Add Other",
                        type: "button",
                        tooltip: "Create a new NON-athletic supplemental record",
                        size: "small",
                        circle: true,
                        // color: "primary",
                    }
                );
            }
            if( toolbardata.length > 0 ) {
                toolbardata.push({type: "separator"});
            }
            if( Permitted(`ALL`, "allLst") ) {
                toolbardata.push(
                    {
                        id: `supp_opt_list_all`,
                        icon: "fa-solid fa-rectangle-list",
                        value: "List All",
                        type: "button",
                        tooltip: "List of ALL supplementals for the current fiscal year",
                        size: "small",
                        circle: true,
                    }
                );
            }
            if( Permitted([`ATH`, `ALL`], "suppLst") ) {
                toolbardata.push(
                    {
                        id: "supp_opt_list_athletic",
                        icon: "fa-solid fa-rectangle-list",
                        value: "List Athletic",
                        type: "button",
                        tooltip: "Bring up the list of existing athletic supplementals",
                        size: "small",
                        circle: true,
                    }
                );
            }
            if( Permitted([`OTH`, `ALL`], "oth1Lst") ) {
                toolbardata.push(
                    {
                        id: "supp_opt_list_other",
                        icon: "fa-solid fa-rectangle-list",
                        value: "List Other",
                        type: "button",
                        tooltip: "Bring up the list of NON-athletic supplementals",
                        size: "small",
                        circle: true,
                    }
                );
            }

            toolbardata.push(
                {
                    id   : `supp_opt_toggle_fiscal_year`,
                    type : `button`,
                    css  : `custom-toolbar-toggle-button`,
                    value : `Change Focus To ALL Fiscal Years`,
                    icon  : `fa-regular fa-toggle-on`,
                    size  : `small`,
                    circle : true
                }
            );
            toolbardata.push(
                {
                    type: "spacer",
                }
            );
            toolbardata.push(
                {
                    id   : `supp_menu_title`,
                    type : `customHTML`,
                    html : `Current Fiscal Year`,
                    css  : `toolbar-title`,
                }
            );
            toolbardata.push(
                {
                    id: "supp_opt_list_info",
                    icon: "fa-solid fa-info-circle",
                    type: "button",
                    tooltip: "Help for supplemental management",
                    size: "small",
                    circle: true,
                    color: "primary",
                }
            );

            return( EchoConfig() );
        }
    }
})();

// ----------------------------------------------------------------------------

SUP.closure.configCertTBar = (function () {
    let toolbardata = [];

    function EchoConfig() {
        return({ 
            css  : `toolbar-custom`, 
            data : toolbardata
        });
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    return {
        GetActv(ACT) {
            toolbardata = [
                {
                    id   : SUP.certTBCfg.get(`actv`).get(ACT).title,
                    type : `customHTML`,
                    html : `Active Certifications`,
                    css  : `toolbar-title-sm`,
                }
            ];
            if( ACT != `view` ) {
                const addBtn = `<button>&puncsp;&oplus; Add Certifications&puncsp;</button>`;
                if( Permitted(`ATH`, `certAdd`) ) {
                    toolbardata.push(
                        {
                            type    : "customHTML",
                            id      : SUP.certTBCfg.get(`actv`).get(ACT).mod,
                            html    : addBtn,
                            css     : "custom-toolbar-btn",
                            tooltip : "Add a new certification to this staff member"
                        }
                    )
                }
                toolbardata.push(
                    {
                        type: "spacer",
                    }
                );
                toolbardata.push(
                    {
                        id      : SUP.certTBCfg.get(`actv`).get(ACT).info,
                        icon    : "fa-solid fa-info-circle",
                        type    : "button",
                        tooltip : SUP.certTBCfg.get(`actv`).get(ACT).tooltip,
                        size    : "small",
                        circle  : true,
                        color   : "primary",
                    }
                );
            }
            return( EchoConfig() );
        },
        GetReqd(ACT) {
            toolbardata = [
                {
                    id   : SUP.certTBCfg.get(`reqd`).get(ACT).title,
                    type : "customHTML",
                    html : "Certification Required",
                    css  : "toolbar-title-sm",
                }
            ];
            if(ACT != `view`)
                toolbardata.push(
                    {
                        type: "spacer",
                    },{
                        id      : SUP.certTBCfg.get(`reqd`).get(ACT).info,
                        icon    : "fa-solid fa-info-circle",
                        type    : "button",
                        tooltip : SUP.certTBCfg.get(`reqd`).get(ACT).tooltip,
                        size    : "small",
                        circle  : true,
                        color   : "primary",
                    }
            );
            return( EchoConfig() );
        }
    };

})();

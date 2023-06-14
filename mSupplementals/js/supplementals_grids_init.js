// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
//
//  supplementals_grids_init.js
//
//  GRID CONFIG DECLARATIONS FOR SUPPLEMENTALS
//
// =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

SUP.gridCfg.set(`reqd`, 
    {
        autoWidth: true,
        rowHeight: 26,
        editable: false,
        css: "custom-grid-sm",
        columns: [
            { id : "CERTIFICATION", header : [ {text: "Certification"} ] },
            { id : "CURRENT",       header : [ {text: "Current"} ], width: 74 }, 
            { id : "EXP_MID",       header : [ {text: "Exp-Mid"} ], width: 98 },
            { id : "EXPIRY",        header : [ {text: "Expiry"} ], width: 98 }
        ],
    }
);

SUP.gridCfg.set(`actv`, 
    {
        autoWidth: true,
        rowHeight: 26,
        editable: false,
        css: "custom-grid-sm",
        columns: [
            { id : "CERTIFICATION", header : [ {text: "Certification"} ] },
            { id : "REQUIRED",      header : [ {text: "Required"} ], width: 74 }, 
            { id : "VALID",         header : [ {text: "Valid"} ], width: 98 },
            { id : "EXPIRY",        header : [ {text: "Expiry"} ], width: 98 }
        ],
    }
);

SUP.gridCfg.set(`staffStip`,
    {
        autoWidth: true,
        rowHeight: 26,
        editable: false,
        css: "custom-grid-sm",
        columns: [
            { id : "SSN",      header : [ {text: "School"} ] },
            { id : "POSITION", header : [ {text: "Position"} ], width: 74 }, 
            { id : "PROGRAM",  header : [ {text: "Program"} ], width: 98 },
            { id : "GENDER",   header : [ {text: "Gender"} ], width: 98 }
        ],
    }
);

SUP.gridCfg.set(`expr`, 
    {
        autoWidth: true,
        rowHeight: 26,
        editable: false,
        css: "custom-grid-sm",
        columns: [
            { id : "DESCRIPTION", header : [ {text: "Program"} ] },
            { id : "EXPERIENCE",  header : [ {text: "Yrs Exp"} ], width: 74 },
            { id : "STEP",        header : [ {text: "(Stp) - Amt"} ], width: 91 }, 
            { id : "LONGEVITY",   header : [ {text: "Longevity"} ], width: 78 },
            { id : "LOCATION",    header : [ {text: "Location"} ], width: 83 }
        ],
    }
);

SUP.gridCfg.set(`athStip`, 
    {
        autoWidth: true,
        rowHeight: 30,
        editable: false,
        css: "custom-grid-sm",
        columns: [
            { 
                id         : "SELECTOR", 
                header     : [ {text: ""} ],
                tooltip    : false,
                htmlEnable : true,
                width      : 65,
            },
            { 
                id     : "ACTIVITY",
                header : [ {text: "Current"}, {content: "inputFilter"} ], 
            }, 
            { 
                id     : "GRADE",
                header : [ {text: "Grade"}, {content: "selectFilter"} ], 
                width  : 90, 
            }, 
            { 
                id     : "POSITION",
                header : [ {text: "Position"}, {content: "selectFilter"} ], 
                width  : 90, 
            }, 
            {
                id     : "SEASON",
                header : [ {text: "Season"}, {content: "selectFilter"} ], 
                width  : 120,
            },
            {
                id     : "STEP_A",
                header : [ {text: "Step A"} ], 
                width  : 80,
            }, 
            {
                id     : "STEP_B",
                header : [ {text: "Step B"} ], 
                width  : 80,
            }, 
            {
                id     : "STEP_C",
                header : [ {text: "Step C"} ],
                width  : 80,
            }, 
            {
                id     : "STEP_D",
                header : [ {text: "Step D"} ],
                width  : 80,
            }, 
            {
                id     : "STEP_E",
                header : [ {text: "Step E"} ],
                width  : 80,
            }, 
            {
                id     : SUP.common.get(`ath`).get(`input`).stipend_vc_id,
                header : [ {text: SUP.common.get(`ath`).get(`input`).stipend_vc_id} ],
                hidden : true,
            }, 
            {
                id     : "ERROR",
                header : [ {text: "DATABASE_ERROR"} ],
                hidden : true,
            }, 
        ],
    }
);

SUP.gridCfg.set(`othStip`, {});

// ------------------------------------------------------------------------------------------

SUP.gridCfg.set(
    `athSuppList`, 
    {
        autoWidth: true,
        rowHeight: 30,
        editable: false,
        css: "custom-grid-sm",
        columns: [
            { 
                id         : "SELECTOR", 
                header     : [ {text: ""} ],
                tooltip    : false,
                htmlEnable : true,
                width      : 100,
            },
            { 
                id     : "STAFF_MEMBER",
                header : [ {text: "Staff Member"}, {content: "inputFilter"} ], 
            }, 
            { 
                id     : "SCHOOL",
                header : [ {text: "School"}, {content: "selectFilter"} ], 
                width  : 230, 
            }, 
            { 
                id     : "POSITION",
                header : [ {text: "Position"}, {content: "selectFilter"} ], 
                width  : 135, 
            }, 
            {
                id     : "PROGRAM",
                header : [ {text: "Program (Stipend)"}, {content: "selectFilter"} ], 
                width  : 160,
            },
            {
                id     : "GENDER",
                header : [ {text: "Gender"}, {content: "selectFilter"} ], 
                width  : 90,
            }, 
            {
                id     : "CERTSCLEAR",
                header : [ {text: "Certs Cleared"}, {content: "selectFilter"} ], 
                width  : 120,
            }, 
            {
                id     : "YEAR",
                header : [  {text: "Fiscal Year"}, {content: "selectFilter"} ],
                width  : 110,
                hidden : true,
            }, 
            {
                id     : "SUPPLEMENTAL_GU",
                header : [ {text: ""} ],
                hidden : true,
            }, 
            {
                id     : "IS_SPORT",
                header : [ {text: ""} ],
                hidden : true,
            }, 
            {
                id     : "ERROR",
                header : [ {text: ""} ],
                hidden : true,
            }, 
        ],
    }
);

SUP.gridCfg.set(
    `othSuppList`,
    {
        autoWidth: true,
        rowHeight: 30,
        editable: false,
        css: "custom-grid-sm",
        columns: [
            { 
                id         : "SELECTOR", 
                header     : [ {text: ""} ],
                tooltip    : false,
                htmlEnable : true,
                width      : 100,
            },
            { 
                id     : "STAFF_MEMBER",
                header : [ {text: "Staff Member"}, {content: "inputFilter"} ], 
            }, 
            { 
                id     : "SCHOOL",
                header : [ {text: "School"}, {content: "selectFilter"} ], 
                width  : 230, 
            }, 
            { 
                id     : "POSITION",
                header : [ {text: "Position"}, {content: "selectFilter"} ], 
                width  : 135, 
            }, 
            {
                id     : "PROGRAM",
                header : [ {text: "Program (Stipend)"}, {content: "selectFilter"} ], 
                width  : 160,
            },
            {
                id     : "GENDER",
                header : [ {text: "Gender"}, {content: "selectFilter"} ], 
                width  : 90,
            }, 
            {
                id     : "CERTSCLEAR",
                header : [ {text: "Certs Cleared"}, {content: "selectFilter"} ], 
                width  : 120,
            }, 
            {
                id     : "YEAR",
                header : [ {text: "Fiscal Year"}, {content: "selectFilter"} ],
                width  : 110,
                hidden : true,
            }, 
            {
                id     : "SUPPLEMENTAL_GU",
                header : [ {text: ""} ],
                hidden : true,
            }, 
            {
                id     : "IS_SPORT",
                header : [ {text: ""} ],
                hidden : true,
            }, 
            {
                id     : "ERROR",
                header : [ {text: ""} ],
                hidden : true,
            }, 
        ],
    }
);

SUP.gridCfg.set(
    `allsupplemental`, 
    {
        autoWidth: true,
        rowHeight: 30,
        editable: false,
        css: "custom-grid-sm",
        columns: [
            { 
                id         : "SELECTOR", 
                header     : [ {text: ""} ],
                tooltip    : false,
                htmlEnable : true,
                width      : 100,
            },
            { 
                id     : "STAFF_MEMBER",
                header : [ {text: "Staff Member"}, {content: "inputFilter"} ], 
            }, 
            { 
                id     : "SCHOOL",
                header : [ {text: "School"}, {content: "selectFilter"} ], 
                width  : 230, 
            }, 
            { 
                id     : "POSITION",
                header : [ {text: "Position"}, {content: "selectFilter"} ], 
                width  : 135, 
            }, 
            {
                id     : "PROGRAM",
                header : [ {text: "Program (Stipend)"}, {content: "selectFilter"} ], 
                width  : 160,
            },
            {
                id     : "GENDER",
                header : [ {text: "Gender"}, {content: "selectFilter"} ], 
                width  : 90,
            }, 
            {
                id     : "CERTSCLEAR",
                header : [ {text: "Certs Cleared"}, {content: "selectFilter"} ], 
                width  : 122,
            }, 
            {
                id     : "YEAR",
                header : [ {text: "Fiscal Year"}, {content: "selectFilter"} ],
                width  : 110,
                hidden : true,
            }, 
            {
                id     : "SUPPLEMENTAL_GU",
                header : [ {text: ""} ],
                hidden : true,
            }, 
            {
                id     : "IS_SPORT",
                header : [ {text: ""} ],
                hidden : true,
            }, 
            {
                id     : "ERROR",
                header : [ {text: ""} ],
                hidden : true,
            }, 
        ],
    }
);

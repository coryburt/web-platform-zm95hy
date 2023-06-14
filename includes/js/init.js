/* *************************************************************
 *
 *  Javascript namespace initializer for the 
 *  HR - Stipend Management System
 *
 * *************************************************************/

let mainLayout          = null,
    mainSidebar         = null,
    mainScreen          = null,
    sidebarWindow       = null,
    sidebarScreen       = null,

    infoLayout          = null,
    infoWindow          = null,
    
    dbgridCell          = null,
    dbgridHeaderCell    = null,
    viewCell            = null,
    metadataMenuCell    = null,
    quickviewMenuCell   = null,

    reportsLayout       = null,
    reportsNavToolbar   = null,

    stipendInputGrid    = null,
    stipendEditGrid     = null,

    newYearInfoWindow   = null,
    newYearNavToolbar   = null;

let CURRENT = {
    sessionStale  : false,
    fiscalState   : `current`,  // options are `current` and anything else
    fiscalYear    : ``,
    userRole      : ``,
    userCategory  : [],
    userMap       : null,
    debug         : false,
};

let browserSize = { 
    width   : window.innerWidth, 
    height  : window.innerHeight
};

//  -------------------------------------------------------------------------------

// <img id="logo" src="includes/images/athletics.png" height="90">
// </div>

const mastheadHTML = `
    <div id="startPageHeader" class="masthead-wrapper">
      <div id="logo-box" class="masthead-box1"></div>
      <div id="page-masthead" class="masthead-box2">
            <span class="headline">HR &ndash; Stipend Management</span><br />
            <span class="subheadline">Athletics and Activities</span>
            <span id="banner_fy" class="subheadline"></span>
      </div>
      <div id="debugBox" class="masthead-box3"></div>
    </div>
`;

//  -------------------------------------------------------------------------------

const locationOptionsList = [
      {value: "", content: ""}
    , {value: "4070", content: "Bethel High"}
    , {value: "4280", content: "Graham-Kapowsin High"}
    , {value: "4580", content: "Spanaway Lake High"}
    , {value: "4480", content: "High School #4"}
    , {value: "4730", content: "Lab"}
    , {value: "4600", content: "Pierce County Skills Center"}
    , {value: "3050", content: "Bethel Middle School"}
    , {value: "3960", content: "Cedarcrest Middle School"}
    , {value: "3250", content: "Cougar Mountain Middle School"}
    , {value: "3060", content: "Frontier Middle School"}
    , {value: "3300", content: "Liberty Middle School"}
    , {value: "3510", content: "Spanaway Middle School"}
    , {value: "5633", content: "Bethel Virtual Academy"}
];

const seasonOptionsList = [
    "FALL"
    ,"WINTER (Early)","WINTER (Late)","SPRING","SUMMER", "YEAR"
];


const sidebarOptConfig = [];
const sidebarMap = new Map([
    [  "sb_opt01", { cellConfig : { id: "contentCell01", hidden: false } } ]
  , [  "sb_opt02", { cellConfig : { id: "contentCell02", hidden: true  } } ]
  , [  "sb_opt03", { cellConfig : { id: "contentCell03", hidden: true  } } ]
  , [  "sb_opt04", { cellConfig : { id: "allReportsContentCell", hidden: true  } } ]
  , [  "sb_opt07", { cellConfig : { id: "contentCell07", hidden: true  } } ]
  , [  "sb_opt08", { cellConfig : { id: "allPicklistsContentCell", hidden: true  } } ]
  , [  "sb_opt09", { cellConfig : { id: "contentCell09", hidden: true  } } ]
  , [  "sb_opt10", { cellConfig : { id: "contentCell10", hidden: true  } } ]
  , [  "sb_opt11", { cellConfig : { id: "contentCell11", hidden: true  } } ]
  , [  "sb_opt20", { cellConfig : { id: "contentCell20", hidden: true  } } ]
  , [  "sb_opt21", { cellConfig : { id: "contentCell21", hidden: true  } } ]
  , [  "sb_opt22", { cellConfig : { id: "contentCell22", hidden: true  } } ]
  , [  "sb_pcklst_account_codes",   { url : "mPicklists/php/getAccountCodes.php", name : "Account Codes", type : "ac"} ]
  , [  "sb_pcklst_fiscal_year",     { url : "mPicklists/php/getFiscalYear.php", name : "Fiscal Year", type : "fy" } ]
  , [  "sb_pcklst_locations",       { url : "mPicklists/php/getLocations.php", name : "Locations", type: "loc" } ]
  , [  "sb_pcklst_distribution",    { url : "mPicklists/php/getLookupDistribution.php", name : "Distribution", type: "dist" } ]
  , [  "sb_pcklst_frequency",       { url : "mPicklists/php/getLookupFrequency.php", name : "Frequency", type: "freq" } ]
  , [  "sb_pcklst_gender",          { url : "mPicklists/php/getLookupGender.php", name : "Gender", type: "gen" } ]
  , [  "sb_pcklst_grade",           { url : "mPicklists/php/getLookupGrade.php", name : "Grade", type: "grd" } ]
  , [  "sb_pcklst_position",        { url : "mPicklists/php/getLookupPosition.php", name : "Position", type: "pos" } ]
  , [  "sb_pcklst_split",           { url : "mPicklists/php/getLookupSplit.php", name : "Split", type: "splt" } ]
  , [  "sb_pcklst_programs",        { url : "mPicklists/php/getPrograms.php", name : "Program", type : "prg" } ]
  , [  "sb_pcklst_seasons",         { url : "mPicklists/php/getSeasons.php", name : "Seasons", type : "szn" } ]
  , [  "sb_pcklst_stipends",        { url : "mPicklists/php/getStipends.php", name : "Stipends", type : "stp" } ]
  , [  "sb_theme_default",          { theme : "light" } ]
  , [  "sb_theme_dark",             { theme : "dark" } ]
  , [  "sb_theme_contrast_light",   { theme : "contrast-light" } ]
  , [  "sb_theme_contrast_dark",    { theme : "contrast-dark" } ]
]);

sidebarMap.forEach( function(obj, key) {
    if( key.startsWith("sb_opt") ) {
        sidebarOptConfig.push(obj.cellConfig);
    }
});

//  -------------------------------------------------------------------------------

const masterLayoutConfig = {
    type: "none",
    height: "100vh",
    rows: [
        {
            id: "masthead_wrapper",
            height: "content",
            html: mastheadHTML
        },{
            id: "content_cell",
            height: "calc(100vh - 100px)",
            cols: [
                {
                    id: "sidebar_wrapper",
                    width: "content"
                },{
                    id: "content_wrapper",
                    css: "dhx_layout-cell--border_left",
                    rows: sidebarOptConfig
                }
            ]
        }
    ]
};

const mainSidebarConfig = 
{
    width: 200,
    data: [
        {
            id: "sb_opt01",
            icon: "fas fa-chevron-left",
            html: `<span class="menu-title">&puncsp;MAIN MENU&puncsp;</span>`,
            tooltip: "Click here to expand/collapse the sidebar menu"
        },{
            type: "separator",
        },{
            id: "sb_opt02",
            value: "Supplementals",
            icon: "fas fa-people-group",
        },{       
            id: "sb_opt03",
            value: "Experience",
            icon: "fas fa-clipboard-list",
        },{
            id: "skip98",
            value: "Reports",
            icon: "fa-solid fa-paper-plane",
            items: [
                {
                    id: "sb_rpt_certifcation",
                    value: "Certification Report",
                    icon: "fa-solid fa-chart-column",
                    tooltip: "Generate/View Report of Certifications"
                },{
                    id: "sb_rpt_stipend",
                    value: "Stipend Report",
                    icon: "fa-solid fa-chart-line", 
                    tooltip: "Generate/View Report of Stipends"
                },{
                    id: "sb_rpt_supplemental",
                    value: "Supplemental Report",
                    icon: "fa-solid fa-chart-pie",
                    tooltip: "Generate/View Report of Supplementals"
                }
            ]
        },{
            id: "skip99",
            value: "Manage Picklists",
            icon: "fas fa-database",
            items: [
                {
                    id: "sb_pcklst_account_codes",
                    value: "Account Codes",
                    icon: "fa-sharp fa-solid fa-receipt",
                    tooltip: "View/Edit Account Codes Table"
                },{
                    id: "sb_pcklst_fiscal_year",
                    value: "Fiscal Year",
                    icon: "fa-solid fa-calendar-days",
                    tooltip: "View/Edit Fiscal Year Table"
                },{
                    id: "sb_pcklst_locations",
                    value: "Locations",
                    icon: "fa-solid fa-location-dot",
                    tooltip: "View/Edit Locations Table"
                },{
                    id: "skip02",
                    value: "Lookup Values",
                    icon: "fa-solid fa-key",
                    items: [
                        {
                            id: "sb_pcklst_distribution",
                            value: "Distribution",
                        },{
                            id: "sb_pcklst_frequency",
                            value: "Frequency",
                        },{
                            id: "sb_pcklst_gender",
                            value: "Gender",
                        },{
                            id: "sb_pcklst_grade",
                            value: "Grade",
                        },{
                            id: "sb_pcklst_position",
                            value: "Position",
                        },{
                            id: "sb_pcklst_split",
                            value: "Split",
                        }
                    ]
                },{
                    id: "sb_pcklst_programs",
                    value: "Programs",
                    icon: "fa-solid fa-bowling-ball",
                    tooltip: "View/Edit Programs Table"
                },{
                    id: "sb_pcklst_seasons",
                    value: "Seasons",
                    icon: "fa-solid fa-tree", 
                    tooltip: "View/Edit Seasons Table"
                },{
                    id: "sb_pcklst_stipends",
                    value: "Stipends",
                    icon: "fa-solid fa-hand-holding-dollar",
                    tooltip: "View/Edit Stipends Table"
                }
            ]
        },{
            type: "separator",
        },{
            type: "spacer",
        },{
            id: "sb_dev_tools",
            value: "Dev Tools",
            icon: "fas fa-hat-wizard",
            hidden: true,
            items: [
                {
                    id: "sb_opt20",
                    value: "View Database Tables",
                    icon: "fas fa-database",
                },{
                    id: "sb_opt21",
                    value: "View App Code",
                    icon: "fas fa-code",
                },{
                    id: "sb_devtool_show_session",
                    value: "View Session, Etc.",
                    icon: "fas fa-circle-info",
                }
            ]
        },{
            id: "skip05",
            value: "App Configuration",
            icon: "fa-solid fa-sliders",
            items: [
                {
                    id: "skip06",
                    value: "Themes",
                    icon: "fa-solid fa-palette",
                    items: [
                        {
                            id: "sb_theme_default",
                            value: "Default (Light)",
                            icon: "fa-solid fa-jedi"
                        },{
                            id: "sb_theme_dark",
                            value: "Dark",
                            icon: "fa-brands fa-galactic-republic"
                        },{
                            id: "sb_theme_contrast_light",
                            value: "Light High-contrast",
                            icon: "fa-brands fa-old-republic"
                        },{
                            id: "sb_theme_contrast_dark",
                            value: "Dark High-contrast",
                            icon: "fa-brands fa-galactic-senate"
                        }
                    ]
                },
                {
                    id: "sb_opt09",
                    value: "User Security Roles",
                    icon: "fa-solid fa-user-shield",
                },
                {
                    id: "sb_opt10",
                    value: "Staff Certification Script",
                    icon: "fa-solid fa-certificate",
                },
                {
                    id: "sb_opt11",
                    value: "New Year Rollover",
                    icon: "fa-regular fa-calendar-check",
                }
            ]
        },{
            id: "sb_opt22",
            value: "Help",
            icon: "fa-regular fa-info-circle",
        }
    ]
};

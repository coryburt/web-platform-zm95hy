/*
 *
 *  picklists.js
 * 
 * ***************************************************************************************** */

const PCK = {
    win: 
    {
        plFormWindow : null,
        plInfoWindow : null,   
    },
    layout: 
    {
        plLayout     : null,
        plFormLayout : null,
    },
    toolbar:
    {
        plToolbar : null,
    },
    grid: 
    {
        plGrid : null,
    },
    vessel: 
    {
        rowSelect : null, // Holds current picklist grid selection
        sbSelect  : null, // Holds current picklist sidebar mapping selection
        tbSelect  : null, // Holds current picklist toolbar selection
    },
    scalars: 
    {
        toolbarCellID: 
        {
            mainHeader : 'picklist_header',
            formMenu   : 'pl_form_menu_area',
        },
        contentCellID: 
        {
            mainData : 'picklist_data',
            formData : 'pl_form_area',
        }
    },
    func : {},  
};

function InitPicklist(contentCell) {
    const picklistLayoutConfig = {
        type: "none",
        rows: [
            {
                id: PCK.scalars.toolbarCellID.mainHeader,
                css: "dhx_layout-cell--bordered",
                height: "content"
            },{
                id: PCK.scalars.contentCellID.mainData,
                css:  "dhx_layout-cell--bordered"
            }
        ]
    };

    PCK.layout.plLayout = new dhx.Layout(null, picklistLayoutConfig);
    contentCell.attach(PCK.layout.plLayout);
    
    PCK.func.InitPicklistFormWindow();
    PCK.func.getPicklistToolbar();

}

PCK.func.InitPicklistFormWindow = function() {
    if(PCK.win.plFormWindow != null ) PCK.win.plFormWindow.destructor();

    if(PCK.layout.plFormLayout == null ) {
        const picklistFormConfig = {
            type: "none",
            rows: [
                {
                    id: PCK.scalars.toolbarCellID.formMenu,
                    height: "content",
                },{
                    id: PCK.scalars.contentCellID.formData,
                }
            ]
        };
        PCK.layout.plFormLayout = new dhx.Layout(null, picklistFormConfig)
    }

    PCK.win.plFormWindow = new dhx.Window(
        {
            width: (browserSize.width / 2)+120,
            height: (browserSize.height / 2)+120,
            top: 110,
            modal: true,
            resizable: true,
            closable: true,
            movable: true,
            header: false,
            footer: true,
            css: "custom-window-fit",    
        }
    );

    PCK.win.plFormWindow.footer.data.add({
        type: "spacer",
    });

    PCK.win.plFormWindow.footer.data.add({
        id: "cancel",
        value: "cancel",
        type: "button",
        view: "link",
        circle: true,
        size: "medium",
        color: "secondary",
    });

    PCK.win.plFormWindow.footer.data.add({
        id: "save",
        value: "save",
        type: "button",
        view: "flat",
        circle: true,
        size: "medium",
        color: "success",
    });

    PCK.win.plFormWindow.footer.events.on("click", function (id) {
        if ( id === "save" ) {
            const picklistForm = PCK.layout.plFormLayout.getCell(PCK.scalars.contentCellID.formData).getWidget();
            if ( picklistForm.validate() ) {
                dhx.confirm({
                    header: "<b>Save Picklist Item (" + PCK.vessel.tbSelect + ")</b>",
                    text: "Are you sure you want to save changes to new or existing picklist?<br></b>",
                    buttons: ["Cancel", "Save"],
                    buttonsAlignment: "center",
                    css: "picklist-popup",
                }).then(
                    function (i) { 
                        if (i) {
                            if ( PCK.vessel.tbSelect == 'add' ) {
                                PCK.func.savePicklistAdd(picklistForm);
    
                            } else if (PCK.vessel.tbSelect == 'edit' ) {
                                PCK.func.savePicklistEdit(picklistForm);
                            }
                            PCK.win.plFormWindow.hide();
                        }
                    }
                );
            }
        } else if ( id = "cancel" ) {
            PCK.win.plFormWindow.hide();
            PCK.func.getPicklistGrid(PCK.vessel.sbSelect);
        }
    });

    PCK.win.plFormWindow.attach(PCK.layout.plFormLayout);
}

PCK.func.getPicklistToolbar = function() {
    const toolbar = new dhx.Toolbar(null, {
        data: [
            {
                "id": "add",
                "icon": "fa-solid fa-circle-plus",
                "value": "Add",
                "type": "button",
                "tooltip": "Add new item to the picklist",
                "circle": true,
                "color": "success",
            },{
                type: "separator",
            },{
                "id": "edit",
                "icon": "fa-solid fa-pen-to-square",
                "value": "Edit",
                "type": "button",
                "tooltip": "Edit selected item in the picklist",
                "circle": true,
                "color": "primary",
                "disabled": true,
            },{
                type: "separator",
            },{
                "id": "disable",
                "icon": "fa-solid fa-circle-minus",
                "value": "Disable",
                "type": "button",
                "tooltip": "Disable selected item in the picklist",
                "circle": true,
                "color": "danger",
                "disabled": true,
            },{
                type: "spacer",
            },{
                "id": "title",
                "type": "customHTML",
            },{
                type: "spacer",
            },{
                "id": "refresh",
                "icon": "fa-solid fa-arrows-rotate",
                "type": "button",
                "tooltip": "Refresh current picklist",
                "circle": true,
                "color": "secondary",
            },{
                "id": "info",
                "icon": "fa-solid fa-info-circle",
                "type": "button",
                "tooltip": "Info for current screen",
                "circle": true,
                "color": "secondary",
            }
        ]
    });

    // Assign/overwrite toolbar globally
    PCK.toolbar.plToolbar = PCK.layout.plLayout.getCell(PCK.scalars.toolbarCellID.mainHeader).attach(toolbar);

    PCK.toolbar.plToolbar.events.on("click", function(id) {
        if (id == 'add') {
            //Reset grid selection
            PCK.vessel.rowSelect = null;
            PCK.func.openPicklistWindow(id);

        } else if (id == 'edit') {
            PCK.func.openPicklistWindow(id);

        } else if (id == 'disable') {
            PCK.func.openPicklistItemDisable();

        } else if (id == 'refresh') {
            PCK.vessel.rowSelect = null;
            PCK.func.getPicklistGrid(PCK.vessel.sbSelect);

        } else if (id == 'info') {
            PCK.func.openPicklistInfo();
        }
    });
}

PCK.func.getPicklistGrid = function(id) {
    let url = ( sidebarMap.has(id) ) ? sidebarMap.get(id).url : null;
    PCK.toolbar.plToolbar.disable(["edit", "disable"]);
    PCK.vessel.rowSelect = null;
    PCK.vessel.tbSelect = null;
    
    PCK.layout.plLayout.progressShow();
    if( url ) {
        dhx.ajax.get(url).then(
            json => {
                const grid = new dhx.Grid(null, {
                    columns: json.columns,
                    autoWidth: true,
                    resizable: true,
                    selection: "row",
                    editable: false,
                    // css: "picklist-alt-grid",
                    data: json.data,
                });

                // Hide unneccessary toolbar buttons for specific picklists
                if ( PCK.vessel.sbSelect == 'sb_pcklst_account_codes' || PCK.vessel.sbSelect == 'sb_pcklst_fiscal_year' ) {
                    PCK.toolbar.plToolbar.hide('disable');
                } else {
                    PCK.toolbar.plToolbar.show('disable'); 
                }

                // Assign/overwrite grid globally
                PCK.layout.plLayout.progressHide();
                PCK.grid.plGrid = PCK.layout.plLayout.getCell(PCK.scalars.contentCellID.mainData).attach(grid);

                // Grid event handlers
                PCK.grid.plGrid.events.on("cellClick", function(row) {
                    PCK.vessel.rowSelect = row.id;
                    PCK.toolbar.plToolbar.enable(["edit", "disable"]);
                });
            }
        )
    } else {
        MessageIt('Not Yet Implemented', 'warning');
    }
}

function getPicklist(id) {

    // May turn this into a vessel
    let plName = ( sidebarMap.has(id) ) ? sidebarMap.get(id).name : null;
    PCK.vessel.sbSelect = id;

    PCK.func.getPicklistGrid(id);
    PCK.toolbar.plToolbar.data.update("title", 
        { html: `<div id="data-title-header" class="picklist-toolbar-title">`+ plName + ` Picklist</div>` }
    );
    // plFormWindow.footer.data.update("title", 
    //     { html: `<div id="data-title-header">`+ plName + `</div>` }
    // );
}

// --------------------------------------------------------------------------------------------
// Open Functions
// --------------------------------------------------------------------------------------------

PCK.func.openPicklistWindow = function(type) {
    PCK.win.plFormWindow.show();
    const cell = PCK.layout.plFormLayout.getCell(PCK.scalars.contentCellID.formData);
    cell.detach();

    PCK.func.loadPicklistWindow(cell, type);
}

PCK.func.openPicklistItemDisable = function() {
    dhx.confirm({
        header: "<b>Disable Selected Picklist Item</b>",
        text: "Please confirm that the intended item is to be disabled: <br><b>" + PCK.vessel.rowSelect + "</b>",
        buttons: ["Cancel", "Disable"],
        buttonsAlignment: "center",
        css: "picklist-popup",
    }).then(
        function (i) { 
            if (i) {
                PCK.func.disablePicklistItem();
            }
        }
    );
}

PCK.func.openPicklistInfo = function() {
    if( PCK.win.plInfoWindow != null ) PCK.win.plInfoWindow.destructor();
    let plType = ( sidebarMap.has(PCK.vessel.sbSelect) ) ? sidebarMap.get(PCK.vessel.sbSelect).type : null;
    let specificHTML = null;
    let infoHTML = "";

    switch(plType) {
        case 'ac' :
            infoHTML = "<div><div><h1>Account Code Picklist:</h1></div>"+ 
                            "<div>Used as a code in Payroll to ensure supplementals are paid correctly. Add additional codes to handle any new supplementals based on staff certification, gender (if applicable) and location.</div><br>"+
                            "<div><h3 style='text-align:left;'>Picklist Modifications: </h3>"+
                                "<ul>"+
                                    "<li><b><font color='green'>Add:</font></b> Opens an empty form window geared specifically for the current picklist. This creates an all new record and saves it to the database.</li>"+
                                    "<li><b><font color='blue'>Edit:</font></b> Opens and fills a form window for the current picklist grid selection. This modifies the specific record and saves it to the database.</li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>";
            break;
        case 'fy' :
            infoHTML = "<div><div><h1>Fiscal Year Picklist:</h1></div>"+ 
                            "<div>Displays all historical fiscal years and is used to determine when supplementals tooks place. Automatically attaches the current fiscal year to seasons which propogate into stipends and supplementals. </div><br><div>The <b><font color='red'>NEW YEAR ROLLOVER</font></b> process can be ran by an admin, in which they select a future year in the fiscal year picklist. This clones seasons and stipends for the new year based on the existing entries.</div><br>"+
                            "<div><h3 style='text-align:left;'>Picklist Modifications: </h3>"+
                                "<ul>"+
                                    "<li><b><font color='green'>Add:</font></b> Opens an empty form window geared specifically for the current picklist. This creates an all new record and saves it to the database.</li>"+
                                    "<li><b><font color='blue'>Edit:</font></b> Opens and fills a form window for the current picklist grid selection. This modifies the specific record and saves it to the database.</li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>";
            break;
        case 'loc' :
            infoHTML = "<div><div><h1>Locations Picklist:</h1></div>"+ 
                            "<div>Every pay location established in the district where a supplemental may be assigned for. This includes any out of district locations as well. Only Grade EMH options M and H are shown as an option in supplementals module.<br><font color='red'>* May be changed to account for Other supplementals other than athletic ones.</font></div><br>"+
                            "<div><h3 style='text-align:left;'>Picklist Modifications: </h3>"+
                                "<ul>"+
                                    "<li><b><font color='green'>Add:</font></b> Opens an empty form window geared specifically for the current picklist. This creates an all new record and saves it to the database.</li>"+
                                    "<li><b><font color='blue'>Edit:</font></b> Opens and fills a form window for the current picklist grid selection. This modifies the specific record and saves it to the database.</li>"+
                                    "<li><b><font color='red'>Disable:</font></b> Confirms and sets the current picklist grid selection as inactive. This will have subsequent effects by omitting results within specific combo boxes or 'drop-downs' in the application.</li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>";
            break;
        case 'prg' :
            infoHTML = "<div><div><h1>Program Picklist:</h1></div>"+ 
                            "<div>Defines the different athletics or activities used in creating stipends. Job description gives the option to better define the requirements for each program.</div><br>"+
                            "<div><h3 style='text-align:left;'>Picklist Modifications: </h3>"+
                                "<ul>"+
                                    "<li><b><font color='green'>Add:</font></b> Opens an empty form window geared specifically for the current picklist. This creates an all new record and saves it to the database.</li>"+
                                    "<li><b><font color='blue'>Edit:</font></b> Opens and fills a form window for the current picklist grid selection. This modifies the specific record and saves it to the database.</li>"+
                                    "<li><b><font color='red'>Disable:</font></b> Confirms and sets the current picklist grid selection as inactive. This will have subsequent effects by omitting results within specific combo boxes or 'drop-downs' in the application.</li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>";
            break;
        case 'szn' :
            infoHTML = "<div><div><h1>Season Picklist:</h1></div>"+ 
                            "<div>All current year seasons including their start/end dates that may be applied to stipends. These also help define the differences between possible cloned stipends from year to year.</div><br>"+
                            "<div><h3 style='text-align:left;'>Picklist Modifications: </h3>"+
                                "<ul>"+
                                    "<li><b><font color='green'>Add:</font></b> Opens an empty form window geared specifically for the current picklist. This creates an all new record and saves it to the database.</li>"+
                                    "<li><b><font color='blue'>Edit:</font></b> Opens and fills a form window for the current picklist grid selection. This modifies the specific record and saves it to the database.</li>"+
                                    "<li><b><font color='red'>Disable:</font></b> Confirms and sets the current picklist grid selection as inactive. This will have subsequent effects by omitting results within specific combo boxes or 'drop-downs' in the application.</li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>";
            break;
        case 'stp' :
            infoHTML = "<div><div><h1>Stipend Picklist:</h1></div>"+ 
                            "<div>Stipends are the contracts(?) created from programs, seasons, grades, and positions that are assigned to staff members. Stipends are copied during the <b><font color='red'>NEW YEAR ROLLOVER</font></b> process to ensure historic data of prior Step values.</div><br>"+
                            "<div><h3 style='text-align:left;'>Picklist Modifications: </h3>"+
                                "<ul>"+
                                    "<li><b><font color='green'>Add:</font></b> Opens an empty form window geared specifically for the current picklist. This creates an all new record and saves it to the database.</li>"+
                                    "<li><b><font color='blue'>Edit:</font></b> Opens and fills a form window for the current picklist grid selection. This modifies the specific record and saves it to the database.</li>"+
                                    "<li><b><font color='red'>Disable:</font></b> Confirms and sets the current picklist grid selection as inactive. This will have subsequent effects by omitting results within specific combo boxes or 'drop-downs' in the application.</li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>";
            break;
        default:
            infoHTML = "<div><div><h1>Lookup Value Picklists:</h1></div>"+ 
                            "<div>Lookup values are code to description items that can be created and updated. The items are grouped by subjects and allows for quick updates to system values.</div><br>"+
                            "<div><h3 style='text-align:left;'>Picklist Modifications: </h3>"+
                                "<ul>"+
                                    "<li><b><font color='green'>Add:</font></b> Opens an empty form window geared specifically for the current picklist. This creates an all new record and saves it to the database.</li>"+
                                    "<li><b><font color='blue'>Edit:</font></b> Opens and fills a form window for the current picklist grid selection. This modifies the specific record and saves it to the database.</li>"+
                                    "<li><b><font color='red'>Disable:</font></b> Confirms and sets the current picklist grid selection as inactive. This will have subsequent effects by omitting results within specific combo boxes or 'drop-downs' in the application.</li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>";
            break;
    }

    InfoIt(infoHTML);

}

// --------------------------------------------------------------------------------------------
// Other Functions
// --------------------------------------------------------------------------------------------

PCK.func.loadPicklistWindow = function(contentCell, type) {
    let plType = ( sidebarMap.has(PCK.vessel.sbSelect) ) ? sidebarMap.get(PCK.vessel.sbSelect).type : null;
    let plForm = null;
    PCK.layout.plLayout.progressShow();

    switch(plType) {
        case 'ac' :
            plForm = PCK.func.getACConfig(type);
            break;
        case 'fy' :
            plForm = PCK.func.getFYConfig(type);
            break;
        case 'loc' :
            plForm = PCK.func.getLOCConfig(type);
            break;
        case 'prg' :
            plForm = PCK.func.getPRGConfig(type);
            break;
        case 'szn' :
            plForm = PCK.func.getSZNConfig(type);
            break;
        case 'stp' :
            plForm = PCK.func.getSTPConfig(type);
            break;
        default:
            plForm = PCK.func.getLookupConfig(type);
            break;
    }

    contentCell.attach(plForm);
    PCK.vessel.tbSelect = type;
    PCK.layout.plLayout.progressHide()
}

PCK.func.savePicklistAdd = function(form) {
    form.send("./mPicklists/php/addPicklist.php","POST").then(
        function(data) {
            MessageIt('New Picklist item has been created!', 'warning');
            PCK.vessel.rowSelect = null;
            PCK.func.getPicklistGrid(PCK.vessel.sbSelect);
        }
    );
}

PCK.func.savePicklistEdit = function(form) {
    form.send("./mPicklists/php/editPicklist.php","POST").then(
        function(data) {
            MessageIt('Picklist item updated: ' + PCK.vessel.rowSelect, 'warning');
            PCK.vessel.rowSelect = null;
            PCK.func.getPicklistGrid(PCK.vessel.sbSelect);
        }
    );
}

PCK.func.disablePicklistItem = function() {
    dhx.ajax.post("./mPicklists/php/disablePicklist.php", {GUID:PCK.vessel.rowSelect, TYPE:sidebarMap.get(PCK.vessel.sbSelect).type}).then(
        function(data) {
            MessageIt('Picklist item disabled: ' + PCK.vessel.rowSelect, 'warning');
            PCK.vessel.rowSelect = null;
            PCK.func.getPicklistGrid(PCK.vessel.sbSelect);
        }
    );
}

// --------------------------------------------------------------------------------------------
// Picklist Configurations
// --------------------------------------------------------------------------------------------

PCK.func.getACConfig = function(type) {
    let typeText = ((type == 'add') ? 'Adding' : 'Editing' );

    const config = {
        padding: 30,
        align: "evenly",
        title: typeText + " > Account Code",
        css: "picklist-window",
        cols:[
            {
                padding: 5,
                rows:[
                    {
                        type: "input",
                        label: "Subset",
                        labelPosition: "left",
                        labelWidth: 150,
                        width: 470,
                        padding: 3,
                        readOnly: false,
                        required: true,
                        validation: function(value) {
                            return value && value.length < 26;
                        },
                        errorMessage: "Max length of 25 characters.",
                        name: "SUBSET", id: "SUBSET",
                    },{
                        type: "combo",
                        label: "Gender",
                        labelPosition: "left",
                        labelWidth: 150,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        name: "GENDER", id: "GENDER",
                    },{
                        type: "input",
                        label: "Subset Value",
                        labelPosition: "left",
                        labelWidth: 150,
                        width: 470,
                        padding: 3,
                        readOnly: false,
                        required: true,
                        validation: function(value) {
                            return value && value.length < 26;
                        },
                        errorMessage: "Max length of 25 characters.",
                        name: "SUBSET_VALUE", id: "SUBSET_VALUE",
                    },{
                        type: "checkbox",
                        label: "Certificated?",
                        labelPosition: "left",
                        labelWidth: 150,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        name: "CERTIFICATED_CODE", id: "CERTIFICATED_CODE",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "GUID", id: "GUID",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "TYPE", id: "TYPE",
                    }
                ]
            }
        ]
    }

    const plForm = new dhx.Form(null, config);
    const genderCombo = plForm.getItem('GENDER').getWidget();

    plForm.getItem('GUID').setValue(PCK.vessel.rowSelect);
    plForm.getItem('TYPE').setValue(sidebarMap.get(PCK.vessel.sbSelect).type);
    
    genderCombo.data.load("./includes/php/getComboLookup.php?id=GENDER").then(function() {
        if ( type == 'edit' ) {
            const item = PCK.grid.plGrid.selection.getCell(PCK.vessel.rowSelect);        
            if ( item ) {
                plForm.setValue(item.row); // Set non-combo fields
                genderCombo.setValue(item.row.GENDER_VALUE_CODE);
            }
        }
    });

    return plForm;
}

PCK.func.getFYConfig = function(type) {
    let typeText = ((type == 'add') ? 'Adding' : 'Editing' );

    const config = {
        padding: 30,
        align: "evenly",
        title: typeText + " > Fiscal Year",
        css: "picklist-window",
        cols:[
            {
                padding: 5,
                rows:[
                    {
                        type: "input",
                        label: "Year Range",
                        labelPosition: "left",
                        labelWidth: 150,
                        padding: 3,
                        readOnly: false,
                        required: true,
                        validation: function(value) {
                            return value && value.length < 11;
                        },
                        helpMessage: "Format: yyyy-yy",
                        errorMessage: "Format: yyyy-yy and limit of 10 characters.",
                        name: "YEAR_RANGE", id: "YEAR_RANGE",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "GUID", id: "GUID",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "TYPE", id: "TYPE",
                    }
                ]
            }
        ]
    };

    const plForm = new dhx.Form(null, config);

    plForm.getItem('GUID').setValue(PCK.vessel.rowSelect);
    plForm.getItem('TYPE').setValue(sidebarMap.get(PCK.vessel.sbSelect).type);

    if ( type == 'edit' ) {
        const item = PCK.grid.plGrid.selection.getCell(PCK.vessel.rowSelect);        
        if ( item ) {
            plForm.setValue(item.row); // Set non-combo fields
        }
    }    

    return plForm;
}

PCK.func.getLOCConfig = function(type) {
    let typeText = ((type == 'add') ? 'Adding' : 'Editing' );

    const config = {
        padding: 30,
        align: "evenly",
        title: typeText + " > Location",
        css: "picklist-window",
        cols:[
            {
                padding: 5,
                cols: [
                    {
                        rows:[
                            {
                                type: "input",
                                label: "Location Code",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 400,
                                padding: 3,
                                readOnly: false,
                                required: true,
                                validation: function(value) {
                                    return value && value.length < 6;
                                },
                                errorMessage: "Must be an alphanumeric value up to 5 characters long.",
                                name: "LOCATION_CODE", id: "LOCATION_CODE",
                            },{
                                type: "input",
                                label: "Location Name",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 400,
                                padding: 3,
                                readOnly: false,
                                required: true,
                                validation: function(value) {
                                    return value && value.length < 51;
                                },
                                errorMessage: "Name length must be under 50 characters long.",
                                name: "LOCATION_NAME", id: "LOCATION_NAME",
                            },{
                                type: "input",
                                label: "State Code",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 400,
                                padding: 3,
                                required: false,
                                name: "STATE_CODE", id: "STATE_CODE"
                            },{
                                type: "input",
                                label: "Short Name",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 400,
                                padding: 3,
                                required: false,
                                name: "LOCATION_SHORT_NAME", id: "LOCATION_SHORT_NAME"
                            }
                        ]
                    },{
                        rows:[
                            {
                                type: "combo",
                                label: "EMH Code",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 400,
                                padding: 3,
                                readOnly: true,
                                required: true,
                                name: "GRADE_EMH", id: "GRADE_EMH",
                                data: [
                                    { value: "D", id: "D" },
                                    { value: "E", id: "E" },
                                    { value: "H", id: "H" },
                                    { value: "M", id: "M" },
                                    { value: "O", id: "O" }
                                ]
                            },{
                                type: "combo",
                                label: "EMH Description",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 400,
                                padding: 3,
                                readOnly: true,
                                required: true,
                                name: "GRADE_EMH_DESC", id: "GRADE_EMH_DESC",
                                data: [
                                    { value: "DISTRICT", id: "DISTRICT" },
                                    { value: "ELEMENTARY", id: "ELEMENTARY" },
                                    { value: "HIGH", id: "HIGH" },
                                    { value: "MIDDLE", id: "MIDDLE" },
                                    { value: "OTHER", id: "OTHER" }
                                ]
                            },{
                                type: "combo",
                                label: "EMH Sort",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 400,
                                padding: 3,
                                readOnly: true,
                                required: true,
                                name: "GRADE_EMH_SORT", id: "GRADE_EMH_SORT",
                                data: [
                                    { value: "1", id: "1" },
                                    { value: "2", id: "2" },
                                    { value: "3", id: "3" },
                                    { value: "4", id: "4" },
                                    { value: "5", id: "5" }
                                ]
                            },{
                                type: "input",
                                width: 50,
                                padding: 3,
                                readOnly: true,
                                hidden: true,
                                name: "GUID", id: "GUID",
                            },{
                                type: "input",
                                width: 50,
                                padding: 3,
                                readOnly: true,
                                hidden: true,
                                name: "TYPE", id: "TYPE",
                            }
                        ]
                    }
                ]
            }
        ]
    };

    const plForm = new dhx.Form(null, config);
    const emhCombo = plForm.getItem('GRADE_EMH').getWidget();
    const descCombo = plForm.getItem('GRADE_EMH_DESC').getWidget();
    const sortCombo = plForm.getItem('GRADE_EMH_SORT').getWidget();

    plForm.getItem('GUID').setValue(PCK.vessel.rowSelect);
    plForm.getItem('TYPE').setValue(sidebarMap.get(PCK.vessel.sbSelect).type);

    if ( type == 'edit' ) {
        const item = PCK.grid.plGrid.selection.getCell(PCK.vessel.rowSelect);        
        if ( item ) {
            plForm.setValue(item.row); // Set non-combo fields
            emhCombo.setValue(item.row.GRADE_EMH);
            descCombo.setValue(item.row.GRADE_EMH_DESC);
            sortCombo.setValue(item.row.GRADE_EMH_SORT);
        }
    }  

    return plForm;
}

PCK.func.getPRGConfig = function(type) {
    let typeText = ((type == 'add') ? 'Adding' : 'Editing' );

    const config = {
        padding: 30,
        align: "evenly",
        title: typeText + " > Program",
        css: "picklist-window",
        cols:[
            {
                padding: 5,
                rows:[
                    {
                        type: "input",
                        label: "Program Description",
                        labelPosition: "left",
                        labelWidth: 200,
                        width: 500,
                        padding: 3,
                        readOnly: false,
                        required: true,
                        validation: function(value) {
                            return value && value.length < 51;
                        },
                        errorMessage: "Must be under 50 characters long.",
                        name: "DESCRIPTION", id: "DESCRIPTION",
                    },{
                        type: "input",
                        label: "Job Description",
                        labelPosition: "left",
                        labelWidth: 200,
                        width: 500,
                        padding: 3,
                        readOnly: false,
                        required: false,
                        name: "JOB_DESCRIPTION", id: "JOB_DESCRIPTION",
                    },{
                        type: "checkbox",
                        label: "Is this an Activity Program?",
                        labelPosition: "left",
                        labelWidth: 200,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        name: "IS_ACTIVITY", id: "IS_ACTIVITY",
                    },{
                        type: "checkbox",
                        label: "Is this a Sport Program?",
                        labelPosition: "left",
                        labelWidth: 200,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        name: "IS_SPORT", id: "IS_SPORT",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "GUID", id: "GUID",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "TYPE", id: "TYPE",
                    }
                ]
            }
        ]
    };
    
    const plForm = new dhx.Form(null, config);

    plForm.getItem('GUID').setValue(PCK.vessel.rowSelect);
    plForm.getItem('TYPE').setValue(sidebarMap.get(PCK.vessel.sbSelect).type);

    if ( type == 'edit' ) {
        const item = PCK.grid.plGrid.selection.getCell(PCK.vessel.rowSelect);        
        if ( item ) {
            plForm.setValue(item.row); // Set non-combo fields
        }
    }  

    return plForm;
}

PCK.func.getSZNConfig = function(type) {
    let typeText = ((type == 'add') ? 'Adding' : 'Editing' );

    const config = {
        padding: 30,
        align: "evenly",
        title: typeText + " > Season",
        css: "picklist-window",
        cols:[
            {
                padding: 5,
                rows:[
                    {
                        type: "input",
                        label: "Season Description",
                        labelPosition: "left",
                        labelWidth: 150,
                        width: 470,
                        padding: 3,
                        readOnly: false,
                        required: true,
                        validation: function(value) {
                            return value && value.length < 101;
                        },
                        errorMessage: "Description length must be under 100 characters long.",
                        name: "DESCRIPTION", id: "DESCRIPTION"
                    },{
                        type: "datepicker",
                        label: "Start Date",
                        dateFormat: "%n/%j/%Y",
                        labelPosition: "left",
                        labelWidth: 150,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        required: true,
                        name: "START_DATE", id: "START_DATE"
                    },{
                        type: "datepicker",
                        label: "End Date",
                        dateFormat: "%n/%j/%Y",
                        labelPosition: "left",
                        labelWidth: 150,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        required: true,
                        name: "END_DATE", id: "END_DATE"
                    },{
                        type: "input",
                        label: "Sort",
                        labelPosition: "left",
                        labelWidth: 150,
                        width: 400,
                        padding: 3,
                        readOnly: false,
                        required: true,
                        validation: function(value) {
                            return value && value.length < 26;
                        },
                        errorMessage: "Must be an alphanumeric value under 25 characters long.",
                        name: "SORT", id: "SORT",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "GUID", id: "GUID",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "TYPE", id: "TYPE",
                    }
                ]
            }
        ]
    };

    const plForm = new dhx.Form(null, config);
    var strDatepicker = plForm.getItem("START_DATE").getWidget();  
    var stpDatepicker = plForm.getItem("END_DATE").getWidget();  
    strDatepicker.link(stpDatepicker);

    plForm.getItem('GUID').setValue(PCK.vessel.rowSelect);
    plForm.getItem('TYPE').setValue(sidebarMap.get(PCK.vessel.sbSelect).type);

    if ( type == 'edit' ) {
        const item = PCK.grid.plGrid.selection.getCell(PCK.vessel.rowSelect);      
        if ( item ) {
            plForm.setValue(item.row); // Set non-combo fields
        }
    }  

    return plForm;
}

PCK.func.getSTPConfig = function(type) {
    let typeText = ((type == 'add') ? 'Adding' : 'Editing' );

    const config = {
        padding: 30,
        align: "evenly",
        title: typeText + " > Stipend",
        css: "picklist-window",
        cols:[
            {
                padding: 5,
                cols: [
                    {
                        rows:[
                            {
                                type: "input",
                                label: "Stipend",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 470,
                                padding: 3,
                                readOnly: false,
                                required: true,
                                name: "STIPEND_DESCRIPTION", id: "STIPEND_DESCRIPTION"
                            },{
                                type: "combo",
                                label: "Program",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 470,
                                padding: 3,
                                readOnly: true,
                                required: true,
                                name: "PROGRAM_DESCRIPTION", id: "PROGRAM_DESCRIPTION"
                            },{
                                type: "combo",
                                label: "Stipend Position",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 470,
                                padding: 3,
                                readOnly: true,
                                name: "STIPEND_POSITION", id: "STIPEND_POSITION"
                            },{
                                type: "combo",
                                label: "Season",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 470,
                                padding: 3,
                                readOnly: true,
                                name: "SEASON_DESCRIPTION", id: "SEASON_DESCRIPTION"
                            },{
                                type: "combo",
                                label: "Stipend Grade",
                                labelPosition: "left",
                                labelWidth: 150,
                                width: 470,
                                padding: 3,
                                readOnly: true,
                                name: "STIPEND_GRADE", id: "STIPEND_GRADE"
                            }
                        ]
                    },{
                        rows:[
                            {
                                type: "input",
                                label: "Step A",
                                labelPosition: "left",
                                labelWidth: 100,
                                width: 300,
                                padding: 3,
                                readOnly: false,
                                required: true,
                                validation: "integer",
                                errorMessage: "Must be a valid integer",
                                name: "STEP_A", id: "STEP_A"
                            },{
                                type: "input",
                                label: "Step B",
                                labelPosition: "left",
                                labelWidth: 100,
                                width: 300,
                                padding: 3,
                                readOnly: false,
                                validation: "integer",
                                errorMessage: "Must be a valid integer",
                                name: "STEP_B", id: "STEP_B"
                            },{
                                type: "input",
                                label: "Step C",
                                labelPosition: "left",
                                labelWidth: 100,
                                width: 300,
                                padding: 3,
                                readOnly: false,
                                validation: "integer",
                                errorMessage: "Must be a valid integer",
                                name: "STEP_C", id: "STEP_C"
                            },{
                                type: "input",
                                label: "Step D",
                                labelPosition: "left",
                                labelWidth: 100,
                                width: 300,
                                padding: 3,
                                readOnly: false,
                                validation: "integer",
                                errorMessage: "Must be a valid integer",
                                name: "STEP_D", id: "STEP_D"
                            },{
                                type: "input",
                                label: "Step E",
                                labelPosition: "left",
                                labelWidth: 100,
                                width: 300,
                                padding: 3,
                                readOnly: false,
                                validation: "integer",
                                errorMessage: "Must be a valid integer",
                                name: "STEP_E", id: "STEP_E"
                            },{
                                type: "checkbox",
                                label: "Covid?",
                                labelPosition: "left",
                                labelWidth: 100,
                                width: 400,
                                padding: 3,
                                readOnly: true,
                                name: "COVID", id: "COVID"
                            },{
                                type: "input",
                                width: 50,
                                padding: 3,
                                readOnly: true,
                                hidden: true,
                                name: "GUID", id: "GUID",
                            },{
                                type: "input",
                                width: 50,
                                padding: 3,
                                readOnly: true,
                                hidden: true,
                                name: "TYPE", id: "TYPE",
                            }
                        ]
                    }
                ]
            }
        ]
    };

    const plForm = new dhx.Form(null, config);
    const programCombo = plForm.getItem('PROGRAM_DESCRIPTION').getWidget();
    const positionCombo = plForm.getItem('STIPEND_POSITION').getWidget();
    const seasonCombo = plForm.getItem('SEASON_DESCRIPTION').getWidget();
    const gradeCombo = plForm.getItem('STIPEND_GRADE').getWidget();

    plForm.getItem('GUID').setValue(PCK.vessel.rowSelect);
    plForm.getItem('TYPE').setValue(sidebarMap.get(PCK.vessel.sbSelect).type);

    programCombo.data.load("./includes/php/getComboProgram.php").then(function() {
        positionCombo.data.load("./includes/php/getComboLookup.php?id=POSITION").then(function() {
            seasonCombo.data.load("./includes/php/getComboSeasons.php").then(function() {
                gradeCombo.data.load("./includes/php/getComboLookup.php?id=GRADE").then(function() {
                    if ( type == 'edit' ) {
                        const item = PCK.grid.plGrid.selection.getCell(PCK.vessel.rowSelect);        
                        if ( item ) {        
                            plForm.setValue(item.row); // Set non-combo fields
                            programCombo.setValue(item.row.PROGRAM_GU);
                            positionCombo.setValue(item.row.STIPEND_POSITION_CODE);
                            seasonCombo.setValue(item.row.SEASON_GU);
                            gradeCombo.setValue(item.row.STIPEND_GRADE_CODE);
                        }
                    }
                });
            });
        });
    });

    return plForm;
}

PCK.func.getLookupConfig = function(type) {
    let lookupName = ( sidebarMap.has(PCK.vessel.sbSelect) ) ? sidebarMap.get(PCK.vessel.sbSelect).name : null;
    let typeText = ((type == 'add') ? 'Adding' : 'Editing' );

    const config = {
        padding: 30,
        align: "evenly",
        title: typeText + " > " + lookupName,
        css: "picklist-window",
        cols:[
            {
                padding: 5,
                rows:[
                    {
                        type: "combo",
                        label: "Lookup Definition Code",
                        labelPosition: "left",
                        labelWidth: 200,
                        width: 500,
                        padding: 3,
                        readOnly: true,
                        required: true,
                        helpMessage: "Should be set to current picklist",
                        name: "LOOKUP_DEF_CODE", id: "LOOKUP_DEF_CODE"
                    },{
                        type: "input",
                        label: "Value Code",
                        labelPosition: "left",
                        labelWidth: 200,
                        width: 500,
                        padding: 3,
                        readOnly: false,
                        required: true,
                        validation: function(value) {
                            return value && value.length < 6;
                        },
                        errorMessage: "Code length must be under 5 characters long.",
                        name: "VALUE_CODE", id: "VALUE_CODE"
                    },{
                        type: "input",
                        label: "Value Description",
                        labelPosition: "left",
                        labelWidth: 200,
                        width: 500,
                        padding: 3,
                        readOnly: false,
                        required: true,
                        validation: function(value) {
                            return value && value.length < 26;
                        },
                        errorMessage: "Description length must be under 25 characters long.",
                        name: "VALUE_DESCRIPTION", id: "VALUE_DESCRIPTION"
                    },{
                        type: "checkbox",
                        label: "Locked?",
                        labelPosition: "left",
                        labelWidth: 200,
                        width: 500,
                        padding: 3,
                        readOnly: true,
                        name: "LOCKED", id: "LOCKED"
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "GUID", id: "GUID",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "TYPE", id: "TYPE",
                    }
                ]
            }
        ]
    };

    const plForm = new dhx.Form(null, config);
    const lookupDefCombo = plForm.getItem('LOOKUP_DEF_CODE').getWidget();

    plForm.getItem('GUID').setValue(PCK.vessel.rowSelect);
    plForm.getItem('TYPE').setValue(sidebarMap.get(PCK.vessel.sbSelect).type);

    lookupDefCombo.data.load("./includes/php/getComboLookupDef.php").then(function() {
        if ( type == 'edit' ) {
            const item = PCK.grid.plGrid.selection.getCell(PCK.vessel.rowSelect);     
            if ( item ) {
                plForm.setValue(item.row);
                plForm.getItem('LOOKUP_DEF_CODE').disable(); // Disable changing the Code
                lookupDefCombo.setValue(item.row.LOOKUP_DEF_CODE);
            }
        } 
    });

    return plForm;
}

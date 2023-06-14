/*
 *
 *  securityRoles.js
 * 
 * ***************************************************************************************** */

const SEC = {
    win: 
    {
        secFormWindow : null,
        secInfoWindow : null,
    },
    layout: 
    {
        secLayout : null,
        secFormLayout: null,
    },
    toolbar: 
    {
        secToolbar : null,
    },
    grid: 
    {
        secGrid : null,
    },
    vessel: 
    {
        rowSelect : null, // Holds current Security grid selection
        tbSelect : null, // Holds current Security toolbar selection
    },
    scalars : 
    {
        toolbarCellID :
        {
            mainHeader : 'security_header',
            formMenu   : 'sec_form_menu_area',
        },
        contentCellID :
        {
            mainData : 'security_data',
            formData : 'sec_form_area',
        }
    }, 
    func : {},
};

function InitSecurityRoles(contentCell) {
    const securityLayoutConfig = {
        type: "none",
        rows: [
            {
                id: SEC.scalars.toolbarCellID.mainHeader,
                css: "dhx_layout-cell--bordered",
                height: "content"
            },{
                id: SEC.scalars.contentCellID.mainData,
                css: "dhx_layout-cell--bordered"

            }
        ]
    };

    SEC.layout.secLayout = new dhx.Layout(null, securityLayoutConfig);
    contentCell.attach(SEC.layout.secLayout);
    
    SEC.func.InitSecurityFormWindow();
    SEC.func.getSecurityToolbar();

}

SEC.func.InitSecurityFormWindow = function() {
    if(SEC.win.secFormWindow != null ) SEC.win.secFormWindow.destructor();

    if(SEC.layout.secFormLayout == null ) {
        const securityFormConfig = {
            type: "none",
            rows: [
                {
                    id: SEC.scalars.toolbarCellID.formMenu,
                    height: "content",
                },{
                    id: SEC.scalars.contentCellID.formData,
                }
            ]
        };
        SEC.layout.secFormLayout = new dhx.Layout(null, securityFormConfig)
    }

    SEC.win.secFormWindow = new dhx.Window(
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

    SEC.win.secFormWindow.footer.data.add({
        type: "spacer",
    });

    SEC.win.secFormWindow.footer.data.add({
        id: "cancel",
        value: "cancel",
        type: "button",
        view: "link",
        circle: true,
        size: "medium",
        color: "secondary",
    });

    SEC.win.secFormWindow.footer.data.add({
        id: "save",
        value: "save",
        type: "button",
        view: "flat",
        circle: true,
        size: "medium",
        color: "success",
    });

    SEC.win.secFormWindow.footer.events.on("click", function (id) {
        if ( id === "save" ) {
            const securityForm = SEC.layout.secFormLayout.getCell(SEC.scalars.contentCellID.formData).getWidget();
            if ( securityForm.validate() ) {
                dhx.confirm({
                    header: "<b>Save staff security role</b>",
                    text: "Are you sure you want to save changes to new or existing staff security role?<br></b>",
                    buttons: ["Cancel", "Save"],
                    buttonsAlignment: "center",
                    css: "security-popup",
                }).then(
                    function (i) { 
                        if (i) {
                            SEC.func.saveSecurityAdd(securityForm);
                            SEC.win.secFormWindow.hide();
                        }
                    }
                );
            }
        } else if ( id = "cancel" ) {
            SEC.win.secFormWindow.hide();
            getSecurityGrid();
        }
    });

    SEC.win.secFormWindow.attach(SEC.layout.secFormLayout);
}

SEC.func.getSecurityToolbar = function() {
    const toolbar = new dhx.Toolbar(null, {
        data: [
            {
                "id": "add",
                "icon": "fa-solid fa-circle-plus",
                "value": "Add",
                "type": "button",
                "tooltip": "Add new user security",
                "circle": true,
                "color": "success",
            },{
                type: "separator",
            },{
                "id": "delete",
                "icon": "fa-solid fa-circle-minus",
                "value": "Delete",
                "type": "button",
                "tooltip": "Delete selected user security role",
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
                "tooltip": "Refresh current User Security Roles",
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
    SEC.toolbar.secToolbar = SEC.layout.secLayout.getCell(SEC.scalars.toolbarCellID.mainHeader).attach(toolbar);

    SEC.toolbar.secToolbar.data.update("title", 
        { html: `<div id="data-title-header" class="security-toolbar-title">User Security Roles</div>` }
    );

    SEC.toolbar.secToolbar.events.on("click", function(id) {
        if (id == 'add') {
            SEC.vessel.rowSelect = null;
            SEC.func.openSecurityWindow();

        } else if (id == 'delete') {
            SEC.func.openSecurityDelete();

        } else if (id == 'refresh') {
            SEC.vessel.rowSelect = null;
            getSecurityGrid();

        } else if (id == 'info') {
            SEC.func.openSecurityInfo();
        }
    });
        
}

function getSecurityGrid() {
    SEC.toolbar.secToolbar.disable("delete");
    SEC.vessel.rowSelect = null;
    SEC.vessel.tbSelect = null;
    let url = "mAdmin/php/getUserSecurity.php";
    
    SEC.layout.secLayout.progressShow();
    dhx.ajax.get(url).then(
        json => {
            const grid = new dhx.Grid(null, {
                columns: json.columns,
                autoWidth: true,
                resizable: true,
                selection: "row",
                headerRowHeight: 60, 
                footerRowHeight: 60, 
                editable: false,
                data: json.data,
            });

            // Assign/overwrite grid globally
            SEC.layout.secLayout.progressHide();
            SEC.grid.secGrid = SEC.layout.secLayout.getCell(SEC.scalars.contentCellID.mainData).attach(grid);

            // Grid event handlers
            SEC.grid.secGrid.events.on("cellClick", function(row) {
                SEC.vessel.rowSelect = row.id;
                SEC.toolbar.secToolbar.enable("delete");
            });
        }
    )
}

// --------------------------------------------------------------------------------------------
// Open Functions
// --------------------------------------------------------------------------------------------

SEC.func.openSecurityWindow = function() {
    SEC.win.secFormWindow.show();
    const cell = SEC.layout.secFormLayout.getCell(SEC.scalars.contentCellID.formData);
    cell.detach();

    SEC.func.loadSecurityWindow(cell);
}

SEC.func.openSecurityDelete = function() {
    dhx.confirm({
        header: "<b>Delete Selected User Security Role</b>",
        text: "Please confirm that the intended security role is to be deleted: <b>" + SEC.vessel.rowSelect + "</b>",
        buttons: ["Cancel", "Delete"],
        buttonsAlignment: "center",
        css: "security-popup",
    }).then(
        function (i) { 
            if (i) {
                SEC.func.deleteSecurity();
            }
        }
    );
}

SEC.func.openSecurityInfo = function() {
    if( SEC.win.secInfoWindow != null ) SEC.win.secInfoWindow.destructor();
    let infoHTML = 
        "<div><div style='text-align:center;'><h1>User Security Roles</h1><h3>Manage staff security roles within the application.</h3></div>" + 
            "<div>"+ 
                "<ul>"+
                    "<li><b>Add</b> a security role for a specific staff member, limiting or increasing access within the application.</li>"+
                    "<li><b>Delete</b> an existing staff security role, removing specific access within the application.</li><br><br>"+
                    "<li><b><font color='red'>List All Supplementals:</font></b><br>(Category = 'all') AND (role exists)</li>"+
                    "<li><b><font color='blue'>List Other Supplements:</font></b><br>(Category = 'other' OR 'all') AND (role exists)</li>"+
                    "<li><b><font color='green'>List Athletic Supplements:</font></b><br>(Category = 'athletic' OR 'all') AND (role exists)</li>"+
                    "<li><b><font color='purple'>Add New Athletic Supplemental:</font></b><br>(Category = 'athletic') AND (role exists)</li>"+
                "</ul>"+
            "</div>"+
        "</div>";

    InfoIt(infoHTML);

}

// --------------------------------------------------------------------------------------------
// Other Functions
// --------------------------------------------------------------------------------------------

SEC.func.loadSecurityWindow = function(contentCell) {
    contentCell.attach(SEC.func.getSecurityConfig());
}

SEC.func.saveSecurityAdd = function(form) {
    form.send("./mAdmin/php/addSecurity.php","POST").then(
        function(data) {
            MessageIt('New security role has been created!', 'warning');
            SEC.vessel.rowSelect = null;
            getSecurityGrid();
        }
    );
}

SEC.func.deleteSecurity = function() {
    dhx.ajax.post("./mAdmin/php/deleteSecurity.php", {ID:SEC.vessel.rowSelect}).then(
        function(data) {
            MessageIt('Security role deleted: ' + SEC.vessel.rowSelect, 'warning');
            SEC.vessel.rowSelect = null;
            getSecurityGrid();
        }
    );
}

// --------------------------------------------------------------------------------------------
// Configurations
// --------------------------------------------------------------------------------------------

SEC.func.getSecurityConfig = function() {
    const config = {
        padding: 30,
        align: "evenly",
        title: "Adding > User Security Role",
        css: "security-window",
        cols:[
            {
                padding: 5,
                rows:[
                    {
                        type: "combo",
                        label: "Staff",
                        labelPosition: "left",
                        labelWidth: 175,
                        width: 470,
                        padding: 3,
                        readOnly: false,
                        required: true,
                        name: "NAME", id: "NAME",
                    },{
                        type: "combo",
                        label: "User Security Role",
                        labelPosition: "left",
                        labelWidth: 175,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        required: true,
                        name: "ROLE_CODE", id: "ROLE_CODE",
                    },{
                        type: "checkbox",
                        label: "All Security Category",
                        labelPosition: "left",
                        labelWidth: 175,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        name: "CATEGORY_ALL", id: "CATEGORY_ALL",
                    },{
                        type: "checkbox",
                        label: "Athletic Security Category",
                        labelPosition: "left",
                        labelWidth: 175,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        name: "CATEGORY_ATH", id: "CATEGORY_ATH",
                    },{
                        type: "checkbox",
                        label: "Other Security Category",
                        labelPosition: "left",
                        labelWidth: 175,
                        width: 470,
                        padding: 3,
                        readOnly: true,
                        name: "CATEGORY_OTH", id: "CATEGORY_OTH",
                    },{
                        type: "input",
                        width: 50,
                        padding: 3,
                        readOnly: true,
                        hidden: true,
                        name: "BADGE_NUM", id: "BADGE_NUM",
                    }
                ]
            }
        ]
    }
    const secForm = new dhx.Form(null, config);
    const staffCombo = secForm.getItem('NAME').getWidget();
    const roleCombo = secForm.getItem('ROLE_CODE').getWidget();

    SEC.layout.secFormLayout.progressShow();

    staffCombo.data.load("./includes/php/getComboStaff.php").then(function() {
        roleCombo.data.load("./includes/php/getComboSecurityLookup.php?id=ROLES").then(function() {
            SEC.layout.secFormLayout.progressHide();
        });
    });


    return secForm;
}
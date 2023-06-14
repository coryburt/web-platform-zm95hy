// ----------------------------------------------------------------------
//  analytics.js
//  Part of the mAnalytics module
// ----------------------------------------------------------------------

function InitAnalytics(contentCell) {
    const bogusGraphConfig = {
        size: 15,
        css: "dhx_widget--bg_white dhx_widget--bordered",
        scales: {
            "bottom": {
                text: "month"
            },
            "left": {
                max: 100,
                min: 0,
                maxTicks: 10
            }
        },
        series: [
            {
                id: "A",
                type: "line",
                value: "Secondary Athletic",
                color: "red",
                fill: "#FDBBBB",
            },
            {
                id: "B",
                type: "spline",
                value: "Secondary Miscellaneous",
                color: "blue",
                fill: "lightblue",
            },
            {
                id: "C",
                type: "area",
                value: "Elementary",
                fill: "lightgreen",
                color: "green"
            }
        ],
        legend: {
            series: ["A", "B", "C"],
            form: "circle",
            valign: "top",
            halign: "right"
        }
    };

    const bogusStipendData = [
        { month: "02", "Secondary Athletic": 20, "Secondary Miscellaneous": 52, "Elementary": 72, "Secret Stipends": 34 },
        { month: "03", "Secondary Athletic": 5, "Secondary Miscellaneous": 33, "Elementary": 90, "Secret Stipends": 55 },
        { month: "04", "Secondary Athletic": 55, "Secondary Miscellaneous": 30, "Elementary": 81, "Secret Stipends": 66 },
        { month: "05", "Secondary Athletic": 30, "Secondary Miscellaneous": 11, "Elementary": 62, "Secret Stipends": 22 },
        { month: "06", "Secondary Athletic": 27, "Secondary Miscellaneous": 14, "Elementary": 68, "Secret Stipends": 70 },
        { month: "07", "Secondary Athletic": 32, "Secondary Miscellaneous": 31, "Elementary": 64, "Secret Stipends": 50 },
        { month: "08", "Secondary Athletic": 50, "Secondary Miscellaneous": 22, "Elementary": 30, "Secret Stipends": 80 },
        { month: "09", "Secondary Athletic": 12, "Secondary Miscellaneous": 19, "Elementary": 65, "Secret Stipends": 48 },
        { month: "10", "Secondary Athletic": 10, "Secondary Miscellaneous": 24, "Elementary": 50, "Secret Stipends": 66 },
        { month: "11", "Secondary Athletic": 17, "Secondary Miscellaneous": 40, "Elementary": 78, "Secret Stipends": 55 }
    ];

    const layout = new dhx.Layout(null, {
        type: "none",
        rows: [
            {
                id : "analytics_widget_area",
                height: 86,
                css: "analytic-content"
            },{
                id : "analytics_content_area",
            }
        ]
    });

    let bogusChart = new dhx.Chart(null, bogusGraphConfig);
    bogusChart.data.parse(bogusStipendData);

    const html = `<div> <iframe src="./mAnalytics/php/weather.php" style="border:none;width:100%;" title="Iframe Example"></iframe> </div>`;
    
    layout.getCell("analytics_widget_area").attachHTML(html);
    layout.getCell("analytics_content_area").attach(bogusChart);

    contentCell.attach(layout);
}
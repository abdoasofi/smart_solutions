// Copyright (c) 2025, Asofi and contributors
// For license information, please see license.txt

frappe.query_reports["Drivers and Authorized Vehicles"] = {
    tree: true,
    name_field: "driver_or_vehicle",
    parent_field: "parent",
    initial_depth: 2,

    formatter: function(value, row, column, data, default_formatter) {
        let v = default_formatter(value, row, column, data);

        const hasValue = v && v !== "null" && v !== "undefined" && v.trim() !== "";
        if (!hasValue) return "";

        if (data.is_group && column.fieldname === "driver_or_vehicle") {
            const iconClass = data.expanded ? "expanded" : "collapsed";
            const toggle = `<span class="tree-toggle ${iconClass}">▶</span>`;
            v = toggle + " " + v;
        }

        if (data.is_group) {
            v = `<span style="background: #5cb85c; color: white; padding: 3px 6px; border-radius: 3px;">${v}</span>`;
        } else if (data.indent) {
            v = `<span style="background: #d9edf7; color: #000; padding: 3px 6px; border-radius: 3px;">${v}</span>`;
        }

        return v;
    },

    filters: [
        {
            fieldname: "driver",
            label: __("Driver"),
            fieldtype: "Link",
            options: "Driver",
        },
    ]
};

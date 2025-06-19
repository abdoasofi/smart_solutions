# Copyright (c) 2025, Asofi and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
    columns = [
        {"fieldname": "driver", "label": "Name", "fieldtype": "Data", "width": 300},
        {"fieldname": "vehicle", "label": "Vehicle", "fieldtype": "Data", "width": 300},
        {"fieldname": "make", "label": "Make", "fieldtype": "Data", "width": 200},
        {"fieldname": "model", "label": "Model", "fieldtype": "Data", "width": 300},
    ]
    data = []

    drivers = frappe.get_all("Driver", fields=["name"])
    for d in drivers:
        data.append({
            "driver": d.name,
            "parent": None,
            "is_group": True,
            "indent": 0
        })
        rows = frappe.get_all("Authorized Vehicle", filters={"parent": d.name}, fields=["vehicle","model","make"])
        for r in rows:
            v = frappe.get_doc("Vehicle", r.vehicle)
            data.append({
                "vehicle": v.get('license_plate') or v.name,
                "model": v.get('model'),
                "make": v.get('make'),
                "parent": d.name,
                "is_group": False,
                "indent": 1
            })

    return columns, data


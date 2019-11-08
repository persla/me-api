const db = require("../db/database.js");

const reports = {

    getReports: function(res) {
        db.all("SELECT * FROM reports",
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.json( { data: rows } );
        });
    },

    // getReport: function(res, reportId) {
    //     db.get("SELECT * FROM reports" +
    //         " WHERE reportId = ?",
    //     reportId, (err, report) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 errors: {
    //                     status: 500,
    //                     source: "/report/" + reportId,
    //                     title: "Database error",
    //                     detail: err.message
    //                 }
    //             });
    //         }
    //         return res.json( { data: report } );
    //         });
    //     },

    addReport: function(res, body) {
        db.run("INSERT INTO reports (name, description, texten) VALUES (?, ?, ?)",
        body.name,
        body.description,
        body.texten,
        function(err) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "POST /reports",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.json({

                data: {
                    type: "success",
                    message: "Your report has been added",
                    week: body.name,
                    description: body.description,
                    texten: body.texten,
                }
            });
        });
    },

    updateReport: function(res, body) {
        // console.log(body);
        if (Number.isInteger(parseInt(body.id))) {
            // console.log(body);
            db.run("UPDATE reports SET name = ?, description = ?, texten = ? WHERE id = ?",
            body.name,
            body.description,
            body.texten,
            body.id, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "PUT /reports",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                return res.json({

                    data: {
                        type: "success",
                        message: "Your report has been revidated",
                        week: body.name,
                        description: body.description,
                        texten: body.texten,
                    }
                });
                // return res.json( { data: report } );
                // return res.status(204).send();
            });
        } else {
            return res.status(400).json({
                errors: {
                    status: 400,
                    detail: "Required attribute reports id (id) " +
                        " was not included in the request."
                }
            });
        }
    },

};

module.exports = reports;

const db = require("../db/database.js");

const reports = {
    
    getReports: function(res) {
        db.all("SELECT * FROM reports",
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/invoices",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.json( { data: rows } );
        });
    },


    addReport: function(res, body) {
        db.run("INSERT INTO reports (name, description, texten) VALUES (?, ?, ?)",
        body.name,
        body.texten,
        body.description,
        function(err) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "POST /order",
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

    updateOrder: function(res, body) {
        if (Number.isInteger(parseInt(body.id))) {
            db.run("UPDATE reports SET customerName = ?," +
                " customerAddress = ?, customerZip = ?," +
                " customerCity = ?, customerCountry = ?, statusId = ?" +
                " WHERE apiKey = ? AND ROWID = ?",
            body.name,
            body.address,
            body.zip,
            body.city,
            body.country,
            body.status_id || 100,
            body.api_key,
            body.id, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "PUT /order",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.status(204).send();
            });
        } else {
            return res.status(400).json({
                errors: {
                    status: 400,
                    detail: "Required attribute order id (id) " +
                        " was not included in the request."
                }
            });
        }
    },

    deleteOrder: function(res, body) {
        if (Number.isInteger(parseInt(body.id))) {
            db.run("DELETE FROM reports WHERE apiKey = ? AND ROWID = ?",
                body.api_key,
                body.id, (err) => {
                    if (err) {
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                source: "DELETE /order",
                                title: "Database error",
                                detail: err.message
                            }
                        });
                    }

                    db.run("DELETE FROM order_items WHERE apiKey = ? AND orderId = ?",
                        body.api_key,
                        body.id, (err) => {
                            if (err) {
                                return res.status(500).json({
                                    errors: {
                                        status: 500,
                                        source: "DELETE /order order_items",
                                        title: "Database error",
                                        detail: err.message
                                    }
                                });
                            }

                            return res.status(204).send();
                        });
                });
        } else {
            return res.status(400).json({
                errors: {
                    status: 400,
                    detail: "Required attribute order id (id) " +
                        " was not included in the request."
                }
            });
        }
    }
};

module.exports = reports;

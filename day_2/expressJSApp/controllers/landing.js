// Sends user to landing page
exports.get_landing = function (req, res, next) {
    res.render('landing', { title: 'Express' });
}

// Recieves email request and prints it to console
exports.submit_lead = function (req, res, next) {
    console.log("lead email: ", req.body.lead_email);
    res.redirect('/');
}
const notFound = (req, res) => {
    // res.status(404).send("Page Not Found")
    res.status(404).render('page_not_found.pug', {})
}

module.exports = notFound;
module.exports = {
    queryAll:"select * from keyvalues",
    queryType:"SELECT * FROM keyvalues WHERE type = ?",
    addKeyValue:"INSERT INTO keyvalues SET ?"
}
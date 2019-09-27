module.exports = {
    queryAll:"select * from keyvalues",
    queryType:"SELECT * FROM keyvalues WHERE type = ?",
    queryKeyValue:"SELECT * FROM keyvalues WHERE type = ? and value = ?",
    addKeyValue:"INSERT INTO keyvalues SET ?"
}
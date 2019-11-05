module.exports = {
    addAddress:'INSERT INTO address (uid,linkman,phone,pca,detail,isdefault) VALUES (?,?,?,?,?,?)',
    queryAddress:'SELECT * FROM address WHERE uid = ?'
}
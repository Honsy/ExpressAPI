module.exports = {
    insertSql:'INSERT INTO shopcart (uid,productid,num,status) VALUES (?,?,?,?)',
    queryShopcartWithUidAndProduct:'SELECT * FROM shopcart WHERE uid = ? and productid = ?',
    updateShopcartNum:'UPDATE shopcart SET num = ? WHERE uid = ?',
    queryShopcartWithUid:'SELECT * FROM shopcart LEFT JOIN product on shopcart.productid = product.id WHERE uid = ?'
}
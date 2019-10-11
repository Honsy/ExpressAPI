module.exports = {
    queryAll:"select * from product order by createtime desc limit ?,?",
    addProduct:"INSERT INTO product SET ?",
    updateProduct:"UPDATE product SET ? WHERE id = ?",
    deleteProduct:'DELETE FROM product WHERE id = ?',
    removeProduct:'UPDATE product SET status = 1 WHERE id = ?'
}
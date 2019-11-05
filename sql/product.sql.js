module.exports = {
    queryAll:"SELECT * FROM product ORDER BY createtime desc limit ?,?",
    queryOne:"SELECT * FROM product WHERE id = ?",
    addProduct:"INSERT INTO product SET ?",
    updateProduct:"UPDATE product SET ? WHERE id = ?",
    deleteProduct:'DELETE FROM product WHERE id = ?',
    removeProduct:'UPDATE product SET status = 1 WHERE id = ?'
}
module.exports = {
    selectcount:function(tablename) {
        return  'SELECT COUNT(*) FROM '+ tablename
    }
}
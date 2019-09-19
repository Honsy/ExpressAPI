var user = {
    insert:'insert into user(username,password) VALUES(?,?)',
    query:'',
    queryUser:'select * from user where username = ?'
}

module.exports=user
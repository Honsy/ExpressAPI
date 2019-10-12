
var sql = require('./../sql/sql')
var db = require('./../config/db')

const algorithm = 'aes-192-cbc';
const password = '158654861sdfeqsfss';
const iv = Buffer.alloc(16, 0); // 初始化向量。


// 错误码
function errorCode(code,data,message){
    return {
        code,data,message
    }
}
// 成功码
function successCode(data,message){
    return {
        code:200,
        data,
        message:message?message:'请求成功'
    }
}

// MD5
function md5(str){ //暴露出md5s方法
    var crypto = require('crypto')

    var cmd5 = crypto.createHash('md5'); 
    // 改为使用异步的 `crypto.scrypt()`。
    const key = crypto.scryptSync(password, 'salt', 24);
    // IV 通常与密文一起传递。
    const iv = Buffer.alloc(16, 0); // 初始化向量。

    cmd5.update(str); 
    str = cmd5.digest('hex'); 
    return str;
}

// 加密签名
function cryptoToken(str){
    const hmac = crypto.createHmac('sha256', str);

    return hmac
}

function aesEncrypt(data) {
    var crypto = require('crypto')

    // 改为使用异步的 `crypto.scrypt()`。
    const key = crypto.scryptSync(password, 'salt', 24);
    // IV 通常与密文一起传递。
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
 
function aesDecrypt(data) {
    var crypto = require('crypto')
    // 改为使用异步的 `crypto.scrypt()`。
    const key = crypto.scryptSync(password, 'salt', 24);
    // IV 通常与密文一起传递。
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // 使用相同的算法，密钥和 iv 加密。
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// 查询表的总数
function selectTableCount(tablename){
    let connection = db.connection()

    var strsql = sql.selectcount(tablename)
    return db.insert(connection,strsql).catch(err=>{

    })
}

// 包含''空字符串
function strIsEmpty(str){
    if (typeof str == undefined || str.length == 0 || str==null || str == '<null>') {
      return true
    }
    return false
}


module.exports = {
    errorCode,
    successCode,
    md5,
    aesEncrypt,
    aesDecrypt,
    selectTableCount,
    strIsEmpty
}
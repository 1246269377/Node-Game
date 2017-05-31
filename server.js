/**
 * New node file
 */
const express = require('express'); //express基础框架
const static = require('express-static'); //文件读取模块
const cookieParser = require('cookie-parser'); //cookie操作模块
const cookieSession = require('cookie-session'); //session操作模块
const bodyParser = require('body-parser'); //post数据解析模块
const multer = require('multer'); //post文件解析模块
const consolidate = require('consolidate'); //模板引擎整合库
const mysql = require('mysql'); //mysql数据库

//mysql连接池
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'newgame'
});

var server = express();
server.listen(8080);

//1.解析cookie
server.use(cookieParser('asdjhwu2y3f8y83efgt44'));

//2.使用session
var arr = [];
for(var i = 0; i < 100000; i++) {
	arr.push("xime_" + Math.random());
}
server.use(cookieSession({
	name: 'sess',
	keys: arr,
	maxAge: 30 * 60 * 1000
}));

//3.post数据
server.use(bodyParser.urlencoded({
	extended: false
}));
server.use(multer({
	dest: './www/data'
}).any());

//4.配置模板引擎
//输出什么东西(html/xml/pdf/excl...)
server.set('view engine', 'html');
//模板文件所在位置
server.set('views', './views');
//哪种模板引擎
server.engine('html', consolidate.ejs);

//5、接受用户请求
server.get('/', (req, res)=>{
	res.render('login.ejs', {});
});

server.get('/index', (req, res)=>{
	console.log(req.query.username,req.query.password);
	res.render('index.ejs', {user:req.query});
});

server.get('/user', (req, res)=>{
	console.log(req.query.name,req.query.pass);
	res.send();
	res.end();
});

//5.static数据
server.use(static('./www'));
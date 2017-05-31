/**
 * New node file
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	port: 3306,
	database: 'newgame'
});

connection.connect(function(err) {
	if(err) {
		console.log("链接失败");
		throw(err)
	} else {
		console.log("链接成功");

		connection.query('select ID FROM `user`', function(err, result) {
			if(err) {
				var str = 'CREATE TABLE `user` ( `ID` int(11) NOT NULL AUTO_INCREMENT, `username` varchar(32) NOT NULL, `password` varchar(32) NOT NULL, `level` int(11) NOT NULL DEFAULT '+0+', PRIMARY KEY (`ID`) ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;';
				connection.query(str, function(err, result) {
					if(err) {
						throw err
					} else {
						console.log("创建表成功")
					}
				});
			} else {
				console.log("数据库已存在");
			}
		})

	}
})
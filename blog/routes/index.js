var exports = {};

var crypto = require('crypto');
var User = require('../models/user')


exports.index = function(req, res) {
	res.render('index', { title: 'Express' });
};
exports.user = function(req, res) {
};
exports.post = function(req, res) {
};
exports.reg = function(req, res) {
	res.render('reg',{
		title: '用户注册'
	})
};
exports.doReg = function(req, res) {
	// repaet password is equal to password
	if(req.body['password-repeat'] !== req.body['password']) {
		req.flash('error','两次输入的口令不一致');
		return res.redirect('/reg');
	}

	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var newUser = new User({
		name: req.body.username,
		password: password
	});

	// 检查用户是否重名
	User.get(newUser.name,function(err,user) {
		if(user) {
			err = 'Username is already exists.';
		}
		if(err) {
			req.flash('error',err);
			return res.redirect('/reg');
		}

		// 用户不存在
		newUser.save(function(err) {
			console.log(3);
			if(err) {
				req.flash('error',err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success','注册成功');
			res.redirect('/');
		})
	}) 
};
exports.login = function(req, res) {
	res.render('login',{
		title: '用户登录'
	})
};
exports.doLogin = function(req, res) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	var username = req.body.username;

	User.get(username,function(err,user) {
		if(user) {
			return res.redirect('/');
		}
		req.session.user = new User({
			name: username,
			password: password
		});
		req.flash('success','登录成功');
		return res.redirect('/reg');
	})
};
exports.logout = function(req, res) {
};


module.exports = exports;

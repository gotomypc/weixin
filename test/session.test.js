require('should');

var querystring = require('querystring');
var request = require('supertest');
var template = require('./support').template;

var connect = require('connect');
var wechat = require('../');

var app = connect();
app.use(connect.query());
app.use('/wechat', wechat('some token', wechat.text(function (info, req, res, next) {
  if (info.Content === '=') {
    var exp = req.wesession.text.join('');
    res.reply(eval(exp));
  } else {
    req.wesession.text = req.wesession.text || [];
    req.wesession.text.push(info.Content);
    res.reply('收到' + info.Content);
  }
})));

describe('wechat.js', function () {
  describe('session', function () {
    it('should ok', function (done) {
      var info = {
        sp: 'nvshen',
        user: 'diaosi',
        type: 'text',
        text: '1'
      };

      request(app)
      .post('/wechat')
      .send(template(info))
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        var body = res.text.toString();
        body.should.include('<Content><![CDATA[收到1]]></Content>');
        done();
      });
    });

    it('should ok', function (done) {
      var info = {
        sp: 'nvshen',
        user: 'diaosi',
        type: 'text',
        text: '+'
      };

      request(app)
      .post('/wechat')
      .send(template(info))
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        var body = res.text.toString();
        body.should.include('<Content><![CDATA[收到+]]></Content>');
        done();
      });
    });

    it('should ok', function (done) {
      var info = {
        sp: 'nvshen',
        user: 'diaosi',
        type: 'text',
        text: '1'
      };

      request(app)
      .post('/wechat')
      .send(template(info))
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        var body = res.text.toString();
        body.should.include('<Content><![CDATA[收到1]]></Content>');
        done();
      });
    });

    it('should ok', function (done) {
      var info = {
        sp: 'nvshen',
        user: 'diaosi',
        type: 'text',
        text: '='
      };

      request(app)
      .post('/wechat')
      .send(template(info))
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        var body = res.text.toString();
        body.should.include('<Content><![CDATA[2]]></Content>');
        done();
      });
    });
  });
});

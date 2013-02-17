var Memory = function () {
  this.sessions = {};
};

var generate = function () {
  // session 数据结构
  return {
    text: [],
    link: [],
    event: [],
    voice: [],
    image: [],
    location: [],
    queue: []
  };
};

var push = function (message) {
  var limit = this.limit;
  this.queue.push(message);
  if (this.queue.length > limit * 6) {
    this.queue.shift();
  }
  if (this.hasOwnProperty(message.MsgType)) {
    var types = this[message.MsgType];
    types.push(message);
    if (types.length > limit) {
      types.shift();
    }
  }
};

Memory.prototype.get = function (sid, callback) {
  var session = this.sessions[sid] || generate();
  session.push = push;
  process.nextTick(function () {
    callback(null, session);
  });
};

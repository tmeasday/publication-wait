if (Meteor.isClient) {
  Meteor.subscribe('a', function() {
    console.log('a ready');
  });
  Meteor.subscribe('b', function() {
    console.log('b ready');
  });
}

if (Meteor.isServer) {
  var Future = Npm.require('fibers/future');
  var wait = function(ms) {
    var f = new Future;
    Meteor.setTimeout(function() {
      f.return()
    }, ms);
    f.wait()
  }
  
  Meteor.publish('a', function() {
    wait(10000);
    this.ready();
  });
    
  Meteor.publish('b', function() {
    console.log('b ready');
    this.ready();
  });
}

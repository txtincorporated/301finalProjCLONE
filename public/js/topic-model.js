(function(module) {

  function TopicObject(eventIdArg, nameArg, descriptionArg, callback) {
    return this.createTopic(eventIdArg, nameArg, descriptionArg, callback);
  }

  TopicObject.prototype.createTopic = function(eventIdArg, nameArg, descriptionArg, callback) {
    var currentTopic = this;
    // console.log('Creating new topic: ' + nameArg);
    $.ajax({
      url: '/api/topics',
      type: 'POST',
      data: {event: eventIdArg, name: nameArg, description: descriptionArg},
      cache: false
    })
    .done( function (data) {
      console.assert(
        data.topic.name && data.topic.event && data.topic._id,
        {
          'message':'Issue when saving new Topic:',
          'data.topic.name':data.topic.name,
          'data.topic.event':data.topic.event,
          'data.topic._id':data.topic._id
        }
      );
      currentTopic.name = data.topic.name;
      currentTopic.description = data.topic.description;
      currentTopic.event = data.topic.event;
      currentTopic.id = data.topic._id;
      if (callback) callback(data);
      return currentTopic;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.warn('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback();
    });
  };

  TopicObject.prototype.rebuildTopicArray = function(eventIdArg, callback) {
    $.ajax({
      url: '/api/topics',
      type: 'GET',
      cache: false
    })
    .done( function (data) {
      var eventTopics = data.topics.filter(function(topic){
        if(topic.event === eventIdArg) return true;
      });
      console.log('Regenerating Topic Array. Returned data:',eventTopics);
      if (callback) callback();
      return eventTopics;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.warn('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback();
    });
  };

  //TODO: wtf is the rest of this stuff?

  var wordArr = [];

  function Word(text, usid, topicid) { //TODO: Make sure IIFE enclosure didn't inadvertently break this.
    this.text = text;
    this.weight = 1;
    this.html = {
      'data-usid': usid,
      'data-topicid': topicid,
      'data-votestate': 0,
    };
  };

  module.TopicObject = TopicObject;

})(window);

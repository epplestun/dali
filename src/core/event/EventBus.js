export class EventBus {
  static topics = {};
  static lastUid = -1;

  static subscribe(topic, callback) {
    if (!EventBus.topics.hasOwnProperty(topic)) {
      EventBus.topics[topic] = [];
    }

    let token = (++EventBus.lastUid).toString();

    EventBus.topics[topic].push({token, callback});

    return token;
  }

  static unsubscribe(token) {
    for (var m in EventBus.topics) {
      if (EventBus.topics.hasOwnProperty(m)) {
        for (var i = 0, j = EventBus.topics[m].length; i < j; i++) {
          if (EventBus.topics[m][i].token === token) {
            EventBus.topics[m].splice(i, 1);
            return token;
          }
        }

        delete EventBus.topics[m];
      }
    }

    return false;
  }

  static publish(topic, data) {
    if (!EventBus.topics.hasOwnProperty(topic)) {
      return false;
    }

    function notify() {
      var subscribers = EventBus.topics[topic],
        throwException = function (e) {
          return function () {
            throw e;
          };
        };

      for (var i = 0, j = subscribers.length; i < j; i++) {
        try {
          subscribers[i].callback(topic, data);
        } catch (e) {
          setTimeout(throwException(e), 0);
        }
      }
    }

    notify();

    return true;
  }
}

EventBus.CHANGE_DETECTED = 'CHANGE_DETECTED';
EventBus.MODEL_CHANGE_DETECTED = 'MODEL_CHANGE_DETECTED';
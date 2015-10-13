import {EventBus} from 'core/event/EventBus';
import {EventNameNormalizer} from 'core/event/EventNameNormalizer';

var assert = require('assert'),
    sinon = require('sinon-es6');

describe('EventBus', () => {
  let topic1 = 'my_test_topic_1',
      topic2 = 'my_test_topic_2',
      callback = sinon.spy(),
      token1 = null,
      token2 = null;

  beforeEach(() => {
    token1 = EventBus.subscribe(topic1, callback),
    token2 = EventBus.subscribe(topic2, callback);
  });

  afterEach(() => {
    EventBus.unsubscribe(token1);
    EventBus.unsubscribe(token2);
  });

  describe('#subscribe()', () => {
    it('should be two the number of registered topics', () => {
      assert.equal(Object.keys(EventBus.topics).length, 2);
    });
  });

  describe('#unsubscribe()', () => {
    it('should be zero the number of registered topics', () => {
      EventBus.unsubscribe(token1);
      EventBus.unsubscribe(token2);

      assert.equal(Object.keys(EventBus.topics).length, 0);
    });
  });

  describe('#publish()', () => {
    it('should be call callback on publish', () => {
      EventBus.publish(topic1, []);

      assert.equal(callback.called, true);
      assert.equal(callback.calledWith(topic1), true);
    });
  });
});

describe('EventNameNormalizer', () => {

  class Target {}

  describe('#normalize()', () => {
    it('should be target name plus eventname uppercased', () => {
      assert.equal(
        EventNameNormalizer.normalize(Target, EventBus.CHANGE_DETECTED), 
        'TARGET_CHANGE_DETECTED'
      );
    });
  });
});

describe('EventBinder', () => {
  describe('#bindInstance()', () => {
    it('...');
  });

  describe('#bind()', () => {
    it('...');
  });
});
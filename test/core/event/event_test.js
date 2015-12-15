import {EventBus} from '../../../src/core/event/EventBus';
import {EventNameNormalizer} from '../../../src/core/event/EventNameNormalizer';
import {EventBinder} from '../../../src/core/event/EventBinder';
import {Target} from './Target';
import assert from 'assert';
import sinon from 'sinon';
import jsdom from 'mocha-jsdom';

describe('EventBus', () => {
  let topic1 = 'my_test_topic_1',
      topic2 = 'my_test_topic_2',
      callback = sinon.spy(),
      token1 = null,
      token2 = null;

  beforeEach(() => {
    token1 = EventBus.subscribe(topic1, callback);
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
  jsdom();

  describe('#bind()', () => {
    it('should be register target method to event', () => {
      let element = document.createElement('button');
      let attrs = [{ name: '_click', value: 'click()' }];

      sinon.spy(element, 'addEventListener');

      EventBinder.bind(element, attrs, Target);

      assert.equal(element.addEventListener.called, true);
      assert.equal(element.addEventListener.calledWith('click'), true);
    });
  });
});
import {Filter} from 'core/filters/Filter';

@Filter
class JsonFilter {
  render(value, extra) {
    return JSON.stringify(value, null, ' ');
  }
}

export function Json(target) {
  target.fromJson = function(json) {
    let instance = new this();
    
    Object.keys(json).forEach(property => {
      instance[property] = json[property];
    });
    
    return instance;
  };
  
  Object.assign(target.prototype, {
    toJson() {
      let json = this;

      if(!!this.jsonIgnoredProperties) {
        this.jsonIgnoredProperties.forEach(property => {
          delete json[property];
        });
      }

      if(!!this.jsonProperties) {
        this.jsonProperties.forEach(property => {
          if(!json.hasOwnProperty(property)) {
            delete json[property];
          }
        });
      }
      
      //
      // Apply property mappers
      //
      /*
      target.prototype.jsonProperties.filter((property) => {
        return property.hasOwnProperty('conf');
      }).forEach((property) => {
        console.log(property.key, property.conf, json[property.key]);
        json[property.key] = json[property.key]
      });
      */
      
      let originalProperties = Object.keys(this),
          propertiesOrder = this.jsonPropertiesOrder;
          
      let newOrder = propertiesOrder.concat(originalProperties).filter((value, index, self) => {
         return self.indexOf(value) === index;
      });
      
      let outputJson = {};
      newOrder.forEach((property) => {
        outputJson[property] = json[property];
      })
      
      return JSON.stringify(outputJson, null, '');
    }
  })
}

export function JsonProperty(target, key) {
  if(!target.jsonProperties) {
    target.jsonProperties = [key];
  } else {
    if(!target.jsonProperties[key]) {
      target.jsonProperties.push(key);
    }
  }
}

export function JsonIgnore(target, key) {
  if(!target.jsonIgnoredProperties) {
    target.jsonIgnoredProperties = [key];
  } else {
    if(!target.jsonIgnoredProperties[key]) {
      target.jsonIgnoredProperties.push(key);
    }
  }
}

export function JsonIgnoreProperties(...properties) {
  return function decorator(target) {
    if(!target.prototype.jsonIgnoredProperties) {
      target.prototype.jsonIgnoredProperties = [];
    }

    properties.forEach(property => {
      target.prototype.jsonIgnoredProperties.push(property);
    });
  }
}

export function JsonPropertyOrder(...properties) {
  return function decorator(target) {
    target.prototype.jsonPropertiesOrder = properties;
  }
}
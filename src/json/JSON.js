function Json(target) {
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

function JsonProperty(target, key) {
  if(!target.jsonProperties) {
    target.jsonProperties = [key];
  } else {
    if(!target.jsonProperties[key]) {
      target.jsonProperties.push(key);
    }
  }
}

function JsonIgnore(target, key) {
  if(!target.jsonIgnoredProperties) {
    target.jsonIgnoredProperties = [key];
  } else {
    if(!target.jsonIgnoredProperties[key]) {
      target.jsonIgnoredProperties.push(key);
    }
  }
}

function JsonIgnoreProperties(...properties) {
  return function decorator(target) {
    if(!target.prototype.jsonIgnoredProperties) {
      target.prototype.jsonIgnoredProperties = [];
    }

    properties.forEach(property => {
      target.prototype.jsonIgnoredProperties.push(property);
    });
  }
}

function JsonPropertyOrder(...properties) {
  return function decorator(target) {
    target.prototype.jsonPropertiesOrder = properties;
  }
}

@Json
@JsonPropertyOrder('description', 'title')
@JsonIgnoreProperties('from', 'to')
class Todo {
  @JsonProperty
  title = "title";

  @JsonProperty
  description = "desc";

  @JsonIgnore
  from = new Date();
  
  @JsonProperty
  to = new Date();
}

let todo = new Todo();
console.log(todo.toJson());
console.log('----------------------------------------');

let i = Todo.fromJson({
  'description' : 'Descripción',
  'title' : 'Título',
  'from' : '2015-01-07T00:00:00.000'
});
console.log(i.toJson());
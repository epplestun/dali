

function JsonPropertyOrder(...properties) {
  return function decorator(target) {
  }
}

function JsonProperty(target, key) {
  if(!target.jsonProperties) {
    target.jsonProperties = [key];
  } else {
    target.jsonProperties.push(key);
  }
}

function JsonIgnore(target, key) {
  if(!target.jsonIgnoredProperties) {
    target.jsonIgnoredProperties = [key];
  } else {
    target.jsonIgnoredProperties.push(key);
  }
}

function JsonIgnoreProperties(...properties) {
  return function decorator(target) {
    if(!target.jsonIgnoredProperties) {
      target.jsonIgnoredProperties = [];
    }

    properties.forEach(property => {
      target.jsonIgnoredProperties.push(property);
    });

    //console.log(target.jsonIgnoredProperties);
  }
}

function Json(target) {
  Object.assign(target.prototype, {
    toJson() {
      let json = this;

      console.log(this.jsonProperties, this.jsonIgnoredProperties);

      if(this.hasOwnProperty('jsonIgnoredProperties')) {
        this.jsonIgnoredProperties.forEach(property => {
          delete json[property];
        });
      }

      if(this.hasOwnProperty('jsonProperties')) {
        this.jsonProperties.forEach(property => {
          if(!json.hasOwnProperty(property)) {
            delete json[property];
          }
        });
      }

      return JSON.stringify(json);
    },

    fromJson(data) {
      console.log('fromJson', data);
    }
  })
}



@Json
@JsonPropertyOrder('description', 'title')
@JsonIgnoreProperties('date')
class Todo {
  @JsonProperty
    title = "title";

  @JsonProperty
    description = "desc";

  date = new Date();
}


let todo = new Todo();

console.log(todo.toJson());
console.log(todo.fromJson(data));
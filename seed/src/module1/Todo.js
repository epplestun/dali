import {
  Json, 
  JsonPropertyOrder, 
  JsonIgnoreProperties,
  JsonProperty,
  JsonIgnore
} from 'dali/dali';

@Json
@JsonPropertyOrder('description', 'title')
@JsonIgnoreProperties('from', 'to')
export class Todo {
  @JsonProperty
  title = "";

  @JsonProperty
  description = "";

  @JsonIgnore
  from = new Date();
  
  @JsonProperty
  to = new Date();
}
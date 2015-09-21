import {Filter} from 'dali/dali';

@Filter
export class DateFilter {
  render(value, extra) {
    console.log(value, extra);
    return value.toJSON();
  }
}
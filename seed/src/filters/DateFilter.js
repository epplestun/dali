import {Filter} from 'dali/dali';

@Filter
export class DateFilter {
  render(value, extra) {
    return value.toJSON();
  }
}
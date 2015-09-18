export class DataIf {
  render(data, element, value) {
    if (!data[value]) {
      element.parentNode.removeChild(element);
    }
  }
}
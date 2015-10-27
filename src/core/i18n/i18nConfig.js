export class i18nConfig {
  static init(config) {
    i18nConfig.config = config;
  }

  static setConfig(config) {
    i18nConfig.config = config;
  }

  static getConfig() {
    return i18nConfig.config;
  }
}
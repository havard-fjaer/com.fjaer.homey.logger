'use strict';

import Homey from 'homey';

module.exports = class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyApp has been initialized');

    //(await this.homey.insights.createLog('my_log', {title: 'My Log', type: 'number', units: 'test', decimals: 2})).createEntry(1);
    this.homey.insights.getLog('my_log').then((log) => {log.createEntry(1)});
    this.homey.insights.getLog('my_log').then((log) => {log.createEntry(2)});
    this.homey.insights.getLogs().then((logs) => {
      this.log('logs:', logs);
    });

    const logToOpenSearch = this.homey.flow.getActionCard("log-to-opensearch");

    logToOpenSearch.registerRunListener(async (args, state) => {
      this.log('args:', args);
      this.log('state:', state);

      if (args.message != null) {


      }
    });

  }
}

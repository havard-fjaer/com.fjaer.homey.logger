'use strict';

import Homey from 'homey';
import { PrometheusPushgatewayClient } from './loggers/prometheus';

module.exports = class MyApp extends Homey.App {


  async onInit() {
    this.log('Logger has been initialized');

    const logToPrometheusAction = this.homey.flow.getActionCard('log-to-prometheus');
    logToPrometheusAction.registerRunListener(async (args, state) => {
      await PrometheusPushgatewayClient.logMetric(args, this);
    });


    const logToOpenSearch = this.homey.flow.getActionCard("log-to-opensearch");
    logToOpenSearch.registerRunListener(async (args, state) => {
    });

  }
}



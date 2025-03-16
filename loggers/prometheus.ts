import Homey from "homey/lib/Homey";

interface LogMetricArgs {
    instance: string;
    metric: string;
    name: string;
    value: number;
}

export class PrometheusPushgatewayClient {


    static async logMetric(args: LogMetricArgs, app: Homey.App): Promise<void> {
        const basepath = 'http://192.168.10.31:9091/metrics';
        const job = 'homey';
        const url = `${basepath}/job/${job}/instance/${args.instance}`;
        const body = `${args.metric}{name="${args.name}"} ${args.value}\n`;
        app.log(`Pushing metric to ${url}: ${body}`);

        try {
            let r = await fetch(url, {
                method: 'POST',
                body: body
            });
            if (!r.ok) {
                app.log(`Failed to push metric to ${url}: ${r.status} ${r.statusText} ${await r.text()}`);
            }
        }
        catch (e: any) {
            app.log(`Failed to push metric to ${url}: ${e}`);
        }

    }
}
exports.default = PrometheusPushgatewayClient;
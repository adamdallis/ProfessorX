import * as Mocha from "mocha";

export class MochaConfig {
    readonly REPORT_TITLE: string = "MUTATION TEST REPORT";
    readonly mocha = new Mocha({
        reporter: "mochawesome",
        reporterOptions: {
            autoOpen: true,
            quiet: true,
            reportTitle: this.REPORT_TITLE
        }
    });
}
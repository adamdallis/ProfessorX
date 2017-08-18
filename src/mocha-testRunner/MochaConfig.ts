import * as Mocha from "mocha";

export class MochaConfig {
    public readonly REPORT_TITLE: string = "MUTATION TEST REPORT";
    public readonly mocha = new Mocha({
        reporter: "mochawesome",
        reporterOptions: {
            autoOpen: false,
            quiet: true,
            reportTitle: this.REPORT_TITLE
        }
    });
}

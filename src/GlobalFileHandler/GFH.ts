import * as fs from "fs";

export class GFH {

    public readFile (filePath: string): string {
        return fs.readFileSync(filePath).toString();
    }

    public writeFile (filePath: string, fileData: string): void {
        fs.writeFileSync(filePath, fileData);
    }
}
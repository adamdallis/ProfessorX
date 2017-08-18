import * as fs from "fs";

export class GFH {

    readFile (filePath: string): string {
        return fs.readFileSync(filePath).toString();
    }

    writeFile (filePath: string, fileData: string): void {
        fs.writeFileSync(filePath, fileData);
    }
}
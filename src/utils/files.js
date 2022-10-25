import * as fs from "fs";

export const deleteFile = (filepath) => {
    fs.unlink(filepath, function (err) {
        if (err)
            console.error(err);
    });
}
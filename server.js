const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
    res.send("Java Compiler Backend Running");
});

app.post("/run", (req, res) => {

    const code = req.body.code;

    if (!code) {
        return res.status(400).json({
            output: "No Java code received."
        });
    }

    const folder = path.join(__dirname, "temp");

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }

    const javaFile = path.join(folder, "Main.java");

    fs.writeFileSync(javaFile, code);

    exec(
        `javac ${javaFile}`,
              (compileError, compileStdout, compileStderr) => {

            if (compileError) {
                return res.json({
                    output: compileStderr
                });
            }

            exec(
                `java -cp ${folder} Main`,
                (runError, runStdout, runStderr) => {

                    if (runError) {
                        return res.json({
                            output: runStderr
                        });
                    }

                    return res.json({
                        output: runStdout
                    });

                }
            );

        }
    );
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

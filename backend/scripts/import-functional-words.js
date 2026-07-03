const XLSX = require("xlsx");
const db = require("../models");

const { FunctionalTask, FunctionalExercise, sequelize } = db;

async function importFunctionalExercises() {
    try {

        await sequelize.authenticate();

        const workbook = XLSX.readFile(
            "./Data For Stage-2- Functional Words.xlsx"
        );

        for (const sheetName of workbook.SheetNames) {

            console.log(`Importing ${sheetName}...`);

            // No header row
            const rows = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetName],
                {
                    header: 1,
                    defval: ""
                }
            );

            for (const row of rows) {

                const [
                    ,
                    englishSentence,
                    tamilSentence,
                    taskTitle
                ] = row;

                if (!englishSentence || !taskTitle) {
                    continue;
                }

                const task = await FunctionalTask.findOne({
                    where: {
                        title: taskTitle
                    }
                });

                if (!task) {
                    console.log(`Task not found: ${taskTitle}`);
                    continue;
                }

                await FunctionalExercise.create({
                    englishSentence,
                    tamilSentence: tamilSentence || null,
                    taskId: task.id
                });
            }

            console.log(`${sheetName} imported successfully.`);
        }

        console.log("All exercises imported.");
        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

importFunctionalExercises();
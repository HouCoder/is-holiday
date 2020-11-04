const fs = require('fs');
const moment = require('moment');
const { program } = require('commander');

program.version('0.0.1')
    .requiredOption('-r, --region  <region>', 'region')
    .requiredOption('-y, --year    <year>',   'Year');

program.parse(process.argv);

const cliOptions = program.opts();
const year = Number(cliOptions.year);
const region = cliOptions.region;
const regionData = require(`./source/${region}/${year}`);

const dayOfTheYear = moment().year(year).startOf('year');
const dayOffs = [];

while (dayOfTheYear.year() === year) {
    const date = Number(dayOfTheYear.format('YYYYMMDD'));
    const weekday = dayOfTheYear.isoWeekday();

    // Monday to Firday
    if ([1, 2, 3, 4, 5].includes(weekday)) {
        if (regionData.holidays.includes(date)) {
            dayOffs.push(date);
        }
    } else {
        // Saturday and Sunday
        const workWeekends = regionData.workWeekends || [];

        if (!workWeekends.includes(Number(date))) {
            dayOffs.push(date);
        }
    }

    dayOfTheYear.add(1, 'day');
}

// Create region folder if not exist
const dirPath = `./dist/${region}`;

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Write the final data to file
const disFilePath = `${dirPath}/${year}.txt`;
fs.writeFileSync(disFilePath, JSON.stringify(dayOffs));

console.log(`Done! Generated file stored at ${disFilePath}`);

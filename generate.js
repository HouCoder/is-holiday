const fs = require('fs');
const moment = require('moment');
const { program } = require('commander');

program.version('0.0.1')
    .requiredOption('-c, --country <country>', 'Country')
    .requiredOption('-y, --year    <year>',    'Year');

program.parse(process.argv);

const cliOptions = program.opts();
const year = Number(cliOptions.year);
const country = cliOptions.country;
const countryData = require(`./source/${country}/${year}`);

const dayOfTheYear = moment().year(year).startOf('year');
const dayOffs = [];

while (dayOfTheYear.year() === year) {
    const date = Number(dayOfTheYear.format('YYYYMMDD'));
    const weekday = dayOfTheYear.isoWeekday();

    // Monday to Firday
    if ([1, 2, 3, 4, 5].includes(weekday)) {
        if (countryData.holidays.includes(date)) {
            dayOffs.push(date);
        }
    } else {
        // Saturday and Sunday
        if (!countryData.workWeekends.includes(Number(date))) {
            dayOffs.push(date);
        }
    }

    dayOfTheYear.add(1, 'day');
}

// Create country folder if not exist
const dirPath = `./dist/${country}`;

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Write the final data to file
const disFilePath = `${dirPath}/${year}.txt`;
fs.writeFileSync(disFilePath, JSON.stringify(dayOffs));

console.log(`Done! Generated file stored at ${disFilePath}`);

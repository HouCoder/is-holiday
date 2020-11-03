# is-holiday

A very simple way to determine if a certain date is holiday or not.

## Supported countries/regions

- China

## Use it in multiple programming languages

You can easily start using it in multiple programming languages, here are some examples:

### Bash

```bash
#!/bin/bash

if curl -s https://raw.githubusercontent.com/HouCoder/is-holiday/master/dist/cn/2020.txt | grep -q `date '+%Y%m%d'`
then
  echo "Enjoy your day off"
else
  echo "Go back to work"
fi
```

### JS

```js
// jQuery and Moment required.
$.ajax({
  type: 'GET',
  url: 'https://raw.githubusercontent.com/HouCoder/is-holiday/master/dist/cn/2020.txt',
  dataType: "text",
  crossDomain: true,
  success: function (data) {
      console.log(data);
      const today = moment(new Date()).format('YYYYMMDD');
      if (data.includes(today)) {
          console.log('Enjoy your day off');
      } else {
          console.log('Go back to work');
      }
  },
});
```

### Python

```python
import urllib.request
from datetime import datetime

today = datetime.today().strftime('%Y%m%d')
contents = urllib.request.urlopen("https://raw.githubusercontent.com/HouCoder/is-holiday/master/dist/cn/2020.txt").read()

if today.encode() in contents:
    print('Enjoy your day off')
else:
    print('Go back to work')
```

### PHP

```php
$today = date('Ymd');
$data = file_get_contents('https://raw.githubusercontent.com/HouCoder/is-holiday/master/dist/cn/2020.txt');

if (strpos($data, $today) !== false) {
    echo 'Enjoy your day off';
} else {
    echo 'Go back to work';
}
```

## Generate a new holiday list

```shell
$ node generate.js --country cn --year 2020
```

This command will read holiday settings stored in source/cn/2020.js. The holiday settings JS file is a simple node module that consists of 2 properties: `holidays` and `workWeekends`. Here's how it looks like - [example](./source/cn/2020.js).

## Q&A

### Searching in a txt file looks unfancy and inefficient.

That's the point, I want to make it simple, stupid and reliable to use, that's why I prefer to host it directly on GitHub rather than making it into a real API service and host it on my server, my own server's stability is nowhere near GitHub's, plus even if you think GitHub isn't stable enough you can just download the txt file and store it in your local.

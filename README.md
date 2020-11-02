# is-holiday

A very simple way to determine if a certain date is holiday or not.

## Use it in multiple programming languages

You can easily start using it in multiple programming languages, here are some examples:

Want to use it in China? No problem, use the mirror repo - [tonni/is-holiday](https://gitee.com/tonni/is-holiday).

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
$data = file_get_contents('http://127.0.0.1:8080/china/2020.txt');

if (strpos($data, $today) !== false) {
    echo 'Enjoy your day off';
} else {
    echo 'Go back to work';
}
```

### Hexlet tests and linter status:
[![Actions Status](https://github.com/leksandrFo/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/leksandrFo/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/9dda29ea2d125f1d8906/maintainability)](https://codeclimate.com/github/leksandrFo/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9dda29ea2d125f1d8906/test_coverage)](https://codeclimate.com/github/leksandrFo/frontend-project-46/test_coverage)
[![Tests](https://github.com/leksandrFo/frontend-project-46/actions/workflows/tests.yaml/badge.svg)](https://github.com/leksandrFo/frontend-project-46/actions/workflows/tests.yaml)

<h2>Project "Difference Calculator"</h2>

<p>"Difference Calculator" is a program that compares two configuration files and shows a difference.</p>

## Minimum requirements:
<p>Node.js version 13.2.0 or higher.</p>

## Installation:
1. Create clone of the repository.
```
git clone git@github.com:leksandrFo/frontend-project-46.git
```
2. Navigate to the repository you just cloned.
```
cd frontend-project-46
```
3. Installing project dependencies.
```
make install
```
4. Create a global link.
```
npm link
```
## Usage informations:
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           output usage information
```
The program supports the following extensions of compared files: ".json", ".yaml" and ".yml".

## Demonstration:
<h3>Compare two flat files:</h3>
File1

```
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

File2

```
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

Output

```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
[![asciicast](https://asciinema.org/a/LokBVWnnv8WjjgrUgb2Cj4u9k.svg)](https://asciinema.org/a/LokBVWnnv8WjjgrUgb2Cj4u9k)

<h3>Formatters</h3>
File1

```
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```

File2

```
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
}
```

Output "stylish" format

```
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```
[![asciicast](https://asciinema.org/a/jBEGE5S4gh4C0cobqViAKVuOj.svg)](https://asciinema.org/a/jBEGE5S4gh4C0cobqViAKVuOj)

Output "plain" format
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
[![asciicast](https://asciinema.org/a/yPfDHx1r94LjzKOsSEFr4iDME.svg)](https://asciinema.org/a/yPfDHx1r94LjzKOsSEFr4iDME)

Output "json" format
```
[{"key":"common","value":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unmodified"},{"key":"setting2","value":200,"type":"removed"},{"key":"setting3","value":[true,null],"type":"modified"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","value":[{"key":"doge","value":[{"key":"wow","value":["","so much"],"type":"modified"}],"type":"nested"},{"key":"key","value":"value","type":"unmodified"},{"key":"ops","value":"vops","type":"added"}],"type":"nested"}],"type":"nested"},{"key":"group1","value":[{"key":"baz","value":["bas","bars"],"type":"modified"},{"key":"foo","value":"bar","type":"unmodified"},{"key":"nest","value":[{"key":"value"},"str"],"type":"modified"}],"type":"nested"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"removed"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}]
```
[![asciicast](https://asciinema.org/a/vnP4hHvp1EKXwY7AGZblDgpO9.svg)](https://asciinema.org/a/vnP4hHvp1EKXwY7AGZblDgpO9)

const stylishExpected = `{
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
}`;

const plainExpected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const jsonExpected = '[{"key":"common","value":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unmodified"},{"key":"setting2","value":200,"type":"removed"},{"key":"setting3","value":[true,null],"type":"modified"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","value":[{"key":"doge","value":[{"key":"wow","value":["","so much"],"type":"modified"}],"type":"nested"},{"key":"key","value":"value","type":"unmodified"},{"key":"ops","value":"vops","type":"added"}],"type":"nested"}],"type":"nested"},{"key":"group1","value":[{"key":"baz","value":["bas","bars"],"type":"modified"},{"key":"foo","value":"bar","type":"unmodified"},{"key":"nest","value":[{"key":"value"},"str"],"type":"modified"}],"type":"nested"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"removed"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}]';

const expected = (formatName) => {
  if (formatName === 'stylish') {
    return stylishExpected;
  } if (formatName === 'plain') {
    return plainExpected;
  } if (formatName === 'json') {
    return jsonExpected;
  }
  return stylishExpected;
};

export default expected;

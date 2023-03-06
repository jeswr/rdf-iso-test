import dereference from 'rdf-dereference';
import { isomorphic } from 'rdf-isomorphic';
import path from 'path';
import asArray from 'arrayify-stream';

(async () => {
  console.time('load')
  const expected = await asArray((await dereference.dereference(path.join(__dirname, 'expected.n3'), { localFiles: true })).data);
  const output = await asArray((await dereference.dereference(path.join(__dirname, 'output.n3'), { localFiles: true })).data);
  console.timeEnd('load')

  console.log('number of quads:', expected.length, output.length)

  console.time('compare')
  isomorphic(
    expected,
    output
  )
  console.timeEnd('compare')
})();
// compare: 12:05.582 (m:ss.mmm)
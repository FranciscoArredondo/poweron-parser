import { createToken, CstParser, Lexer } from 'chevrotain';
import fs from 'fs';
import path from 'path';

const division = createToken({ name: 'TARGET', pattern: '/TARGET/' });

const allTokens = [division];

const PowerOnLexer = new Lexer(allTokens);

const filePath = path.join(
  __dirname,
  '..',
  'sample_files',
  'ACCT.WIRE.EMAIL.SYMC.PO'
);
const stream = fs.createReadStream(path.normalize(filePath));
stream.setEncoding('utf8');

stream.addListener('data', chunk => {
  // console.log(chunk.toString());
  // console.log(chunk);
  const tokens = PowerOnLexer.tokenize(chunk as string);
  console.log(tokens);
});

// class PowerOnParser extends CstParser {
//   constructor() {
//     super(allTokens);
//     this.performSelfAnalysis();
//   }
// }

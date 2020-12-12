import { createToken, CstParser, Lexer } from 'chevrotain';
import allTokens from './Tokens';
import fs from 'fs';
import path from 'path';

const PowerOnLexer = new Lexer(allTokens);

// const toks = PowerOnLexer.tokenize('{target = ACCOUNT}');
// console.log(toks);

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
  console.log(tokens.errors);
});

// class PowerOnParser extends CstParser {
//   constructor() {
//     super(allTokens);
//     this.performSelfAnalysis();
//   }
// }

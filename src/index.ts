import { createToken, CstParser, Lexer } from 'chevrotain';
import {
  Identifier,
  Division,
  DataType,
  BuiltInFunction,
  Keyword,
  RecordType,
  StringLiteral,
  NumberLiteral,
  WhiteSpace,
  Null,
  LCurly,
  RCurly,
  LParen,
  RParen,
  LSquare,
  RSquare,
  LArrow,
  RArrow,
  Comma,
  Colon,
  Equal,
  Period,
  AtSymbol,
  Operation,
  SingleQuote,
  Hashtag,
} from './Tokens';
import fs from 'fs';
import path from 'path';

const allTokens = [
  WhiteSpace, // NOTE: we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
  Division,
  DataType,
  BuiltInFunction,
  RecordType,
  Null,
  Keyword,
  Identifier, // The Identifier must appear after the keywords because all keywords are valid identifiers.
  StringLiteral,
  NumberLiteral,
  LCurly,
  RCurly,
  LParen,
  RParen,
  LSquare,
  RSquare,
  LArrow,
  RArrow,
  SingleQuote,
  Comma,
  Colon,
  Equal,
  Period,
  AtSymbol,
  Hashtag,
  Operation,
];

const PowerOnLexer = new Lexer(allTokens);

// const toks = PowerOnLexer.tokenize('{target = ACCOUNT}');
// console.log(toks);

const fileFullPath = path.join(
  __dirname,
  '..',
  'sample_files',
  'LOAN.SIMPLE.PO'
);
const fileContents: string = fs.readFileSync(fileFullPath, {
  encoding: 'utf8',
  flag: 'r',
});
// const stream = fs.createReadStream(path.normalize(filePath));
// stream.setEncoding('utf8');

// stream.addListener('data', chunk => {
//   // console.log(chunk.toString());
//   // console.log(chunk);
//   const tokens = PowerOnLexer.tokenize(chunk as string);
//   console.log(Object.keys(tokens));
// });

class PowerOnParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  public specfile = this.RULE('specfile', () => {
    this.SUBRULE(this.targetDivision);
    this.OPTION(() => {
      this.SUBRULE(this.defineDivision);
    });
    this.OPTION1(() => {
      this.SUBRULE(this.setupDivision);
    });
    this.OPTION2(() => {
      this.SUBRULE(this.selectDivision);
    });
    this.OPTION3(() => {
      this.SUBRULE(this.sortDivision);
    });
    this.OPTION4(() => {
      this.SUBRULE(this.printDivision);
    });
    this.OPTION5(() => {
      this.SUBRULE(this.totalDivision);
    });
    this.OPTION6(() => {
      this.SUBRULE(this.procedureDivision);
    });
  });

  private targetDivision = this.RULE('targetDivision', () => {
    this.CONSUME(Division);
    this.CONSUME(Equal);
    this.CONSUME(RecordType);
  });

  private defineDivision = this.RULE('defineDivision', () => {
    this.CONSUME(Division);
    // add more here...
  });

  private setupDivision = this.RULE('setupDivision', () => {
    this.CONSUME(Division);
    // add more here...
  });

  private selectDivision = this.RULE('selectDivision', () => {
    this.CONSUME(Division);
    this.CONSUME(RecordType);
    this.CONSUME(Colon);
    this.CONSUME(StringLiteral);
    // add more here...
  });

  private sortDivision = this.RULE('sortDivision', () => {
    this.CONSUME(Division);
    // add more here...
  });

  private printDivision = this.RULE('printDivision', () => {
    this.CONSUME(Division);
    // add more here...
  });

  private letterDivision = this.RULE('letterDivision', () => {
    this.CONSUME(Division);
    // add more here...
  });

  private totalDivision = this.RULE('totalDivision', () => {
    this.CONSUME(Division);
    // add more here...
  });

  private procedureDivision = this.RULE('procedureDivision', () => {
    this.CONSUME(Division);
    // add more here...
  });
}

const parser = new PowerOnParser();

const parseInput = (text: string) => {
  const lexingResult = PowerOnLexer.tokenize(text);
  parser.input = lexingResult.tokens;
  const out = (parser as any).specfile();
  if (parser.errors.length > 0) {
    console.log(parser.errors);
    throw new Error('sad sad panda, Parsing errors detected');
  } else {
    return out;
  }
};

// const inputText = 'Target=LOAN';
const out = parseInput(fileContents);
console.log(JSON.stringify(out, null, ' '));

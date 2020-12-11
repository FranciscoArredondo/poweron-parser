import { createToken, CstParser, Lexer } from 'chevrotain';
import fs from 'fs';
import path from 'path';

const Division = createToken({
  name: 'Division',
  pattern: /TARGET|DEFINE|SETUP|SELECT|SORT|LETTER|PRINT|TOTAL/i,
});
const DataType = createToken({
  name: 'Data Type',
  pattern: /CHARACTER|CODE|DATE|FLOAT|MONEY|NUMBER|RATE/i,
});
const FunctionType = createToken({
  name: 'Function',
  pattern: /ABS|ANYSERVICE|ANYWARNING|CAPITALIZE|CHARACTERREAD|CHARACTERSEARCH|CHRVALUE|CODEREAD|COL|COPYAPP|CREATEFINANCEFROMCREDREP|CTRLCHR|DATASIZE|DATE|DATEOFFSET|DATEREAD|DATEVALUE|DAY|DAYOFWEEK|DIALOGPROMPTCHAR|DIALOGPROMPTCODE|DIALOGPROMPTCOMBOOPTION|DIALOGPROMPTCOMBOSTART|DIALOGPROMPTDATE|DIALOGPROMPTLISTOPTION|DIALOGPROMPTLISTSTART|DIALOGPROMPTMONEY|DIALOGPROMPTNUMBER|DIALOGPROMPTPASSWORD|DIALOGPROMPTRATE|DIALOGPROMPTYESNO|DIALOGSTART|DIALOGSTARTGROUPBOX|DIALOGTEXTLISTOPTION|DIALOGTEXTLISTSTART|DIM|DIVPROJECTINIT|EMAILLINE|EMAILSEND|EMAILSTART|ENTERCHARACTER|ENTERCODE|ENTERDATE|ENTERMONEY|ENTERNUMBER|ENTERRATE|ENTERYESNO|EXECUTE|EXP|FILEARCHIVEADD|FILEARCHIVEEXTRACT|FILECLOSE|FILECREATE|FILEDECRYPT|FILEDELETE|FILEENCRYPT|FILEGETPOS|FILELISTCLOSE|FILELISTOPEN|FILELISTREAD|FILEOPEN|FILEREAD|FILEREADLINE|FILESETPOS|FILEWRITE|FILEWRITELINE|FLOAT|FLOATVALUE|FLOOR|FMPERFORM|FORMAT|FTPCLOSE|FTPCMD|FTPGET|FTPLOGIN|FTPOPEN|FTPPUT|FULLYEAR|HEADER|HEADERS|HOUR|HPBOXDRAW|HPESC|HPFONT|HPLINEDRAW|HPLINESPERINCH|HPRESET|HPSETUP|HPUNDERLINE|HPXPOS|HPYPOS|HTMLVIEWDISPLAY|HTMLVIEWLINE|HTMLVIEWOPEN|INITCREDITREPORT|INITSUBROUTINE|INT|LENGTH|LOANPROJECTINIT|LOG|LOWERCASE|MD5HASH|MINUTE|MOD|MONEY|MONEYREAD|MONTH|NUMBER|NUMBERREAD|OUTPUTCLOSE|OUTPUTOPEN|OUTPUTSWITCH|PASSWORDHASH|POPUPMESSAGE|PRINT|PULLCREDITREPORT|PWR|QUEUECREDITREPORT|RATE|RATEREAD|REMOVE|QUEUE|REPEATCHR|SCREENXYPOS|SEGMENT|STOPBLINK|SUPPRESSNEWLINE|SYSUSERNAME|TOTAL|TRAILERS|TRANPERFORM|UPPERCASE|VALIDATEFIELDSET|VALUE|WHILELIMIT|WIDTH|WINDDECONNECT|WINDDEDISCONNECT|WINDDEEXECUTE|WINDDEPOKEDATA|WINDOWSSEND|WINMESSAGEFIELD|WINMESSAGESTART|YEAR|YESNOPROMPT|YESNOREAD/i,
});
const RecordType = createToken({
  name: 'Record Type',
  pattern: /ACCESS|ACCOUNT|ACHADDENDA|ACHADDINFO|ACHEDIT|ACHITEM|ACTIVITY|AGREEMENT|AGREEMENT TRANSACTION|ATMDIALOG|BATCHACHORIG|CARD|CASHLETTER|CASHORDER|CDMDIALOG|CHECK|CHECKORDER|COLLATERAL|COLLATERAL COLLHOLD|COLLATERAL DOCUMENT|COMMENT|CORPTRANSFER|CPWORKCARD|CREDREP|CREDREP ITEM|CTR|CTRACCOUNT|CTRBRANCH|CTRFOREIGN|CTRPERSON|CTRPERSON CTRTRANINFO|DEALER|EFT or BILL or PAYROLL|EFT ADDENDAINFO|ESCROW|ESCROWANALYSIS|EXCPADDENDA|EXCPADDINFO|EXCPITEM|EXTERNALACCOUNT|EXTERNALLOAN|FMHISTORY|GLACCOUNT|GLENTRY|GLHISTORY|GLSUBACCOUNT|GLTRAN|HOLD|HOUSEHOLD|INVENTORY|INVOICE|IRS or IRA|IRS DISTRIBUTION|LOAN BANKRUPTCY PRE-PETITIONBAL|LNSEGMENT|LOAN BANKRUPTCY|LOAN|LOANAPP|LOANAPP FINANCE|LOANAPP PERSON|LOOKUP|MBRADDRESS|MEMBERREC|NAME|NONACCTNAME|NOTE|OFACDETAILS|PARTICIPANT|PARTICIPANT TRANSACTION|PARTICIPATION or POOL|PARTICIPATIONLOAN or POOLLOAN|PAYEE|PLEDGE|PORTFOLIO|PREFERENCE|RECEIVEDITEM|REMITTANCE|RESERVEPLAN|RESERVEPLAN LOAN|RESERVEPLAN TRANSACTION|SCHEDULE|SHARE ANALYSIS|SHARE ANALYSISGROUP|SHARE ANALYSISPLAN|SHARE or SAVINGS|SITE|SITE CASHORDERTYPE|TRACKING|TRANSACTION|TRANSFER|USER|VENDOR|WESTERNUNION|WIRE|WIRE BENEFICIARYADV|WIRE BENEFICIARYFIADV|WIRE BENEFICIARYFIINFO|WIRE BENEFICIARYINFO|WIRE DRAWDOWNDEBITACCTADV|WIRE FITOFIINFO|WIRE INTERMEDFIADV|WIRE INTERMEDFIINFO|WIRE RECEIVERFIINFO|WIRE SERVICEMESSAGE|WIRE USCAUDITINFO|WORKLISTEDIT|WORKLISTEDIT|WORKLISTFIELD/i,
});
const Keyword = createToken({
  name: 'Keyword',
  pattern: /ACROSS|AFTERLAST|ALL|APPEND|BEFOREFIRST|BELL|BLINK|BLOCKSIZE|BRIGHT|CALL|CHANGE|CLEARSERVICE|CLEARWARNING|CREATE|DATAFILE|DELETE|DIALOGCLOSE|DIALOGDISPLAY|DIALOGENDGROUPBOX|DIALOGENDGROUPING|DIALOGINTROTEXT|DIALOGNEWCOLUMN|DIALOGPROMPTCOMBOEND|DIALOGPROMPTLISTEND|DIALOGSTARTGROUPING|DIALOGTEXTLISTEND|DIVPROJECTCALC|ENTERDELIMITER|ENTERLINE|EVERY #|FOR ACCOUNT|FORMLENGTH|#INCLUDE|LABELS|LASTACCOUNT|LASTCREATE|LASTSEQUENCE|LEFT|LNInsFromSh|LOANPROJECTCALC|LOC|MICRACCOUNTNUMBER|MODIFY|NEWLINE|NEWPAGE|NEXTULI|NONANSISTANDARD|NONE|OVERDRAWAVAILABLECALC|OVERDRAWAVAILABLEINIT|PREFIX|PRINTCONTROL|PROCEDURE|READ|READWRITE|RECORDSIZE|REPORTCATEGORY|REVISE|RIGHT|SAVEMODE|SET|SETSERVICE|SETWARNING|STARTING|SUBTOTAL|SUPPRESS|TARGETFILE|TERMINATE|TITLE|UNTIL|VIN|WINMESSAGESEND|WINMODETEXT|WINMODEWINDOWS|WRAP|WRITE/i,
});
const ProgrammingTerm = createToken({
  name: 'Programming Term',
  pattern: /AND|ANY|ASCII|EBCDIC|END|FOR|DO|END|IF|THEN|ELSE|LANDSCAPE|NOT|OR|PORTRAIT|REVLANDSCAPE|REVPORTRAIT|UNIQUEKEY|WHILE/i,
});
const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"(:?[^\\"]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
});
const NumberLiteral = createToken({
  name: 'NumberLiteral',
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
});
const Dash = createToken({ name: 'Dash', pattern: /-/ });
const Null = createToken({ name: 'Null', pattern: /null/ });
const LCurly = createToken({ name: 'LCurly', pattern: /{/ });
const RCurly = createToken({ name: 'RCurly', pattern: /}/ });
const LSquare = createToken({ name: 'LSquare', pattern: /\[/ });
const RSquare = createToken({ name: 'RSquare', pattern: /]/ });
const Comma = createToken({ name: 'Comma', pattern: /,/ });
const Colon = createToken({ name: 'Colon', pattern: /:/ });
const Assignment = createToken({ name: 'Assignment', pattern: /=/ });

const Word = createToken({ name: 'Word', pattern: /[\w\d]+/i });

const allTokens = [
  Null,
  LCurly,
  RCurly,
  LSquare,
  RSquare,
  Comma,
  Colon,
  Dash,
  Assignment,
  WhiteSpace,
  Division,
  DataType,
  FunctionType,
  RecordType,
  Keyword,
  ProgrammingTerm,
  StringLiteral,
  NumberLiteral,
  Word,
];

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

class PowerOnParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }
}

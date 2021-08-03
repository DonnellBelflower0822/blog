const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{aaaaa}}

function genProps(attrs) {
  return attrs.reduce((str, attr, index) => {
    if (attr.name === 'style') {
      const styleObj = {};
      attr.value.replace(/([^:;]+)\:([^:;]+)/g, (...args) => {
        styleObj[args[1]] = args[2];
      });
      attr.value = styleObj;
    }

    return `${str}${index === 0 ? '' : ','}${attr.name}:${JSON.stringify(attr.value)}`;
  }, '');
}

function gen(ast) {
  // 元素
  if (ast.type === 1) {
    return generate(ast);
  }

  // 'hello-{{name}}world'
  let { text } = ast;

  if (!defaultTagRE.test(text)) {
    return `_v('${text}')`;
  }

  const tokens = [];
  let match;
  let lastIndex = defaultTagRE.lastIndex = 0;
  while (match = defaultTagRE.exec(text)) {
    let index = match.index;
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    
    tokens.push(`_s(${match[1].trim()})`);
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }

  // _v("hello-"+name+"world")
  return `_v(${tokens.join('+')})`;
}

function genChildren(ast) {
  const { children } = ast;

  if (!children) {
    return '';
  }

  return children.map(child => gen(child)).join(',');
}

// ast -> render string
export function generate(ast): string {
  const children = genChildren(ast);
  const code = `_c('${ast.tag}',${ast.attrs && ast.attrs.length ? `{${genProps(ast.attrs)}}` : 'undefined'}${children ? `,${children}` : ''})`;

  return code;
}
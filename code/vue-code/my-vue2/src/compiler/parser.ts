const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名 
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //  用来获取的标签名的 match后的索引为1的
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配开始标签的 
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配闭合标签的
//           aa  =   "  xxx "  | '  xxxx '  | xxx
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // a=b  a="b"  a='b'
const startTagClose = /^\s*(\/?)>/; //     />   <div/>

let root;
const stack = [];

function createAstElement(tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    parent: null,
    attrs
  };
}

function start(tagName: string, attributes) {
  const parent = stack[stack.length - 1];
  const element = createAstElement(tagName, attributes);
  if (!root) {
    root = element;
  }

  element.parent = parent;
  if (parent) {
    parent.children.push(element);
  }

  stack.push(element);
}
function end(tagName: string) {
  const last = stack.pop();
  if (last.tag !== tagName) {
    console.error('标签有误');
  }
}
function chars(text) {
  text = text.replace(/\s/g, '');

  const parent = stack[stack.length - 1];
  if (text) {
    parent.children.push({ type: 3, text });
  }
}

export function parserHTML(html: string) {
  function advance(len) {
    html = html.substring(len);
    return html;
  }

  function parserStartTag(html) {
    const start = html.match(startTagOpen);
    if (!start) {
      return false;
    }

    const match = {
      tagName: start[1],
      attrs: []
    };
    html = advance(start[0].length);

    let end;
    let attr;
    while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      html = advance(attr[0].length);

      match.attrs.push({
        name: attr[1],
        value: attr[3] || attr[4] || attr[5]
      });
    }

    if (end) {
      html = advance(end[0].length);
    }

    return match;
  }

  while (html) {
    const textEnd = html.indexOf('<');

    if (textEnd === 0) {
      // 1. <div>
      // 开始
      const startTagMatch = parserStartTag(html);
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      // 2. </div>
      // 结束
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        end(endTagMatch[1]);
        html = advance(endTagMatch[0].length);
        continue;
      }
    }

    // 文本
    let text;
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }

    if (text) {
      chars(text);
      html = advance(text.length);
    }
  }

  return root;
}
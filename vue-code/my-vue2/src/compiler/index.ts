import { generate } from './generate';
import { parserHTML } from './parser';

export function compileToFunction(template: string) {
  // 1. 将template转换成ast
  // '<div id="app"><div>{{name}}</div><div>{{name}}</div></div>'(string) -> ast:Ast
  // export interface Ast {
  // tag: string,
  // type: 1 | 3;
  // children: Ast[],
  // parent: Ast | null,
  // attrs: Attr[];
  // text?: string;
  // }
  const root = parserHTML(template);

  // 2. 对静态语法做静态标记
  // ast -> "_c('div',id="app",style={"color":"red","backgroundColor":" blue"},_c('div',undefined,_v("hello-"+name+"world")))"
  const code = generate(root);

  // 3. 重新生成代码
  // string -> render
  const render = new Function(`with(this){return ${code}}`);
  return render;
}
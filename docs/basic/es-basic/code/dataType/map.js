const map = new Map([
  ['name', '张三'],
  ['title', 'Author'],
  [{}, '李四'],
]);

// Map { 'name' => '张三', 'title' => 'Author', {} => '李四' }
console.log(map)

// [Map Iterator] { '张三', 'Author', '李四' }
console.log(map.values())

// [Map Iterator] { 'name', 'title', {} }
console.log(map.keys())

// [Map Entries] { [ 'name', '张三' ], [ 'title', 'Author' ], [ {}, '李四' ] }
console.log(map.entries())
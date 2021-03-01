# lp-react-tree-drag 树形拖拽排序

树形拖拽排序组件。

### 安装

```js
npm i -S lp-react-tree-drag
```

### 使用

| 属性        | 类型              | 默认值 | 备注             |
| ----------- | ----------------- | ------ | ---------------- |
| expandedAll | Boolean           | false  | 默认是否展开节点 |
| showLine    | Boolean           | false  | 是否显示组连线   |
| Data        | `Array<TreeData>` | []     | 树信息           |

#### `TreeData`

| 属性        | 类型                             | 默认值 | 备注             |
| ----------- | -------------------------------- | ------ | ---------------- |
| title       | String                           |        |                  |
| type        | `emun {'page', 'group', 'link'}` |        |                  |
| children    | `Array<TreeData>`                |        |                  |
| renderOp    | `Function(props):ReactElement`   |        | 自定义渲染操作区 |
| renderIcon  | `Function(props):ReactElement`   |        | 自定义渲染图标   |
| renderTitle | `Function(props):ReactElement`   |        | 自定义渲染标题   |

### 示例

```js
import React from "react";
import ReactDOM from "react-dom";
import LpReactTreeDrag from "lp-react-tree-drag";

ReactDOM.render(
  <React.StrictMode>
    <LpReactTreeDrag
      expandedAll={true}
      showLine={true}
      data={[
        {
          title: "首页",
          type: "page",
          children: [],
          renderOp: (props) => (
            <>
              <a href="#">编辑</a>&nbsp;
              <a href="#">隐藏</a>
            </>
          ),
        },
        {
          title: "团队管理",
          type: "group",
          expanded: !0,
          renderOp: (props) => (
            <>
              <a href="#">编辑</a>&nbsp;
              <a href="#">隐藏</a>
            </>
          ),
          children: [
            {
              title: "技术管理",
              type: "page",
              children: [],
              renderOp: (props) => (
                <>
                  <a href="#">编辑</a>&nbsp;
                  <a href="#">隐藏</a>
                </>
              ),
            },
            {
              title: "战役管理",
              type: "page",
              children: [],
              renderOp: (props) => (
                <>
                  <a href="#">编辑</a>&nbsp;
                  <a href="#">隐藏</a>
                </>
              ),
            },
            { title: "a1", type: "page", children: [] },
            { title: "a2", type: "page", children: [] },
            {
              title: "事项管理",
              type: "group",
              renderOp: (props) => (
                <>
                  <a href="#">编辑</a>&nbsp;
                  <a href="#">隐藏</a>
                </>
              ),
              children: [
                { title: "产品管理", type: "page", children: [] },
                { title: "业务管理", type: "page", children: [] },
              ],
            },
          ],
        },
        {
          title: "关于我们",
          type: "link",
          children: [],
          renderOp: (props) => (
            <>
              <a href="#">编辑</a>&nbsp;
              <a href="#">隐藏</a>
            </>
          ),
        },
      ]}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

```

![](https://img.alicdn.com/imgextra/i3/O1CN013GCVrb1STAcfOlpwV_!!6000000002247-1-tps-670-358.gif)
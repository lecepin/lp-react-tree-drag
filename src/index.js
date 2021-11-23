import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Tree.jsx";

ReactDOM.render(
  <React.StrictMode>
    <App
      expandedAll={true}
      showLine={true}
      // onChange={}
      onHover={(item) => {
        console.log("onHover", item);
      }}
      onClick={(item) => {
        console.log("onClick", item);
      }}
      onChange={(data) => {
        console.log("onChage", data);
      }}
      data={[
        {
          title: "首页",
          id: 1,
        },
        {
          title: "首页2",
          id: 2,
        },
        {
          title: "首页3",
          id: 3,
        },
        {
          title: "首页4",
          id: 4,
        },
      ]}
      // data={[
      //   {
      //     title: "首页",
      //     type: "page",
      //     children: [],
      //     renderOp: (props) => (
      //       <>
      //         <a href="#">编辑</a>&nbsp;
      //         <a href="#">隐藏</a>
      //       </>
      //     ),
      //   },
      //   {
      //     title: "团队管理",
      //     type: "group",
      //     expanded: !0,
      //     renderOp: (props) => (
      //       <>
      //         <a href="#">编辑</a>&nbsp;
      //         <a href="#">隐藏</a>
      //       </>
      //     ),
      //     children: [
      //       {
      //         title: "技术管理",
      //         type: "page",
      //         children: [],
      //         renderOp: (props) => (
      //           <>
      //             <a href="#">编辑</a>&nbsp;
      //             <a href="#">隐藏</a>
      //           </>
      //         ),
      //       },
      //       {
      //         title: "战役管理",
      //         type: "page",
      //         children: [],
      //         renderOp: (props) => (
      //           <>
      //             <a href="#">编辑</a>&nbsp;
      //             <a href="#">隐藏</a>
      //           </>
      //         ),
      //       },
      //       { title: "a1", type: "page", children: [] },
      //       { title: "a2", type: "page", children: [] },
      //       {
      //         title: "事项管理",
      //         type: "group",
      //         renderOp: (props) => (
      //           <>
      //             <a href="#">编辑</a>&nbsp;
      //             <a href="#">隐藏</a>
      //           </>
      //         ),
      //         children: [
      //           { title: "产品管理", type: "page", children: [] },
      //           { title: "业务管理", type: "page", children: [] },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     title: "关于我们",
      //     type: "link",
      //     children: [],
      //     renderOp: (props) => (
      //       <>
      //         <a href="#">编辑</a>&nbsp;
      //         <a href="#">隐藏</a>
      //       </>
      //     ),
      //   },
      // ]}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDom from "react-dom";
import { get, uniqueId, cloneDeep } from "lodash";

import TreeGroup from "./TreeGroup.jsx";
import TreeNode from "./TreeNode.jsx";
import { addObjecKey, getNodeByIdAndDel, setNodeByIdAndInsert } from "./utils";
import "./Tree.css";

export default class Tree extends React.Component {
  static defaultProps = {
    data: [],
    expandedAll: false,
    showLine: false,
    key: Date.now(),
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      expandedAll: false,
      showLine: false,
    };
    this.dragEnterIndex = this.dragEnterDOM = this.dragPlaceholderIndex = this.refDragPlaceholder = this.data = null;
  }

  componentDidMount() {
    this.setState({
      data: this.props.data.map((item) =>
        addObjecKey(item, "__lp_tree_node_id", uniqueId)
      ),
      expandedAll: this.props.expandedAll,
      showLine: this.props.showLine,
    });
  }

  render() {
    const { data, expandedAll, showLine, key } = this.state;

    return (
      <div
        key={key}
        className="lp-react-tree-drag-Tree"
        onDrag={(e) => {
          if (!this.dragEnterDOM) {
            return;
          }

          // 可插入节点的父级容器
          const elParent =
            this.dragEnterDOM.parentElement.className ==
            "lp-react-tree-drag-TreeGroup-node"
              ? this.dragEnterDOM.parentElement.lastElementChild // group则取child容器
              : this.dragEnterDOM.parentElement;

          // 接收元素的实际位置
          const {
            top: enterElTop,
            height: enterElHeight,
          } = this.dragEnterDOM.getBoundingClientRect();

          // 如果是group的底部，是否在边界区域
          if (
            [...this.dragEnterDOM.classList].includes(
              "lp-react-tree-drag-TreeGroup-node-ch"
            )
          ) {
            if (
              e.clientY < enterElTop + enterElHeight &&
              e.clientY > enterElTop + enterElHeight - 5
            ) {
              this.dragEnterDOM.parentElement.parentElement.parentElement.insertBefore(
                this.refDragPlaceholder,
                this.dragEnterDOM.parentElement.parentElement.nextElementSibling
              );
              setNodeByIdAndInsert(
                this.data,
                this.dragEnterIndex,
                getNodeByIdAndDel(this.data, this.dragPlaceholderIndex),
                "appendAfter"
              );
            }
            return;
          }

          // 通过id取 拖动元素的实际值，并从对象上删除这个id key
          const placeholderData = getNodeByIdAndDel(
            this.data,
            this.dragPlaceholderIndex
          );

          if (e.clientY < enterElTop + enterElHeight / 2) {
            // 在接收元素的上面
            if (
              this.dragEnterDOM.parentElement.className ==
              "lp-react-tree-drag-TreeGroup-node" // 如果接收元素是 group 节点
            ) {
              this.dragEnterDOM.parentElement.parentElement.parentElement.insertBefore(
                this.refDragPlaceholder,
                this.dragEnterDOM.parentElement.parentElement
              );
            } else {
              elParent.insertBefore(this.refDragPlaceholder, this.dragEnterDOM);
            }
            setNodeByIdAndInsert(
              this.data,
              this.dragEnterIndex,
              placeholderData,
              "insertBefore"
            );
          } else {
            // 在接收元素的下面
            if (
              this.dragEnterDOM.parentElement.className ==
              "lp-react-tree-drag-TreeGroup-node" // 如果接收元素是 group 节点
            ) {
              // 当前点的children追加
              elParent.appendChild(this.refDragPlaceholder);
              setNodeByIdAndInsert(
                this.data,
                this.dragEnterIndex,
                placeholderData,
                "appendChild"
              );
            } else {
              elParent.insertBefore(
                this.refDragPlaceholder,
                this.dragEnterDOM.nextElementSibling
              );
              setNodeByIdAndInsert(
                this.data,
                this.dragEnterIndex,
                placeholderData,
                "appendAfter"
              );
            }
          }

          this.dragEnterDOM = null;
        }}
        onDragStart={(e) => {
          this.dragPlaceholderIndex = e.target.dataset.__lp_tree_node_id;
          this.data = cloneDeep(data);
        }}
        onDragEnd={(e) => {
          this.dragEnterDOM = null;
          this.refDragPlaceholder.style.display = "none";
          this.setState({
            data: this.data,
            key: Date.now(),
          });
        }}
        onDragEnter={(e) => {
          // 是否是可接收的节点
          if (
            e.target.className == "lp-react-tree-drag-TreeNode" &&
            e.target.firstElementChild.dataset.__lp_tree_node_id
          ) {
            this.dragEnterIndex =
              e.target.firstElementChild.dataset.__lp_tree_node_id;
            this.dragEnterDOM = e.target;
          } else if (
            [...e.target.classList].includes(
              "lp-react-tree-drag-TreeGroup-node-ch"
            )
          ) {
            this.dragEnterIndex =
              e.target.parentElement.firstElementChild.firstElementChild.dataset.__lp_tree_node_id;
            this.dragEnterDOM = e.target;
          } else {
            return;
          }

          // 显示占位符
          this.refDragPlaceholder.style.display = "block";

          if (
            this.dragEnterDOM.parentElement.className ==
            "lp-react-tree-drag-TreeGroup-node"
          ) {
            this.dragEnterDOM.parentElement.parentElement.classList.remove(
              "lp-react-tree-drag-TreeGroup-collapse"
            );
          }

          // 拖拽 和 接收的 是否是同一个元素，或者不合格的元素
          if (
            this.dragEnterIndex == this.dragPlaceholderIndex ||
            !this.dragEnterIndex
          ) {
            return;
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {(data || []).map((node) =>
          node.type == "group" ? (
            <TreeGroup
              {...node}
              expanded={expandedAll ? true : node.expanded}
              expandedAll={expandedAll}
              showLine={showLine}
            />
          ) : (
            <TreeNode {...node} />
          )
        )}
        <div
          className="lp-react-tree-drag-TreeNode-placeholder"
          ref={(r) => (this.refDragPlaceholder = ReactDom.findDOMNode(r))}
        ></div>
      </div>
    );
  }
}

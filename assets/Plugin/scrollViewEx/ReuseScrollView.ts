/****************************************************
文件：ReuseScrollView.ts
作者：woodlai
邮箱: 1870569285@qq.com
日期：2021年3月16日
功能：复用滑动视图
通过事件 ReuseScrollView.Event确定刷新子节点

*****************************************************/

import { _decorator, ScrollView, Enum, Size, size, Node, v2, CCInteger } from "cc";
import { NodeUtil } from "../tools/NodeUtil";

/**复用事件 */
const ReuseEvent = {
    Forward: "Forward",  //正向 ，向上滑 ，向左滑    
    Reverse: "Reverse", //反向 ，向下滑 ,向右滑
}
/**滑动方向--默认为横向 */
enum ScrollDir {
    /**横向方向 */
    HORIZONTAL = 0,
    /**纵向方向 */
    VERTICAL,
}

const { ccclass, property } = _decorator;
@ccclass
/**复用滑动视图 */
export default class ReuseScrollView extends ScrollView {
    static Event = ReuseEvent;

    @property({
        tooltip: "滑动方向",
        type: Enum(ScrollDir)
    })
    protected scrollDir: ScrollDir = ScrollDir.HORIZONTAL;
    @property({
        type: CCInteger,
        tooltip: "content最大子节点数"
    })
    protected maxUnitNum = 10;
    @property({
        tooltip: "子节点的统一大小"
    })
    protected unitSize: Size = size(200, 180);
    @property({
        tooltip: "content的前间距"
    })
    protected forwardPadding: number = 100;
    @property({
        tooltip: "content的后间距"
    })
    protected reversePadding: number = 400;


    protected forwardPos: number;  //顶部 ,到达需要更新位置
    protected reversePos: number;  //底部

    protected curContentPos: number = 0;
    protected lastContentPos: number = 0;

    protected dataLength: number = 0;   //数据的长度
    protected endIndex: number = -1;  //数据列表最后一个下标


    protected unitList: { node: Node, originIdnex: number }[] = [];  //节点+原始下标 数组

    get config() {
        return {
            maxUnitNum: this.maxUnitNum,
            unitSize: this.unitSize,
            forwardPadding: this.forwardPadding,
            reversePadding: this.reversePadding,
        }
    }

    protected onLoad() {
        this.registerEvent();
        let worldPos = NodeUtil.convertToWorldSpaceAR(this.node);
        let contentSize = NodeUtil.getContentSize(this.node);
        let anchor = NodeUtil.getAnchor(this.node);

        switch (this.scrollDir) {
            case ScrollDir.HORIZONTAL:
                this.forwardPos = worldPos.x - contentSize.width * (1 - anchor.x) - this.unitSize.width * 1.5;  //最左
                this.reversePos = worldPos.x + contentSize.width * anchor.y + this.unitSize.width * 1.5; //最右
                break;
            case ScrollDir.VERTICAL:
                this.forwardPos = worldPos.y + contentSize.height * (1 - anchor.y) + this.unitSize.height * 1.5;  //最上
                this.reversePos = worldPos.y - contentSize.height * anchor.y - this.unitSize.height * 1.5; //最下
                break;
        }

        // console.log(worldPos.y, this.top, this.bottom);
    }

    protected onDestroy() {
        super.onDestroy();
        this.removeEvent();
    }
    /**注册事件 */
    protected registerEvent() {
        //滑动事件 
        this.node.on("scrolling", this.onScrolling, this);
    }
    /**注销事件 */
    protected removeEvent() {
        this.node.off("scrolling", this.onScrolling, this);
    }

    /**滑动事件回调 */
    protected onScrolling(event: ScrollView) {
        if (this.scrollDir == ScrollDir.HORIZONTAL) {
            this.onHorizontalScrolling(event);
        } else if (this.scrollDir == ScrollDir.VERTICAL) {
            this.onVerticalScrolling(event);
        }

    }
    /**纵向滑动事件回调 */
    protected onVerticalScrolling(event: ScrollView) {
        if (this.unitList.length == 0) return;
        this.curContentPos = this.content.getPosition().y;
        let offset = this.curContentPos - this.lastContentPos;
        this.lastContentPos = this.curContentPos;
        if (offset > 5) {
            //上滑操作时
            let moveNode = this.unitList[0].node;  //数组内第一个节点
            if (this.getPosToWorld(moveNode).y > this.forwardPos) {
                this.endIndex++;
                if (this.endIndex >= this.dataLength) {
                    this.endIndex--;
                    return;
                }

                let temp = this.unitList.shift();
                this.unitList.push(temp);
                let pos = temp.node.getPosition();
                pos.y -= this.unitSize.height * this.maxUnitNum;
                temp.node.setPosition(pos);

                //发送刷新事件
                this.node.emit(ReuseScrollView.Event.Forward,
                    { originIndex: temp.originIdnex, dataIndex: this.endIndex }
                );
            }
        }
        else if (offset < -5) {
            //  console.log("下滑")
            let moveNode = this.unitList[this.unitList.length - 1].node;  //数组内最后一个节点
            let tempEnd = this.endIndex;       //未改变前的最大下标
            if (this.getPosToWorld(moveNode).y < this.reversePos) {
                this.endIndex--;
                let showId = tempEnd - this.maxUnitNum;
                if (showId < 0) {
                    this.endIndex++;
                    return;
                }

                let temp = this.unitList.pop();
                this.unitList.unshift(temp);
                let pos = temp.node.getPosition();
                pos.y += this.unitSize.height * this.maxUnitNum;
                temp.node.setPosition(pos);


                //发送刷新事件
                this.node.emit(ReuseScrollView.Event.Reverse,
                    { originIndex: temp.originIdnex, dataIndex: this.endIndex }
                );
            }
        }
    }
    /**横向滑动事件回调 */
    protected onHorizontalScrolling(event: ScrollView) {
        if (this.unitList.length == 0) return;
        this.curContentPos = this.content.getPosition().x;
        let offset = this.curContentPos - this.lastContentPos;
        this.lastContentPos = this.curContentPos;
        if (offset > 5) {
            //  console.log("右滑")
            let moveNode = this.unitList[this.unitList.length - 1].node;  //数组内最后一个节点
            let tempEnd = this.endIndex;       //未改变前的最大下标
            if (this.getPosToWorld(moveNode).x > this.reversePos) {
                this.endIndex--;
                let showId = tempEnd - this.maxUnitNum;
                if (showId < 0) {
                    this.endIndex++;
                    return;
                }

                let temp = this.unitList.pop();
                this.unitList.unshift(temp);
                let pos = temp.node.getPosition();
                pos.x -= this.unitSize.width * this.maxUnitNum;
                temp.node.setPosition(pos);

                //发送刷新事件
                this.node.emit(ReuseScrollView.Event.Reverse,
                    { originIndex: temp.originIdnex, dataIndex: this.endIndex }
                );
            }
        }
        else if (offset < -5) {
            //左滑操作时
            let moveNode = this.unitList[0].node;  //数组内第一个节点
            if (this.getPosToWorld(moveNode).x < this.forwardPos) {
                this.endIndex++;
                if (this.endIndex >= this.dataLength) {
                    this.endIndex--;
                    return;
                }

                let temp = this.unitList.shift();
                this.unitList.push(temp);
                let pos = temp.node.getPosition();
                pos.x += this.unitSize.width * this.maxUnitNum;
                temp.node.setPosition(pos);

                //发送刷新事件
                this.node.emit(ReuseScrollView.Event.Forward,
                    { originIndex: temp.originIdnex, dataIndex: this.endIndex }
                );
            }
        }
    }

    /**获取世界坐标 */
    protected getPosToWorld(node: Node) {
        return NodeUtil.convertToWorldSpaceAR(node);
    }

    /**设置外部要刷新的数据列表 */
    setDataLength(len: number) {
        this.dataLength = len;
        this.unitList = this.content.children.map((node, index) => {
            return { node: node, originIdnex: index }
        })
    }
    /**设置最后一个数据下标 */
    setEndIndex(index: number) {
        this.endIndex = index;
    }
    /**设置容器的位置*/
    setContentPos(value: number) {
        switch (this.scrollDir) {
            case ScrollDir.HORIZONTAL:
                NodeUtil.setPosX(this.content, value);
                this.curContentPos = this.lastContentPos = value;
                break;

            case ScrollDir.VERTICAL:
                NodeUtil.setPosY(this.content, value);
                this.curContentPos = this.lastContentPos = value;
                break;
        }
    }
    /**设置容器的大小*/
    setContentSize(value: number) {
        switch (this.scrollDir) {
            case ScrollDir.HORIZONTAL:
                NodeUtil.setWidth(this.content, value);
                break;

            case ScrollDir.VERTICAL:
                NodeUtil.setHeight(this.content, value);
                break;
        }
    }


}
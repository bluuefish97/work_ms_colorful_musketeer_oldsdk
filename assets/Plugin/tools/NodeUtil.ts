import { Vec3, Node, _decorator, Camera, UITransform, v3, UIOpacity, tween, Vec2, TweenSystem, bezier, Tween, view } from 'cc';

/**节点工具 */
export class NodeUtil {

    /**节点开关 */
    static nodeSwitch(node: Node, isOpen: boolean) {
        node.active = isOpen;
    }

    /** 停止tween*/
    static stopTween(node: Node) {
        Tween.stopAllByTarget(node)
    }
    /** 暂停tween*/
    static pauseTween(node: Node) {
        TweenSystem.instance.ActionManager.pauseTarget(node)
    }
    /** 恢复tween*/
    static resumeTween(node: Node) {
        TweenSystem.instance.ActionManager.resumeTarget(node)
    }
    //获得bezier动画缓动
    static getBezierProgress(posArr: Vec3[]) {
        let c1 = posArr[0];
        let c2 = posArr[1];
        let targetPos = posArr[2];

        let c0x = c1.x, c0y = c1.y, c0z = c1.z,
            c1x = c2.x, c1y = c2.y, c1z = c2.z;
        let progress = (start:any, end:any, current:any, t:any) => {
            if (end == targetPos.x) {
                return bezier(start, c0x, c1x, end, t);
            }
            else if (end == targetPos.y) {
                return bezier(start, c0y, c1y, end, t);
            }
            else if (end == targetPos.z) {
                return bezier(start, c0z, c1z, end, t);
            }
        }
        return progress;
    }
    //设置节点的位置 
    static setPosition(node: Node, pos: Vec2 | Vec3 = v3(0, 0, 0)) {
        if (pos instanceof Vec2) {
            pos = v3(pos.x, pos.y, 0)
        }
        node.setPosition(pos);
    }
    static setPosX(node: Node, posX: number) {
        let tempPos = node.getPosition();
        node.setPosition(posX, tempPos.y, tempPos.z);
    }
    static setPosY(node: Node, posY: number) {
        let tempPos = node.getPosition();
        node.setPosition(tempPos.x, posY, tempPos.z);
    }

    static setPosZ(node: Node, posZ: number) {
        let tempPos = node.getPosition();
        node.setPosition(tempPos.x, tempPos.y, posZ);
    }


    //------------------------
    //设置节点的缩放
    static setScale(node: Node, value: number) {
        node.setScale(v3(value, value, value));
    }
    static setScaleX(node: Node, scaleX: number) {
        let tempScale = node.getScale();
        node.setScale(scaleX, tempScale.y, tempScale.z);
    }
    static setScaleY(node: Node, scaleY: number) {
        let tempScale = node.getScale();
        node.setScale(tempScale.x, scaleY, tempScale.z);
    }
    static setScaleZ(node: Node, scaleZ: number) {
        let tempScale = node.getScale();
        node.setScale(tempScale.x, tempScale.y, scaleZ);
    }
    //------------------------
    //设置节点的旋转度
    static setEulerAngles(node: Node, value: number | Vec3) {
        if (value instanceof Vec3) {
            node.eulerAngles = value;
        } else {
            node.eulerAngles = v3(value, value, value);
        }
    }
    static setEulerAnglesX(node: Node, angleX: number) {
        let tempAngle = node.eulerAngles;
        node.eulerAngles = v3(angleX, tempAngle.y, tempAngle.z);
    }
    static setEulerAnglesY(node: Node, angleY: number) {
        let tempAngle = node.eulerAngles;
        node.eulerAngles = v3(tempAngle.x, angleY, tempAngle.z);
    }
    static setEulerAnglesZ(node: Node, angleZ: number) {
        let tempAngle = node.eulerAngles;
        node.eulerAngles = v3(tempAngle.x, tempAngle.y, angleZ);
    }
    //------------------------
    //设置节点的透明值
    static setOpacity(node: Node, value: number) {
        node.getComponent(UIOpacity).opacity = value;
    }
    static getOpacity(node: Node) {
        return node.getComponent(UIOpacity).opacity;
    }
    //动作
    static fadeTo(node: Node, value: number, dur: number, cal?: Function) {
        let com = node.getComponent(UIOpacity);
        tween(com)
            .to(dur, { opacity: value })
            .call(() => {
                cal && cal();
            })
            .start();
    }

    //------------------------
    //设置节点的size
    static setContentSize(node: Node,
        width: number = view.getVisibleSize().width, height: number =  view.getVisibleSize().height) {
        node.getComponent(UITransform).setContentSize(width, height);
    }
    static setWidth(node: Node, width: number) {
        let tempSize = NodeUtil.getContentSize(node);
        node.getComponent(UITransform).setContentSize(width, tempSize.height);
    }
    static setHeight(node: Node, height: number) {
        let tempSize = NodeUtil.getContentSize(node);
        node.getComponent(UITransform).setContentSize(tempSize.width, height);
    }
    static getContentSize(node: Node) {
        return node.getComponent(UITransform).contentSize;
    }
    //------------------------
    //设置节点的锚点
    static setAnchor(node: Node, point: Vec2) {
        node.getComponent(UITransform).setAnchorPoint(point);
    }
    static getAnchor(node: Node) {
        return node.getComponent(UITransform).anchorPoint;
    }

    //------------------------
    //获取节点的位置 
    // 转化到本地坐标
    static convertToNodeSpaceAR(param: Node | Vec3, uiNode: Node) {
        let worldPos = param instanceof Node ? NodeUtil.convertToWorldSpaceAR(param) : param;
        let localPos = v3();
        let uiTransform = uiNode.getComponent(UITransform);
        if (uiTransform) {
            localPos = uiTransform.convertToNodeSpaceAR(worldPos);
        } else {
            localPos = worldPos.subtract(NodeUtil.convertToWorldSpaceAR(uiNode));
        }
        return localPos;
    }
    // 转化到世界坐标
    static convertToWorldSpaceAR(node: Node) {
        let worldPos = v3();
        let uiTransform = node.getComponent(UITransform);
        if (uiTransform) {
            worldPos = uiTransform.convertToWorldSpaceAR(v3(0, 0, 0));
        } else {
            worldPos = node.getWorldPosition();
        }
        return worldPos;
    }
    //------------------------

}

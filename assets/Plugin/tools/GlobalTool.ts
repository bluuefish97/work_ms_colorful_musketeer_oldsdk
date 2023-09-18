
import { _decorator, Component, Node, UITransform, view, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalTool')
export class GlobalTool {

    /**
     * 适配窗口
     */
    static adapterView(node: Node) {
        node.getComponent(UITransform).setContentSize(view.getVisibleSize().width, view.getVisibleSize().height);
        node.setPosition(view.getVisibleSize().width / 2, view.getVisibleSize().height / 2);
    }

    /** 
    *数字滚动增加动画
    */
    public static addScoreAnim(orignNum: number, offsetNum: number, dur: number, cal: Function, endCal = () => { }) {
        var target = orignNum + offsetNum;

        var callback = function () {
            if (offsetNum > 10000) {
                orignNum += 2000;
            } else if (offsetNum > 1000) {
                orignNum += 200;
            } else if (offsetNum > 100) {
                orignNum += 20;
            } else if (offsetNum > 10) {
                orignNum += 4;
            } else if (offsetNum > 0) {
                orignNum += 1;
            }
            else {
                clearInterval(intervalId);
                endCal();
                //this._startRollNum=false;
            }


            offsetNum = Math.abs(target - orignNum)
            cal(orignNum);
        }
        let intervalId = setInterval(callback, dur);
    }

    /**
     * 文字滚动
     * @param node 
     * @param speed 
     * @param context 
     */
    static roll(node: Node, speed: number, context: Component) {
        /**滚动 */
        let rollBg = function (node: Node, dt: number) {
            let targetPos = node.getPosition();
            targetPos.x -= dt / node.scale.x * speed;
            if (node.getComponent(UITransform).anchorX == 0) {
                if (targetPos.x <= -node.getComponent(UITransform).width) {
                    targetPos.x = node.parent.getComponent(UITransform).width / 2;
                }
            }
            else if (node.getComponent(UITransform).anchorX == 0.5) {
                if (targetPos.x <= -(node.getComponent(UITransform).width + node.parent.getComponent(UITransform).width) / 2) {
                    targetPos.x = node.getComponent(UITransform).width / 2;
                }
            }
            node.setPosition(targetPos);
        }
        let dt = 0.016
        context.schedule(function () {
            rollBg(node, dt)
        }, dt)

    }

    /**
     * 置顶吸附
     */
    static dynamicRegionAdsorb(targetRegion: Node, dynamicRegion: Node, contentNode: Node, adsorbDir: string, cal: Function) {
        let worldTargetPos = targetRegion.worldPosition;
        let worldDynamicPos = dynamicRegion.worldPosition;
        let isTrigger: boolean = false;
        switch (adsorbDir) {
            case "left":
                isTrigger = worldTargetPos.x > worldDynamicPos.x;
                break;
            case "right":
                isTrigger = worldTargetPos.x < worldDynamicPos.x;
                break;
            case "top":
                isTrigger = Math.round(worldTargetPos.y) < Math.round(worldDynamicPos.y);
                break;
            case "bottom":
                isTrigger = worldTargetPos.y > worldDynamicPos.y;
                break;

            default:
                break;
        }

        if (isTrigger) {
            if (targetRegion.children.length > 0) return;
            cal(isTrigger)
            dynamicRegion.removeAllChildren();
            targetRegion.addChild(contentNode);
        }
        else {
            if (dynamicRegion.children.length > 0) return;
            cal(isTrigger)
            targetRegion.removeAllChildren();
            dynamicRegion.addChild(contentNode);
        }
    }

    /**判断实例是否实现了接口 */
    static instanceOfInterface<T>(obj: any, key: string): obj is T {
        return key in obj;
    }
}

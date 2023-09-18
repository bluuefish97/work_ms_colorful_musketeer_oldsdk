import { _decorator, Node, ScrollView, EventTouch, UITransform, Event } from 'cc';
import { GlobalTool } from '../tools/GlobalTool';


const { ccclass, property } = _decorator;
@ccclass('NestableScrollView_Outer')
export class NestableScrollView_Outer extends ScrollView {
    @property(ScrollView)
    m_InnerScrollViews: ScrollView[] = [];  //挂内嵌的ScrollView


    m_PlanDir :any= null;                                    //计划方向, 本次滑动的目的方向。根据刚开始滑动的方向决定 0为不限制方向, 1为横, -1为纵
    m_ScrollingInnerSv: ScrollView = null;

    onLoad() {
        this.m_PlanDir = null;

        this.m_InnerScrollViews = this.m_InnerScrollViews.filter(scrollView => {
            if (GlobalTool.instanceOfInterface<INestable_Inner>(scrollView, "setOuterScrollView")) {
                scrollView.setOuterScrollView(this);
                return true;
            } else {
                return false;
            }
        });

    }

    //是否为子物体
    //注意，这里递归, 如果child藏的太深, 可能影响效率。其实也还好，只是开始滑动时执行一次。
    _isHisChild(child:Node, undeterminedParent:Node):boolean {
        if (child == undeterminedParent) {
            return true;
        }
        if (child.parent != null) {
            if (child.parent == undeterminedParent) {
                return true;
            } else {
                return this._isHisChild(child.parent, undeterminedParent);
            }
        }
        return false;
    }

    //判断Target是否是InnerScrollView的子物体, 如果是，就返回这个InnerScrollView。
    //注意，这里遍历所有InnerScrollView, 如果InnerScrollView数量太多，可能影响效率。其实也还好，只是开始滑动时执行一次。
    _findScrollingInnerSv(target:any) {
        for (let i = 0; i < this.m_InnerScrollViews.length; i++) {
            let isHisChild = this._isHisChild(target, this.m_InnerScrollViews[i].node);
            if (isHisChild) {
                return this.m_InnerScrollViews[i];
            }
        }



        return null;
    }

    //检查实际与计划方向的一致性
    isDifferentBetweenSettingAndPlan(sv:any) {
        if (this.m_PlanDir == 0) {
            return false;
        }
        if (this.m_PlanDir == 1 && sv.horizontal) {
            return false;
        }
        if (this.m_PlanDir == -1 && sv.vertical) {
            return false;
        }
        return true;
    }

    //#region 重写cc.ScrollView的方法
    _hasNestedViewGroup(event:any, captureListeners:any) {
        if (typeof Event != undefined && event.eventPhase !== Event.CAPTURING_PHASE) return false;
        //不阻止out上onTouch事件执行。
        return false;
    }

    _onTouchBegan(event: EventTouch, captureListeners:any) {
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;

        //重置计划方向
        this.m_PlanDir = null;
        this.m_ScrollingInnerSv = null;

        var touch = event.touch;
        if (this.content) {
            // this._handlePressLogic(touch);
            this._handlePressLogic();
        }
        this._touchMoved = false;
        this._stopPropagationIfTargetIsMe(event);
    }

    _onTouchMoved(event: EventTouch, captureListeners:any) {
        // 答疑：为什么确定 m_ScrollingInnerSv, 不用captureListeners, 而要用this._findScrollingInnerSv？
        // 因为，在子ScrollView上拖动时, captureListeners中并不包含该子ScrollView本身。
        // cc.log("----------------------------");
        // captureListeners.forEach((captureListener) => {
        //     cc.log(captureListener.name);
        // });

        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;

        var touch = event.touch;
        var deltaMove = touch.getLocation().subtract(touch.getStartLocation());

        //在滑动时, 设置开始时滑动的方向为计划方向
        //为什么在Outer中做这件事？
        //因为Outer的_onTouchMoved比Inner的早执行, 如果在Inner里做, Outer中就得忽略一帧，体验可能会不好。
        if (this.m_PlanDir == null && deltaMove.length() > 7) {
            this.m_ScrollingInnerSv = this._findScrollingInnerSv(event.target);
            if (this.m_ScrollingInnerSv != null) {
                let contentSize = this.m_ScrollingInnerSv.content.getComponent(UITransform).contentSize;
                let scrollViewSize = this.m_ScrollingInnerSv.node.getComponent(UITransform).contentSize;
                if ((this.m_ScrollingInnerSv.vertical && (contentSize.height > scrollViewSize.height))
                    || (this.m_ScrollingInnerSv.horizontal && (contentSize.width > scrollViewSize.width))) {
                    this.m_PlanDir = Math.abs(deltaMove.x) > Math.abs(deltaMove.y) ? 1 : -1;
                } else {
                    this.m_PlanDir = 0;
                }
            } else {
                this.m_PlanDir = 0;
            }
        }

        if (this.content) {
            if (!this.isDifferentBetweenSettingAndPlan(this)) {
                this._handleMoveLogic(touch);
            }
        }

        if (!this.cancelInnerEvents) {
            return;
        }

        //只取消会捕获事件的直接子物体(如Button)上的事件
        if (this.m_ScrollingInnerSv == null) {
            if (deltaMove.length() > 7) {
                if (!this._touchMoved && event.target !== this.node) {
                    var cancelEvent = new EventTouch(event.getTouches(), event.bubbles);
                    cancelEvent.type = Node.EventType.TOUCH_CANCEL;
                    cancelEvent.touch = event.touch;
                    cancelEvent.simulate = true;
                    //@ts-ignore
                    event.target.dispatchEvent(cancelEvent);
                    this._touchMoved = true;
                }
            }
            this._stopPropagationIfTargetIsMe(event);
        }
    }
    //#endregion
}

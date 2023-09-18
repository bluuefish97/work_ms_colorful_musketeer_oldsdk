import { EventTouch, _decorator, Node } from "cc";
import AutoScrollPageView from "./AutoScrollPageView";
import { NestableScrollView_Outer } from "./NestableScrollView_Outer";
import { NestablePageView_Outer } from "./NestablePageView_Outer";

const { ccclass, property } = _decorator;
@ccclass
/**自动滚动页面视图 内嵌*/
export default class AutoScrollPageView_Inner extends AutoScrollPageView implements INestable_Inner {
    m_OuterPageView: NestablePageView_Outer;
    m_OuterScrollView: NestableScrollView_Outer;

    setOuterScrollView(outer:any) {
        this.m_OuterScrollView = outer;
    }
    setOuterPageView(outer: any): void {
        this.m_OuterPageView = outer;
    }
    _onTouchMoved(event: EventTouch, captureListeners:any) {
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;

        var touch = event.touch;
        var deltaMove = touch.getLocation().subtract(touch.getStartLocation());

        if (this.content) {
            if (this.m_OuterScrollView&&!this.m_OuterScrollView.isDifferentBetweenSettingAndPlan(this)) {
                this._handleMoveLogic(touch);
            }
            if (this.m_OuterPageView&&!this.m_OuterPageView.isDifferentBetweenSettingAndPlan(this)) {
                this._handleMoveLogic(touch);
            }
        }

        if (!this.cancelInnerEvents) {
            return;
        }

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
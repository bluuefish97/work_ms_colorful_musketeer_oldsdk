import { _decorator, Node, ScrollView, EventTouch } from 'cc';
import { NestableScrollView_Outer } from './NestableScrollView_Outer';
import { NestablePageView_Outer } from './NestablePageView_Outer';
const { ccclass, property } = _decorator;

@ccclass('NestableScrollView_Inner')
export class NestableScrollView_Inner extends ScrollView implements INestable_Inner {
    m_OuterScrollView: NestableScrollView_Outer = null;
    m_OuterPageView: NestablePageView_Outer = null;
    setOuterScrollView(outer: any) {
        this.m_OuterScrollView = outer;
    }

    setOuterPageView(outer: any) {
        this.m_OuterPageView = outer;
    }

    _onTouchMoved(event: EventTouch, captureListeners: any) {
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

/**
 * 面板基类
 */

import { _decorator, Component, Node, UITransform, view, UIOpacity } from 'cc';

const { ccclass, property, requireComponent } = _decorator;

@ccclass("BasePanel")
@requireComponent(UIOpacity)
export default class BasePanel extends Component {
    public onEnterCall: Function = null;
    public onPauseCall: Function = null;
    public onResumeCall: Function = null;
    public onExitCall: Function = null;

    onLoad() {
        this.node.getComponent(UITransform).setContentSize(view.getVisibleSize().width, view.getVisibleSize().height);
        this.node.setPosition(0, 0);
    }


    public onEnter() {
        this.node.setSiblingIndex (99);
        this.node.active=true;
        this.node.resumeSystemEvents(true);
        this.onEnterCall && this.onEnterCall();
        console.log(this.node.name + ': onEnter')
    }

    /**
     * 暂停回调  
     * @param customCal    自定义函数参数 
     */
    public onPause() {
        this.node.setSiblingIndex(0);
        this.node.active=false;
        this.onPauseCall && this.onPauseCall();
        //this.node.resumeSystemEvents(false);
        this.node.pauseSystemEvents(true);
        console.log(this.node.name + ': onPause')
    }

    public onResume() {
        this.node.setSiblingIndex(99);
        this.node.active=true;
        this.onResumeCall && this.onResumeCall();
        this.node.resumeSystemEvents(true);
        console.log(this.node.name + ': onResume')
    }
    public onExit() {
        this.onExitCall && this.onExitCall();
        this.node.destroy();
        console.log(this.node.name + ': onExit')
    }

    // onPauseShow() {
    //     this.node.opacity = 255;
    //     this.node.x = 0;
    // }
}

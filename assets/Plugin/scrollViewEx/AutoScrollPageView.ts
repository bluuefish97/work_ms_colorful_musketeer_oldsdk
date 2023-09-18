import { _decorator, PageView, Vec2, v2, misc, Node, v3, Vec3 } from "cc";
import { NodeUtil } from "../tools/NodeUtil";


//自动滚动的方向
enum ScrollDir {
    Reverse = -1, //反向
    Forward = 1,  //正向
}

const { ccclass, property } = _decorator;
@ccclass("AutoScrollPageView")
/**自动滚动页面视图 */
export default class AutoScrollPageView extends PageView {
    @property({
        tooltip: "页面最小透明度"
    })
    protected minOpacity: number = 120;
    @property({
        tooltip: "页面最大透明度"
    })
    protected maxOpacity: number = 255;

    @property({
        tooltip: "页面最大停留时间，单位秒"
    })
    protected maxStayTime: number = 5;

    protected stayTime: number = 0; //当前停留时间
    protected deltaOpacity: number = 0; //透明值差值
    protected scrollDir: ScrollDir = ScrollDir.Forward; //滚动方向

    protected lastPageIndex: number = 0; //上一次页面的下标
    protected tempPos: Vec3 = v3(); //临时坐标，缓冲值

    onLoad() {
        super.onLoad();
        this.registerEvent();
    }

    onEnable() {
        super.onEnable();
        this.resetPageView();
    }
    onDestroy() {
        super.onDestroy();
        this.removeEvent();
    }
    update(dt:any) {
        super.update(dt);
        this.autoScroll(dt);
    }

    /**注册事件 */
    protected registerEvent() {
        //滑动事件 
        this.node.on("scrolling", this.onScrolling, this);
        //切换页面事件 
        this.node.on("page-turning", this.onPageTurning, this);
    }
    /**注销事件 */
    protected removeEvent() {
        //滑动事件 
        this.node.off("scrolling", this.onScrolling, this);
        //切换页面事件 
        this.node.off("page-turning", this.onPageTurning, this);
    }
    /**滑动事件回调 */
    protected onScrolling(event: PageView) {
        // if (!event.isScrolling()) return;
        if (event.getPages().length == 0) return;
        let currentIndex = event.getCurrentPageIndex()
        let currentPage = event.getPages()[currentIndex];
        let leftPage = event.getPages()[currentIndex - 1];
        let rightPage = event.getPages()[currentIndex + 1];


        this.tempPos = NodeUtil.convertToNodeSpaceAR(currentPage, this.node);
        // console.log(this.tempPos.x);
        let maxWidth = NodeUtil.getContentSize(currentPage).width / 2;
        this.tempPos.x = misc.clampf(this.tempPos.x, -maxWidth, maxWidth);
        if (this.tempPos.x < 0) {
            //往左
            if (rightPage) {
                NodeUtil.setOpacity(currentPage, this.maxOpacity + this.deltaOpacity * this.tempPos.x / maxWidth);
                NodeUtil.setOpacity(rightPage, this.minOpacity - this.deltaOpacity * this.tempPos.x / maxWidth);
            }
        } else if (this.tempPos.x > 0) {
            //往右
            if (leftPage) {
                NodeUtil.setOpacity(currentPage, this.maxOpacity - this.deltaOpacity * this.tempPos.x / maxWidth);
                NodeUtil.setOpacity(leftPage, this.minOpacity + this.deltaOpacity * this.tempPos.x / maxWidth);
            }
        }
    }
    /**切换页面事件 回调 */
    protected onPageTurning(event: PageView) {
        let curIndex = event.getCurrentPageIndex();
        if (curIndex > this.lastPageIndex) {
            this.setScrollDir(ScrollDir.Forward);
        } else {
            this.setScrollDir(ScrollDir.Reverse);
        }
        this.lastPageIndex = curIndex;
        if (curIndex == 0) {
            this.setScrollDir(ScrollDir.Forward);
        } else if (curIndex == event.getPages().length - 1) {
            this.setScrollDir(ScrollDir.Reverse);
        }
        event.getPages().forEach(page => {
            NodeUtil.setOpacity(page, 255);
        });
    }



    /**每周推荐自动滑动 */
    protected autoScroll(dt:any) {

        if (this.isScrolling()) {
            this.resetStayTime();
        }

        this.stayTime += dt;
        if (this.stayTime >= this.maxStayTime) {
            this.resetStayTime();

            let curIndex = this.getCurrentPageIndex();
            let next = curIndex + this.scrollDir;
            if (next > this.getPages().length - 1 || next < 0) {
                this.scrollDir *= ScrollDir.Reverse;
            }
            next = curIndex + this.scrollDir;
            // console.log(curIndex, next);
            this.scrollToPage(next, 1);
        }
    }
    /**设置自动滑动的方向 */
    protected setScrollDir(dir: ScrollDir) {
        this.scrollDir = dir;
    }

    /**重置停留时间 */
    resetStayTime() {
        this.stayTime = 0;
    }
    /**自动归位 */
    resetPageView() {
        console.log("PageView----------自动归位")
        if (this.getPages().length == 0) return;
        let index = this.getCurrentPageIndex();
        this.scrollToPage(index, 0.1);

        this.getPages().forEach((page) => {
            NodeUtil.setOpacity(page, 255);
        })
    }

}
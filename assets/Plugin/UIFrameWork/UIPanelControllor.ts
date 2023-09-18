/****************************************************
文件：UIPanelController.ts
作者：zhangqiang
邮箱: 2574628254@qq.com
日期：2021-1-8 16:07:23
功能：
*****************************************************/

import { _decorator, Component, Node, UITransform, view, UIOpacity, JsonAsset, game, assetManager, Prefab, resources, instantiate } from 'cc';
import { PanelType } from "./PanelType";
import BasePanel from "./BasePanel";
import { Dictionary, Stack } from './structure';
import { GameDirector } from '../../script/game/gameDirector';
import { ApplicationManager } from '../../script/applicationManager';
const { ccclass, property } = _decorator;

const remoteBundleName: string = "panelsBundle";

@ccclass
export default class UIPanelController extends Component {

    @property
    private localPathRoot: string = "panels"

    @property(JsonAsset)
    private panelConfigJson: JsonAsset = null;

    @property(Node)
    private UICanvas: Node = null;


    @property(Node)
    private viewUIRoot: Node = null;

    @property(Node)
    private panelUIRoot: Node = null;

    private panelInfoDict: Dictionary<string, panelInfo> = new Dictionary<string, panelInfo>();    //保存所有面板类型的路径的字典
    private existPanelDict: Dictionary<PanelType, BasePanel> = new Dictionary<PanelType, BasePanel>();  //保存在场景中存在的所有面板
    private _panelStack: Stack<BasePanel> = new Stack<BasePanel>();              //保存存在的面板的堆栈
    private _viewStack: Stack<BasePanel> = new Stack<BasePanel>();              //保存存在的窗口的堆栈
    private lastPushPanelType: PanelType;
    private lastPushViewType: PanelType;
    private rootMap = new Map()
    private stackMap = new Map([
        [UIRootType.viewUI, this._viewStack],
        [UIRootType.panelUI, this._panelStack]
    ])


    public get PanelUIRoot(): Node {
        return this.panelUIRoot;
    }


    static _instance: UIPanelController = null;
    public static getInstance() {
        return UIPanelController._instance
    }

    onLoad() {
        if (!UIPanelController._instance) {
            UIPanelController._instance = this;
        }
        else if (UIPanelController._instance != this) {
            this.destroy();
        }
        game.addPersistRootNode(this.UICanvas);
    }

    start() {
        this.init();
        this.rootMap.set(UIRootType.viewUI, this.viewUIRoot);
        this.rootMap.set(UIRootType.panelUI, this.panelUIRoot);
        this.stackMap.set(UIRootType.viewUI, this._viewStack);
        this.stackMap.set(UIRootType.panelUI, this._panelStack);
    }

    /**
     * 初始化控制器
     */
    private init() {
        this.initPanelInfo();
    }

    private initPanelInfo() {
        let list = this.panelConfigJson.json.panel_list;
        list.forEach((element: any) => {
            let info = element as panelInfo;
            this.panelInfoDict.add_D(info.type, info);
        });
    }

    clicStart() {
        GameDirector.getInstance().IsNew = true;
    }

    /**
     * 把指定类型的面板入栈, 显示在场景中
     * @param panelType
     */
    private _pushPanel(panelType: PanelType, type: UIRootType, isGlobal: boolean, initCal: Function) {
        let panelStack = this.stackMap.get(type);
        //判断一下栈里面是否有页面
        if (panelStack.size_S() > 0) {
            var topPanel = panelStack.peek_S();
            topPanel.onPause();
        } else if (type == UIRootType.viewUI && !isGlobal) {
            console.error("父面板不存在！！");
            return;
        }
        let root = this.rootMap.get(type);
        if (!isGlobal) {    //局部的弹窗
            root = topPanel.node;
        }
        this._getPanel(panelType, root, panelStack, initCal);
    }

    /**
    * 根据面板类型 得到实例化的面板
    * @param panelType
    */
    private _getPanel(panelType: PanelType, root: Node, panelStack: Stack<BasePanel>, initCal: Function) {
        if (this.existPanelDict == null) {
            this.existPanelDict = new Dictionary<PanelType, BasePanel>();
        }
        var panel = this.existPanelDict.get_D(panelType);
        if (panel == null) {
            ApplicationManager.getInstance().startLoading();
            var self = this;
            // 如果该类型面板不存在场景中,就根据信息生成该面板
            var panelInfo = this.panelInfoDict.get_D(panelType);
            let asyncPromise = new Promise<Prefab>((resolve) => {
                if (panelInfo.isRemote) {
                    let bundle = assetManager.getBundle(remoteBundleName);
                    let path = panelInfo.path;
                    if (!bundle) {
                        assetManager.loadBundle(remoteBundleName, function (err, bundle) {
                            bundle.load(path, Prefab, (finish, total, item) => {
                                //  console.log("finish ", finish + "total", total);
                            },
                                function (err, prefab) {
                                    resolve(prefab);
                                });
                        });
                    } else {
                        bundle.load(path, Prefab, function (err, prefab) {
                            resolve(prefab);
                        });
                    }

                }
                else {
                    let path = this.localPathRoot + '/' + panelInfo.path

                    resources.load(path, Prefab, (finish, total, item) => {
                        //  console.log("finish ", finish + "total", total);
                    },
                        (err, prefab: Prefab) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            resolve(prefab);
                        }
                    );
                }
            })
            asyncPromise.then((prefab: Prefab) => {
                let newNode = instantiate(prefab);
                root.addChild(newNode);
                initCal && initCal(newNode);
                panel = newNode.getComponent(BasePanel);
                panel.onEnter();
                panelStack.push_S(panel);
                //把该面板添加到场景存在的面板字典内
                self.existPanelDict.add_D(panelType, panel);
                ApplicationManager.getInstance().stopLoading();
            })
        }
        else {
            var topPanel = panelStack.peek_S();
            if (topPanel == panel) {
                // console.error("重复压入同样一个页面");
                return;
            }
            panel.onEnter();
            panelStack.push_S(panel);
        }
    }

    /**
     * 清空面板栈
     */
    private _clearPanelStack(stack: Stack<BasePanel>) {
        if (stack.size_S() <= 0) {
            return;
        }
        while (stack.size_S() > 0) {
            var topPanel = stack.delete_S();
            topPanel.onExit();
        }
    }

    /**
     * 出栈,把面板从场景中移除
     */
    private _popPanel(stack: Stack<BasePanel>, customCal: Function = null) {
        if (stack.size_S() <= 0) {
            return;
        }
        //关闭栈顶面板的显示
        var topPanel = stack.delete_S();
        topPanel.onExit();
        this.existPanelDict.remove_Val(topPanel);
        if (stack.size_S() <= 0) {
            return;
        }
        var topPanel2 = stack.peek_S();
        topPanel2.onResume(customCal);
    }

    //检测指定类型面板是否是最上层面板
    private _checkIsTopPanel(panelType: PanelType, stack: Stack<BasePanel>) {
        var tar = this.existPanelDict.get_D(panelType);
        // if (stack.get_S(tar)) {
        //     console.error("错误调用！");
        //     return
        // }
        if (stack.size_S() > 0) {
            var topPanel = stack.peek_S();
            if (topPanel == tar) {
                return true;
            }
        }
        else {
            return false;
        }
    }

    /**
     * 把指定类型的面板显示出来
     * @param panelType
     */
    public pushPanel(panelType: PanelType, initCal: Function) {
        if (this.lastPushPanelType == panelType) return;
        this.lastPushPanelType = panelType;
        this._pushPanel(panelType, UIRootType.panelUI, true, initCal);
    }

    /**
     * 把指定类型的弹窗显示出来
     * @param panelType
     */
    public pushView(panelType: PanelType, isGlobal: boolean, initCal: Function) {
        if (this.lastPushViewType == panelType) return;
        this.lastPushViewType = panelType;
        this._pushPanel(panelType, UIRootType.viewUI, isGlobal, initCal);
    }

    public clearPanelStack() {
        this.lastPushPanelType = null;
        this._clearPanelStack(this._panelStack);
    }

    public clearExistPanelDict() {
        this.lastPushPanelType = null;
        this.lastPushViewType = null;
        this.existPanelDict = new Dictionary<PanelType, BasePanel>();
    }


    public clearViewStack() {
        this.lastPushViewType = null;
        this._clearPanelStack(this._viewStack);
    }

    public popPanel(customCal: Function = null) {
        this.lastPushPanelType = null;
        this._popPanel(this._panelStack, customCal);
    }

    public popView(customCal: Function = null) {
        this.lastPushViewType = null;
        this._popPanel(this._viewStack, customCal);
    }

    public checkIsTopPanel(panelType: PanelType) {
        return this._checkIsTopPanel(panelType, this._panelStack);
    }

    public checkIsTopView(panelType: PanelType) {
        return this._checkIsTopPanel(panelType, this._viewStack);
    }
    /**
     * 将一个场景中存在的panel入栈
     * @param panelType 
     * @param panel 
     */
    public pushExistPanel(panelType: PanelType, panel: BasePanel) {
        if (this.existPanelDict == null) {
            this.existPanelDict = new Dictionary<PanelType, BasePanel>();
        }
        var topPanel = this._panelStack.peek_S();
        if (topPanel == panel) {
            // console.error("重复压入同样一个页面");
            return;
        }
        this._panelStack.push_S(panel);
        //把该面板添加到场景存在的面板字典内
        this.existPanelDict.add_D(panelType, panel);
        panel.onEnter();
    }

    /**预加载面板 */
    preloadPanel(panelType: PanelType) {
        var panelInfo = this.panelInfoDict.get_D(panelType);
        let asyncPromise = new Promise((resolve) => {
            if (panelInfo.isRemote) {
                let bundle = assetManager.getBundle(remoteBundleName);
                let path = panelInfo.path;
                if (!bundle) {
                    assetManager.loadBundle(remoteBundleName, function (err, bundle) {
                        bundle.preload(path, Prefab, (finish, total, item) => {
                            //    console.log("finish ", finish + "total", total);
                        },
                            function (err, prefab) {
                                resolve(prefab);
                            });
                    });
                } else {
                    bundle.preload(path, Prefab, function (err, prefab) {
                        resolve(prefab);
                    });
                }

            }
            else {
                let path = this.localPathRoot + '/' + panelInfo.path
                resources.preload(path, Prefab)
            }
        })

        asyncPromise.then((pre) => {
            console.log("预加载成功!!", pre);
        })
    }

}

class panelInfo {
    isRemote: boolean;
    name: string;
    path: string;
    type: string;
}

enum UIRootType {
    viewUI,
    panelUI,
}


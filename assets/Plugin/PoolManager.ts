

// const {ccclass, property} =  _decorator;

import { Prefab, instantiate, NodePool, Node, SpriteFrame, resources } from "cc";



// @ccclass("PoolManager")
export class PoolManager {
    dictPool = {}
    dictPrefab = {}
    dictSfs = {}
    static _instance: PoolManager;

    static get instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new PoolManager();
        return this._instance;
    }

    /**
     * 根据预设从对象池中获取对应节点
     */
    getNode(prefab: Prefab, parent: Node = null) {
        let name = prefab.data.name;
        this.dictPrefab[name] = prefab;
        let _node: Node;
        if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this.dictPool[name];
            if (pool.size() > 0) {
                _node = pool.get();
            } else {
              //     console.log("重新生成    "+name);
                _node = instantiate(prefab);
            }
        } else {
            //没有对应对象池，创建他！
            let pool = new NodePool();
            this.dictPool[name] = pool;
            if (parent && parent.getChildByName(name)) {
                _node = parent.getChildByName(name)
            }
            else {
                //  console.log("初次重新生成   "+name);
                _node = instantiate(prefab);
            }
        }
        if (parent) {
            _node.parent = parent;
        }

        return _node;
    }

        /**
     * 根据预设从对象池中获取对应节点
     */
    getNodeNotParent(prefab: Prefab) {
        let name = prefab.data.name;
        this.dictPrefab[name] = prefab;
        let _node: Node;
        if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this.dictPool[name];
            if (pool.size() > 0) {
                _node = pool.get();
            } else {
                //   console.log("重新生成    "+name);
                _node = instantiate(prefab);
            }
        } else {
            //没有对应对象池，创建他！
            let pool = new NodePool();
            this.dictPool[name] = pool;
            _node = instantiate(prefab);
        }
        return _node;
    }

    /**
     * 将对应节点放回对象池中
     */
    putNode(node: Node) {
        if(!node) {
            return;
        }
        let name = node.name;
        //   console.log("回收   ",node.name);

        let pool = null;
        if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this.dictPool[name];
        } else {
            //没有对应对象池，创建他！
            pool = new NodePool();
            this.dictPool[name] = pool;
        }

        pool.put(node);
    }

    /**
     * 根据预制体，清除对应对象池
     */
    clearPool(prefab: Prefab) {
        let name = prefab.data.name;
        if (this.dictPool.hasOwnProperty(name)) {
            let pool = this.dictPool[name];
            pool.clear();
        }
    }

    resetDictPool() {
        for (var idx in this.dictPool) {
            this.dictPool[idx].clear();
        }
    }

    /**
  * 根据路径获得资源
  */
    getSpriteFrame(url: string, cal: Function) {
        url=url.concat("/spriteFrame");
        if (this.dictSfs.hasOwnProperty(url)) {
            cal && cal(this.dictSfs[url]);
        } else {
            resources.load(url, SpriteFrame,(err: any, spriteFrame: SpriteFrame)=>{
                cal && cal(spriteFrame);
                this.dictSfs[url] = spriteFrame;
            });

        }
    }
}

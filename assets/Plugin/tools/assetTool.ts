
export default class AssetTool {

    /**
     * 获得2D图片资源的路径名字
     */
   static getTexture2DName(element:any ,bundle:any){
    var _uuid=element._uuid;
    var _info=bundle.getAssetInfo(_uuid);
    const regex=new RegExp("Texture/",'g');
    var _name=_info.path.replace(regex,'');
    return _name;
   }

}

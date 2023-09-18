
import { _decorator, Component, Node, view, ToggleContainer, Toggle } from 'cc';
import { FuncModule } from '../GloalDefine';
const { ccclass, property } = _decorator;

@ccclass('ModelToggleGroup')
export class ModelToggleGroup extends Component {

    private toggleContainer: ToggleContainer = null;
    
    onLoad() {
        this.toggleContainer = this.node.getComponent(ToggleContainer);
        this.node.setPosition(0, -view.getVisibleSize().height / 2);
        this.node.active = false;
    }

    public defaultCloseAct() {
        this.node.active = false;
    }

    public defaultOpenAct() {
        this.node.active = true;
    }

    /**
    *
    * @param callback 
    */
    setFuncModuleToggleEvent(_module: FuncModule, callback: Function, target: any = null) {
        let toggle = this.getFuncModluleToggle(_module);
        toggle.node.on("toggle", callback, target)
    }

    public getFuncModluleToggle(_module: FuncModule): Toggle {
        let name: string;
        switch (_module) {
            case FuncModule.HomeModule:
                name = "Toggle1_home";
                break;
            case FuncModule.SkinModule:
                name = "Toggle2_skin";
                break;
            case FuncModule.SetMoudle:
                name = "Toggle3_set";
                break;
            default:
                break;
        }
        let toggle = this.toggleContainer.toggleItems.find((item) => {
            return item.node.name == name
        });
        return toggle;
    }

}


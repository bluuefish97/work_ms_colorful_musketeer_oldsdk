import { NestableScrollView_Outer } from "./NestableScrollView_Outer";
import { NestablePageView_Outer } from "./NestablePageView_Outer";


declare global {
    namespace globalThis {
        /**内置scroll 接口 */
        interface INestable_Inner {
            m_OuterScrollView: NestableScrollView_Outer;
            m_OuterPageView: NestablePageView_Outer;
            setOuterScrollView(outer:any): void;
            setOuterPageView(outer:any): void;
        }
    }
}

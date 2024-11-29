import { MenuHelper, menuType, MenuNotifications, IMenuDefinition } from './helpers/MenuHelper';
import { CommonRegistry } from './helpers/CommonRegistry';
import { MessageService } from './helpers/MessageService';
import { IRouteConfig } from './interfaces/RouterInterfaces';
import { IStore } from './interfaces/StoreInterfaces';
import { default as Inject } from './components/inject.vue';
import { default as Screen } from './components/screen.vue';
import { VueConstructor } from 'vue';
import { IProjectableModel, Projectable, Projector } from './helpers/Projector';
import { ScreensManager } from './directives/screen';
import { validate as ValidateDirective } from './directives/validate';

declare function install(Vue: VueConstructor): void;
export interface IModuleInitializer {
    init(vuemf: typeof VueMfModule, menu: MenuHelper, store: IStore, configuration: any): Promise<void>;
    config?(menu: MenuHelper, store: IStore, configuration: any): Promise<void>;
    run?(menu: MenuHelper, store: IStore, configuration: any): Promise<void>;
    routes: IRouteConfig[];
}
interface IModuleInitializerWrapper {
    init(menu: MenuHelper, store: IStore, configuration: any, options: {
        registry: CommonRegistry;
        messageService: typeof MessageService.Instance;
        projector: Projector;
        screens: ScreensManager;
    }): Promise<void>;
    config(menu: MenuHelper, store: IStore): Promise<void>;
    run(menu: MenuHelper, store: IStore): Promise<void>;
    routes: IRouteConfig[];
}
export declare function ModuleInitializer(opts: IModuleInitializer): IModuleInitializerWrapper;
export declare function InitModule(module: any, store: IStore, configuration: any | undefined): Promise<IModuleInitializer>;
export declare function ConfigModule(module: any, store: IStore): Promise<void>;
export declare function RunModule(module: any, store: IStore): Promise<void>;
export declare function ModuleRoutes(module: any): IRouteConfig[];
export { MenuHelper, type IMenuDefinition, menuType, CommonRegistry, MessageService, Inject, Screen, ValidateDirective, type Projectable, type IProjectableModel, MenuNotifications, Projector, };
declare const VueMfModule: {
    install: typeof install;
    MenuHelper: MenuHelper;
    menuType: typeof menuType;
    CommonRegistry: CommonRegistry;
    MessageService: MessageService;
    Inject: any;
    Screen: any;
    ValidateDirective: {
        inserted: (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, bind: {
            value: (errors: string[], valid: boolean) => void;
            arg: "immediate";
        }) => void;
        unbind: (el: Element) => void;
    };
    MenuNotifications: {
        menuDefinitionAdded: string;
    };
    Projector: typeof Projector;
};
export default VueMfModule;

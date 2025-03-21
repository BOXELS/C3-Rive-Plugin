"use strict";

{
    const PLUGIN_ID = "riveanimation";
    const PLUGIN_CATEGORY = "other";
    
    const PLUGIN_CLASS = class RiveAnimationPlugin extends SDK.IPluginBase {
        constructor() {
            super(PLUGIN_ID);
            SDK.Lang.PushContext("plugins." + PLUGIN_ID);
            
            this._info.SetName(SDK.Lang.Get(".name"));
            this._info.SetDescription(SDK.Lang.Get(".description"));
            this._info.SetVersion("1.0.0");
            this._info.SetCategory(PLUGIN_CATEGORY);
            this._info.SetAuthor("BOXELS");
            this._info.SetHelpUrl(SDK.Lang.Get(".help-url"));
            this._info.SetIsSingleGlobal(false);
            this._info.SetIs3D(false);
            this._info.SetSupportsEffects(false);
            this._info.SetCanBeBundled(true);
            
            this._info.SetProperties([
                new SDK.PluginProperty("link", "rive-file", {
                    initialValue: "",
                    name: SDK.Lang.Get("properties.rive-file.name"),
                    description: SDK.Lang.Get("properties.rive-file.desc")
                }),
                new SDK.PluginProperty("combo", "autoplay", {
                    initialValue: "Yes",
                    items: ["Yes", "No"],
                    name: SDK.Lang.Get("properties.autoplay.name"),
                    description: SDK.Lang.Get("properties.autoplay.desc")
                }),
                new SDK.PluginProperty("combo", "loop", {
                    initialValue: "Yes",
                    items: ["Yes", "No"],
                    name: SDK.Lang.Get("properties.loop.name"),
                    description: SDK.Lang.Get("properties.loop.desc")
                })
            ]);
            
            SDK.Lang.PopContext();
        }
    };
    
    SDK.Plugins.RiveAnimation = PLUGIN_CLASS;

    PLUGIN_CLASS.Type = class RiveAnimationType extends SDK.ITypeBase {
        constructor(sdkPlugin, iObjectType) {
            super(sdkPlugin, iObjectType);
        }
    };

    PLUGIN_CLASS.Instance = class RiveAnimationInstance extends SDK.IInstanceBase {
        constructor(sdkType, inst) {
            super(sdkType, inst);
        }

        Release() {
        }

        OnCreate() {
        }

        Draw(renderer) {
            const quad = this.GetQuad();
            if (quad) {
                renderer.Outline(quad, [1, 1, 1]);
            }
        }

        OnPropertyChanged(id, value) {
            if (id === "rive-file") {
                // Update when file is selected if needed
            }
        }

        GetDebuggerProperties() {
            return [{
                title: "RIVE Animation",
                properties: [
                    { name: "Rive File", value: this.GetPropertyValue("rive-file") },
                    { name: "Auto Play", value: this.GetPropertyValue("autoplay") },
                    { name: "Loop Animation", value: this.GetPropertyValue("loop") }
                ]
            }];
        }
    };
    
    // Actions
    SDK.Plugins.RiveAnimation.Acts = {
        Play() {},
        Pause() {},
        Stop() {}
    };
    
    // Conditions
    SDK.Plugins.RiveAnimation.Cnds = {
        IsPlaying() {
            return false; // Editor-only implementation
        }
    };
    
    // Expressions
    SDK.Plugins.RiveAnimation.Exps = {
        CurrentTime() {
            return 0; // Editor-only implementation
        }
    };

    PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}
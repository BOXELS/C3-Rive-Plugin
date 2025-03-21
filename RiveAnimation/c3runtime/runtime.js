'use strict';

{
    const C3 = self.C3;
    
    C3.Plugins.riveanimation = class RiveAnimationPlugin extends C3.SDKPluginBase {
        constructor(opts) {
            super(opts);
        }
    };
    
    C3.Plugins.riveanimation.Type = class RiveAnimationType extends C3.SDKTypeBase {
        constructor(objectClass) {
            super(objectClass);
        }
        
        Release() {
            super.Release();
        }
        
        OnCreate() {
        }
    };
    
    C3.Plugins.riveanimation.Instance = class RiveAnimationInstance extends C3.SDKInstanceBase {
        constructor(inst, properties) {
            super(inst);
            
            this._riveInstance = null;
            this._canvas = null;
            this._isPlaying = false;
            
            // Get properties using their correct IDs
            const riveFile = this._inst.GetPropertyValue("rive-file");
            this._autoPlay = this._inst.GetPropertyValue("autoplay");
            this._loop = this._inst.GetPropertyValue("loop");
            
            if (this._autoPlay && riveFile) {
                this._LoadRive(riveFile);
            }
        }
        
        Release() {
            if (this._riveInstance) {
                this._riveInstance.cleanup();
            }
            if (this._canvas) {
                this._canvas.remove();
            }
            super.Release();
        }
        
        async _LoadRive(riveFile) {
            if (!this._canvas) {
                this._canvas = document.createElement('canvas');
                this._canvas.style.width = '100%';
                this._canvas.style.height = '100%';
                this.GetRuntimeElement().appendChild(this._canvas);
            }
            
            try {
                // Load Rive runtime if not loaded
                if (!window.rive) {
                    await new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = 'https://unpkg.com/@rive-app/canvas@2.7.3';
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                }
                
                const response = await fetch(riveFile);
                const arrayBuffer = await response.arrayBuffer();
                
                this._riveInstance = new window.rive.Rive({
                    canvas: this._canvas,
                    buffer: arrayBuffer,
                    autoplay: this._autoPlay,
                    stateMachines: 'State Machine 1',
                    artboard: 'New Artboard',
                    animations: 'Animation 1'
                });
                
                this._riveInstance.on('play', () => this._isPlaying = true);
                this._riveInstance.on('pause', () => this._isPlaying = false);
                this._riveInstance.on('stop', () => this._isPlaying = false);
                this._riveInstance.loop = this._loop;
                
            } catch (error) {
                console.error('Error loading Rive file:', error);
            }
        }
        
        GetPropertyValue(id) {
            switch (id) {
                case "is-playing":
                    return this._isPlaying;
                case "current-time":
                    return this._riveInstance ? this._riveInstance.currentTime : 0;
                case "rive-file":
                case "autoplay":
                case "loop":
                    return super.GetPropertyValue(id);
            }
            return super.GetPropertyValue(id);
        }
        
        Play() {
            if (this._riveInstance) {
                this._riveInstance.play();
            }
        }
        
        Pause() {
            if (this._riveInstance) {
                this._riveInstance.pause();
            }
        }
        
        Stop() {
            if (this._riveInstance) {
                this._riveInstance.stop();
            }
        }
    };
}

// Register plugin in runtime
self.C3.ScriptsInEvents = self.C3.ScriptsInEvents || [];
self.C3.ScriptsInEvents.push(() => {
    const runtime = self.C3.Plugins.riveanimation;
    return runtime;
}); 
import FragSrc from './toonify-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;
const Uniforms = ['uMainSampler', 'edgeThreshold', 'hStep', 'sStep', 'vStep', 'edgeColor', 'texSize'];

class ToonifyPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            game: game,
            renderTarget: true,
            fragShader: FragSrc,
            uniforms: Uniforms
        });

        this._edgeGain = 0;
        this._edgeThreshold = 0;
        this._hueLevels = 0;
        this._satLevels = 0;
        this._valLevels = 0;
        this._edgeColor = new Color();
    }

    resetFromJSON(o) {
        this.setEdgeThreshold(GetValue(o, 'edgeThreshold', 0.2));
        this.setHueLevels(GetValue(o, 'hueLevels', 0));
        this.setSatLevels(GetValue(o, 'satLevels', 0));
        this.setValLevels(GetValue(o, 'valLevels', 0));
        this.setEdgeColor(GetValue(o, 'edgeColor', 0));
        return this;
    }

    onPreRender() {
        this.set1f('edgeThreshold', this._edgeThreshold);
        this.set1f('hStep', this.hueStep);
        this.set1f('sStep', this.satStep);
        this.set1f('vStep', this.valStep);
        this.set3f('edgeColor', this._edgeColor.redGL, this._edgeColor.greenGL, this._edgeColor.blueGL);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
    }

    // edgeThreshold
    get edgeThreshold() {
        return this._edgeThreshold;
    }

    set edgeThreshold(value) {
        this._edgeThreshold = value;
    }

    setEdgeThreshold(value) {
        this.edgeThreshold = value;
        return this;
    }

    // hueLevels
    get hueLevels() {
        return this._hueLevels;
    }

    set hueLevels(value) {
        this._hueLevels = value;
    }

    setHueLevels(value) {
        this.hueLevels = value;
        return this;
    }

    get hueStep() {
        if (this._hueLevels > 0) {
            return 360 / this._hueLevels;
        } else {
            return 0;
        }
    }

    // satLevels
    get satLevels() {
        return this._satLevels;
    }

    set satLevels(value) {
        this._satLevels = value;
    }

    setSatLevels(value) {
        this.satLevels = value;
        return this;
    }

    get satStep() {
        if (this._satLevels > 0) {
            return 1 / this._satLevels;
        } else {
            return 0;
        }
    }

    // valLevels
    get valLevels() {
        return this._valLevels;
    }

    set valLevels(value) {
        this._valLevels = value;
    }

    setValLevels(value) {
        this.valLevels = value;
        return this;
    }

    get valStep() {
        if (this._valLevels > 0) {
            return 1 / this._valLevels;
        } else {
            return 0;
        }
    }

    // edgeColor
    get edgeColor() {
        return this._edgeColor;
    }

    set edgeColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._edgeColor.setFromRGB(value);
    }

    setEdgeColor(value) {
        this.edgeColor = value;
        return this;
    }
}

export default ToonifyPostFxPipeline;
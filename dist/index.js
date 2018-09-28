"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_ga_1 = __importDefault(require("electron-ga"));
const createElectronGoogleAnalyticsTarget = ({ ua }) => {
    const analytics = new electron_ga_1.default(ua);
    return (events) => {
        events.forEach(event => {
            if (event.hit === 'event') {
                analytics.send(event.hit, {
                    ea: event.action,
                    ec: event.category,
                    el: event.label,
                    ev: event.value
                });
            }
            else if (event.hit === 'pageview') {
                analytics.send(event.hit, {
                    dl: `http://localhost/${event.category}`,
                    dt: event.category
                });
            }
        });
    };
};
exports.createElectronGoogleAnalyticsTarget = createElectronGoogleAnalyticsTarget;
const actionMetaEventMapper = (action) => {
    if (action.meta && action.meta.track) {
        return [action.meta.track];
    }
    return [];
};
exports.actionMetaEventMapper = actionMetaEventMapper;
const track = (f) => () => ({
    track: (reduxAction) => {
        const [category, action] = reduxAction.type.split('/');
        return Object.assign({ action,
            category, hit: 'event' }, (f && f(reduxAction)));
    }
});
exports.track = track;
//# sourceMappingURL=index.js.map
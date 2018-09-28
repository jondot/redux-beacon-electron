interface FSA {
    type: string;
    payload: any;
    meta?: any;
}
declare type ActionCreator = (action: FSA) => any;
declare const createElectronGoogleAnalyticsTarget: ({ ua }: {
    ua: string;
}) => (events: any[]) => void;
declare const actionMetaEventMapper: (action: FSA) => any[];
declare const track: (f: ActionCreator) => () => {
    track: (reduxAction: FSA) => any;
};
export { track, createElectronGoogleAnalyticsTarget, actionMetaEventMapper };

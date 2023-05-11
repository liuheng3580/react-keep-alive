import { ReactElement } from "react";
import { CREATE, CREATED, DESTROY } from "./cacheType";

interface IAction {
    type: 'CREATE' | 'CREATED' | 'DESTROY',
    payload: {
        keepAliveId: string;
        reactElement?: ReactElement;
        node?: any
    }
}

// home:{
//     keepAliveId: home;
//     reactElement?: <div></div>
//     node?: null
// }
const CacheReducer = (_cacheState: any, actions: IAction) => {
    const { payload } = actions
    switch (actions.type) {
        case CREATE:
            return {
                ..._cacheState,
                [payload.keepAliveId]: {
                    status: actions.type,
                    keepAliveId: payload.keepAliveId,
                    reactElement: payload.reactElement,
                    node: null
                }
            }
        case CREATED:
            return {
                ..._cacheState,
                [payload.keepAliveId]: {
                    ..._cacheState[payload.keepAliveId],
                    status: actions.type,
                    node: payload.node
                }
            }
        case DESTROY:
            return {
                ..._cacheState[payload.keepAliveId],
                [payload.keepAliveId]: {
                    ...[payload.keepAliveId],
                    status: actions.type,
                }
            }
        default:
            return _cacheState
    }
}

export default CacheReducer
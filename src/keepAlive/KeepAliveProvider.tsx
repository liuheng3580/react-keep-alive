import cacheReducer from "@/keepAlive/cacheReducer"
import { ReactElement, useReducer, useCallback } from "react"
import CacheContext from './cacheContext';
import { CREATE, CREATED, DESTROY } from "./cacheType";


const KeepAliveProvider = (props: { children: ReactElement }) => {
    const [cacheStates, dispatch] = useReducer(cacheReducer, {})

    const setCacheStates = useCallback(({ reactElement, keepAliveId }: { reactElement: ReactElement, keepAliveId: string }) => {
        if (!cacheStates[keepAliveId]) {
            dispatch({
                type: CREATE,
                payload: {
                    keepAliveId,
                    reactElement
                }
            })
        }

    }, [cacheStates])
    return (
        <CacheContext.Provider value={{ cacheStates, dispatch, setCacheStates }}>
            {props.children}
            {
                Object.values(cacheStates).map(({ keepAliveId, reactElement }: any) => (
                    <div key={keepAliveId} ref={(node: any) => {
                        if (node && !cacheStates[keepAliveId].node) {
                            dispatch({
                                type: CREATED,
                                payload: {
                                    keepAliveId,
                                    node: [...node.childNodes]
                                }
                            })
                        }
                    }}>
                        {reactElement}
                    </div>
                ))
            }
        </CacheContext.Provider>
    )
}

export default KeepAliveProvider
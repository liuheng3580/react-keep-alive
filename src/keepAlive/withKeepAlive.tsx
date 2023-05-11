import React, { ReactElement, useContext, useEffect, useRef } from "react"
import CacheContext from "./cacheContext"


const withKeepAlive = (OldComponent: any, { keepAliveId, scroll }: { keepAliveId: string, scroll?: boolean }) => {
    return (props: any) => {
        const _ref = useRef<HTMLDivElement>(null)
        const { cacheStates, setCacheStates } = useContext<any>(CacheContext)
        useEffect(() => {
            if (cacheStates[keepAliveId] && cacheStates[keepAliveId]?.node) {
                const nodes = cacheStates[keepAliveId].node
                nodes?.forEach((node: any) => _ref.current?.appendChild(node))
            } else {
                setCacheStates({
                    keepAliveId,
                    reactElement: <OldComponent  {...props} />
                })
            }
        }, [cacheStates, props, setCacheStates])
        return (
            <div id={`keepAliveId_${keepAliveId}`} ref={_ref}></div>
        )
    }
}

export default withKeepAlive
import { UpdateOnType } from "../../v1-core/lib/types"


export type UseReflectorType = <Tr, K, S>(
    mapState: (args: K)=> S, 
    condition: ((args?: Tr) => UpdateOnType<Tr>) | Array<any>,
    shouldUpdate?: (payload: any) => boolean
) => S
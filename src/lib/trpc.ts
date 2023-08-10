import { createTRPCProxyClient } from '@trpc/client'
import {ipcLink} from 'electron-trpc/renderer'
import type {AppRouter} from '../../electron/main/api'

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [ipcLink()]
})
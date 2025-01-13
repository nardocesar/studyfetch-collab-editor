## The unknown error

I've been struggling with this error for a while now. I've been trying to get the collaboration working, but I've been getting this error below. I didn't find any solution on the internet, not even in forums and/or github issues. Most likely it's related to package versions, but it would take me a while to figure it out.

```
Caught error while handling a Yjs update Error: Method unimplemented
    at create (error.js:18:21)
    at Module.methodUnimplemented (error.js:26:9)
    at createNodeIfNotExists (sync-plugin.js:660:54)
    at eval (sync-plugin.js:576:9)
    at Array.map (<anonymous>)
    at eval (sync-plugin.js:575:51)
    at ProsemirrorBinding.eval [as mux] (mutex.js:39:9)
    at ProsemirrorBinding._typeChanged (sync-plugin.js:557:10)
    at Module.callAll (function.js:37:12)
    at callEventHandlerListeners (yjs.mjs:2108:47)
    at eval (yjs.mjs:3414:13)
    at Map.forEach (<anonymous>)
    at Array.eval (yjs.mjs:3395:40)
    at callAll (function.js:37:12)
    at cleanupTransactions (yjs.mjs:3419:62)
    at transact (yjs.mjs:3545:9)
    at readUpdateV2 (yjs.mjs:1773:3)
    at applyUpdateV2 (yjs.mjs:1868:3)
    at Module.applyUpdate (yjs.mjs:1882:58)
    at readSyncStep2 (hocuspocus-provider.esm.js:2127:38)
    at readSyncMessage (hocuspocus-provider.esm.js:2165:7)
    at MessageReceiver.applySyncMessage (hocuspocus-provider.esm.js:2241:33)
    at MessageReceiver.apply (hocuspocus-provider.esm.js:2203:22)
    at TiptapCollabProvider.onMessage (hocuspocus-provider.esm.js:2687:38)
    at TiptapCollabProviderWebsocket.onMessage (hocuspocus-provider.esm.js:1897:105)
    at eval (hocuspocus-provider.esm.js:1594:52)
    at Array.forEach (<anonymous>)
    at TiptapCollabProviderWebsocket.emit (hocuspocus-provider.esm.js:1594:23)
    at WebSocket.onMessageHandler (hocuspocus-provider.esm.js:1836:52)
```

I've been trying to figure out what the issue is, but I've been stuck.

After that, the next steps would be:

-[] Implementing a websocket server to run it in production
-[] Implementing AI chat interface

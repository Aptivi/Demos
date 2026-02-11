//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"c2435c3e0f46de784341ac3ed62863ce77e117b4",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Demos",
  "resources": {
    "hash": "sha256-UNOzaKoTGuVcriSpTmaGT5Hhgg3kdYGpSd7wT7gMtYU=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.v5prf2xwq3.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.q5rqv3xrhm.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.6c15bgpnc2.wasm",
        "integrity": "sha256-BhH8PU2UiZ9zUP9aZLuvXrzBl8T024vsAIaBpHfHVqc=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.ktbegkrd8y.wasm",
        "integrity": "sha256-WAM5OMcJO64InQovrLZ46el9w7eLyMLnICLGedHyr8Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.v6jd4wqbu9.wasm",
        "integrity": "sha256-ZwYLOM+eN/IbMdwScvAsyk1aq04OfvvsrzwIz14CPto=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "ChemiStar.wasm",
        "name": "ChemiStar.h7u01q5gpu.wasm",
        "integrity": "sha256-7THPk03zjItWrwJ6Z5UnMrZV0bjDuNlZNyPj8tWYy4w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "HtmlAgilityPack.wasm",
        "name": "HtmlAgilityPack.st8ng737vz.wasm",
        "integrity": "sha256-cAgxQhMHBpYiWAE4lE7AzfHjP8poxbxtLgsy1oRF+cU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Magico.wasm",
        "name": "Magico.n05mbaaogw.wasm",
        "integrity": "sha256-57Vg6o7a6oRYD6Q68lnpPvGcDTTQxL2xWjVTb/r6Ato=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Magico.Native.wasm",
        "name": "Magico.Native.taq04uy62m.wasm",
        "integrity": "sha256-JeH10vbFRF9NdDOWadifUg4Y/sEx/NpU2J74057s3eo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Metalinker.wasm",
        "name": "Metalinker.tgbq32fm9f.wasm",
        "integrity": "sha256-c6jqslNrP932if+HceU1H4xDzQl0YZhfEEwR7YzCPTI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.dkoqyu45bt.wasm",
        "integrity": "sha256-I+fjaZTknCjwV+ourOjMpfPXyMuiayb1k2TaBxOQifQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.zgc06ajws1.wasm",
        "integrity": "sha256-3WJ1wzWRmFyKK0IRm2dUYvOM+OVPfOWsvkMowIuu+Rc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.u7q4ehh9av.wasm",
        "integrity": "sha256-ul+Vx4P3I3AZJC5DnIUDSWkKx9UZ5n06HR+hRWM+z3g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.vrfxoigyud.wasm",
        "integrity": "sha256-5RE6DKmZC5qyWrcMQHe9om3Yrdnbwd8PwSzBAaGnRqw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.jqj4k4pj3p.wasm",
        "integrity": "sha256-FU9TpGEmQwWgADUtlXFTdJIwsCDEyFtgEJacSi8iIoY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.w7skqr0zek.wasm",
        "integrity": "sha256-3DH5Li3nbKgskNzRybjZBIfXSoxH/TN0wolg2KHl/YQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.dtdoolwb2w.wasm",
        "integrity": "sha256-D1jnvoQnv2aAi2ps5NzM3lqE5jEy+XJit2tS6neJnXM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.7t9rn8l3bj.wasm",
        "integrity": "sha256-le5rmrBMDRqKfFdTIfPXMMq+YRlD1okvk+xc6dLUYm8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.1rfo1y3yks.wasm",
        "integrity": "sha256-Q4ElQAxHDkCjuYL0AruUm9A7KnOrFxMIBY0KelUF1W8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.r2dra2oldd.wasm",
        "integrity": "sha256-DTNxE9CKAiPWTFDFl3niOH75tY1pweWfsMzIaVbhBMI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.g5re4fc98k.wasm",
        "integrity": "sha256-DF/ymbcFNX+inXLhxorWc0PXWU7/u3c+uXIi5i8bJvI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.u4muuiav6l.wasm",
        "integrity": "sha256-cm6fbI6Jvm2BgJS70FB2k3qbYAzuS5nCCXg8IXj7cdA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.7za6xlrecu.wasm",
        "integrity": "sha256-7R0sWRhKvcSoQaFmMrrXBOS1v+DUjxhETvDxEQbHVRQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.38vzmiamit.wasm",
        "integrity": "sha256-LflsX5/lCKu5OnIeW2ybJ8WnCYONPG6qlURpO5T/y5c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.mrus3axuke.wasm",
        "integrity": "sha256-wmWkUz8XauAbA+eb0N0RvClESqaj+ct9V3xtGILLnp8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Nettify.wasm",
        "name": "Nettify.xw4xdhk4md.wasm",
        "integrity": "sha256-Iejpgp3HIvRzzATvm6pBFM9FPHyE2rBUgOaSWa6muGQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.jcjjiqe038.wasm",
        "integrity": "sha256-s8KVuknfxWl1cuDvQM/OnpBfnpM1rxzvzq21S1cF36U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ResourceLab.wasm",
        "name": "ResourceLab.kcabjjjscb.wasm",
        "integrity": "sha256-3KdxDvbuqbqeALALqJfe7YYke+lGIlI38zxGzrmJIh0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SpecProbe.Loader.wasm",
        "name": "SpecProbe.Loader.p579dimum6.wasm",
        "integrity": "sha256-fSG46l1PSnpfx2dxLC9Ir2ptYzIupA7GjahlXzmkfs8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SpecProbe.Software.wasm",
        "name": "SpecProbe.Software.iy7lub2d53.wasm",
        "integrity": "sha256-imUtQlVtdY433FlbfCe+jQomaNXDbH+zO1wImZhrPhc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Textify.wasm",
        "name": "Textify.kkfq9zncqd.wasm",
        "integrity": "sha256-VFZBCI7kX3YBAM83pViPNeqPNo5KksqjjgJmIjBcSak=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Textify.Data.wasm",
        "name": "Textify.Data.2etfno3eoq.wasm",
        "integrity": "sha256-isnsx/7WC/t2J5cmUkb2YiDBXYlI+N/3J5xtY5IX6Ps=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.dz4yo8jaui.wasm",
        "integrity": "sha256-uTWnW+IznZM0LihHqUnws6t9BX4wkuS+HMTWIZae6Xo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.xnmjx2pgge.wasm",
        "integrity": "sha256-g20Ks7F/tYaEUBOPiWZrlqc6tA9nYYsad76WZtvV46A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.sflm7blr03.wasm",
        "integrity": "sha256-CJnR37JgS55BRneDlOsd1v6ofLLgLHESn5NRB7Qjywo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.ivvcq3e87z.wasm",
        "integrity": "sha256-XlL7rF5lwK8DmL2j2rqdNuTDpQut6BmRny+dv2KL1Kw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.playdjw0jy.wasm",
        "integrity": "sha256-LcOsbz0e1rIYgjiINMxnae95o5wiuGv4P7J4x7Q9fb4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.dg7qk7bvi3.wasm",
        "integrity": "sha256-w9dkCrQohuGkZJ7OvWk0CDZUoMRh/0//WkgWn70+Nlg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.wxj53ookd9.wasm",
        "integrity": "sha256-NLdHgjHRzEIHr1fdhAt5mWkncYLTy2tcbVjWeYGn76I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.4fybgxuyc3.wasm",
        "integrity": "sha256-ABdCm+ExjqUQEyrunhEaM+bJZuf7tKY4g/cAQwbivwU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.sbhdiphx0d.wasm",
        "integrity": "sha256-CMFU+b1d2LT8JOuvrfe5QITMKX2d44sVccWUM8Kmno0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.4u32zlawlr.wasm",
        "integrity": "sha256-7JZRm0pVYXJED3JY4no/wPDl9LHp4sjZCpcUxxrA2GQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.6fk6s4qoo2.wasm",
        "integrity": "sha256-Hoc1gkF8xPHp9kXyM/crBRf7M+0Ma1O6w9YzeCCOwYE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.5f2myvbjzl.wasm",
        "integrity": "sha256-wWPcNNDfZ/pt5aY8se/yLmfVZcpLfb+vkseoGrc5/Do=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.y4buuokl1u.wasm",
        "integrity": "sha256-Hq7YbphU7JrUMsWHugxUAzmT2iyaVYUnkAmXcjIAMUM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.60gug8l7o7.wasm",
        "integrity": "sha256-huyYLZsGQO9Aod2RMMCT3lx2TUh5qmNAEeJsR3P+o7g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.dr6is8pck6.wasm",
        "integrity": "sha256-R8FQ8C5HETXzl5QrDjQHcKh2e7gl/ruIbeVUmGZAJTw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.8wgi7x9zvd.wasm",
        "integrity": "sha256-+P6iv9BqBaSzIMcl/QoNjmkXV39NyvncqPXZ1Ss7398=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.jr83mliiqr.wasm",
        "integrity": "sha256-Hzlb9c7oITQvjLvabaco2kd3FEOk2mUNLuYfHCHy1ZY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.zn3zrwfe2r.wasm",
        "integrity": "sha256-sRfXsXtfMMTo2CLx4ZKDFwtkYvOe/IRL5Gwf4dsnXMk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.orwcdf2bqi.wasm",
        "integrity": "sha256-5NlyiKMjQMJVLZ+E92VHzP4NXkvjJnT4LTZkWqm0KJc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.pgg77abbu9.wasm",
        "integrity": "sha256-53Ho1tN++u+pzBO7Ue9ntfXY7kDDlCcJP6zW616eotw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.gecvsrb3l3.wasm",
        "integrity": "sha256-iKgkIbBaSp5ylTKe2NDtxCeuPwOITUgE7+vqOYpO2gs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.botb82zsb1.wasm",
        "integrity": "sha256-BRU4Anh04FLb7m96aHkNrzect+SEGDmv8EuTMsl5ZBc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.jkxsrcykpm.wasm",
        "integrity": "sha256-82Pmb1ih/upLJyNOXN4xn54n1NeQOtEA800/7qOqRrk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.rpabiaofgd.wasm",
        "integrity": "sha256-Aftc0I5chzOFjWJhnyYm7oXFYupdp7ESNem7e7Yx2Zw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.ify6fcyczi.wasm",
        "integrity": "sha256-zjKrkP+VBytt5gUaiI1r3agcojDY60+sWMBW5b7CbHo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.r5bzk9s3yg.wasm",
        "integrity": "sha256-wQQEOPvizUKUZ712OqKJKdLiYT1t82Fey0TMZ7Wipgk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.ndizlab3yx.wasm",
        "integrity": "sha256-y1REYZ59lCgD4MFFiDFudt0Ts1eco+wZ5SKaS+6vg+o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.ln6z1u24vr.wasm",
        "integrity": "sha256-j/orGPp1WbDW9TRouvgYdbl3ncK+dWY428tyqKP02e0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.4xb43p0gs2.wasm",
        "integrity": "sha256-WPzhT9n8Ya1SRWSghuo5qY6VA1rA6zryhmCO8XCQlto=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.9r7wqr5ket.wasm",
        "integrity": "sha256-uxqFezximY/7QqBiz05os7l68GU473yQhP1x4lJ9GjY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.2xa6f29ksa.wasm",
        "integrity": "sha256-xsNizHioXAt3Dv7XmH2kZ+9ET0Q0PwuDr/oq+Q+ZWMo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.ffvu6crlqb.wasm",
        "integrity": "sha256-ZZ8Yl+tzEDXUuAnCPVKMYQ3olBU48bipKbHLrw78TnI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.u1f06yqgqz.wasm",
        "integrity": "sha256-MnoV33rJKyM4ob2m+B4jDhQln2wUkc36gzI6zNKR+ps=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.xz62hrvms1.wasm",
        "integrity": "sha256-7fxQRWMlzDZacsqgfD0kpxfG0yPKuBfZfB+7BnWcMh8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.nsfubnmzhb.wasm",
        "integrity": "sha256-d3K/0sOH7IpBeQB9qj98KMmsPZy9QPcDIJxaT7Gw7LE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.a64k6d228g.wasm",
        "integrity": "sha256-3vPK7QyQMcjXNLacG1SERr7K+dvdBACz5ezsmYKDl2A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.k553zjzeo6.wasm",
        "integrity": "sha256-2BukLJ6VuhAyjkV3+IQWWgImcbGx9YaRC0vLxXqr7AA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.f6ygocimgm.wasm",
        "integrity": "sha256-+YaMGRdd7ZmWXFWXUbs7wAb9AErwWb+DXX3IATt3hHU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.467lwwghw2.wasm",
        "integrity": "sha256-jPfC1q8DbgFXTIquSgGCsJ+Al3bChS9lXjm8hJAICJU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.x3xvx3pmeu.wasm",
        "integrity": "sha256-o4lDBCN7RXXPYnWt5DyWJP1gk0KwlR65FsDJGfM2o7c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.uwlngdlgjf.wasm",
        "integrity": "sha256-roLU3H8ThhYbNYL/3uaL5XKQrJzlABjArNJtn3uNyFY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.gwksaqyl68.wasm",
        "integrity": "sha256-MFV1rWqnq/S/AtEdCoyvydacYIxU2Sajb1ETJ+dT8Bk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.i13tyue6z7.wasm",
        "integrity": "sha256-pq7ydT00u5UQm/avQFu31YBwr+Si5LyFKIzcQHmlJu8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.3vk5p6oegd.wasm",
        "integrity": "sha256-IXYmNXVVtVmyHrbJnle6UVxvAu+0cZg6W3PAt+BOyFc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.l6ofqc3kdm.wasm",
        "integrity": "sha256-LWKkoGKvOptG9MVc/2Mm3CFHN6adaAdjjxuP6eWehdA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.zkdp4s1yjq.wasm",
        "integrity": "sha256-/eoeqi8pIdj6qpku1wAfSipmpEIApfz/Pdm7/JlvGSw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.ysq4rzz6yg.wasm",
        "integrity": "sha256-sndSZhomaMgZJSV8YYnGu9JTyssQJWIyipDAPAgJbwQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.fbit1jjf8k.wasm",
        "integrity": "sha256-+74UKv9bUqY6FB51NhM6XIznZM24ElLWGWZu2VjXGYY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.gw18htm123.wasm",
        "integrity": "sha256-oKCFPxbJmB4N740vSfh6aSW9DwD8E+iInzbreWfFrs8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.nm25vzi2xk.wasm",
        "integrity": "sha256-jyd/jQLUHA9UzU4JbwvL7f45uKuGww0Wat+ojBQYajA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.nj1ei025cu.wasm",
        "integrity": "sha256-rU5P/lvPGE6hyTviuBA8ctx/sC1+I/LdTI7n+DL2pL4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.deed694j9w.wasm",
        "integrity": "sha256-JRSnUKU4RCZCvwQXVaK87jabHPSnQK1daxG24xvCico=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.svb2i6e045.wasm",
        "integrity": "sha256-qLJ5v5CmpiNWlNE7oLwIawH7oTFLPf0EZQxOGJ6mUfE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Demos.wasm",
        "name": "Demos.j0bc4ov0lq.wasm",
        "integrity": "sha256-w5YO8fa2XUlhx/2Iygqq7uTBDZlvosEp9vpo36zp95Y=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "ar": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.sjsfg02spb.wasm",
          "integrity": "sha256-SG43J/DmNl10nFxqVz/L5xliuLlqf03KgIoYHwFoI94=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.c37nbr9uk1.wasm",
          "integrity": "sha256-WDWbBJbRCPHOrqsKtS3T9hZOlQtFfwpgNENO3bpuEvE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.w9o7us5hn8.wasm",
          "integrity": "sha256-pNTE+RHnE8VVAYdg82GoyZTFksVVH7SSVLO9RW3lQps=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.f68bq0qewc.wasm",
          "integrity": "sha256-2YfOGkNN7gu8dbAnIaukHPbI4zNds483oEMEwixpLGM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.xcbtif3u69.wasm",
          "integrity": "sha256-wXy0fAKNNvc26/HztpbeTEmKNcAteXDuOP94NNuxlFE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.q2oxfth491.wasm",
          "integrity": "sha256-IgtzB60vFjxzNCZrvFd8YLFc06CV4n3UNupsugtTZY4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.7ugzdcvft1.wasm",
          "integrity": "sha256-ATMg8HnI2t3OUs//z5A2wqQYJAe/oB10FmgDhMLJyAw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.5xpnjizby1.wasm",
          "integrity": "sha256-+U0pz1s/xUAb3cDSufaM9NjcLmaV0263NgGh3G0Nal4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.74jgas11sq.wasm",
          "integrity": "sha256-ObEoq7hXlV7xHmgfef4oZr3DdNgoyeDjvNFOOQrKWww=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.e5mslmm02z.wasm",
          "integrity": "sha256-3vMtx+CXwPeNnJ4NWFUPnkSJXlZKpyV9qhuza+u5w80=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.8xarigl3t1.wasm",
          "integrity": "sha256-DBITynDY/MgzAyTo3+bSewDuZXPk+JKRbfyxOyz26q4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.mlrt401xwo.wasm",
          "integrity": "sha256-+gQhr4zR4oNgoEx7zD8rwei7E2LLaevCqtELhNh21XA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.olvwv7hycv.wasm",
          "integrity": "sha256-BA131sLWBHDG+9/M/T0aZvdmBOlgN2kdDr0zYq0Vaxc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.2j4ax19nqz.wasm",
          "integrity": "sha256-khU74p5/2X2W1pB9F5jIyLUYbU1HYhHlQL65WRyo4I8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.8aiknmcc86.wasm",
          "integrity": "sha256-cBd6V6AcytrZLNl9UzEpd6nS0xMdVTpp+JQA/9Lehro=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.esid8vjpf9.wasm",
          "integrity": "sha256-ogs6JV2VbJ7qw4+dmxXcvaBSyimOuA1X4Rn66E9aWCg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.sl5ge7n6sd.wasm",
          "integrity": "sha256-oEWj7NRDQsuEskPf0Qs9lSDWLsBn+Fpc5uDHfWfjHm4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.1xdln6z0f9.wasm",
          "integrity": "sha256-S0cxgyRpnde+Nro8Cc42MpojHKB2RdYuINUZRj66UNU=",
          "cache": "force-cache"
        }
      ],
      "el": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.qqwp1kfqph.wasm",
          "integrity": "sha256-AlNCDZhOUaJJ7uZTEboPUrkqDg/kc7PmXA3gGTTyEs0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.5lnu0tf0ip.wasm",
          "integrity": "sha256-6VZSlkbLyRN941jjLoY3+CKw52jfWqAhT13nVvfHaFA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.3s3s72ndzd.wasm",
          "integrity": "sha256-I2Fngd09zFQs1Q4xFBhkCyQxOttVkoofQm+dXiZCv7w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.97wacm1i0w.wasm",
          "integrity": "sha256-ewrLPa7nhGGkAXEulrgXWnQFdW9KWyHqECOWjVB5PRA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.284cylee8c.wasm",
          "integrity": "sha256-nikuHeFiOIqlUD5S5euJ+L6DK/gApio8NpVdXLKDwHw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.0ulebypm47.wasm",
          "integrity": "sha256-+NZv1vKOWOm9fsr0vTRHIaOJEV6xcD/fmsVI/02P/F8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.2no1jvdkyt.wasm",
          "integrity": "sha256-Ai63V1giUKryR4XYzeHsrZfEF59m0oFI8j3dOTdCKT0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.ipjdyoocn0.wasm",
          "integrity": "sha256-+hhU8XbI9dmVjQJHKgC5tA7jJzuPXZjIJEIl2bgWS/w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.ycyo3h9n6e.wasm",
          "integrity": "sha256-DiWfOqizKdbwA10UMSaLaBoK2SrPnEEm5owmC0h+0/w=",
          "cache": "force-cache"
        }
      ],
      "en-GB": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.mo4dqckeyh.wasm",
          "integrity": "sha256-9iLOU8Wa1F5o/OwZd14INI+cnejy5CTtvx/f5SU0yw8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.la67jpg8al.wasm",
          "integrity": "sha256-nRLX+FTWpxERhDONIE8wLsY44hI8Oyjp+IqdCVd8MKo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.963zdwpoo9.wasm",
          "integrity": "sha256-L8gKfWtbEN/TrZjgGqBakawZR9sE2F8ClYKOd2wg6CI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.9mo4u7rw1r.wasm",
          "integrity": "sha256-oV9aL6NOS1ttkMDyaHgrMFxlgiiRge1N+V7f9mr6OPI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.gzosk963rg.wasm",
          "integrity": "sha256-fOX0H0BGezkosld5G4Yez0ULDPKjTQOK1wI6TtgC3rI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.anqkufah9n.wasm",
          "integrity": "sha256-GuLyzsni1yPzfe3mU2GJFk0WEjeqWwjq39LTtY8/OkE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.82u9kpvif1.wasm",
          "integrity": "sha256-cAjICJ98/MFc1tOdjRbX+WePlhk+M5v6mxtGPxTk4J0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.hvoxr2n7gh.wasm",
          "integrity": "sha256-LW9jloZ492Y+Mn+YIpFjLjUyPk9NoW7Kq9+ZKpFeTtM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.cgxacskoub.wasm",
          "integrity": "sha256-JHydBA8m7zq2fmU+4z9fNgxHW5/PeDesnVKoJwvV0Oc=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.5i1z1d0xc7.wasm",
          "integrity": "sha256-o9jUZAX4EFOEdfsj8R3hT47E4tHKvTqvRXlf7FTUDqc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.mvd9qln65f.wasm",
          "integrity": "sha256-fpP+k5GcBH+Ih6wnJbNZdmc/jUj8meR2T73TM8lg4uk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.cljgrlkl10.wasm",
          "integrity": "sha256-0EmXk/DTFKGnqiZKZUf8ZqvK7PsZE2QPpaNMmDMDZz8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.nlgvrapmeg.wasm",
          "integrity": "sha256-NSfLGR8r3IO1QapEjry/KapXr9RuYxnys6tAyTOKUSM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.g0kqno9ham.wasm",
          "integrity": "sha256-MHFk0OBFnaKqzWj4YuI7nHep9Q+vORRY+3Ih7dZ7i54=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.vyx7la6owd.wasm",
          "integrity": "sha256-t6Q+VxS7XYBtN7VX469Ph3ZfPMYdboWvK0zbnwkIWb8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.svf7w12r52.wasm",
          "integrity": "sha256-KPDPTeHgPmsToi7pwh9SWyZdMx+i0nKQXCP0ixsfLN4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.l4rkg9x631.wasm",
          "integrity": "sha256-VSrmUWt0Sv1xif+e7WJTmh9Z5g59ksHS8kfaiPOm5W0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.yla9tl3obb.wasm",
          "integrity": "sha256-9n4n9LFSGQU4I1zoUbBBMGPIJ1tsoPtN5878ZHbhoI8=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.bmmoq5dsnc.wasm",
          "integrity": "sha256-fRnFlMcL3S7p3n4MqFL05iD/IzAiMFFGw1vBhp8UZAY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.ke4rsi2svp.wasm",
          "integrity": "sha256-9GwvfrORlFytp7itaSwNLqhMpYdRZXblI3vFlHJQYwU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.9y8mwprs1j.wasm",
          "integrity": "sha256-L1U/0GKN/u6IPGxa7FTwKXe4Rq0xj+tGQpSilzhSG8s=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.iqnnoqlu7w.wasm",
          "integrity": "sha256-6mdrcFobYgVhTK3RyzZVHK/rDX0Qrt6lpAYIKz6lsSs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.1rdsomcq6h.wasm",
          "integrity": "sha256-Y1uJ9nNLxl3d8B5aWUgceQEjzLnzSJ9tmToaHSbeT68=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.f9o76bnk42.wasm",
          "integrity": "sha256-k7gHorfPK0FeHEkKUPLJcI7UwESHVojsdZNP+S20d9k=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.rkeybp6qeo.wasm",
          "integrity": "sha256-tbJo+M8Yh4es0uM8dr3cHMATSP0oy+WL3DT8H1ohokk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.knsfx8x4g5.wasm",
          "integrity": "sha256-0C+sQYyz8NgWF5OsdnNH71QilcWQ8e6CF5H2uyr5U8U=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.tgnnpnq64z.wasm",
          "integrity": "sha256-jWuzei+aUHML/GODGQYhmBMbiq3gzXBMOs9tdarEJTs=",
          "cache": "force-cache"
        }
      ],
      "ga": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.8tfdyl0yu1.wasm",
          "integrity": "sha256-TOemINRR4BVXF1S6YXP6uSIzGPN+yf4uQZKsmjTSbHo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.sjlg26a8eg.wasm",
          "integrity": "sha256-6HTKycBau/brHLAYvJtkR4cTLD5CyMGITUlU0uytua0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.hs7t2ybxc9.wasm",
          "integrity": "sha256-TzkyD0FuZ2q/0vERFlAjuyPdk5AqOXGS2djsIyYF1AA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.f91aydj9oa.wasm",
          "integrity": "sha256-40rXeFeBx+FW2SFm7hVv6GaaSLR5cbiAtfN6yT0eZ34=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.7ufi7d6ewl.wasm",
          "integrity": "sha256-UUTf+DARgirEt0PN53RgOMuW0+kAjrbzLks9uB4Phlk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.ap4c5e85iw.wasm",
          "integrity": "sha256-MoDgv5tS5GrYvt+qKnmdtcR+uSc3JSDubP5xconsk60=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.ujpliocy2b.wasm",
          "integrity": "sha256-Zplcol33GCKEPeXJCoJ0/oJzUmIIuZPHNXhX56pz0TA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.pzvdli8zmo.wasm",
          "integrity": "sha256-yx+LOU0uXmjvUvpsOqUpV4e56ScotVivZun2sQ9Eq2A=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.9zed4ivlvj.wasm",
          "integrity": "sha256-6zbH812MjW2nppkq/DRHSyq6Op3pdXI/yhiy4zhv2YY=",
          "cache": "force-cache"
        }
      ],
      "hi-Latn": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.so12i3lbhl.wasm",
          "integrity": "sha256-DMPszSDfCoZzCA+DwJ6B82ie0X1cqqTE5kQh9aq7z0I=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.0ebxrwjpcc.wasm",
          "integrity": "sha256-6KIu2pIAnfB0D16AXXR4p3iUCFMhTno7LaZA1RLrgyY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.kkf2wen3f6.wasm",
          "integrity": "sha256-rPzY/rtWZnTelhO5BQxz4J6/YsQ2+GsS7GWhS5CGoWU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.cxph3z38yg.wasm",
          "integrity": "sha256-gOOw3oKZq4Lsc5perHfPa0Zib1PHfuyPa566d0jsfqo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.i66zjh8mvc.wasm",
          "integrity": "sha256-CuGlTYmK9dEqNZUYDFUwCCUGwXAYB5MzMYqcAoyRqJY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.ckx7x2rq31.wasm",
          "integrity": "sha256-rN7oRm61KFsly7encN5ZeGTbsfe7XpElI/DJGBj75XY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.vzl9nuyjvv.wasm",
          "integrity": "sha256-m2ZNmKzZrBgWeYcz0ubbZ0Ww5QvZddUoXaEyLhTDBzE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.wx06yj26h9.wasm",
          "integrity": "sha256-vIdhypRMpXrJjSYZAegfii2OG9uQIQUngBvV6iXDsRQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.wg83uhmxbl.wasm",
          "integrity": "sha256-YFAnzCuwJQLkGYd6cY82Rj3NxVJjsMcFxGFHTjaeZNQ=",
          "cache": "force-cache"
        }
      ],
      "hi": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.i0bl1v3fpz.wasm",
          "integrity": "sha256-/mcFNXQdY3rzBscJqr303+TXp01/hLD1bVNF41nwsL0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.fsrr3vu2zt.wasm",
          "integrity": "sha256-kRsuRSH4Yk6+gxeCuFGCGcGFizdGrvqsJN2QMSsoJMU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.h4bf25f24n.wasm",
          "integrity": "sha256-7zOuIIBRnr7ykmAdvv98owqg9tK10Vd3wBiNWUlkGU8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.fi1sl42j4e.wasm",
          "integrity": "sha256-p5tRhhMkSTRp4hg93Q2kao3KCAG+vehQiZSz9yRgTq4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.vp5kaird5h.wasm",
          "integrity": "sha256-DeQIWG/1HprXHVG1FfOnCJ3/UdDTi/rexXUvpLwmAJ4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.wval2hivf2.wasm",
          "integrity": "sha256-XDAHeHTkPZZf6KEA9X/9TL6p0uSyI8dH3PC3WEb03mw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.1kdeaqjdad.wasm",
          "integrity": "sha256-IZ6E+VtsomUd7lW66t+wBzAc6KOORKN4O8SeBP4qktQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.nhjo1w3tvg.wasm",
          "integrity": "sha256-VfYmYqXAUNis1xe1saTJCU5hFKHSep5F/bGRNgL2a3k=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.jv02fr5ego.wasm",
          "integrity": "sha256-7/tjmxRKlRVqedLEdabAGAV/q2lHMyJni+5Ean4NcmQ=",
          "cache": "force-cache"
        }
      ],
      "id": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.0d0fv8a1j3.wasm",
          "integrity": "sha256-bNHRlWnQQc3b17uRxT4ufhRuD/sQCdyvBxs/71PJ3QE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.tehjkrfk62.wasm",
          "integrity": "sha256-5a46HdakP74tx/M08SZ3xjbBW8OZeDu4quI/pNapv/E=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.e3dq0anbih.wasm",
          "integrity": "sha256-yly61s/+0hRaGZ8A5yTmdOG/wK27RdHaVK9Zpb3Aay4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.quxxyqwn8d.wasm",
          "integrity": "sha256-ovOZuVwoai46j5igfalGDHKlnSFxUZONTvTdOProUWI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.dyoqpi1ucx.wasm",
          "integrity": "sha256-1dH99pfIgrgyYiBqaQbiG7uzSvim1sOrZ0LwAYkNfm4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.5loi4sjach.wasm",
          "integrity": "sha256-B48FqBi1py26n8egAgY1EeVj1nmUI3EUUhS+Y0PZZMc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.1ub1ffann3.wasm",
          "integrity": "sha256-KV2Cfc9mnFwzR2tVVmp4IlCnjyVGwf8CMKMAaeFZaU4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.x8pyux721p.wasm",
          "integrity": "sha256-UaajCyeRmQIO8ZJBH77JbpsBTcnjkqQNxVIUzMVyyIg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.7cjidev8fz.wasm",
          "integrity": "sha256-mbiAasfJKLWJfWKx6XdPZWah2KEwo61CxVzYwm4+nZs=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.97e85le46l.wasm",
          "integrity": "sha256-G43UG9H+GxDhjyesPAltw4sNXHTOetVufvX/7xo7i2w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.cok3l8otxq.wasm",
          "integrity": "sha256-bKDhcS5pcNkGuPY4wVglFeh8oXlKjvskuBKpzMfVOnw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.wpfi8a3phb.wasm",
          "integrity": "sha256-7P9sEjWGKOqjVt+MqDjOLU4LS5Gu6+d1gT13OKQc/RQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.6ccsaoyrp7.wasm",
          "integrity": "sha256-drdJrzZ7T6ZtYD5IoHLMaqIs35LnE4LFg5uxjWVq3Hw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.j4tph7ated.wasm",
          "integrity": "sha256-TZP5PAhjRIeoF6Ra/a+uHWYF1SxrT/oX8fmwzchhzN4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.efdw7b902j.wasm",
          "integrity": "sha256-+g7ljUtxB2w3+46eoCHzSTFOGM9c5+kANzM5QjaqObw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.0kl0de3562.wasm",
          "integrity": "sha256-IAL12Ngjte89g8symNfpXv5T//h+LZXZbPUIDG844SY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.rt2jd2rgeq.wasm",
          "integrity": "sha256-D7rwE0ejJwBZSp1hysdr3TnBtFulPfU0eJ5RvdzsxfY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.po3xapy6rh.wasm",
          "integrity": "sha256-F4EZ0IO874CQCJrfUHBjTyxYoOjmFJmJvJa/ayOjhGA=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.tyjj4a2goq.wasm",
          "integrity": "sha256-1fdQks4aV/oKDbd8en0vnXgjtQ+cZhfeKOmM0OCui3Y=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.hbojgfbjjl.wasm",
          "integrity": "sha256-I+KMXjchNM2SsxGRwSikpLK0rGCq6i7m6Vq/ncZk4JI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.pvutnrn9l2.wasm",
          "integrity": "sha256-a0vW2Km9Q4HiwN4ookUJHvqxcd7ftfn2Gqg2h/vJuNs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.h23p1sio1q.wasm",
          "integrity": "sha256-N3NMz2Y2u4qXcGBO/AhQC/gF4ZHVDykPPrFZpX99krg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.wawom4803t.wasm",
          "integrity": "sha256-eGCQsUja1gG40jyqBhD+gtTIwp5E0tjZAisLWlwOg+0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.2z4o2wd89i.wasm",
          "integrity": "sha256-LsHfDyu3L0YQt2QX2nc+pgzVJ3sSZDz7Mmmq4pDLG8U=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.euusfinx6x.wasm",
          "integrity": "sha256-JjJ/p8y/DTY6CoCDfUUB37tj8DPdQvv/ARbf51jB924=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.we0wgag99k.wasm",
          "integrity": "sha256-GILFWHL7QuNRqj5bC6X8SREJQYwlBmEOY0xSOoC6a+c=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.004duwviht.wasm",
          "integrity": "sha256-gCPXwgGZfiEeA+5bLGcmE5rBArEJJgMQmvgEIF4qU94=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.hw1zp7ruju.wasm",
          "integrity": "sha256-YVkRCq0sHmt9ZZjLK1U0oASmH5vHsC0+ukFzXhNt73k=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.zk5cu7chz9.wasm",
          "integrity": "sha256-vf4dl+pbXGH4/XiOzuYv8WrxdpEJJcsCkfIC4mrC/u0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.rbv7lj6xrt.wasm",
          "integrity": "sha256-qWSmBzgmGd/DGWLpvXn42XYDzJKUaszXtQea2R7khUA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.mcafgegg75.wasm",
          "integrity": "sha256-2hX2ZdYHL0mBkpePXa0Wyfj2O3VyzyQ00dOeI7FMB9g=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.ux40af2b6k.wasm",
          "integrity": "sha256-At8AWGYK1L9XP22Gp9BbWaycCE/gagdU1pQwY07ykkc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.3x8xg0r6cn.wasm",
          "integrity": "sha256-Z+sVvKJcPQIJ3o0GCfNjZb3fhUW7dThkE9c+1iWmaeo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.nu1xwjvpo7.wasm",
          "integrity": "sha256-nwOx3GzBu+A2GtiWRhNj5Q605MkQF6aTnb1x+QNlVJ0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.kmyix9enxp.wasm",
          "integrity": "sha256-NFs1AZ0xzKK1FGw5iMETzX193u9esSgjeFKGv90srKg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.xqbn03qiu8.wasm",
          "integrity": "sha256-OaeGyeJ+2E1f2xSC+ZeDBjURUcxRqOVHQqZu7lNdF3E=",
          "cache": "force-cache"
        }
      ],
      "ms": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.w7dk5pb1kz.wasm",
          "integrity": "sha256-FGeTJgKbPNmg3LZMjvxtZi7i7DU/3ba7qn15sAPWYV4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.3rbo73w1cj.wasm",
          "integrity": "sha256-f+TcMr+izQx0s26PVYAGxoSwl6ewqN9Gdljxp3vE10k=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.i92blvvs50.wasm",
          "integrity": "sha256-NuFCgbH0x/Zq0nH8NDJLiPQ6YGKAbOEqZ7FJCVb62CU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.icwzjhbri8.wasm",
          "integrity": "sha256-fipCFdmF6uj0/p2SvFqDsUXrlN8FcyOhBxN/3kDqG1E=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.rajec4k6vd.wasm",
          "integrity": "sha256-zcoxW9DDpdzcI5YaEuOCmIOWxtcX2tLG4Q07G5ehxig=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.t5txd9orhe.wasm",
          "integrity": "sha256-4UJIvDO+eZUOboWdZF4aswr51f7glScp7nojBgVXE6A=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.psny2nsjes.wasm",
          "integrity": "sha256-+SqzqMF/OG5EOrx9f2PGC9pd4Wfx6k/olTD38IVaf7o=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.al20c1b437.wasm",
          "integrity": "sha256-Hu1LShVAy51qHz3bgp+MEDbshyWGYx+sYPBpCxhS4WA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.2xwxfpvj41.wasm",
          "integrity": "sha256-5kdsVa+vM05PXnH0yIWtWkay9NnG3bxio3soqKC2GXw=",
          "cache": "force-cache"
        }
      ],
      "nb": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.1b6030gmeb.wasm",
          "integrity": "sha256-E30uN2orsSCi6jQf5tQq+//qGom6ZG+o7eQFxHB3Qws=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.ptxzeqi0tu.wasm",
          "integrity": "sha256-A9R2HsRTADrX0NJJwdE7n6WsuZWHqOeemIIy9Q0sJ9c=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.gd3okfyy98.wasm",
          "integrity": "sha256-7AjR0KR0UvPV7XHhyLD5hs93QyYKE5WAqorrfkkbde0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.aljd0fknbe.wasm",
          "integrity": "sha256-kr+uLHmqk/TLHMIwNbWDL692OyDWIs59gsI1GFHQc9w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.bo7zkewfea.wasm",
          "integrity": "sha256-ZaIzs5qwVGi8JdD6CVCGqKBX+zM3HJJG2pfslha69p4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.5w4d5gnqz0.wasm",
          "integrity": "sha256-Ba+D6elflaIZ3YioqIpRb6CZsxR5hwLuyCST4KN6h8s=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.ao6owmfa58.wasm",
          "integrity": "sha256-NiDbvqHei6GmwuCUocCViRDuwjzwrgYn7Ppw4ut895U=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.5bhqjx3rl2.wasm",
          "integrity": "sha256-3x7sbkTYI9iA4qWLm1s7staRCdcYYfc79C2qU4NxPOE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.svrs5e72r6.wasm",
          "integrity": "sha256-2Ha9v72rKeemuB3AaALQoCKUb+mRh72V5xwyAOKbWiw=",
          "cache": "force-cache"
        }
      ],
      "nl": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.g7zsp71w9g.wasm",
          "integrity": "sha256-POa/XDTlbmomtExdTVuOp7QjJIqLPXtzKPRoRiqVjyw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.11kr5kdeqp.wasm",
          "integrity": "sha256-2xx+Q0XBm7Wufr8sQEf5sSPoxpihn5mTmr1w36GqIJY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.47ws2slmuw.wasm",
          "integrity": "sha256-AGw6XwNJgpOCn/uqnzpDMW55tLzKdfVPAEt/yhrBcrI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.o3d1nbi4ux.wasm",
          "integrity": "sha256-bGTSOri3AY+yovD7+XnfPL8t0JHTPEZMMVyOYWGb0yA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.hyry38e60a.wasm",
          "integrity": "sha256-99qUT20D/HqrpmB3/GRfXXeTwhTGKtSXpP2WvBFjWqo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.j2abvx0l1j.wasm",
          "integrity": "sha256-RRVWWhFd/bbFvKEpHGNsP2BAozvEKakrPXrjnlbXU7g=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.vb5cvzc8mk.wasm",
          "integrity": "sha256-Ba9rqnEpTsjjeMiJPa6b/cQdt4LySoeVIXDNNCmJXn4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.ketdshdjao.wasm",
          "integrity": "sha256-HOYY+czUAW51XdMwS5A62MNrqI//A4KvAui657K5aaU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.tof570inzd.wasm",
          "integrity": "sha256-rSWlVAsxJGMO2/fUYUkqdLTv2QBAN3gRf41Chw+wO/k=",
          "cache": "force-cache"
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.1ja797hqjc.wasm",
          "integrity": "sha256-DeY70Rvv4F9CEzXAeqh1Fjgq5A7aoZyi1ocA02SKKzc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.f57zfxoqfy.wasm",
          "integrity": "sha256-DV5UFiYve27E0kTZ7zlZgmXOV68cut+msM20NvPY66Y=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.sj0qy7qjpm.wasm",
          "integrity": "sha256-uDwER+JQNKnt0L1ON1AxhB6cklnccBYLR+fR/FpUGQ0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.d2ukobg2c3.wasm",
          "integrity": "sha256-NXkwLtCnf6M9JBQ4yXhFWvwaH5JAsSoWcGZqMOXv8mg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.v1gmwjvsqz.wasm",
          "integrity": "sha256-wzbGKvHJ+tBqfMnToa6Oy2lK2jAhE9w2Plw3JW3IOHw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.nnxytykhpb.wasm",
          "integrity": "sha256-HZyRSEwUCUHhWxISwfMsdwL1TVSsFKmK+ss9LdejsTg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.sxxdamfqyb.wasm",
          "integrity": "sha256-8EDZEeekgnPNjnmCw2ChxGiT/sBTHFHQIF8Kw7DIyME=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.xgnk2k7qk0.wasm",
          "integrity": "sha256-L0q57+O6xNHeKMfB63a26eaycDJN+/u4B7b/vv2/nxI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.y94xqka4nr.wasm",
          "integrity": "sha256-GqJmb+pGU7+q7dXKAR9LlGYp9VCubIwEXKjvUFqlCbg=",
          "cache": "force-cache"
        }
      ],
      "pt": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.5qppv7un5x.wasm",
          "integrity": "sha256-gxY0UR9HlPvrifoRjwa6m67Y8unk/d5NYK8/sHObaFU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.uxvegbjqpj.wasm",
          "integrity": "sha256-zppwGXaq3n/0hh+nGb1u7TFWEgrQPsI/3AQyFSGq+hA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.wqc2nlxuwe.wasm",
          "integrity": "sha256-+Nc8IeoDTvr8qFJ+zjfjRf22EdcBxOIdqogyi0WJAz0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.k6hrgx9myr.wasm",
          "integrity": "sha256-vNMbJ+9M1kB7LpqfDJ9NAKxUrO6w+F2prl5EDPyE3xc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.9qkzvhxkfy.wasm",
          "integrity": "sha256-TzkizYkhcmjJ3HPlrexmoc/kMX/u9vpuOgBQgKi3mdg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.hgy2a113m4.wasm",
          "integrity": "sha256-DyczF6UNtFbSDXOWkpT/XsCMBmD4GdD/a4oeYCnIu1E=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.i2rcbirpco.wasm",
          "integrity": "sha256-9ogmCbOvRHWS4r36iqohXMC9SILgh7Pfr0kOAVQg8X8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.g7xkzgwnjq.wasm",
          "integrity": "sha256-HOiuBoiAdeU3sk7Q1aKW1i9rjsrnXuTg79WGfnxCPkY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.9dzukme95a.wasm",
          "integrity": "sha256-jdpwOY6Wf59h6rjv5i/HJwzmK/GVzv3ZsrSRPaVJDGA=",
          "cache": "force-cache"
        }
      ],
      "ro": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.4qbaiak359.wasm",
          "integrity": "sha256-JOxfC7+0rhaoFg++QYy00hZuvwswni3XSKNHDbzHht8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.yrunt0ehbl.wasm",
          "integrity": "sha256-jliMi9Sq0QEZCSl6eo08EACCe59gs5gRe7gjsjCvFCw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.laas5tgnuz.wasm",
          "integrity": "sha256-42NEG/RGILfU6qM5naNLykvPujumsevjtrhr3TWfO4g=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.pth19zn7vn.wasm",
          "integrity": "sha256-fVWVVmYPnHVmd24BcrFw6oV343eQJgZoSxl1dbiVsFM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.e764jl60y8.wasm",
          "integrity": "sha256-ar8Ff74O3O8XPQgl9Q+Gw0niXPjB1rnVaBFyniRImGE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.uu5ienat6z.wasm",
          "integrity": "sha256-JljeHDKTYG464rA4rwaaXXCZQAW+7gCCgKDOMFTOdU4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.4hbzogfihc.wasm",
          "integrity": "sha256-KBNSjdpsHL7CFz8kkAVP/NiTDvGMrc0lS5oWMU0XOw8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.usuigkj99g.wasm",
          "integrity": "sha256-kkMsGjpSW9XtMBCKQMXhHmuQ17aB4/rbTb2zfkSNcgM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.51w5dq7gtl.wasm",
          "integrity": "sha256-l4m7IHML6HOuNX/ZltdCoX0psvoPs7cA3YtPwKvTKCA=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.ciey35hjgg.wasm",
          "integrity": "sha256-9GRZnQ8fojdN8i+bXqvYy+O/Ez7x2xvwSMG7O5vRbPw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.m5sfyej7x3.wasm",
          "integrity": "sha256-Sobm9EmJZpAV0AcMhdgJTtOhBbJF9gFKqS0X7Z+Klek=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.jxaql5r76y.wasm",
          "integrity": "sha256-15LKkrNZOUQYHWKvrtiKfJOEUMNhMZke7WCjB6I1bbk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.87xl4jcuqw.wasm",
          "integrity": "sha256-VIuqTsiKzYxFNWD8Kcaj9vIUD8IXOayOgukNyYrKfnc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.nabqrdewff.wasm",
          "integrity": "sha256-r+rGn09+xCQUaaSWBZbc3VJkI7tsaxt/vAUezHzphjY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.roaksj7brm.wasm",
          "integrity": "sha256-5ZTA5YFLVgaYyTt13INRvjzFTnjWzbjw/aHKDG8h4uI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.hr669ru106.wasm",
          "integrity": "sha256-Q4NL1MC30JroWhucOmSb2+//aI7RZB4+yf25YMpBBPM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.ny60hk1ppz.wasm",
          "integrity": "sha256-wQvPsBPUHQ+X3vbEwMiGpuWZs5Eh4HQ9Dvie5wMb2r8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.t3n16clh32.wasm",
          "integrity": "sha256-OTGkdj8btr8wpW7TarlTdHyF1HnQ+sCERvOh77Pv91Q=",
          "cache": "force-cache"
        }
      ],
      "uk": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.fxo3evkjic.wasm",
          "integrity": "sha256-DbX+GGWeqezvTwqbE9gVvReKt+GUjD0Y+6zxJHwsLWc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.fnk92wseff.wasm",
          "integrity": "sha256-NS2JzvvkwHa7si0F2oalu+4V1w2Do810UM7L8P8MihM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.398p5crowl.wasm",
          "integrity": "sha256-B3uSzaenuHtddJnSEr9XZATjotsuS/bANpxV8pk/THs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.m5tggf7i6s.wasm",
          "integrity": "sha256-ZmzqSxnE8ZqqTZzqM+4cw/L+Q0Plu/QDkdGGypVxCcU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.vqc7dwze2t.wasm",
          "integrity": "sha256-uWbciyXsviG7JOxVEmpkv7BUIIJibm+QCIAQqTitGVs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.4dig1tsc62.wasm",
          "integrity": "sha256-CEr3osyAWZ6pe/Kr5Q6JiBk7j6XVhkzirwghsT+fmqs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.r3sr72ejb0.wasm",
          "integrity": "sha256-BxZpTCyR4iJtGP9Us5M3eCVMFr6hfIiXcJRqFSEhXY4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.580eq75jq7.wasm",
          "integrity": "sha256-pd6+Rxh8sZhcUbQmyjqfaDPtPgYsZegZh/lIzhrl8tE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.qyiya48pe1.wasm",
          "integrity": "sha256-gi6S16GoU3Bd5v5tuSbuwXg6oTiJXJNdeGsFZhaROkg=",
          "cache": "force-cache"
        }
      ],
      "vi": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.ijpvn17d78.wasm",
          "integrity": "sha256-8qF3uLPM3Xvymv7q8cVo8ILweZMhjZmHivdM47da/Ts=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.13kcj5ueua.wasm",
          "integrity": "sha256-U4h5sh7uTyTpXJg2yLZ+rZARZc03Xyl8mIl/dK5xB/E=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.i6md0o5ko8.wasm",
          "integrity": "sha256-dp4GNK+hsejjwkNcAUXiHjU+wXrvepry3cBHdNMfAtE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.ejkjhiq4wj.wasm",
          "integrity": "sha256-RjgSSPnog6Gxcnl878TaZBiJN3Qjne4/5rTepykBxlM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.6g5w0sz60c.wasm",
          "integrity": "sha256-loMVj82og4wAL85nDFv6GXAOxsimfFirpEsAVkLMHOk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.u60jy4vl30.wasm",
          "integrity": "sha256-SlbPtnqvmufY/nHj+j3CD8EojAWSK36kvGPA5gR9buw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.il2g3nrtqk.wasm",
          "integrity": "sha256-2v8UaACq30TXvRUb6HhwAfc61OgCzhuttHOsqJgwGJA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.jek83imlod.wasm",
          "integrity": "sha256-tdsK78CdMsmVXo+6m0oaH061ffQ4BMFCHPapxiIFYTs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.xq9pi9nwzy.wasm",
          "integrity": "sha256-Z3xTF66qIViXV5ItGmPkHiYYwNAdz5+8zzMZpYh51F4=",
          "cache": "force-cache"
        }
      ],
      "zh": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.xp87k2m2tv.wasm",
          "integrity": "sha256-5eM7cNiZBs8wDX4N2/XN+V2BWVmPEGmXN8i0Q9qCjcA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.tyxvytixl3.wasm",
          "integrity": "sha256-tRNpll6DvmMLN5fuWoEGTFJ8Kp4bsvzPOw0Ptk0Gpgw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.0cyd7kopnl.wasm",
          "integrity": "sha256-8BnlK/upM/WwHQ1inxGZZR9wSj8OH2HIqAFECLaDi/M=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.ml8j2ibsoq.wasm",
          "integrity": "sha256-ttMae3Z+3Zex5OBFEJz964Km/VI7K9FUAlqdmr0adbw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.ueeagpgzov.wasm",
          "integrity": "sha256-isSsFS6nAKn05kvpg/nL1rOkGINNyMRN2mmfFTnPJWw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.wf19xlmedf.wasm",
          "integrity": "sha256-jIR/LnEe8KNJKoR7xTOK+03+edG+CAvEVfh3oGxbeOU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.0xnvtpexxt.wasm",
          "integrity": "sha256-LBSqyw4DktHCFxtGtT8lR8yNHrKlQ7oD1NYGXWwVxZ4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.zvc57co1dv.wasm",
          "integrity": "sha256-f6fn3v8lMTo7pK9oRRdgg9OiDxkwbhOsAcHdUMlunDE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.zmadaia0tz.wasm",
          "integrity": "sha256-G+kY70wBTrt/dp3SufoeungFNlX1bPMnY6tuk2TPaY4=",
          "cache": "force-cache"
        }
      ],
      "be": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.ug7lka29c7.wasm",
          "integrity": "sha256-DnUAL0kwicVIALWxaZoMpfAj4ZrUe4JFUTaWz1iGqwk=",
          "cache": "force-cache"
        }
      ],
      "br": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.zqdkzs1sw0.wasm",
          "integrity": "sha256-ZXpYkI3W2smo9XITdGmjkqia8Tdd5muqiz4RpBtqZa8=",
          "cache": "force-cache"
        }
      ],
      "ca": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.onnlv9kbfu.wasm",
          "integrity": "sha256-BK6amaqiIzpNGf/a9auKbydRpxk5vF2MWPPPzMCcUpI=",
          "cache": "force-cache"
        }
      ],
      "cv": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.g0ml9x7rjw.wasm",
          "integrity": "sha256-UKA94EnllTirr4sMGALnFLs+GGh5yutWamxX/h+A5B0=",
          "cache": "force-cache"
        }
      ],
      "ee": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.anhmm4af0b.wasm",
          "integrity": "sha256-Kjep1YGL4cWR09t8MV/JGJsTIZxqO/nXFHlNwac/nx0=",
          "cache": "force-cache"
        }
      ],
      "eu": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.39s4jat0x3.wasm",
          "integrity": "sha256-+Wz5t135sD+JbAWtRuxq7/P7OwBCZNQjmEuDvsuEiyE=",
          "cache": "force-cache"
        }
      ],
      "fi": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.qrbtxd6331.wasm",
          "integrity": "sha256-KupWPZJhQXr3pjmnbrvgTNcsMF92h/y1klEBomW5LNE=",
          "cache": "force-cache"
        }
      ],
      "gl": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.0wtq9308uu.wasm",
          "integrity": "sha256-0K4R5FThfBRaCLZtl80B8GoePojLTVLE8C+5YHTOusw=",
          "cache": "force-cache"
        }
      ],
      "hr": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.ykb3bw24oi.wasm",
          "integrity": "sha256-nhd4air8lk6g2afbbD5odj8pohMcQ7XL1QIcBwza9lo=",
          "cache": "force-cache"
        }
      ],
      "hu": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.2yt48cu08i.wasm",
          "integrity": "sha256-Zvdr87szWzSJnFsOkOsZ4SuKTfbHJqBlQXSRquCASLk=",
          "cache": "force-cache"
        }
      ],
      "ie": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.qqwrvptjg1.wasm",
          "integrity": "sha256-gvE/EPIp4yJbq+4s1Nizw8Qhgfry5nMjwSLVniEYbxk=",
          "cache": "force-cache"
        }
      ],
      "in": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.zyhw7hsort.wasm",
          "integrity": "sha256-BdIVtBW/s6HnDF1qmK+7COPAH4F7f1POqD6O4t9XvuA=",
          "cache": "force-cache"
        }
      ],
      "is": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.vlax2qme19.wasm",
          "integrity": "sha256-8303Jycm22tRq4HAEKYYhUxIPJaJMrxXYdo85LkvPXg=",
          "cache": "force-cache"
        }
      ],
      "lt": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.g115n9lvl9.wasm",
          "integrity": "sha256-hN+PANTtm4RUn+veMN3Mppo2vOYl9OtFxlKtBaVMtaI=",
          "cache": "force-cache"
        }
      ],
      "lu": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.d8jms2df8b.wasm",
          "integrity": "sha256-I4F/9KF+xB6V/2OUgm3UYc9Nnx8RY3LWe8Eos1ji6Xg=",
          "cache": "force-cache"
        }
      ],
      "lv": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.r07lmrzyai.wasm",
          "integrity": "sha256-NRf4Gbs5KTSYdModBzyaaPsQgJskmpVOPL729t/utAo=",
          "cache": "force-cache"
        }
      ],
      "my": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.bmo1fr5tey.wasm",
          "integrity": "sha256-432/8w25vTxKrg7kNpGVIDBca4vUgirafduW2Ab7TcM=",
          "cache": "force-cache"
        }
      ],
      "no": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.1405gavx6z.wasm",
          "integrity": "sha256-0TfT6KGy/D51Qv7izu1qdwVHgjSSRLAoiNUmIm1hNT4=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.fks7mgcm7t.wasm",
          "integrity": "sha256-oR2jWXW6QKerKw3cztkzswfavcq6CGfBuCqhmjVwtTU=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.vhrf13cxup.wasm",
          "integrity": "sha256-88VxXRidGD06KogaqWLj4lF3wJ+7liGd9focH1M1T5A=",
          "cache": "force-cache"
        }
      ],
      "sa": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.nmzwpighgt.wasm",
          "integrity": "sha256-X/2ejNsGkT8S2rnb0+oRKvYIPNez5x+zxKFSuwuBR/A=",
          "cache": "force-cache"
        }
      ],
      "se": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.b6p2arr27j.wasm",
          "integrity": "sha256-DU542L7G//umoebbVMPngjCAg59HB27IZsj0zqVeClY=",
          "cache": "force-cache"
        }
      ],
      "sg": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.kidxabj6yq.wasm",
          "integrity": "sha256-rMi6HY6dbhZwDN+okhSW4lrQ3ztWwDxIbBWtnOmNClc=",
          "cache": "force-cache"
        }
      ],
      "si": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.07pom0tgb9.wasm",
          "integrity": "sha256-jDtd+EZGyZVifQ5TJGfohqJO1HhgRm5TGaubM5qL3f0=",
          "cache": "force-cache"
        }
      ],
      "sk": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.l2clpkjl63.wasm",
          "integrity": "sha256-o9ZfOYzSSpbm/US7ecipOMy8m7FXow82KCPGvxDHSfA=",
          "cache": "force-cache"
        }
      ],
      "te": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.lfdfclce9o.wasm",
          "integrity": "sha256-wTED7rq3JGEIy4QI7sUZMcGTMaAyengv3ZNo3uFIurs=",
          "cache": "force-cache"
        }
      ],
      "th": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.4f0kehrfzi.wasm",
          "integrity": "sha256-4J5+hWYNG1jpqB3N5b6EiklBBstsRymWt3V8PcrN6Ls=",
          "cache": "force-cache"
        }
      ],
      "tl": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.yop97t3xjw.wasm",
          "integrity": "sha256-rqpaB5umUR63C14v2U3B1SFtbIYcjCzMKzp8esycUvE=",
          "cache": "force-cache"
        }
      ],
      "za": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.jnd5tzlo8r.wasm",
          "integrity": "sha256-X83V/DtjbEZz5owTuX8CUmxWjumWD7YOgwKmzhPZPaA=",
          "cache": "force-cache"
        }
      ]
    }
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};

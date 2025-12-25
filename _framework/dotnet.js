//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",noCache:!0,useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"fad253f51b461736dfd3cd9c15977bb7493becef",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Demos",
  "resources": {
    "hash": "sha256-019srLp1VKpZyuBlX4lUAK2YYdcF0yN486rHqH7viyA=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.cr6vj07s8e.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.0j6ezsi0n0.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.b6w2stkf8z.wasm",
        "integrity": "sha256-ncBkMCH+PsTQod8/BxKmI65l8Lk9yD+fmbFScGmGGr8="
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk="
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc="
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.50ez5m42lb.wasm",
        "integrity": "sha256-W9ESzMNrB0Cjt1YZL39Yb4daAPwKatQUst9AmVjw0M8="
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.yd8h6mnma3.wasm",
        "integrity": "sha256-thLKxCQOnuwwDfaO0D3/Cj/2a1ki1DyXML7dCOp3Kpw="
      }
    ],
    "assembly": [
      {
        "virtualPath": "ChemiStar.wasm",
        "name": "ChemiStar.rcezjzltr6.wasm",
        "integrity": "sha256-ld2OLD1U4Vi7h94bIthveiJjCIG8vm9HeAnfbSgxFcg="
      },
      {
        "virtualPath": "HtmlAgilityPack.wasm",
        "name": "HtmlAgilityPack.vs7k7eyqnm.wasm",
        "integrity": "sha256-gZwHzGmlHqHzGI2G7v9ebObtih4/SRtT8WfDG4fxPxk="
      },
      {
        "virtualPath": "Magico.wasm",
        "name": "Magico.jgrycc512c.wasm",
        "integrity": "sha256-fXSojUvnfeX1i1SZlc+BgHfQ+Z99TO3i5TkULv7/Qto="
      },
      {
        "virtualPath": "Magico.Native.wasm",
        "name": "Magico.Native.3xjhbs5c2z.wasm",
        "integrity": "sha256-F6q0jl0TuOglvidfOzTOapB+aLkuCZ/SDYp+Pd6IKik="
      },
      {
        "virtualPath": "Metalinker.wasm",
        "name": "Metalinker.tgbq32fm9f.wasm",
        "integrity": "sha256-c6jqslNrP932if+HceU1H4xDzQl0YZhfEEwR7YzCPTI="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.yxzxy5nfxo.wasm",
        "integrity": "sha256-NvpFmr4KC9Y5cvaz5uaXVyyYClK+SFfhN/bHGPHfhfc="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.t3iinpyp3j.wasm",
        "integrity": "sha256-KQfIKW8aVF0+wJ5rkPgPElIyD3/j2vuMPMdB11oehxE="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.373m41c9cv.wasm",
        "integrity": "sha256-UR7iDK1d2gCnCXteWQq85ZnUKa74UBXONMpqBU9aQPA="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.6w9arfc7uk.wasm",
        "integrity": "sha256-apjuKEZ9tbWf402SXmIYK03VNjycswAa6vH8zJbBmDw="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.b5r9igf1ej.wasm",
        "integrity": "sha256-UUwnFUGVKcfnwTDp5d2PPIYvZb3p3cZn9VEABGLlYu8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.9hvqdnyedj.wasm",
        "integrity": "sha256-I1V6RT2jU36RMO/udOCdtpwqRuricdlZ0IRsQvGrIKQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.vejc7kiu4g.wasm",
        "integrity": "sha256-R8Rvf+ufvlMX05PSWGUXwGm3hty6uCI9EtqBH2FpDIQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.3ajkzukr0v.wasm",
        "integrity": "sha256-m9k4pt1S3OsB7nhPn3Spu1JjG5ixGwaWDws5UBzaZjs="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.m7ihlc9gfe.wasm",
        "integrity": "sha256-jhSn0N4glzrm2TSZILkxbVx9vtZ7XmYZyUEXKymxlDE="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.zh7psstrkj.wasm",
        "integrity": "sha256-Nw6fMz9mMm8SS3pPrUsobEC9zzLKC6AKDJhHRldk9VA="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.1kdc1oztmi.wasm",
        "integrity": "sha256-X78TdTgU/3Pd3qeRvD+qNMFWjhbxTXjduw5WXDir0JY="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.2abh528mcf.wasm",
        "integrity": "sha256-WsA7Qa5Zv/QmtZqrIEQLYVSPd55Hdc1S+2J7y4JQBJ8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.vga3bvc9pt.wasm",
        "integrity": "sha256-QeF3pj2LH3LcaB6cg9nSyYQ6/Pf6RbTkLakVnAwVPXo="
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.opjjuvycl4.wasm",
        "integrity": "sha256-jMQY/dvs5uRhemYHS9FJ2U/551fHVVFNfoiVX8bIXQQ="
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.nsfh695mwg.wasm",
        "integrity": "sha256-N8RKL2Eil4ZFxIkWa6Uig12+nRHOstda562q7GCs9fE="
      },
      {
        "virtualPath": "Nettify.wasm",
        "name": "Nettify.3l7vljn545.wasm",
        "integrity": "sha256-2bZ7JwCeWETU7s2AGQwKeGGXsvVpPJNdltzv+HrD8lA="
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.jcjjiqe038.wasm",
        "integrity": "sha256-s8KVuknfxWl1cuDvQM/OnpBfnpM1rxzvzq21S1cF36U="
      },
      {
        "virtualPath": "Newtonsoft.Json.Schema.wasm",
        "name": "Newtonsoft.Json.Schema.l2rq0ufbcu.wasm",
        "integrity": "sha256-jfNEif9FxDd4/y5zoX9etU4IyC9/AcnxWZUSgxKCe3Y="
      },
      {
        "virtualPath": "ResourceLab.wasm",
        "name": "ResourceLab.kcabjjjscb.wasm",
        "integrity": "sha256-3KdxDvbuqbqeALALqJfe7YYke+lGIlI38zxGzrmJIh0="
      },
      {
        "virtualPath": "SpecProbe.Loader.wasm",
        "name": "SpecProbe.Loader.t6p1x8fwlk.wasm",
        "integrity": "sha256-xQazeQz4kLlBYAXOhamC9tchQI/tcZXOMEqxOqvOcpc="
      },
      {
        "virtualPath": "SpecProbe.Software.wasm",
        "name": "SpecProbe.Software.7afm4s0bxl.wasm",
        "integrity": "sha256-3yoy6gEaKnwJtH6X9e0rST8CRW9CisCas2i4uiNJfI0="
      },
      {
        "virtualPath": "Textify.wasm",
        "name": "Textify.n1gh1rwxve.wasm",
        "integrity": "sha256-e5ikQptQBiJK21mVvE/CRFRAds43Wn+XLm/FirqSYCA="
      },
      {
        "virtualPath": "Textify.Data.wasm",
        "name": "Textify.Data.c0weezapwi.wasm",
        "integrity": "sha256-dEwHw1RpM5jrAU724dYKwj6gaX8pHC/91Drum4XXHFo="
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.cihhuo3isp.wasm",
        "integrity": "sha256-5GD66cfF59w7a2X7v/26SKt2HIWYZUyEbmTvd3DS/3M="
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.163u3us6kr.wasm",
        "integrity": "sha256-dzmjzxq3e8eoc02a6wxB3gH55Wp8l1xVscxTdmExf38="
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.we5uwfim05.wasm",
        "integrity": "sha256-6NLlvNhq6NZMmVLOI5lNcCY6V4ttcS8rZmblKNAd+g8="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.5o6nlxs4ra.wasm",
        "integrity": "sha256-e2XEy9dKq4OWfdVDI4xWVvW990pB/SUYP71MKAAFk1U="
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.jmjj8r12ke.wasm",
        "integrity": "sha256-5TGe0G99eHLyUIdCxpnP7EZ7TKSb3gioFZXmKXP+l0w="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.gdeo9y0w0j.wasm",
        "integrity": "sha256-PDAKy8RXiW7KLn1xUy3P3yExxELoV0p5INewsGJst5U="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.kslsdlmtur.wasm",
        "integrity": "sha256-rGHciM86zhGVGYRXddZFZ3Vpk4FCzAPAY0fj3e1pMt0="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.iq1as0bu9d.wasm",
        "integrity": "sha256-tgwN3y8zQcanPHuoAKw6Ypuasiw2Nut0pFb1h1tebUc="
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.bub1nonypu.wasm",
        "integrity": "sha256-zUayQ06AqqykRFhxzCNTTaodJCZXdWPqphVAA+gR73Y="
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.0akxfslliw.wasm",
        "integrity": "sha256-GCx0++EXxNaiPpaU8f24P2PXK/rPfpq7iZgs5MUHY+Y="
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.49d64886lr.wasm",
        "integrity": "sha256-aNOQUh3MoP2g8fWnDZe+ovBCZhSKXqNEeLEYlPeHvws="
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.vuddzflgup.wasm",
        "integrity": "sha256-mYmzuk03Y33Smysre50fxaCGhBjIpdVFH17vcIxQnF4="
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.ehnhrssg0d.wasm",
        "integrity": "sha256-IjyYvu18CmcWbOn39MnXtQjQB/5IggunRC+9m8rn/FU="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.h0i8fstrku.wasm",
        "integrity": "sha256-zwPu+MaOmB6ksDQWffEp8mp1ey3Tz+crJmOpMNjN+pE="
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.scltrn4nxf.wasm",
        "integrity": "sha256-XMi+GVfGMwxSiiPNDvqSqi9Y8fsA7bn1bn5oh8n0mkQ="
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.8v1a6ukkfm.wasm",
        "integrity": "sha256-DJoelqUhVeHGNEhPHthja1BgXjgCleJwptglGHOM9OA="
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.i8e2elf92g.wasm",
        "integrity": "sha256-btmzdrfLHibnkjWhTcrn1Vc3VENtWni1hdZ3QP9JHuM="
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.q2smtnx4p0.wasm",
        "integrity": "sha256-Xr+Q7Dh3UcmDZfCsUqhR7GRCwGjH5mb2gVCpWFtZSUU="
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.4f8vg2rcxi.wasm",
        "integrity": "sha256-YETgkYsSCpN1j8iN/kykAr/xvo1Wj21YdTdxzCtB1LQ="
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.9k8uno0xzp.wasm",
        "integrity": "sha256-J2Kw3sjoa8PZ2ZBJKJZooW6sLnp7U5JcbL74k29Jzg4="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.fnsqkol2v1.wasm",
        "integrity": "sha256-dShBzyzRYcDv19t0Z/D/HVRmr1b6C16ALT/+ZGBKnro="
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.vuye6gmb3i.wasm",
        "integrity": "sha256-981hPKjdPnV4oXNDnR2ysTkzVWtkLIFaUEhuVkLeu8Y="
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.9zrtg15cav.wasm",
        "integrity": "sha256-G8m5626wnHaGmZoy4taR5s6p8uxImwtzr+mCRWfXmL8="
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.r9j67miwew.wasm",
        "integrity": "sha256-D0bnBXTQntMDI6kFEOYv+S42NARxTjOWkKbEV0dXxPQ="
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.hp7z23mfca.wasm",
        "integrity": "sha256-xV+hsYFKhQcNWv3Zzkshn2jhcodOuGaB0rwzqV4+Xho="
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.tziwbn6m1m.wasm",
        "integrity": "sha256-11BtIMdfVhf8AzvrhWdOdYvEBQ5UsJd7emoDXye05gc="
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.czneep2xya.wasm",
        "integrity": "sha256-6KJ5QF51SCw/KdLFFzbl08z3Dy9vJpw8Q1nc8ASHW3Q="
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.p57img2vmb.wasm",
        "integrity": "sha256-QxU7sP2gfwe9Q5zEz2miycCj3fMZUe6WFRaWtGj7iI0="
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.jq54i02zjr.wasm",
        "integrity": "sha256-9ddfwmsR8fGUifeEyhqoQJp9qcgfnrE03Z4p9SCYzeQ="
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.qahb1xq4bt.wasm",
        "integrity": "sha256-rm6vF/a/05Xi+ETXaLY8U0XEhdyOIp6S/yXHXPgWe34="
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.ot9b4o8z96.wasm",
        "integrity": "sha256-hNVF61+FwSzePqlTq01hDTllH5rIXUyJOoDm4J4D/5Y="
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.gdndtxn7ev.wasm",
        "integrity": "sha256-bLcX6bpH+hWhdnDZr58iK7FCNTeYHGZBFFYSoZCUdxs="
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.rllaqc97f8.wasm",
        "integrity": "sha256-IRrkSCHDvxy2L57RTN9g7qudJ/88H9+9yxsEeziOtg8="
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.bz1ucydll8.wasm",
        "integrity": "sha256-h8l23/KLt3MRZPapJHm/NGuwjVkMg2/zppGoeGAbxHs="
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.gep9eginc1.wasm",
        "integrity": "sha256-2NaObkwoP7Agp2ayvIKSgzJtWIeWP1z5fp4koewJLPA="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.8gpevmfup5.wasm",
        "integrity": "sha256-qICGt+KjlRX87Q+w2AdOR51mABYXdQQJlCc0Nx0SKBw="
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.dn766ayok6.wasm",
        "integrity": "sha256-x0UV1o8YT5fMHTwez9Gv6g6CxUegPS7U0rx+LR0mQDI="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.udlfr8kedd.wasm",
        "integrity": "sha256-/gpWFa/UDjSbNJRJJsZD99TikVBIzoRS3vb53N9aO1I="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.0110bhn7md.wasm",
        "integrity": "sha256-zPuolpbKh5zWdvVukSDt80tjJMu/zEos1qYYC/MrgZ0="
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.tp4a43w70z.wasm",
        "integrity": "sha256-n5kAm5KSgrSvGO9Vcd9ZdcFYy6h59Tov5XZGpa0sJMw="
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.dvkj6y5p8p.wasm",
        "integrity": "sha256-l/GyNHckbaSWcZ1PJpzojqvHFNLuZM5pASowIjz3SHQ="
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.x98uzfezfg.wasm",
        "integrity": "sha256-mzvF6YD1bkeW0pDutvF+xE+1uVuZvA0LVHLm+oKdnFc="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.imlv6nv0qk.wasm",
        "integrity": "sha256-OvEBMYP3m6YFPp/NJCvAnsJA09AWIOxl2eIGdIvP8+g="
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.dl2ufuq5ra.wasm",
        "integrity": "sha256-XxD5UeU5PVPIYYDkO1IICsLM6N+u9kwcZPIlvgKHpCw="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.u325yrq63x.wasm",
        "integrity": "sha256-6mfetmCnA4RDQgP4r+G++DHGfptumyUonsfFMZnDPCY="
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.to4italqdb.wasm",
        "integrity": "sha256-PV3WzTHHaAsOoaBqa1+o1qdkpJBL6xlcDxVoB9dJOLU="
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.ezielfqkzx.wasm",
        "integrity": "sha256-msiP+hhmOL4pxMsH0pIsueaLh78LNDe1D7Gz60N0jvk="
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.pu16mr7of9.wasm",
        "integrity": "sha256-Hx92ra39ETzC7jYIRNu3ITFUZGJYuk7FUBgRIYsjJpI="
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.w3nwgorqlr.wasm",
        "integrity": "sha256-/NxqYmf0+HY7Vd3gSnaylRUo2GJI5OCW8tq7T9L98V8="
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.8nwzewoh7a.wasm",
        "integrity": "sha256-/GGwm9zMtrHD8UY1j/xzvNNnaVZPe0by2rRCunY+y5o="
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.o53lc57e2u.wasm",
        "integrity": "sha256-PLOSXslhBMAOE9AdL7yHLTvRWrK2ELNsDgTA0taubwo="
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.73436igil7.wasm",
        "integrity": "sha256-cwWOZaOlWiAEvO+KvJwrGbZmVGU/y9yYgansWdR1DsQ="
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.yrzn1cmv2a.wasm",
        "integrity": "sha256-Ino2q2HilzbwgKAQQCAPlTs/rMh6mee97CF7HzvX+zc="
      },
      {
        "virtualPath": "Demos.wasm",
        "name": "Demos.fqiha06o2t.wasm",
        "integrity": "sha256-FyPTIg0BilswW0JMsBLB/G2/vgeAPOQz/VqETkz1nfI="
      }
    ],
    "satelliteResources": {
      "ar": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.xl24vr7gwu.wasm",
          "integrity": "sha256-NSGSxpoKSWYX+JcCHWeWTTP36JKwOwMmcxkExnrQbAc="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.hzr3a77aj9.wasm",
          "integrity": "sha256-k5njzXAndq+bkgGiwUV7fJlNhssU2WIW6dNK1ZwA3m8="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.q2dmc484x8.wasm",
          "integrity": "sha256-socgFoOq7Qpu59eStXuyKYFj272F9B3UF0/Zd9gpFuY="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.f68bq0qewc.wasm",
          "integrity": "sha256-2YfOGkNN7gu8dbAnIaukHPbI4zNds483oEMEwixpLGM="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.wzrze6yosv.wasm",
          "integrity": "sha256-hMFx6PIiIRP2wcBwxrM3SKF8boPxz3zUdIPHYJbeCjo="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.gz0wsw5999.wasm",
          "integrity": "sha256-/HjBnp4b78IBfX2NtG4VkB1teUu8UdUFRl957piLDrs="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.egjo1u4zq2.wasm",
          "integrity": "sha256-gq7UdER7dbmMG0SNTbJA5o8ZqKF7vKGAY/xJmqxGNoY="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.mqj2oury9t.wasm",
          "integrity": "sha256-kq9Px3NPzmnPKtwlh0TdpWrmkWjP3js5IrMwVLcq10w="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.vb0rcdiuo0.wasm",
          "integrity": "sha256-a7pjRbHd3zRAxpmXEGXS0oZ5eVdMKd3ADpywiH0Wr5Q="
        }
      ],
      "de": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.valan3exkt.wasm",
          "integrity": "sha256-qfL5xEeVjW2uXi+VTnp+l4tXAIp4LbVKkhOS3RD32J8="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.5mt9daz97m.wasm",
          "integrity": "sha256-LQOt5NF2Z5EcBQ7DzXHjY8JqVUjH3wca8ATc4udVgrM="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.e5l2jtw03y.wasm",
          "integrity": "sha256-kl4KSmesKXNvS3y4TkA0kHosKbwaboFpyv/34n7ft4I="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.olvwv7hycv.wasm",
          "integrity": "sha256-BA131sLWBHDG+9/M/T0aZvdmBOlgN2kdDr0zYq0Vaxc="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.rd74lhvk17.wasm",
          "integrity": "sha256-ofiwHdfaNjTM8Yk2EoVTo0vp3dE0iVTmp+DDFOLWnbE="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.0ca9e5s977.wasm",
          "integrity": "sha256-kJ7L3+7iDwApmPI2XqaaH39FCsRgly+JyoQU8xiC5gE="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.b4hsgcgf8d.wasm",
          "integrity": "sha256-VTo/so/Qj6DaWkw2+oLXZ6hVBhQNC0qjK2J4tUz0R88="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.3g3dsaaoed.wasm",
          "integrity": "sha256-s/ZfVCtarvAKWCM0cSuSzVQu2BuNdzf633bzq7HQnOs="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.i3ng8uoeko.wasm",
          "integrity": "sha256-7hjNfVAum4h3PK3nlDTgbYq4fr/kM+hE9+olJb4emNU="
        }
      ],
      "el": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.p6u2iw8814.wasm",
          "integrity": "sha256-UVcPStTMGDRlbDaxydzDA7grcWWVIAMU6SUQbtdMy7I="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.nu59js7ffl.wasm",
          "integrity": "sha256-35jJAXF6UsB0kvcdRH0+f+T4wuDdHm8a7b+4uyaHKvw="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.cld4kwaqga.wasm",
          "integrity": "sha256-MK52ZnLrU/GqEp3Q+9OnQq2gkCEvEVU45gJWWH1FDag="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.97wacm1i0w.wasm",
          "integrity": "sha256-ewrLPa7nhGGkAXEulrgXWnQFdW9KWyHqECOWjVB5PRA="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.g4jbdp18lh.wasm",
          "integrity": "sha256-cIm2qLbHek+X2GztUFjX3CVWlwZtO6dEXX4OAEdmSX4="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.gkrsoyja7t.wasm",
          "integrity": "sha256-kAodIR0sO0cFhwP3l+BoE2KvReCo7kd9wZGYL/4SGj0="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.maq4wdwlhw.wasm",
          "integrity": "sha256-4u0fnegAatLf0DF0LoSLZV6vSIRbwYSm2icFNCtCMF0="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.m5uvd70xfu.wasm",
          "integrity": "sha256-lmyUr/Kgi0epkKQMSDN0mCU8W5SCbRzvPmXBPLYWsjk="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.urfgrac51j.wasm",
          "integrity": "sha256-2hYTyl4yGRdYS9Gc3Dwvk0+2OoeGqJ0+NEh2l5AY0CA="
        }
      ],
      "en-GB": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.efxr5izw15.wasm",
          "integrity": "sha256-+r6fzQ5hF71yVbixOSgqwDkjOc6lGRurs1oiV0hV7AM="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.rfhwn8gfj1.wasm",
          "integrity": "sha256-R3eXtErkqQFvrrDOkhEO6oCQMOrRjTbx14aKXhtn9RI="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.cd3y7h81i3.wasm",
          "integrity": "sha256-cK+KB9P4h/j1kBVXdXpfefbE71uC36l4DUfTSq/QG+0="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.9mo4u7rw1r.wasm",
          "integrity": "sha256-oV9aL6NOS1ttkMDyaHgrMFxlgiiRge1N+V7f9mr6OPI="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.t0e9ejzv49.wasm",
          "integrity": "sha256-w2ZHf+e40XKwnlHi5wy4/jNXj1e7ZXmXfIn0JcFTE94="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.4x480dli0d.wasm",
          "integrity": "sha256-GBHPb56tW0GTziiY5gcg2PFeRy8AYWizL/1wTLaODDw="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.qseicmrbt0.wasm",
          "integrity": "sha256-ltCkOcUlVKL1+eKT05cOxAOs1sogs5TRychkX/IBlSs="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.h0qrtc9jff.wasm",
          "integrity": "sha256-jwZ05tXdnNGLVpxQoTFU9s+6GnRhkqGJJpDd4+e3/e4="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.9lnqaub3im.wasm",
          "integrity": "sha256-7evs3Td7GSVJPoRvIUPr9NGccF7dNJG4WuJ9Qa9e9hY="
        }
      ],
      "es": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.ql0lx1vd2s.wasm",
          "integrity": "sha256-snR6m9kjTWOS8iVnmMTJoIQI2mOVb3KFBoEL2pYkqAQ="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.zih8dyavht.wasm",
          "integrity": "sha256-RaAdMmb/4iPPNdf9Ca9zPdzb/QDduH5ca/gtg3bIte0="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.x7zftex0wd.wasm",
          "integrity": "sha256-81pzr3/Wt+CRUUhnv3yZ5BvZGAbcPHEtY86rdm0ANug="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.nlgvrapmeg.wasm",
          "integrity": "sha256-NSfLGR8r3IO1QapEjry/KapXr9RuYxnys6tAyTOKUSM="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.zpdo9w67w8.wasm",
          "integrity": "sha256-d6QqcIEPrdR9eJQ2+Y/TcGzR1OXowv/7M4dfmt+mO8A="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.xhrzn48af9.wasm",
          "integrity": "sha256-C4Pk7flsl8iiKY+bumBZGdZhmvexf/VpQHa62lJm9h8="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.ypcesvbvyz.wasm",
          "integrity": "sha256-5h8PVDUXfccqkBJXEs0lQ4CuIVGmGGo8YlPvTwevEjc="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.bq0fvbvu3a.wasm",
          "integrity": "sha256-jVNchsrGlJLrzEbNoLdxg4W7MxPPfhSx9uSFBRfLO6U="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.74644xbuth.wasm",
          "integrity": "sha256-988KnXOw3Y5zipGoFAsDZB1scsV30ODfWguY0oWfDuQ="
        }
      ],
      "fr": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.ed82pza729.wasm",
          "integrity": "sha256-4hv3P/dv0Ysj6XOvZHbe7S+dlDXmjL9FXVRkOw8g4rY="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.h4dl7wplbp.wasm",
          "integrity": "sha256-TxOGdjcKQ3+kbTctiFC/tBckR5QgyBLhKD44OBLdEN0="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.zvb55kjl1y.wasm",
          "integrity": "sha256-kc/EoVfjvHqF/QsLfz2dTGj6HMB3yMwSR5vl0PUIOK0="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.iqnnoqlu7w.wasm",
          "integrity": "sha256-6mdrcFobYgVhTK3RyzZVHK/rDX0Qrt6lpAYIKz6lsSs="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.mjrenpmcgx.wasm",
          "integrity": "sha256-DqKT8zt/8NKjHdDTJc59xNAV1GN46NWtodpGcjCHQaM="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.adn0053glu.wasm",
          "integrity": "sha256-TtoD7TWLY21SnLp29lJ+31Z5G5+vhXMw4y+nqRGa9Fc="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.p4vnli5lfj.wasm",
          "integrity": "sha256-p7WjpyCNntjsyNh0rfKgxstz491YOEDNoF6352cC+hU="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.ft01c0gvkr.wasm",
          "integrity": "sha256-YwavErUxfp0mYhV8MT3Ksdp/AqzASwPP/4jRf60Cy1M="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.nhuxehdwgi.wasm",
          "integrity": "sha256-ZWUI4h//wU+O08ctJovAvTd4NjOdUKSX2yUH2gE1M1w="
        }
      ],
      "ga": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.1aum80hvmu.wasm",
          "integrity": "sha256-yRrF3RlZShoweQzgxIElm0TLWhUmjMKVUSPxaUIeYpg="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.gmscvk4mwk.wasm",
          "integrity": "sha256-6CoeFcrC9TpRY204NKw7sfc8NhKl49rLIGBw/uzscuY="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.ixk4olq3ct.wasm",
          "integrity": "sha256-9i5scdbiL1cysLeVFMozuSf4I5Prs7iQT2UNRuFf6e4="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.f91aydj9oa.wasm",
          "integrity": "sha256-40rXeFeBx+FW2SFm7hVv6GaaSLR5cbiAtfN6yT0eZ34="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.20qsinh0ti.wasm",
          "integrity": "sha256-opD7NtTia2hoLqW6ZGi43ILaaKAa66lxRIPH//dJaLo="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.adsmzjxq0g.wasm",
          "integrity": "sha256-HvieiI6PdVoRF3w1dco4bl3A+gyx6P5YhhD5CP9UvqU="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.p0sr5fny6f.wasm",
          "integrity": "sha256-Z4jbebLBmtGOg7kfnQIDwrQWPuwDGPi3l2/URWiXd6s="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.gg4zeg2b4r.wasm",
          "integrity": "sha256-sBBLE3QUheLm5bflU7OoJw2Th3Burg8c4UiqSBJjS2Q="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.7fxjo8trsg.wasm",
          "integrity": "sha256-DQg0V5L2UOOGazdobHG69xBcioOwzoy2facwciO3gAs="
        }
      ],
      "hi-Latn": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.b76kjb9v1a.wasm",
          "integrity": "sha256-mVR7DBA3J9LPmjSd8dgenILgpMjUj/YoSuhkB1UNy9M="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.uaasmpi6ce.wasm",
          "integrity": "sha256-Jp2aP2amzg1GjsJb6gOf8mv5AcGMm0a5uCtnTlXSCTM="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.5ztb0hrwhz.wasm",
          "integrity": "sha256-gQCJZXUZykNSR0HLs7Nh3kF1DDGuQwgQT9IHJOi7dW8="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.cxph3z38yg.wasm",
          "integrity": "sha256-gOOw3oKZq4Lsc5perHfPa0Zib1PHfuyPa566d0jsfqo="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.42bnm6x2l0.wasm",
          "integrity": "sha256-RCrZkciwXNL75T8gXiJoLkY67nF7LHMkSBo8ltXwGHw="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.a18pzcee4s.wasm",
          "integrity": "sha256-Evgu/DapJfCsK98Z9yokyeI6p6dWNem8EAFXe/HXG84="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.dbu1jdux82.wasm",
          "integrity": "sha256-R0ljJjoxobeZLbO8NdDcivGkyh6L2AsjSPdBEjv447g="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.u6w9kgdalx.wasm",
          "integrity": "sha256-Ni89I6E0J95MLCm28pVw+zSBA9zIdA7MWUvdkcr6hrg="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.cziytjxloy.wasm",
          "integrity": "sha256-mE3WqWkzlHU1SFk/txy8I9Kha73nGEDDxZWIlKIUhk4="
        }
      ],
      "hi": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.muxdpaa98h.wasm",
          "integrity": "sha256-nu2HOtFWDi1/iusBj4WxbtGu3MHfX4vqJRWzua1YG9k="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.yrpac6gg54.wasm",
          "integrity": "sha256-AvsqA+6UQDrry46x+kTEaiuYkU1SRNzjXmpiAAvYXMI="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.25vk8g72j3.wasm",
          "integrity": "sha256-Wu1UJewLFfP2Z3I4F7wCALNSqtl9L18FND1nWpp/QGg="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.fi1sl42j4e.wasm",
          "integrity": "sha256-p5tRhhMkSTRp4hg93Q2kao3KCAG+vehQiZSz9yRgTq4="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.fuyjs339a5.wasm",
          "integrity": "sha256-Jy9HCY7Hnd1gIMVqVN6jRa9j+FP3Wx47DZcdxu9EwnQ="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.31mj5xrrqv.wasm",
          "integrity": "sha256-uVDFzlAFVQqqFRFI52G+viynL6O/FdTGE2HwMc9bezo="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.pe6koq4pz1.wasm",
          "integrity": "sha256-cZ3h9wBi/mRMZv5p1AStqW44vSYkD9kl+1Gk5s0j67A="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.8dty9t3nz8.wasm",
          "integrity": "sha256-1AmEd7jQcFrQhOEWVA1qMynr55PaZSgS1Ca0jDgQHEE="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.ahr2mvfd9v.wasm",
          "integrity": "sha256-ntnP7Pg5gw9nbh27N3uvmDZsjICQzfgbOx1iPQarUgY="
        }
      ],
      "id": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.z52ohapsq2.wasm",
          "integrity": "sha256-CTb3xROLUSiVhNrrt9tw9TMx760lFtRPTu4hhgkclqA="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.ykhi5hhel8.wasm",
          "integrity": "sha256-fj0hZQP9oxfCX96REmG4zPTVBTzHW+kdEJE1R7sWvEA="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.e75xiqynsg.wasm",
          "integrity": "sha256-mnKdJYaOPFc+u+iLNYODW+pfqKsH8vuMAiqPzxvgeXI="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.quxxyqwn8d.wasm",
          "integrity": "sha256-ovOZuVwoai46j5igfalGDHKlnSFxUZONTvTdOProUWI="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.f8tttjxh8x.wasm",
          "integrity": "sha256-P/JVGoPopkUVRX91aOu/U72VLsmYHu0xgHJuFP5b7Fg="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.y597waftg7.wasm",
          "integrity": "sha256-JuKuoD7ym/di4t3LTbt+a7xNod7cS+LOnyBRejhCaGU="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.xdf58hc3js.wasm",
          "integrity": "sha256-JUl4/PiojKZTfZlqx7pZG6BxeZhVQeTILcuk+Ung6Zc="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.6l2vtcyr42.wasm",
          "integrity": "sha256-JhQ2JMcUydjYBv5AhCQX3cZUTKXkAEpiASnk+HhQf5c="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.bzma7afjt9.wasm",
          "integrity": "sha256-Ke7ItZ01fximy3ehzVFZI2HxOyZuzsHKH+3zr+kYnE0="
        }
      ],
      "it": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.if2xxlsm57.wasm",
          "integrity": "sha256-cgBbHpBwRMfgOyVqKshIfOfnHg6qvcOcbYfOdxgqfwg="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.r3ejbukjpa.wasm",
          "integrity": "sha256-J/GDF/NpVYUyxclkFSRJ8J4xFxZXYXrnrxx9i8W7uXE="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.lx9xdupm42.wasm",
          "integrity": "sha256-d9rtUaGfH1rMcyqRdfQIDhZuekTJQbfODbfRzLSMJQE="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.6ccsaoyrp7.wasm",
          "integrity": "sha256-drdJrzZ7T6ZtYD5IoHLMaqIs35LnE4LFg5uxjWVq3Hw="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.bh1e8veify.wasm",
          "integrity": "sha256-Ab3EwO3DfZeimpjoIib8SvV8S8nksxjuRtx5gu8CAcM="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.zcsxha6hr7.wasm",
          "integrity": "sha256-LTlmSNb1n0mREIiE/eDYadAcpeU4FaipOLtwNYqUlbM="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.2vw5amxfx8.wasm",
          "integrity": "sha256-YpipaS7yHHaUAV7aBl/RUCwCPpbiA2Z+bYSF08dhdPs="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.inwsrpwmog.wasm",
          "integrity": "sha256-suzZ9vCSXbO8peh9joIwENH/hj3AIcXVescciU4Zik0="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.hwmdjvjoy8.wasm",
          "integrity": "sha256-MbRQScaKDpQ0mFnZOclMWgy2NGA6FF2O7jZHFAUmWwQ="
        }
      ],
      "ja": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.c35xd68a9g.wasm",
          "integrity": "sha256-+GJLACOad0KOOauWrsuAoB2LKLTj3g7z3Pw0G6Z28lI="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.l0ojy9lxgq.wasm",
          "integrity": "sha256-VbbvTNzMW9p08H3dw3bvkwO8EZ4n40bPk1pmheTA0YQ="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.zpdkjclvdg.wasm",
          "integrity": "sha256-dzXI7rAw8Sx9uggUmU/WW+67a/pENLde7cGjwRUN0fo="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.h23p1sio1q.wasm",
          "integrity": "sha256-N3NMz2Y2u4qXcGBO/AhQC/gF4ZHVDykPPrFZpX99krg="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.qz4fm91e4h.wasm",
          "integrity": "sha256-BvHcNRNPtOJbkbCX2nc8pshdP2R9CzcGYMrWzgAwtAA="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.6mzrnc3978.wasm",
          "integrity": "sha256-8nuKYQ+Qi1rnvkT3klPm2aZRs1Nco3W6ECPmv89vP/s="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.fw5sz4etww.wasm",
          "integrity": "sha256-IUCwIY1u863wD/SvJnVq2x+hFrCjFgjTLHXhKpsTmrg="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.xwisvvdizh.wasm",
          "integrity": "sha256-wfnTHXlraUZPh3nnlwRdgYdnl0r/loiOm1TWSM0RddI="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.46v3u3ljcq.wasm",
          "integrity": "sha256-jJoSscCFRBpxnMs+H3vs1wEMKArnOH6Padwm33YjqH8="
        }
      ],
      "ko": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.cnyxyequk7.wasm",
          "integrity": "sha256-qKc3hyLNyIN7Zsk462IrodWmHR0hsLRar7OJmWg8q7c="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.asa2hlf7uz.wasm",
          "integrity": "sha256-GnhUI/9hNME5ezGp4kURoLz0VjQnSbDNNqTxOSZwrgA="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.7d1hyr9iy2.wasm",
          "integrity": "sha256-K9+kKbaoY6VELOmlLri32ChCEDuqc9SrjLKdOv5Z68M="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.mcafgegg75.wasm",
          "integrity": "sha256-2hX2ZdYHL0mBkpePXa0Wyfj2O3VyzyQ00dOeI7FMB9g="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.9xspvti6m6.wasm",
          "integrity": "sha256-rRG0qGmRLUIcjWnnCKR6TNoyDyMWLyuTEDR//I4AqRw="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.rq2qblil5d.wasm",
          "integrity": "sha256-Y09PMgQUmF14vR82fwNXXM0Hw06vNKH0f4kpnSpbKvQ="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.6qd4gqlhed.wasm",
          "integrity": "sha256-gpn9CqAw1Q7QGV4BQJYDoHIK56d0PDNnB1o+M5NjgbM="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.91qxl5y0js.wasm",
          "integrity": "sha256-83TF8A7WrNjU+3MY05bJ8fYrs9fzC87768B3koD1vzA="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.sazvd8v549.wasm",
          "integrity": "sha256-jL6EAOLHHRqcJP3y2z/XEOCy7y2V6E1TSzlhW6CmbOY="
        }
      ],
      "ms": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.d7uzc57kih.wasm",
          "integrity": "sha256-V0whiGH7x/LoZ84uM65oqSs18IODX4noaiUopMvvDOE="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.l2e6leht0y.wasm",
          "integrity": "sha256-Q/YGdEjYAjCw5ptd+eq8svHOUf7PDJHL2V7aHigWZGg="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.g284ns0oer.wasm",
          "integrity": "sha256-2GjKiHGnFIgmXFQcxKjZ1KY6neUjTbubIadV6GXWlv8="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.icwzjhbri8.wasm",
          "integrity": "sha256-fipCFdmF6uj0/p2SvFqDsUXrlN8FcyOhBxN/3kDqG1E="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.0cf5y7fcaz.wasm",
          "integrity": "sha256-IFXH2XnvytCKJlMo1FrfNNho+3ie9gtnRPAnvrvwQ3A="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.3h2dasxvos.wasm",
          "integrity": "sha256-x1fm6CLz/3gNulX66IcxPZUcSIPHMMoYqmuA6GhhAFQ="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.auroih2jsg.wasm",
          "integrity": "sha256-8rjszpL25o0C8zzapzpEZ5gfY104+lnLb1/kgaNOqRs="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.56ibxlec7x.wasm",
          "integrity": "sha256-vUXuLx34GuUoPHYoyCO5sZReBq1paRkC1B+uRmMVEWU="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.zggmgf2omt.wasm",
          "integrity": "sha256-HTcokq/lyBX9YY0DX4LjaUXzs7XGPQDvc8w4oCdwb/c="
        }
      ],
      "nb": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.pno4k41dyy.wasm",
          "integrity": "sha256-Kza/BpcvounBUnsHCK77uNmVsOlgyVmAu/DpgjjEjmw="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.b3ahbfb8i4.wasm",
          "integrity": "sha256-V4TP7SylTEQ2zivwBy2B1tBLuXiJ3ZCuslK/Xs0ry8E="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.nrez066o82.wasm",
          "integrity": "sha256-g2252Xut3mxO3IQ3SrsfxX+zADil9QN3TILf4cWdHxQ="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.aljd0fknbe.wasm",
          "integrity": "sha256-kr+uLHmqk/TLHMIwNbWDL692OyDWIs59gsI1GFHQc9w="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.7nkedsf35g.wasm",
          "integrity": "sha256-/dLcBK+QTjqLCSF2k5RJAkdsNTw58REY3NgKsikTgSo="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.bilqlvozvh.wasm",
          "integrity": "sha256-nb9JRA1dkuTRDW+we/W163vPo8fxQuHyNTeHCw+x7uE="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.sctyg842cb.wasm",
          "integrity": "sha256-HLlIW2s/tDFCvIVJBpQ+6eRksbvL17XW+I0XaxsQHzo="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.sb1xla75w6.wasm",
          "integrity": "sha256-+NFEBFHT3aQc1hJId/EGeJl521VDpoYIb5RbM7URww4="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.mmnvfu3olv.wasm",
          "integrity": "sha256-op8FZ6mLzUbjCrpljqMzmpHEjmE4VQsftZwnnZPu530="
        }
      ],
      "nl": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.i563b15hyo.wasm",
          "integrity": "sha256-Gp/ZN/kXiQnvP+9DPqf61kqXkv7yIrrkvsO6oMIwBNc="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.mcz09ixn7x.wasm",
          "integrity": "sha256-CkxFKi1USrbGuD+b8KfZYVJFVrTvwjNY9epecVF+j+E="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.zvbrnrdxoi.wasm",
          "integrity": "sha256-Ebh1vGgAIKihf62XP/YU4w7+xMXFGrgDQ+KL0aFfE74="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.o3d1nbi4ux.wasm",
          "integrity": "sha256-bGTSOri3AY+yovD7+XnfPL8t0JHTPEZMMVyOYWGb0yA="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.tdsc6i4t5w.wasm",
          "integrity": "sha256-sejgJb7dvOUxVTBJUdTvrmIn63NDVMUKdGijBwJv6bc="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.rjkgoko3l1.wasm",
          "integrity": "sha256-B/T0nENkzfwM1RT3CcqRJe72iCeEff+334R1aRGYWos="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.hlnr5oojgs.wasm",
          "integrity": "sha256-y4rEn7uMsHn4LH+/hXgqlext8SOdAuy94hl/BWp+FtQ="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.3iv6hgo6sl.wasm",
          "integrity": "sha256-BSr+0c3gNvqcgvBPpKtDvbxLJFO48+SC4vKrm8k4Peo="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.73yyrgrqy0.wasm",
          "integrity": "sha256-7bNd07RQY6nbj3ieyYVVa2sBYMO/yDgTKJFyrf5gKHc="
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.hvbquns11s.wasm",
          "integrity": "sha256-Y6fSqTVMD1Xr0IRKlMjQqny/tUMxi1D8fahwGW26on4="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.wmejmfbd3z.wasm",
          "integrity": "sha256-KM0g38rWlOrwcPM/voatoQqzlgNcN0JMcfy8n+2Q5vk="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.bxwdd3csd0.wasm",
          "integrity": "sha256-ET94Z+7x4/GETMqxz7GQYXIGt7FxITHdZEZSKrpME88="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.d2ukobg2c3.wasm",
          "integrity": "sha256-NXkwLtCnf6M9JBQ4yXhFWvwaH5JAsSoWcGZqMOXv8mg="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.j3rutja2yk.wasm",
          "integrity": "sha256-r20MTtA23sNqDE+rixBqnQZtxVjqnsWIMNl4G7kspPE="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.c31s66q7w8.wasm",
          "integrity": "sha256-iPI4Igv7WWheaoYwFIvTULa85P4nY0ymZen4VEVn090="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.e19x4lvf1y.wasm",
          "integrity": "sha256-/qugoszjLjW9CndcZRivkQBmpWm6NDzc7AtM2mDEp1E="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.5csxiy7h7v.wasm",
          "integrity": "sha256-tdfNMJ0wP5ZCJ7/SQrYS2h7v6JuJxWbpeDIfd/jA6VM="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.l0o5uq25k6.wasm",
          "integrity": "sha256-KxH1YKAJVybaBhCim53p1rsPydMTz4smJ7iQT63j7Js="
        }
      ],
      "pt": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.pw0yi9t94j.wasm",
          "integrity": "sha256-56BlaC6JINTeMWc6Fbqhb5nhKZYAX2SWMuoAlSZqRKs="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.mt4wk5xwem.wasm",
          "integrity": "sha256-lkfkpcbkyOTd+NLICEW9q8WTRX0JkLZfsW4R2EnIRHI="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.n2ce9knepk.wasm",
          "integrity": "sha256-n52wI+ytZ1hdkJCf0hCUlFonWNY7YospJo/E9zPAIdE="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.k6hrgx9myr.wasm",
          "integrity": "sha256-vNMbJ+9M1kB7LpqfDJ9NAKxUrO6w+F2prl5EDPyE3xc="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.mqcdho48f5.wasm",
          "integrity": "sha256-vtKNOzpMJuYQk7qGXydwunpm/L5t0a5W52xPzEM6NGs="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.plb069x4vt.wasm",
          "integrity": "sha256-QyvJNGcIYHje0skCQ/HMcecbFgfnQUqIhtV+KpvTs/o="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.ozwk5rmlv0.wasm",
          "integrity": "sha256-/ArsGN+/marRT8Etss8ek1xx5gbExkCtRz1cIc1HkB8="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.01a4zukehx.wasm",
          "integrity": "sha256-xAbtKt35f+9UZAeXYLB5l4UEjzaBqJDE1fAjGZSWhss="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.vh6mtehqj0.wasm",
          "integrity": "sha256-Y4/hWWEwxbcDuN/IrrPAY8VtOkZrivINKvUzSC/YqEU="
        }
      ],
      "ro": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.tzhu2wgois.wasm",
          "integrity": "sha256-Z4cZahPZWCuC4YeUX9GvlsVIbV1Hsi/H7yaf/6ip6Ac="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.hiw3tiojn9.wasm",
          "integrity": "sha256-pzODtop3HaeSghcmz9MW9O3LrLR4hnrKH9zCN/bXclA="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.jxe75xzokz.wasm",
          "integrity": "sha256-qT9WAVqhHEmXUDpBVavPFPgrYSY66EjPmqMaH9twD2Y="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.pth19zn7vn.wasm",
          "integrity": "sha256-fVWVVmYPnHVmd24BcrFw6oV343eQJgZoSxl1dbiVsFM="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.hqefv72zuo.wasm",
          "integrity": "sha256-pyzRyhvZG9XVkHhJXD2bvua8q4G/n1Wii5S3SXLBMDQ="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.lzdtvmtvnb.wasm",
          "integrity": "sha256-ERPLJwyxSA4mSuWjAzhyLh61MRuMrBXZedaMrTRAI9o="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.426sor8kz1.wasm",
          "integrity": "sha256-rPH2oh9aYHlX2ncOftQDQlOfIujwtjzWQDYXiqc8PsY="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.hsxya3pihi.wasm",
          "integrity": "sha256-kSULaVLuPexoQJJIZ/5kgug6TfZHDi2WRnPn5v1KvDE="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.3u81clal28.wasm",
          "integrity": "sha256-BT0IIuQjrsT3GSt6l/Iicf9azTWUj3c1fdPQcYsUjKg="
        }
      ],
      "tr": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.4nuwg75rkj.wasm",
          "integrity": "sha256-4AB4UUtDzkDD/fdKYuapLB7HSBH9jpNzrOtAI37euqM="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.vire7lzp6c.wasm",
          "integrity": "sha256-KTKZNPHBuFOJcXzRfjHM2dvRpE8Uc399fPT3wznPHRk="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.064k2wsg1j.wasm",
          "integrity": "sha256-6CtDYsAoo/TX4T7UlMONdTN62dTDiEXLcktR193KTW4="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.87xl4jcuqw.wasm",
          "integrity": "sha256-VIuqTsiKzYxFNWD8Kcaj9vIUD8IXOayOgukNyYrKfnc="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.bj378kzcai.wasm",
          "integrity": "sha256-WerslT1bzkDnVGAwI7F5xjTI7cVIdk8YtjXz1w3vNGA="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.qdk81absyr.wasm",
          "integrity": "sha256-LtJ8jMu4QvAoJ7WXYeKH2ZXGFPWauQnlfdB9VBnkhRY="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.ulmaaxmv68.wasm",
          "integrity": "sha256-8h6yAiy+SSdpLTKAVveyEdtXK7obbJGQlcxYMdalg84="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.clpff06i3l.wasm",
          "integrity": "sha256-UH4drP0GUU93RY0Vf7NX6qvyQ304rHNOi89iJTkQ7eg="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.yt3fmdu8tt.wasm",
          "integrity": "sha256-2jQwK8FLAVGExWfeaQT90uUKvPmbgRa/ulHAJkVmWyU="
        }
      ],
      "uk": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.1ko414yu3c.wasm",
          "integrity": "sha256-r9lZQ2VulEj+sCYdFlpJZi5Ou8XP6n8skfinxAHkopc="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.mxbtpnrv0e.wasm",
          "integrity": "sha256-Vjl9ijXNgsrYEWqru7+YlgOzzmRJhqnyoxS3URclciE="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.mzj31dtvs8.wasm",
          "integrity": "sha256-8gwhapQN35h3os7W1HXxi7OsiOhbOrE5FqIWyKZ8mAo="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.m5tggf7i6s.wasm",
          "integrity": "sha256-ZmzqSxnE8ZqqTZzqM+4cw/L+Q0Plu/QDkdGGypVxCcU="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.dpyuv9z05f.wasm",
          "integrity": "sha256-z4FvKB4rSMzlQpDvARWOZRnUKEB5drcKPLbKd86I2qo="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.b1ujtj5dd7.wasm",
          "integrity": "sha256-zxdts3ak+Ixu+DRY/V465xNWCe33FzENY8Z/6Iv8JU8="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.wstrjo9jzp.wasm",
          "integrity": "sha256-YI04eTMj3+Pn/hijX6g/GFghYiQ8TBSZ5bfAlBJxSCo="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.e1jv879l0p.wasm",
          "integrity": "sha256-3jkrtwXQ/3Hy0DeV+fwHDrqmr4tlK7UpSdQz4x2Sf2I="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.p43e1l5wln.wasm",
          "integrity": "sha256-WWy3JILy6cx+Qtazrgw7NCdCMNqqUpqqjaPCYlQZ05M="
        }
      ],
      "vi": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.io17wu83hw.wasm",
          "integrity": "sha256-QpxMl9jvjyxwdF2aynOXC8QCpfXZYv/Ng7PpMrgACA0="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.qj5qsnck7u.wasm",
          "integrity": "sha256-akkKm1LTWrKuRx3yfx0xYJuwn4ekDgBzj9Wq969vPyY="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.rf0ctpz82f.wasm",
          "integrity": "sha256-yQEnrIc7v9n2GW+RCmu3eV4Ou2qSmtrApDqF+sDoc4k="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.ejkjhiq4wj.wasm",
          "integrity": "sha256-RjgSSPnog6Gxcnl878TaZBiJN3Qjne4/5rTepykBxlM="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.j4a2ypuuoi.wasm",
          "integrity": "sha256-w2XSaBUuSPUq7ig4vp/VvlbPsZtk1R/eMDHOg617UcQ="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.yizbkubgqx.wasm",
          "integrity": "sha256-mgRgYXmzgXguBvZdBVbe9tajp86xQ5oaWtJvoMkvnEc="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.5nqevm3rx3.wasm",
          "integrity": "sha256-n/p1/2Gwdl6k+MOjeRHqyNLWNo87NhAl5lsuNbLDv40="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.sj2wdn75rd.wasm",
          "integrity": "sha256-GJJnnWtAfYPxB+DrBygeY7D0oyhcCgBS297jgJP4CuQ="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.k37t9pqpph.wasm",
          "integrity": "sha256-MFZefd+GlWozu0OYzuZRCpR0iHxSZ7aUEvTYepl8EE0="
        }
      ],
      "zh": [
        {
          "virtualPath": "ChemiStar.resources.wasm",
          "name": "ChemiStar.resources.qym67b1nvb.wasm",
          "integrity": "sha256-wvxOeV0WRC10mO4hHlXHLQliZ2coNwvr4A8JRHQ9xxU="
        },
        {
          "virtualPath": "Magico.resources.wasm",
          "name": "Magico.resources.4k0jhrltm1.wasm",
          "integrity": "sha256-lBa0PjophsUaGl+G5Otf/svJYv2JQoPhMi5Y8jYlbcw="
        },
        {
          "virtualPath": "Magico.Native.resources.wasm",
          "name": "Magico.Native.resources.5ie9ihutzw.wasm",
          "integrity": "sha256-rQdt9ZI9gBYOUr1XVQhplFvql4a0Pnq4yCdEu3ZRSBk="
        },
        {
          "virtualPath": "Metalinker.resources.wasm",
          "name": "Metalinker.resources.ml8j2ibsoq.wasm",
          "integrity": "sha256-ttMae3Z+3Zex5OBFEJz964Km/VI7K9FUAlqdmr0adbw="
        },
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.3y6ex4k3y9.wasm",
          "integrity": "sha256-VZSfGloPednoJpBLvFUve9qOuPFeUepk7s8L0mI9Sso="
        },
        {
          "virtualPath": "SpecProbe.Loader.resources.wasm",
          "name": "SpecProbe.Loader.resources.i3ap9zznca.wasm",
          "integrity": "sha256-ovv3gzVJsj3w+oe/TAY9YDDRYh+uBIo/4s7WYJHok1s="
        },
        {
          "virtualPath": "SpecProbe.Software.resources.wasm",
          "name": "SpecProbe.Software.resources.v6pfi0l0pp.wasm",
          "integrity": "sha256-uTD+68whi5LNvJgpQA3c+kKeMxQgykUy9YKypboz51o="
        },
        {
          "virtualPath": "Textify.resources.wasm",
          "name": "Textify.resources.ycycxe8vgz.wasm",
          "integrity": "sha256-Ds51wzIg3hzSjzy+I8f8ya9hcZ4wyyQNdHK/Qmg+9SI="
        },
        {
          "virtualPath": "Textify.Data.resources.wasm",
          "name": "Textify.Data.resources.abepkepjsb.wasm",
          "integrity": "sha256-Sg/Z6rNCYeL7LMFgbBlIMKq224j2kg4+qTevU6HQZhE="
        }
      ],
      "be": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.if6usmyv6z.wasm",
          "integrity": "sha256-8u+2kaa6tYLh84qf9CQr1/0hKt1bULs5/3oRyF5Yp5M="
        }
      ],
      "br": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.20akgd1ouq.wasm",
          "integrity": "sha256-ouM9JoNR4Rop7ImH7bpA7AwkH5icHyi1zYwdpEsupmA="
        }
      ],
      "ca": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.chghdf4028.wasm",
          "integrity": "sha256-sHZXw/9ObHtUdjJ174/wyA+6UZ6+bHfoFlBTSUv4tmw="
        }
      ],
      "cv": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.78z4yc3kqq.wasm",
          "integrity": "sha256-V82W3lHdoFhNn1U5Ef5pisot3dfk7VgMPbs4vgkjmCk="
        }
      ],
      "ee": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.jxep6rvxlj.wasm",
          "integrity": "sha256-Kaa6sC3Dg6C4zv15pSjyqEcz5Ds9mSuVal/yL7lsxHM="
        }
      ],
      "eu": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.anjh03lwqh.wasm",
          "integrity": "sha256-SkZBUYC0GSvAbfnGknOKTFby0whBDx/cjxO5W/DF6mA="
        }
      ],
      "fi": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.4uzlkhen09.wasm",
          "integrity": "sha256-VD8s1pZh1ED7bqzawrqdTAKnUP+qY/K9Q+uT3GXfuzY="
        }
      ],
      "gl": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.nqd44zcddn.wasm",
          "integrity": "sha256-jw71fMMlfWYZOl0nn0amjqTQRE42fdxx48haj4CCC/E="
        }
      ],
      "hr": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.56674o11ym.wasm",
          "integrity": "sha256-/U6yfsCxrKpFVFwkSsPRpx25pSHKI59H6r+wb340DLY="
        }
      ],
      "hu": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.q7gbxtvgm3.wasm",
          "integrity": "sha256-KpQ8ho4h3USW6Z1mYQYxDmKzMnfmcL5BZNfmzfzy5sQ="
        }
      ],
      "ie": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.ivz2cqi8am.wasm",
          "integrity": "sha256-4okSeLIydfmm8FNMxPhnwlOKQ25kRZnp22dWcEN+TPI="
        }
      ],
      "in": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.elo6ee9lg6.wasm",
          "integrity": "sha256-AlgLIBFnqlwzBVmYyx8a/w4GXlX+pqPKYRRlF5EL7wc="
        }
      ],
      "is": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.yyugnqs5k6.wasm",
          "integrity": "sha256-NuB4XLCd7qL6hWUrXuIFbdZ96Ig7qTznKsSx1izOvd4="
        }
      ],
      "lt": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.z2aya2id79.wasm",
          "integrity": "sha256-dab+9cFNXA3qXzN2rzJjGpFY0ZgWv+6Xvb1haOZb0pg="
        }
      ],
      "lu": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.9t0w40r6m1.wasm",
          "integrity": "sha256-43/c4a+T8BPcYeHSxzI1ANRGJPm91HXDl8J1oiepWic="
        }
      ],
      "lv": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.kjjney1rbs.wasm",
          "integrity": "sha256-UNcjbxYu0Ynp3FJhWLVUxAw7FnmtmMdc80Kf/1EqtJQ="
        }
      ],
      "my": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.yr8vxb6m49.wasm",
          "integrity": "sha256-0hQbTswdqvimLL2k/pTmDSmOp+bLlbz91wiMQX/ZGmU="
        }
      ],
      "no": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.53fqyaoi32.wasm",
          "integrity": "sha256-H2fWLgH+JDCXC0Zg7VFxY9ufMtDlgXQfpQxyU+ZSkyQ="
        }
      ],
      "pl": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.tikwek9wgh.wasm",
          "integrity": "sha256-G6L5+RbaEPz6uWQ1hPrA1k9w59BeM7NPrHgIUhWS6Ms="
        }
      ],
      "ru": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.c57s7kzeoj.wasm",
          "integrity": "sha256-0AWZubGKgaC76948TkSZRWIEuvP6wOyy+7xIUYjHTfQ="
        }
      ],
      "sa": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.xhepbtfq4q.wasm",
          "integrity": "sha256-pQTR0V1bcHIdwoISS0DN93sf4tNyRX3eB2zymZ4/LUs="
        }
      ],
      "se": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.4reh4va34f.wasm",
          "integrity": "sha256-ENsB3dlhmvCbx6aljyn2342YTLENyOr/3ulfT7HzJfQ="
        }
      ],
      "sg": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.p7q6n5ezpb.wasm",
          "integrity": "sha256-y+p9uneSaFrUlmEnuBNaQVvGn6i5SucQHM7BbIIut+I="
        }
      ],
      "si": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.ed4u8g45z9.wasm",
          "integrity": "sha256-XsbYXzzu1KLyhZ0lNeHBWgrkTTE5yaikM6dCtc5RbEM="
        }
      ],
      "sk": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.0oub836a3q.wasm",
          "integrity": "sha256-AESJq2P0elknpZQVi2Xgx7vtOHBv0JBWt6qAJFxQWuU="
        }
      ],
      "th": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.56cgqf0dch.wasm",
          "integrity": "sha256-nde+rgZFfT1MDR68Rn2BV0Ynswx9UKo62XCqF5P1bhg="
        }
      ],
      "tl": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.q8gzeq19r6.wasm",
          "integrity": "sha256-+gKn+76lc8lu3BUunSsmXG2q5IvOQH6k2s/LR2f8rhw="
        }
      ],
      "za": [
        {
          "virtualPath": "Nettify.resources.wasm",
          "name": "Nettify.resources.ddad4r5y0h.wasm",
          "integrity": "sha256-P+pMikEw/haihroEHWPRtOWktDdFV0aJJNPkhQiXmnU="
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

import { defineConfig, type OutputConfig, type EnvironmentConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';

const getElectronOutput = (type: "main" | "preload") => {
    const config: OutputConfig = {
        distPath: {
            root: `dist-electron/${type}`,
            js: './'
        },
        filenameHash: false,
        cleanDistPath: true,
        sourceMap: false,
        minify: false
    }
    return config
}

const getElectronInput = (type: "main" | "preload") => {
    const config: EnvironmentConfig = {
        source: {
            entry: {
                [type]: type === 'main' ? "./electron/main.ts" : "./electron/preload.ts"
            }
        },
        tools: {
            htmlPlugin: false,
            rspack: {
                target: type === 'main' ? "electron-main" : "electron-preload",
            }
        },
        output: getElectronOutput(type),
        performance: {
            chunkSplit: {
                strategy: "all-in-one"
            },
        },
        dev: {
            writeToDisk: true
        },
    }
    return config
}

export default defineConfig({
    environments: {
        "electron-main": getElectronInput('main'),
        "electron-preload": getElectronInput('preload'),
        "web": {
            plugins: [
                pluginBabel({
                    include: /\.(?:jsx|tsx)$/,
                }),
                pluginSolid(),
            ],
            source: {
                entry: {
                    index: "./src/index.tsx",
                }
            },
            output: {
                assetPrefix: "../",
                distPath: {
                    html: './',
                    css: 'static',
                    font: 'static',
                    image: 'static',
                    js: 'static',
                }
            },
            html: {
                // template: "./pages/template.html"
            },
            tools: {
                rspack: {
                    target: "web",
                    dependencies: ["electron-main", "electron-preload"]
                }
            },
            performance: {

            }
        },
    },
})
/* istanbul ignore file */
import Vue from 'vue'

import * as tf from '@tensorflow/tfjs'
import { setWasmPath } from '@tensorflow/tfjs-backend-wasm'

import BackgroundRemoval from './component/background-removal/background-removal'
import AlertService from './component/alert/alert'

import './component/core-css'
import './component/input-source'
import './component/settings'
import './component/output'
import './component/suggestions'
import './component/collapse'

import initialState from './initial-state'

async function main () {
  AlertService.init()

  tf.enableProdMode()
  setWasmPath('/assets/tfjs-backend-wasm.wasm')
  await tf.setBackend('wasm')

  AlertService.announce('Loading Necessary image processing files.')
  const bgRemovalInstance = new BackgroundRemoval()
  await bgRemovalInstance.loadModel()

  AlertService.announce('Application is ready to use')

  Vue.config.devtools = false
  Vue.config.productionTip = false

  window.app = new Vue({
    el: '.site__app',
    data: {
      ...initialState
    }
  })
}

main()

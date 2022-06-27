import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/esm/node-adapter";
import wasmModule from "../native/a.out";

const obj = {
  wasmPath: undefined,
  setWasmPath(path) {
    this.wasmPath = path
  },
  answerToLifeTheUniverseAndEverything() {
    return wasmModule({ locateFile: (path, prefix) => this.wasmPath })
      .then((module) =>
        module._answer_to_life_the_universe_and_everything()
    )
  }
};

if (typeof process !== "undefined" && process?.versions?.node) {
  const { parentPort } = require("worker_threads");
  Comlink.expose(obj, nodeEndpoint(parentPort));
} else {
  Comlink.expose(obj);
}

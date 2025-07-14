// @ts-check
import path from "path";
import assert from "assert";
import config from "../cc-ts-config.json" with {"type": "json"};

/**
 * @type {import('typescript-to-lua').Plugin}
 */
export default {
  beforeEmit(program, options, emitHost, result) {
    if (!config.generate_lualib_bundle) {
      assert(options.outDir);
      const out_dir = path.resolve(options.outDir);
      const idx = result.findIndex((value) => {
        const file_path = path.resolve(value.outputPath);
        return (
          path.dirname(file_path) === out_dir &&
          path.basename(file_path) === "lualib_bundle.lua"
        );
      });
      result.splice(idx, 1);
    }
    if (config.custom_lualib_bundle_name) {
      assert(options.outDir);
      const out_dir = path.resolve(options.outDir);
      for (const file of result) {
        const file_path = path.resolve(file.outputPath);
        if (
          path.dirname(file_path) === out_dir &&
          path.basename(file_path) === "lualib_bundle.lua"
        ) {
          file.outputPath = path.join(
            out_dir,
            config.custom_lualib_bundle_name + ".lua"
          );
        } else {
          file.code = file.code.replace(
            /^local ____lualib = require\("lualib_bundle"\)\n/,
            `local ____lualib = require("${config.custom_lualib_bundle_name}")\n`
          );
        }
      }
    }
  },
};

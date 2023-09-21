# ts-proto-deno

Demo of using `ts-proto` with Deno.

## Quick summary

Run the following with `ts-proto` installed to generate the code:

```bash
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=out --ts_proto_opt=importSuffix=.ts --ts_proto_opt=esModuleInterop=true ./demo.proto
```

Run the following to fix the imports:

```bash
# macOS
sed -i '' 's/protobufjs\/minimal\.ts/protobufjs\/minimal\.js/g' out/*.ts
sed -i 's/protobufjs\/minimal\.ts/protobufjs\/minimal\.js/g' out/*.ts
# other UNIX systems
```



## Guide

1. Change to the directory where your `.proto` files are located
```bash
cd protobuf 
```

2. Create a directory for the generated code
```bash
mkdir out
```

3. Install `ts-proto`
```bash
npm install ts-proto
```

4. Run `protoc` with the `ts-proto` plugin with the following  options:
- `--ts_proto_out=out` specifies the output directory for the generated code
- `ts_proto_opt=importSuffix=.ts` will ensure the generated code includes file extensions with the `.ts` suffix, which is necessary since Deno requires explicit file extensions
- `--ts_proto_opt=esModuleInterop=true` stops old style `require` statements from being generated and instead uses `import` statements which are supported by Deno

The full command looks as follows:

```bash
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=out --ts_proto_opt=importSuffix=.ts --ts_proto_opt=esModuleInterop=true ./demo.proto
```

5. Use the following `deno.json` configuration with import maps telling Deno to get the libraries from npm:

```json
{
  "imports": {
    "long": "npm:long",
    "protobufjs/minimal.ts": "npm:protobufjs/minimal.js"
  }
}
```

The last import map is necessary because `protobufjs/minimal.ts` doesn't actually exist as the `protobufjs` has JavaScript files, not TypeScript files. This is why we need to replace the `.ts` extension with `.js` in the generated code.

import * as path from "jsr:@std/path";
import { ensureDir, exists } from "jsr:@std/fs";
import AdmZip from "npm:adm-zip";
import { consola } from "./utils/logger.ts";

const RUST_ARCH = Deno.env.get("RUST_ARCH") ?? "x86_64";
const fixedWebview = Deno.args.includes("--fixed-webview");

// sidecar 所在目录
const SIDECAR_DIR = "backend/tauri/sidecar";
// 需要去掉的后缀
const SIDECAR_SUFFIX = "-x86_64-pc-windows-msvc";

// 要打包的 sidecar 列表：src = 去掉后缀的名字，dest = zip 中的目标文件名
const SIDECAR_FILES: Array<{ src: string; dest: string }> = [
  { src: "clash",           dest: "clash.exe" },
  { src: "meow",           dest: "meow.exe" },
  { src: "mihomo",          dest: "mihomo.exe" },
  { src: "mihomo-alpha",    dest: "mihomo-alpha.exe" },
  { src: "nyanpasu-service",   dest: "nyanpasu-service.exe" },
  { src: "clash-rs",        dest: "clash-rs.exe" },
  { src: "clash-rs-alpha",  dest: "clash-rs-alpha.exe" },
];

async function resolvePortable() {
  if (Deno.build.os !== "windows") return;

  const cwd = Deno.cwd();
  const TAURI_APP_DIR = path.join(cwd, "backend/tauri");

  const buildDir = RUST_ARCH === "x86_64"
    ? "backend/target/release"
    : `backend/target/${RUST_ARCH}-pc-windows-msvc/release`;

  const configDir = path.join(buildDir, ".config");

  if (!(await exists(buildDir))) {
    throw new Error("could not found the release dir");
  }

  await ensureDir(configDir);
  await Deno.writeTextFile(path.join(configDir, "PORTABLE"), "");

  const zip = new AdmZip();
  let mainEntryPath = path.join(buildDir, "Clash Mimo.exe");
  if (!(await exists(mainEntryPath))) {
    mainEntryPath = path.join(buildDir, "clash-mimo.exe");
  }
  if (!(await exists(mainEntryPath))) {
    throw new Error(`main executable not found: ${mainEntryPath}`);
  }
  zip.addLocalFile(mainEntryPath);   // 进 zip 保持原文件名
  
  // ===== 2. Sidecar 文件（在 backend/tauri/sidecar/ 中）=====
  const sidecarDir = path.join(cwd, SIDECAR_DIR);
  if (!(await exists(sidecarDir))) {
    throw new Error(`sidecar dir not found: ${sidecarDir}`);
  }

  for (const { src, dest } of SIDECAR_FILES) {
    // 优先找带后缀的文件（如 -x86_64-pc-windows-msvc.exe）
    const withSuffix = path.join(sidecarDir, `${src}${SIDECAR_SUFFIX}.exe`);
    // 备选：不带后缀的（兼容）
    const withoutSuffix = path.join(sidecarDir, `${src}.exe`);

    if (await exists(withSuffix)) {
      consola.info(`adding sidecar: ${src}${SIDECAR_SUFFIX}.exe → ${dest}`);
      zip.addLocalFile(withSuffix, "", dest);  // 重命名为 dest
    } else if (await exists(withoutSuffix)) {
      consola.info(`adding sidecar: ${src}.exe → ${dest}`);
      zip.addLocalFile(withoutSuffix, "", dest);
    } else {
      consola.warn(`sidecar NOT FOUND: ${withSuffix}`);
    }
  }

  // ===== 3. Resources 文件夹（在 backend/tauri/resources/）=====
  const resourcesDir = path.join(TAURI_APP_DIR, "resources");
  if (await exists(resourcesDir)) {
    consola.info(`adding resources: ${resourcesDir}`);
    zip.addLocalFolder(resourcesDir, "resources");
  } else {
    consola.warn(`resources dir not found: ${resourcesDir}`);
  }


  if (fixedWebview) {
    let webviewPath: string | undefined;
    for await (const entry of Deno.readDir(TAURI_APP_DIR)) {
      if (entry.name.includes("WebView2")) {
        webviewPath = entry.name;
        break;
      }
    }
    if (!webviewPath) {
      throw new Error("WebView2 runtime not found");
    }
    zip.addLocalFolder(
      path.join(TAURI_APP_DIR, webviewPath),
      path.basename(webviewPath),
    );
  }

  zip.addLocalFolder(configDir, ".config");

  const packageJson = JSON.parse(
    await Deno.readTextFile(path.join(cwd, "package.json")),
  );
  const version = packageJson.version;

  const zipFile = `Clash.Mimo_${version}_${RUST_ARCH}${
    fixedWebview ? "_fixed-webview" : ""
  }_portable.zip`;
  zip.writeZip(zipFile);

  consola.success("create portable zip successfully");
}

resolvePortable().catch((err) => {
  consola.error(err);
  Deno.exit(1);
});

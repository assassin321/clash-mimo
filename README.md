<h1 align="center">
  <img src="./src/assets/image/logo.png" alt="Clash" width="128" />
  <br>
  Clash Mimo
  <br>
</h1>

<h3 align="center">
A <a href="https://github.com/MetaCubeX/mihomo">Mihomo</a> GUI based on <a href="https://github.com/tauri-apps/tauri">Tauri</a>.
</h3>

<p align="center">
  <a href="https://github.com/assassin321/clash-mimo/releases"><img src="https://img.shields.io/github/release/assassin321/clash-mimo.svg" alt="Release" /></a>
  <a href="https://github.com/assassin321/clash-mimo/blob/main/LICENSE"><img src="https://img.shields.io/github/license/assassin321/clash-mimo" alt="License" /></a>
</p>

## Features

- **Mihomo Core Only** — Exclusive support for the [Mihomo](https://github.com/MetaCubeX/mihomo) (Clash Meta) core.
- **Profile Management** — Advanced profile management via YAML and JavaScript enhancement.
- **Customizable UI** — Custom theme colors and improved interface.
- **System Proxy** — System proxy setting and guard.

### FAQ

Refer to the [FAQ Page](https://clash-verge-rev.github.io/faq/windows.html).

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and contribution guidelines.

```shell
pnpm i                  # Install dependencies (also installs prek git hooks)
pnpm check              # Download resources; locally also builds the service binary
                        #   --force      Force re-download
                        #   --alpha      Download alpha channel service
                        #   --target     Specify target triple (e.g. x86_64-unknown-linux-gnu)
                        #   --no-confirm Skip confirmation prompt
pnpm build:service      # Rebuild service binary after modifying service code
pnpm dev                # Start development server
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) and [UPDATELOG.md](./UPDATELOG.md).

## Acknowledgement

Clash Mimo was based on or inspired by these projects:

- [oomeow/clash-verge-self](https://github.com/oomeow/clash-verge-self): Continuation of Clash Verge - A Clash Meta GUI based on Tauri (Windows, MacOS, Linux).
- [libnyanpasu/clash-nyanpasu](https://github.com/libnyanpasu/clash-nyanpasu): Another fork of Clash Verge.
- [clash-verge-rev/clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev): Continuation of Clash Verge - A Clash Meta GUI based on Tauri (Windows, MacOS, Linux).
- [zzzgydi/clash-verge](https://github.com/zzzgydi/clash-verge): A Clash GUI based on tauri. Supports Windows, macOS and Linux.
- [tauri-apps/tauri](https://github.com/tauri-apps/tauri): Build smaller, faster, and more secure desktop applications with a web frontend.
- [Dreamacro/clash](https://github.com/Dreamacro/clash): A rule-based tunnel in Go.
- [MetaCubeX/mihomo](https://github.com/MetaCubeX/mihomo): A rule-based tunnel in Go.
- [Fndroid/clash_for_windows_pkg](https://github.com/Fndroid/clash_for_windows_pkg): A Windows/macOS GUI based on Clash.
- [vitejs/vite](https://github.com/vitejs/vite): Next generation frontend tooling. It's fast!

## License

GPL-3.0 License. See [License here](./LICENSE) for details.

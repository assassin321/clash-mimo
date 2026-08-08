<<h3>Clash Mimo</h3>

<h3>
  A <a href="https://github.com/Dreamacro/clash">Clash</a> GUI based on <a href="https://github.com/tauri-apps/tauri">Tauri</a>.
</h3>

## Features

- Built-in support [Clash Premium](https://github.com/Dreamacro/clash), [Mihomo](https://github.com/MetaCubeX/mihomo), [Clash Rust](https://github.com/Watfaq/clash-rs) & [Meow](https://github.com/madeye/meow-rs).
- Profiles management and enhancement (by YAML, JavaScript & Lua). [Doc](https://nyanpasu.org/tutorial/proxy-chain)
- Provider management support.
- Google Material You Design UI and animation support.

## Links

- [Install](https://nyanpasu.org/tutorial/install)
- [FAQ](https://nyanpasu.org/others/faq)
- [Q&A Convention](https://nyanpasu.org/others/issues)
- [How To Ask Questions](https://nyanpasu.org/others/how-to-ask)

## Development

### Configure your development environment

You should install Rust and Node.js, see [here](https://v2.tauri.app/start/prerequisites/) for more details.

Clash Mimo uses the pnpm package manager. See [here](https://pnpm.io/installation) for installation instructions. Then, install Node.js packages.

```shell
pnpm i
```

### Download the Clash binary & other dependencies

```shell
# force update to latest version
# pnpm prepare:check --force

pnpm prepare:check
```

### Run dev

```shell
pnpm dev

# run it in another way if app instance exists
pnpm dev:diff
```

### Build application

```shell
pnpm build
```

## Contributions

Issue and PR welcome!

## Acknowledgement

Clash Mimo was based on or inspired by these projects and so on:

- [libnyanpasu/clash-nyanpasu](https://github.com/libnyanpasu/clash-nyanpasu): Another fork of Clash Verge. 
- [zzzgydi/clash-verge](https://github.com/zzzgydi/clash-verge): A Clash GUI based on Tauri. Supports Windows, macOS and Linux.
- [clash-verge-rev/clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev): Another fork of Clash Verge. Some patches are included for bug fixes.
- [tauri-apps/tauri](https://github.com/tauri-apps/tauri): Build smaller, faster, and more secure desktop applications with a web frontend.
- [Dreamacro/clash](https://github.com/Dreamacro/clash): A rule-based tunnel in Go.
- [MetaCubeX/mihomo](https://github.com/MetaCubeX/mihomo): A rule-based tunnel in Go.
- [Watfaq/clash-rs](https://github.com/Watfaq/clash-rs): A custom protocol, rule based network proxy software.
- [madeye/meow-rs](https://github.com/madeye/meow-rs): A high-performance Rust implementation of the mihomo (Clash Meta) proxy kernel.
- [Fndroid/clash_for_windows_pkg](https://github.com/Fndroid/clash_for_windows_pkg): A Windows/macOS GUI based on Clash.
- [vitejs/vite](https://github.com/vitejs/vite): Next generation frontend tooling. It's fast!
- [mui/material-ui](https://github.com/mui/material-ui): Ready-to-use foundational React components, free forever.

## Contributors

![Contributors](https://contrib.rocks/image?repo=libnyanpasu/clash-nyanpasu)

## License

GPL-3.0 License. See [License here](./LICENSE) for details.

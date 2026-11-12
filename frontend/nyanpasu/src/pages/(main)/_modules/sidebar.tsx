import Apps from '~icons/material-symbols/apps'
import DashboardRounded from '~icons/material-symbols/dashboard-rounded'
import DesignServicesRounded from '~icons/material-symbols/design-services-rounded'
import GridViewOutlineRounded from '~icons/material-symbols/grid-view-outline-rounded'
import Public from '~icons/material-symbols/public'
import SchemaRounded from '~icons/material-symbols/schema-rounded'
import SettingsEthernetRounded from '~icons/material-symbols/settings-ethernet-rounded'
import SettingsRounded from '~icons/material-symbols/settings-rounded'
import TerminalRounded from '~icons/material-symbols/terminal-rounded'
import { ReactElement, useMemo } from 'react'
import { m } from '@/paraglide/messages'
import type { FileRoutesByTo } from '@/route-tree.gen'
import { useClashProxies } from '@nyanpasu/query'
import { cn } from '@nyanpasu/utils'
import { Link, useMatchRoute } from '@tanstack/react-router'

interface SidebarLinkProps {
  to: string
  params?: Record<string, string>
  icon: React.ReactNode
  label: string
  section?: keyof FileRoutesByTo
}

function SidebarLink({ to, params, icon, label, section }: SidebarLinkProps) {
  const matchRoute = useMatchRoute()

  const isActive = !!matchRoute(
    section
      ? { to: section, fuzzy: true }
      : { to: to as Parameters<typeof matchRoute>[0]['to'], fuzzy: true },
  )

  return (
    <Link
      to={to as Parameters<typeof Link>[0]['to']}
      params={params as any}
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
        'hover:bg-black/5 dark:hover:bg-white/10',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-on-surface-variant dark:text-on-surface-variant',
      )}
    >
      <span className="size-5 shrink-0">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

function ProxiesSidebarLink(): ReactElement {
  const { proxies: { data: proxies } } = useClashProxies()
  const firstGroup = proxies?.groups[0]?.name

  return useMemo(
    () => (
      <SidebarLink
        to={firstGroup ? '/main/proxies/group/$name' : '/main/proxies'}
        params={firstGroup ? { name: firstGroup } : undefined}
        icon={<Public />}
        label={m.navbar_label_proxies()}
        section="/main/proxies"
      />
    ),
    [firstGroup],
  )
}

export default function Sidebar() {
  return (
    <aside
      className={cn(
        'flex w-56 shrink-0 flex-col border-r overflow-y-auto',
        'dark:bg-on-primary bg-primary-container',
        'p-3',
      )}
      data-slot="app-sidebar"
    >
      {/* 导航链接 */}
      <nav className="flex flex-col gap-1">
        <SidebarLink
          to="/main/dashboard"
          icon={<DashboardRounded />}
          label={m.navbar_label_dashboard()}
        />

        <ProxiesSidebarLink />

        <SidebarLink
          to="/main/profiles/$type"
          params={{ type: 'profile' }}
          icon={<GridViewOutlineRounded />}
          label={m.navbar_label_profiles()}
          section="/main/profiles"
        />

        <SidebarLink
          to="/main/connections"
          icon={<SettingsEthernetRounded />}
          label={m.navbar_label_connections()}
        />

        <SidebarLink
          to="/main/topology"
          icon={<SchemaRounded />}
          label={m.topology_title()}
        />

        <SidebarLink
          to="/main/rules"
          icon={<DesignServicesRounded />}
          label={m.navbar_label_rules()}
        />

        <SidebarLink
          to="/main/logs"
          icon={<TerminalRounded />}
          label={m.navbar_label_logs()}
        />

        <SidebarLink
          to="/main/providers"
          icon={<Apps />}
          label={m.navbar_label_providers()}
        />

        <SidebarLink
          to="/main/settings/system/proxy"
          icon={<SettingsRounded />}
          label={m.navbar_label_settings()}
          section="/main/settings"
        />
      </nav>
    </aside>
  )
}
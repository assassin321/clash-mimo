import ContextMenuProvider from '@/components/providers/context-menu-provider'
import NyanpasuUpdateProvider from '@/components/providers/nyanpasu-update-provider'
import { AnimatedOutletPreset } from '@/components/router/animated-outlet'
import { cn } from '@nyanpasu/utils'
import packageJson from '@root/package.json'
import { createFileRoute } from '@tanstack/react-router'
import Header from './_modules/header'
import Sidebar from './_modules/sidebar'

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
})

const AppContent = () => {
  return (
    <AnimatedOutletPreset
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-hidden',
        '[&>div]:min-h-0 [&>div]:flex-1',
      )}
      data-slot="app-content"
    />
  )
}

function RouteComponent() {

  return (
    <NyanpasuUpdateProvider>
      <ContextMenuProvider>
        <div
          className={cn(
            'flex max-h-dvh min-h-dvh overflow-hidden',
            'bg-mixed-background',
          )}
          data-slot="app-root"
          data-app-version={packageJson.version}
        >
          <Header className="shrink-0" />

          {/* 左右布局容器 */}
          <div className="flex flex-1 overflow-hidden">
            {/* 左侧侧边栏 */}
            <Sidebar />

            {/* 内容区域 */}
            <main className="flex flex-1 flex-col overflow-hidden">
              <AppContent />
            </main>
          </div>
        </div>
      </ContextMenuProvider>
    </NyanpasuUpdateProvider>
  )
}

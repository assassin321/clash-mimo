; === 添加插件 Simple Service Plugin 存在的目录 ===
!addplugindir "$%AppData%\Local\NSIS\"

; ----------------------- Hook -----------------------
!macro NSIS_HOOK_PREINSTALL
  ; MessageBox MB_OK "PreInstall"
!macroend

!macro NSIS_HOOK_PREINSTALL_APPSTOPED
  !insertmacro CheckAllMimoProcesses
!macroend

!macro NSIS_HOOK_POSTINSTALL
  !insertmacro StartMimoService
!macroend

!macro NSIS_HOOK_PREUNINSTALL
  !insertmacro CheckAllMimoProcesses
  !insertmacro RemoveMimoService
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
  !insertmacro RemoveAutoStartReg
  !insertmacro RemoveOldScheme
!macroend

; ----------------------- 自定义方法 -----------------------
; === 检查并停止所有与 Mimo 有关的进程 ===
!macro CheckAllMimoProcesses
  ; Check if clash-mimo-service.exe is running
  !if "${INSTALLMODE}" == "currentUser"
    nsis_tauri_utils::FindProcessCurrentUser "clash-mimo-service.exe"
  !else
    nsis_tauri_utils::FindProcess "clash-mimo-service.exe"
  !endif
  Pop $R0
  ${If} $R0 = 0
    DetailPrint "Kill clash-mimo-service.exe..."
    !if "${INSTALLMODE}" == "currentUser"
      nsis_tauri_utils::KillProcessCurrentUser "clash-mimo-service.exe"
    !else
      nsis_tauri_utils::KillProcess "clash-mimo-service.exe"
    !endif
  ${EndIf}

  ; Check if clash-mihomo-alpha.exe is running
  !if "${INSTALLMODE}" == "currentUser"
    nsis_tauri_utils::FindProcessCurrentUser "clash-mihomo-alpha.exe"
  !else
    nsis_tauri_utils::FindProcess "clash-mihomo-alpha.exe"
  !endif
  Pop $R0
  ${If} $R0 = 0
    DetailPrint "Kill clash-mihomo-alpha.exe..."
    !if "${INSTALLMODE}" == "currentUser"
      nsis_tauri_utils::KillProcessCurrentUser "clash-mihomo-alpha.exe"
    !else
      nsis_tauri_utils::KillProcess "clash-mihomo-alpha.exe"
    !endif
  ${EndIf}

  ; Check if clash-mihomo.exe is running
  !if "${INSTALLMODE}" == "currentUser"
    nsis_tauri_utils::FindProcessCurrentUser "clash-mihomo.exe"
  !else
    nsis_tauri_utils::FindProcess "clash-mihomo.exe"
  !endif
  Pop $R0
  ${If} $R0 = 0
    DetailPrint "Kill clash-mihomo.exe..."
    !if "${INSTALLMODE}" == "currentUser"
      nsis_tauri_utils::KillProcessCurrentUser "clash-mihomo.exe"
    !else
      nsis_tauri_utils::KillProcess "clash-mihomo.exe"
    !endif
  ${EndIf}
!macroend

; === 启动 Clash Mimo Service ===
!macro StartMimoService
  ; Check if the service exists
  SimpleSC::ExistsService "clash_mimo_service"
  Pop $0  ; 0：service exists；other: service not exists
  ; Service exists
  ${If} $0 == 0
    Push $0
    ; Check if the service is running
    SimpleSC::ServiceIsRunning "clash_mimo_service"
    Pop $0 ; returns an errorcode (<>0) otherwise success (0)
    Pop $1 ; returns 1 (service is running) - returns 0 (service is not running)
    ${If} $0 == 0
      Push $0
      ${If} $1 == 0
            DetailPrint "Restart Clash Mimo Service..."
            SimpleSC::StartService "clash_mimo_service" "" 30
      ${EndIf}
    ${ElseIf} $0 != 0
          Push $0
          SimpleSC::GetErrorMessage
          Pop $0
          MessageBox MB_OK|MB_ICONSTOP "Check Service Status Error ($0)"
    ${EndIf}
  ${EndIf}
!macroend

; === 移除 Clash Mimo Service ===
!macro RemoveMimoService
  ; Check if the service exists
  SimpleSC::ExistsService "clash_mimo_service"
  Pop $0  ; 0：service exists；other: service not exists
  ; Service exists
  ${If} $0 == 0
    Push $0
    ; Check if the service is running
    SimpleSC::ServiceIsRunning "clash_mimo_service"
    Pop $0 ; returns an errorcode (<>0) otherwise success (0)
    Pop $1 ; returns 1 (service is running) - returns 0 (service is not running)
    ${If} $0 == 0
      Push $0
      ${If} $1 == 1
        DetailPrint "Stop Clash Mimo Service..."
        SimpleSC::StopService "clash_mimo_service" 1 30
        Pop $0 ; returns an errorcode (<>0) otherwise success (0)
        ${If} $0 == 0
              DetailPrint "Removing Clash Mimo Service..."
              SimpleSC::RemoveService "clash_mimo_service"
        ${ElseIf} $0 != 0
                  Push $0
                  SimpleSC::GetErrorMessage
                  Pop $0
                  MessageBox MB_OK|MB_ICONSTOP "Clash Mimo Service Stop Error ($0)"
        ${EndIf}
  ${ElseIf} $1 == 0
        DetailPrint "Removing Clash Mimo Service..."
        SimpleSC::RemoveService "clash_mimo_service"
  ${EndIf}
    ${ElseIf} $0 != 0
          Push $0
          SimpleSC::GetErrorMessage
          Pop $0
          MessageBox MB_OK|MB_ICONSTOP "Check Service Status Error ($0)"
    ${EndIf}
  ${EndIf}
!macroend

; === 移除自启动注册表，仅在明确卸载软件时，非更新软件或覆盖安装时 ===
!macro RemoveAutoStartReg
  ${If} $UpdateMode <> 1
    StrCpy $R0 "SOFTWARE\Microsoft\Windows\CurrentVersion\Run"
    StrCpy $R1 "SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run"
    ; HKEY_LOCAL_MACHINE
    DeleteRegValue HKLM "$R0" "Clash Mimo"
    DeleteRegValue HKLM "$R1" "Clash Mimo"
    ; HKEY_CURRENT_USER
    DeleteRegValue HKCU "$R0" "Clash Mimo"
    DeleteRegValue HKCU "$R1" "Clash Mimo"
  ${EndIf}
!macroend

; === 删除整个 URL Scheme 注册表树 ===
!macro RemoveOldScheme
  DeleteRegKey HKCU "Software\Classes\Clash"
!macroend

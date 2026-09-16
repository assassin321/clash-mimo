import React, { Suspense, useRef } from "react";

import { useCheckUpdateSWR } from "@/services/swr";
import { useMimoStore } from "@/stores";

import { DialogRef } from "../base";

const UpdateViewer = React.lazy(() =>
  import("../setting/mods/update-viewer").then((module) => ({
    default: module.UpdateViewer,
  })),
);

interface Props {
  className?: string;
}

export const UpdateButton = (props: Props) => {
  const { className } = props;
  const autoCheckUpdate = useMimoStore(
    (s) => s.verge.auto_check_update ?? true,
  );

  const viewerRef = useRef<DialogRef>(null);

  const { data: updateInfo } = useCheckUpdateSWR(autoCheckUpdate);

  if (!updateInfo) return null;

  return (
    <>
      <Suspense>
        <UpdateViewer ref={viewerRef} />
      </Suspense>

      <button
        style={{
          backgroundColor: "#FF4040",
          border: "none",
          color: "white",
          padding: "2px 10px",
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "4px",
        }}
        className={className}
        onClick={() => viewerRef.current?.open()}>
        New
      </button>
    </>
  );
};

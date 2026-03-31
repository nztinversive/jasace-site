"use client";

import { ReactNode, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { convexEnabled, convexPlaceholderUrl, convexUrl } from "@/lib/convex-config";

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new ConvexReactClient(convexUrl ?? convexPlaceholderUrl, {
        skipConvexDeploymentUrlCheck: !convexEnabled,
      })
  );

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}


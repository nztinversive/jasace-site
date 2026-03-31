"use client";

import { ReactNode, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { convexEnabled, convexPlaceholderUrl, convexUrl } from "@/lib/convex-config";

export default function ConvexClientProvider({
  children,
  allowPlaceholderClient = false,
}: {
  children: ReactNode;
  allowPlaceholderClient?: boolean;
}) {
  const [client] = useState(
    () =>
      convexEnabled || allowPlaceholderClient
        ? new ConvexReactClient(convexUrl ?? convexPlaceholderUrl, {
            skipConvexDeploymentUrlCheck: !convexEnabled,
          })
        : null
  );

  if (!client) {
    return <>{children}</>;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}

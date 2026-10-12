import { ReactNode } from "react";
import { AppShell } from "./AppShell";
import { PageHeader } from "./PageHeader";

export function ModulePage({
  path,
  title,
  description,
  children
}: {
  path: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return <AppShell activePath={path}><PageHeader title={title} description={description} />{children}</AppShell>;
}

import type { Metadata } from "next";
import { StructuredData } from "../../../components/structured-data";
import { FrameworkIndexPage } from "../../page";
import { frameworkMetadata, frameworkSchema } from "../../schema";

/*
 * A static segment beats the sibling `[id]` dynamic segment in the App Router,
 * so this file owns /components/react and the catalog keeps the rest. No id in
 * the catalog is "react", so nothing here is shadowed.
 */
export const metadata: Metadata = frameworkMetadata("react");

export default function ReactFrameworkRoute() {
  return (
    <>
      <StructuredData schema={frameworkSchema("react")} />
      <FrameworkIndexPage route="react" />
    </>
  );
}

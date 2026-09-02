import type { Metadata } from "next";
import { StructuredData } from "../../../components/structured-data";
import { FrameworkIndexPage } from "../../page";
import { frameworkMetadata, frameworkSchema } from "../../schema";

/*
 * A static segment beats the sibling `[id]` dynamic segment in the App Router,
 * so this file owns /components/css and the catalog keeps the rest. No id in
 * the catalog is "css", so nothing here is shadowed.
 */
export const metadata: Metadata = frameworkMetadata("css");

export default function CssFrameworkRoute() {
  return (
    <>
      <StructuredData schema={frameworkSchema("css")} />
      <FrameworkIndexPage route="css" />
    </>
  );
}

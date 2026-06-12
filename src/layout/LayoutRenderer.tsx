import type { ThoughtWeaveComponentProps } from "../components/componentTypes";
import { componentRegistry } from "./componentRegistry";
import type { LayoutComponentName, LayoutSpec } from "./layoutSchema";
import { validateLayoutSpec } from "./layoutSchema";

type LayoutRendererProps = ThoughtWeaveComponentProps & {
  spec: LayoutSpec;
};

export function LayoutRenderer({ spec, ...componentProps }: LayoutRendererProps) {
  const validation = validateLayoutSpec(spec);

  if (!validation.valid) {
    return (
      <main className="layout-error" aria-label="Unsupported layout">
        <h2>Unsupported layout</h2>
        <p>ThoughtWeave refused to render this layout because it referenced unsupported parts.</p>
        <ul>
          {validation.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </main>
    );
  }

  const renderRegion = (regionId: string) => {
    const region = spec.regions.find((candidate) => candidate.id === regionId);

    if (!region) {
      return null;
    }

    const Component = componentRegistry[region.component as LayoutComponentName];

    if (!Component) {
      return <div className="safe-fallback">Unsupported component: {region.component}</div>;
    }

    return <Component {...componentProps} />;
  };

  return (
    <main className="layout-grid" aria-label={spec.layoutName}>
      <section className="panel panel-left">{renderRegion("left")}</section>
      <section className="panel panel-center">{renderRegion("center")}</section>
      <aside className="side-stack">
        <section className="panel panel-right-top">{renderRegion("rightTop")}</section>
        <section className="panel panel-right-bottom">{renderRegion("rightBottom")}</section>
      </aside>
    </main>
  );
}
